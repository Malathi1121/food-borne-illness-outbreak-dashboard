import {
  AreaData,
  AreaFusionResult,
  FreshnessStatus,
  FusionResult,
  SignalWeights,
  SourceContribution,
  SourceReliability,
  SourceReliabilityDetail,
  SourceType,
  WhyFlaggedEvidence
} from '../types';

export const DEFAULT_WEIGHTS: SignalWeights = {
  clinic: 0.30,
  pharmacy: 0.20,
  citizen: 0.20,
  laboratory: 0.30
};

export const DEFAULT_RELIABILITY: SourceReliability = {
  clinic: 0.90,
  pharmacy: 0.80,
  citizen: 0.60,
  laboratory: 0.98
};

export function calculateFreshnessFactor(status: FreshnessStatus): number {
  switch (status) {
    case 'FRESH': return 1.0;
    case 'AGING': return 0.90;
    case 'STALE': return 0.75;
    case 'MISSING': return 0.0;
    default: return 1.0;
  }
}

export function evaluateDynamicReliability(
  source: SourceType,
  baseReliability: number,
  freshness: FreshnessStatus,
  currentValue: number,
  baselineValue: number,
  isConflicting: boolean = false,
  isInvalid: boolean = false,
  isDuplicate: boolean = false
): {
  dynamicReliability: number;
  freshnessFactor: number;
  completenessFactor: number;
  qualityFactor: number;
  consistencyFactor: number;
  reason: string;
} {
  const freshnessFactor = calculateFreshnessFactor(freshness);
  const completenessFactor = freshness === 'MISSING' || currentValue < 0 ? 0.0 : 1.0;
  const qualityFactor = isInvalid || isDuplicate ? 0.75 : 1.0;
  const consistencyFactor = isConflicting ? 0.85 : 1.0;

  const dynamicReliability = Math.min(
    1.0,
    Math.max(0.0, baseReliability * freshnessFactor * completenessFactor * qualityFactor * consistencyFactor)
  );

  let reason = 'Optimal signal quality and data freshness.';
  if (freshness === 'MISSING' || currentValue < 0) {
    reason = `${source.toUpperCase()} data feed is unavailable/missing. Contribution set to 0.`;
  } else if (freshness === 'STALE') {
    reason = `${source.toUpperCase()} feed is STALE (>6h latency delay). Reliability discounted by 25%.`;
  } else if (freshness === 'AGING') {
    reason = `${source.toUpperCase()} feed is AGING (1-6h latency delay). Reliability discounted by 10%.`;
  } else if (isInvalid || isDuplicate) {
    reason = `${source.toUpperCase()} record flagged for quality anomaly (invalid/duplicate payload). Reliability penalized by 25%.`;
  } else if (isConflicting) {
    reason = `${source.toUpperCase()} signal diverges from supporting channels. Consistency penalty applied.`;
  }

  return {
    dynamicReliability,
    freshnessFactor,
    completenessFactor,
    qualityFactor,
    consistencyFactor,
    reason
  };
}

