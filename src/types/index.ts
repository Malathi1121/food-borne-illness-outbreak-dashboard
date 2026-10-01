export type Role = 'investigator' | 'chief_epidemiologist' | 'analyst';

export type RiskLevel = 'NORMAL' | 'WATCH' | 'HIGH' | 'CRITICAL' | 'AMBIGUOUS';

export type FreshnessStatus = 'FRESH' | 'AGING' | 'STALE' | 'MISSING' | 'DELAYED';

export type SourceType = 'clinic' | 'pharmacy' | 'citizen' | 'laboratory';

export interface SourceReliability {
  clinic: number;     // base e.g. 0.90
  pharmacy: number;   // base e.g. 0.80
  citizen: number;    // base e.g. 0.60
  laboratory: number; // base e.g. 0.98
}

export interface SignalWeights {
  clinic: number;     // e.g. 0.30
  pharmacy: number;   // e.g. 0.20
  citizen: number;    // e.g. 0.20
  laboratory: number; // e.g. 0.30
}

export interface SourceReliabilityDetail {
  source: SourceType;
  sourceName: string;
  baseReliabilityPct: number;        // Base e.g. 90%
  freshnessStatus: FreshnessStatus;
  freshnessFactor: number;           // e.g. 1.0, 0.90, 0.75, 0.0
  completenessFactor: number;        // e.g. 1.0 or 0.0
  qualityFactor: number;             // e.g. 1.0 or 0.5 (invalid/duplicate deduction)
  consistencyFactor: number;         // e.g. 1.0 or 0.85 (divergence penalty)
  dynamicReliabilityPct: number;     // Calculated e.g. 90% or 60%
  fusionWeightPct: number;           // e.g. 30%
  effectiveContributionPts: number;  // Contribution to 0-100 risk score
  adjustmentReason: string;          // Human-readable rationale
}

export interface SourceDataPoint {
  source: SourceType;
  areaId: string;
  timestamp: string; // ISO string
  value: number;
  baseline: number;
  freshness: FreshnessStatus;
  lastUpdatedMinutesAgo: number;
  isInvalid?: boolean;
  isDuplicate?: boolean;
  errorMessage?: string;
}

export interface AreaData {
  areaId: string;
  areaName: string;
  population: number;
  clinic: {
    current: number;
    baseline: number;
    freshness: FreshnessStatus;
    lastUpdatedMinutesAgo: number;
  };
  pharmacy: {
    current: number;
    baseline: number;
    freshness: FreshnessStatus;
    lastUpdatedMinutesAgo: number;
  };
  citizen: {
    current: number;
    baseline: number;
    freshness: FreshnessStatus;
    lastUpdatedMinutesAgo: number;
  };
  laboratory: {
    current: number;
    baseline: number;
    freshness: FreshnessStatus;
    lastUpdatedMinutesAgo: number;
  };
}

export interface SourceContribution {
  source: SourceType;
  sourceName: string;
  currentValue: number;
  baselineValue: number;
  percentageIncrease: number;
  weight: number;
  reliability: number;
  freshness: FreshnessStatus;
  pointsContributed: number;
  statusText: string;
}

export interface FusionResult {
  overallRiskScore: number;       // 0 - 100
  confidenceScore: number;        // 0 - 100%
  riskLevel: RiskLevel;
  statusText: string;
  lastUpdated: string;
  sourceContributions: SourceContribution[];
  warnings: string[];
  uncertaintyReasons: string[];
  recommendedAction: string;
  areaResults: AreaFusionResult[];
  whyFlaggedEvidence?: WhyFlaggedEvidence;
  systemReliabilityDetails: SourceReliabilityDetail[];
}

export interface AreaFusionResult {
  areaId: string;
  areaName: string;
  riskScore: number;
  confidenceScore: number;
  riskLevel: RiskLevel;
  percentageIncreaseTotal: number;
  primaryDriver: string;
  clinicCases: { current: number; baseline: number; increase: number; freshness: FreshnessStatus };
  pharmacySales: { current: number; baseline: number; increase: number; freshness: FreshnessStatus };
  citizenReports: { current: number; baseline: number; increase: number; freshness: FreshnessStatus };
  labConfirmations: { current: number; baseline: number; increase: number; freshness: FreshnessStatus };
  warnings: string[];
  recommendedAction: string;
  reliabilityDetails: SourceReliabilityDetail[];
  sourceConsistencyStatus: 'HIGH_CONVERGENCE' | 'STABLE_BASELINE' | 'DIVERGENT_SINGLE_SOURCE' | 'DATA_UNAVAILABLE';
}

export interface WhyFlaggedEvidence {
  areaName: string;
  riskLevel: RiskLevel;
  riskScore: number;
  confidenceScore: number;
  clinicIncreasePct: number;
  pharmacyIncreasePct: number;
  citizenIncreasePct: number;
  labConfirmationsCount: number;
  contributions: SourceContribution[];
  warnings: string[];
  recommendedAction: string;
}

export interface EscalationRecord {
  id: string;
  areaId: string;
  areaName: string;
  riskLevel: RiskLevel;
  status: 'UNASSIGNED' | 'UNDER_REVIEW' | 'ESCALATED' | 'ACKNOWLEDGED' | 'RESOLVED';
  reason: string;
  assignedRoleOrTeam: string;
  timestamp: string;
  history: Array<{
    action: string;
    role: string;
    timestamp: string;
    note?: string;
  }>;
}

export interface AlertItem {
  id: string;
  severity: 'CRITICAL' | 'WARNING' | 'AMBIGUOUS' | 'INFO';
  title: string;
  message: string;
  areaName: string;
  timestamp: string;
  isRead: boolean;
}

export interface DataQualitySummary {
  totalRecordsProcessed: number;
  validRecordsCount: number;
  missingRecordsCount: number;
  duplicateRecordsCount: number;
  invalidValueCount: number;
  staleRecordsCount: number;
  completenessPercentage: number;
  lastSyncTimestamp: string;
  qualityIssues: Array<{
    id: string;
    source: SourceType;
    areaName: string;
    issueType: 'MISSING' | 'DUPLICATE' | 'INVALID_NUMERICAL' | 'STALE' | 'CONFLICTING';
    description: string;
    actionTaken: string;
    timestamp: string;
  }>;
}

export interface SingleSourceBenchmarkMetric {
  sourceName: string;
  detectionTimeMinutes: number;
  latencyPenaltyMinutes: number;
  status: string;
  isMultiSourceFused?: boolean;
}

export interface DetectionExperimentMetrics {
  experimentId: string;
  referenceBaselineDetectionTimeMinutes: number; // Configurable standard manual reporting time (e.g. 60)
  targetDetectionTimeMinutes: number;            // Operational goal (< 10)
  actualMeasuredDetectionTimeMinutes: number;    // Measured live from synthetic dataset stream processing
  percentageImprovement: number;
  speedupRatio: number;
  detectionTimestamp: string;
  anomalyStartTimestamp: string;
  timeSeriesStepsProcessed: number;
  falsePositivesCount: number;
  falseNegativesCount: number;
  staleDataPenaltyMinutes: number;
  singleSourceBenchmarks: SingleSourceBenchmarkMetric[];
  errorAnalysisSummary: string[];
}

export interface EdgeTestCase {
  id: string;
  name: string;
  description: string;
  expectedBehavior: string;
  status: 'PASSED' | 'FAILED' | 'PENDING';
  executedAt?: string;
  logs: string[];
  metrics: {
    riskScore: number;
    confidenceScore: number;
    riskLevel: RiskLevel;
    missingHandled: boolean;
    staleHandled: boolean;
    invalidExcluded: boolean;
  };
}

export type DemoScenarioId = 'scenario_normal' | 'scenario_outbreak' | 'scenario_missing_lab' | 'scenario_stale_pharmacy' | 'scenario_conflicting';

export interface DemoScenario {
  id: DemoScenarioId;
  name: string;
  description: string;
  badgeColor: string;
}