export function evaluateAreaFusion(
  area: AreaData,
  weights: SignalWeights = DEFAULT_WEIGHTS,
  reliability: SourceReliability = DEFAULT_RELIABILITY
): AreaFusionResult {
  const warnings: string[] = [];

  // Calculate percentage increases vs baseline
  const clinicIncrease = area.clinic.baseline > 0
    ? ((area.clinic.current - area.clinic.baseline) / area.clinic.baseline) * 100
    : 0;

  const pharmacyIncrease = area.pharmacy.baseline > 0
    ? ((area.pharmacy.current - area.pharmacy.baseline) / area.pharmacy.baseline) * 100
    : 0;

  const citizenIncrease = area.citizen.baseline > 0
    ? ((area.citizen.current - area.citizen.baseline) / area.citizen.baseline) * 100
    : 0;

  const labIncrease = area.laboratory.current > 0 ? area.laboratory.current * 100 : 0;

  // Signal Intensity S_i (0 - 100)
  const clinicRaw = area.clinic.freshness === 'MISSING' || area.clinic.current < 0
    ? 0
    : Math.min(100, Math.max(0, (clinicIncrease / 100) * 148));

  const pharmacyRaw = area.pharmacy.freshness === 'MISSING' || area.pharmacy.current < 0
    ? 0
    : Math.min(100, Math.max(0, (pharmacyIncrease / 100) * 285));

  const citizenRaw = area.citizen.freshness === 'MISSING' || area.citizen.current < 0
    ? 0
    : Math.min(100, Math.max(0, (citizenIncrease / 100) * 85));

  const labRaw = area.laboratory.freshness === 'MISSING' || area.laboratory.current < 0
    ? 0
    : Math.min(100, Math.max(0, area.laboratory.current * 20));

  // Single-source conflict check
  const isHighClinicSpike = clinicIncrease >= 250;
  const isOthersFlat = pharmacyIncrease < 20 && citizenIncrease < 20 && area.laboratory.current === 0;
  const isConflicting = isHighClinicSpike && isOthersFlat;

  // Compute Dynamic Reliability per source
  const sourcesConfig: Array<{ key: SourceType; name: string; current: number; baseline: number; freshness: FreshnessStatus; raw: number; weight: number; baseRel: number }> = [
    { key: 'clinic', name: 'Clinic Admissions', current: area.clinic.current, baseline: area.clinic.baseline, freshness: area.clinic.freshness, raw: clinicRaw, weight: weights.clinic, baseRel: reliability.clinic },
    { key: 'pharmacy', name: 'Pharmacy OTC Sales', current: area.pharmacy.current, baseline: area.pharmacy.baseline, freshness: area.pharmacy.freshness, raw: pharmacyRaw, weight: weights.pharmacy, baseRel: reliability.pharmacy },
    { key: 'citizen', name: 'Citizen Complaints', current: area.citizen.current, baseline: area.citizen.baseline, freshness: area.citizen.freshness, raw: citizenRaw, weight: weights.citizen, baseRel: reliability.citizen },
    { key: 'laboratory', name: 'Laboratory Confirmations', current: area.laboratory.current, baseline: area.laboratory.baseline, freshness: area.laboratory.freshness, raw: labRaw, weight: weights.laboratory, baseRel: reliability.laboratory },
  ];

  let totalAvailableWeight = 0;
  sourcesConfig.forEach(s => {
    if (s.freshness === 'MISSING' || s.current < 0) {
      warnings.push(`${s.name} signal is MISSING/Unavailable for ${area.areaName}. Confidence reduced.`);
    } else {
      totalAvailableWeight += s.weight;
    }
    if (s.freshness === 'STALE') {
      warnings.push(`${s.name} signal for ${area.areaName} is STALE (updated >6 hours ago).`);
    }
  });

  if (totalAvailableWeight === 0) totalAvailableWeight = 1.0;

  const reliabilityDetails: SourceReliabilityDetail[] = [];
  let weightedScoreSum = 0;
  let totalConfidenceFactor = 0;

  sourcesConfig.forEach(s => {
    const dynEval = evaluateDynamicReliability(
      s.key,
      s.baseRel,
      s.freshness,
      s.current,
      s.baseline,
      isConflicting && s.key === 'clinic'
    );

    const normWeight = s.freshness === 'MISSING' ? 0 : s.weight / totalAvailableWeight;
    const pts = s.raw * dynEval.dynamicReliability * normWeight;

    weightedScoreSum += pts;
    totalConfidenceFactor += dynEval.dynamicReliability * normWeight;

    reliabilityDetails.push({
      source: s.key,
      sourceName: s.name,
      baseReliabilityPct: Math.round(s.baseRel * 100),
      freshnessStatus: s.freshness,
      freshnessFactor: dynEval.freshnessFactor,
      completenessFactor: dynEval.completenessFactor,
      qualityFactor: dynEval.qualityFactor,
      consistencyFactor: dynEval.consistencyFactor,
      dynamicReliabilityPct: Math.round(dynEval.dynamicReliability * 100),
      fusionWeightPct: Math.round(s.weight * 100),
      effectiveContributionPts: Math.round(pts),
      adjustmentReason: dynEval.reason
    });
  });

  const finalRiskScore = Math.round(Math.min(100, Math.max(0, weightedScoreSum)));

  // Dynamic Confidence calculation per area
  let areaConfidenceFactor = totalConfidenceFactor;
  if (isConflicting) {
    areaConfidenceFactor *= 0.70;
  } else if (clinicRaw < 35 && pharmacyRaw < 35 && citizenRaw < 35) {
    areaConfidenceFactor = Math.min(0.96, areaConfidenceFactor + 0.11);
  }

  let finalAreaConfidence = Math.round(areaConfidenceFactor * 100);
  if (sourcesConfig.some(s => s.freshness === 'MISSING')) {
    finalAreaConfidence = Math.max(30, finalAreaConfidence - 20);
  }
  if (sourcesConfig.some(s => s.freshness === 'STALE')) {
    finalAreaConfidence = Math.max(30, finalAreaConfidence - 15);
  }
  finalAreaConfidence = Math.min(100, Math.max(0, finalAreaConfidence));

  // Determine Risk Level
  let riskLevel: 'NORMAL' | 'WATCH' | 'HIGH' | 'CRITICAL' | 'AMBIGUOUS' = 'NORMAL';
  if (isConflicting) {
    riskLevel = 'AMBIGUOUS';
    warnings.push(`Conflicting signals: High clinic spike (${Math.round(clinicIncrease)}%) without supporting pharmacy or lab evidence. Confidence reduced to ${finalAreaConfidence}% due to source divergence.`);
  } else if (finalRiskScore >= 65) {
    riskLevel = 'CRITICAL';
  } else if (finalRiskScore >= 50) {
    riskLevel = 'HIGH';
  } else if (finalRiskScore >= 35) {
    riskLevel = 'WATCH';
  } else {
    riskLevel = 'NORMAL';
  }

  let primaryDriver = 'Baseline Activity';
  if (labRaw >= 40) primaryDriver = 'Laboratory Confirmation';
  else if (clinicRaw >= 40) primaryDriver = 'Clinic Admissions Spike';
  else if (pharmacyRaw >= 40) primaryDriver = 'Pharmacy OTC Sales Spike';
  else if (citizenRaw >= 40) primaryDriver = 'Citizen Complaints Cluster';

  let recommendedAction = 'Continue routine surveillance';
  if (riskLevel === 'CRITICAL' || riskLevel === 'HIGH') {
    recommendedAction = 'Assign Investigation Team for local inspection & active case finding';
  } else if (riskLevel === 'WATCH') {
    recommendedAction = 'Review incoming signals & request accelerated lab sample processing';
  } else if (riskLevel === 'AMBIGUOUS') {
    recommendedAction = 'Manual review required — cross-validate clinic diagnostic codes';
  }

  const sourceConsistencyStatus: AreaFusionResult['sourceConsistencyStatus'] =
    isConflicting ? 'DIVERGENT_SINGLE_SOURCE'
    : area.laboratory.freshness === 'MISSING' ? 'DATA_UNAVAILABLE'
    : finalRiskScore >= 65 ? 'HIGH_CONVERGENCE'
    : 'STABLE_BASELINE';

  return {
    areaId: area.areaId,
    areaName: area.areaName,
    riskScore: finalRiskScore,
    confidenceScore: finalAreaConfidence,
    riskLevel,
    percentageIncreaseTotal: Math.round(Math.max(clinicIncrease, pharmacyIncrease, citizenIncrease)),
    primaryDriver,
    clinicCases: { current: area.clinic.current, baseline: area.clinic.baseline, increase: Math.round(clinicIncrease), freshness: area.clinic.freshness },
    pharmacySales: { current: area.pharmacy.current, baseline: area.pharmacy.baseline, increase: Math.round(pharmacyIncrease), freshness: area.pharmacy.freshness },
    citizenReports: { current: area.citizen.current, baseline: area.citizen.baseline, increase: Math.round(citizenIncrease), freshness: area.citizen.freshness },
    labConfirmations: { current: area.laboratory.current, baseline: area.laboratory.baseline, increase: Math.round(labIncrease), freshness: area.laboratory.freshness },
    warnings,
    recommendedAction,
    reliabilityDetails,
    sourceConsistencyStatus
  };
}

export function runMultiSourceFusion(
  areas: AreaData[],
  weights: SignalWeights = DEFAULT_WEIGHTS,
  reliability: SourceReliability = DEFAULT_RELIABILITY
): FusionResult {
  const areaResults = areas.map(a => evaluateAreaFusion(a, weights, reliability));

  // Find max risk area
  const highestRiskArea = [...areaResults].sort((a, b) => b.riskScore - a.riskScore)[0];

  const overallRiskScore = highestRiskArea ? highestRiskArea.riskScore : 0;
  const overallConfidence = highestRiskArea ? highestRiskArea.confidenceScore : 95;
  const overallRiskLevel = highestRiskArea ? highestRiskArea.riskLevel : 'NORMAL';

  // Aggregate warnings
  const warningsSet = new Set<string>();
  const uncertaintyReasons: string[] = [];

  areaResults.forEach(ar => {
    ar.warnings.forEach(w => warningsSet.add(w));
  });

  if (areas.some(a => a.laboratory.freshness === 'MISSING')) {
    uncertaintyReasons.push('Laboratory data feed is unavailable. Confidence reduced by 20%.');
  }
  if (areas.some(a => a.pharmacy.freshness === 'STALE')) {
    uncertaintyReasons.push('Pharmacy sales data is stale (> 6 hours delay).');
  }
  if (overallRiskLevel === 'AMBIGUOUS') {
    uncertaintyReasons.push('Single source spike lacks concurrence from remaining surveillance channels. Confidence penalized for divergence.');
  }

  const targetArea = highestRiskArea
    ? areas.find(a => a.areaId === highestRiskArea.areaId) || areas[0]
    : areas[0];

  const targetEval = evaluateAreaFusion(targetArea, weights, reliability);

  const contributions: SourceContribution[] = targetEval.reliabilityDetails.map(rd => {
    let curr = 0;
    let base = 0;
    let inc = 0;

    if (rd.source === 'clinic') {
      curr = targetArea.clinic.current;
      base = targetArea.clinic.baseline;
      inc = Math.round(targetEval.clinicCases.increase);
    } else if (rd.source === 'pharmacy') {
      curr = targetArea.pharmacy.current;
      base = targetArea.pharmacy.baseline;
      inc = Math.round(targetEval.pharmacySales.increase);
    } else if (rd.source === 'citizen') {
      curr = targetArea.citizen.current;
      base = targetArea.citizen.baseline;
      inc = Math.round(targetEval.citizenReports.increase);
    } else {
      curr = targetArea.laboratory.current;
      base = targetArea.laboratory.baseline;
      inc = 0;
    }

    return {
      source: rd.source,
      sourceName: rd.sourceName,
      currentValue: curr,
      baselineValue: base,
      percentageIncrease: inc,
      weight: rd.fusionWeightPct,
      reliability: rd.dynamicReliabilityPct,
      freshness: rd.freshnessStatus,
      pointsContributed: rd.effectiveContributionPts,
      statusText: rd.freshnessStatus === 'FRESH'
        ? `Reliable (${rd.dynamicReliabilityPct}%)`
        : rd.freshnessStatus === 'MISSING'
        ? 'Unavailable'
        : `Discounted (${rd.dynamicReliabilityPct}%)`
    };
  });

  const whyFlaggedEvidence: WhyFlaggedEvidence = {
    areaName: targetArea.areaName,
    riskLevel: overallRiskLevel,
    riskScore: overallRiskScore,
    confidenceScore: overallConfidence,
    clinicIncreasePct: contributions[0].percentageIncrease,
    pharmacyIncreasePct: contributions[1].percentageIncrease,
    citizenIncreasePct: contributions[2].percentageIncrease,
    labConfirmationsCount: targetArea.laboratory.current,
    contributions,
    warnings: Array.from(warningsSet),
    recommendedAction: highestRiskArea ? highestRiskArea.recommendedAction : 'Routine surveillance'
  };

  return {
    overallRiskScore,
    confidenceScore: overallConfidence,
    riskLevel: overallRiskLevel,
    statusText: overallRiskLevel === 'CRITICAL' ? 'CRITICAL OUTBREAK DETECTED' : overallRiskLevel === 'HIGH' ? 'HIGH RISK CLUSTER DETECTED' : overallRiskLevel === 'WATCH' ? 'ELEVATED WATCH SIGNAL' : overallRiskLevel === 'AMBIGUOUS' ? 'AMBIGUOUS SIGNAL — MANUAL REVIEW REQUIRED' : 'NORMAL SURVEILLANCE',
    lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    sourceContributions: contributions,
    warnings: Array.from(warningsSet),
    uncertaintyReasons,
    recommendedAction: highestRiskArea ? highestRiskArea.recommendedAction : 'Continue routine monitoring',
    areaResults,
    whyFlaggedEvidence,
    systemReliabilityDetails: targetEval.reliabilityDetails
  };
}
