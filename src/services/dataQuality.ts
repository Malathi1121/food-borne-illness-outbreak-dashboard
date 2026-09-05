import { SYNTHETIC_TIME_SERIES, TimeSeriesRecord } from '../data/syntheticData';
import { DataQualitySummary } from '../types';

export function analyzeDataQuality(records: TimeSeriesRecord[] = SYNTHETIC_TIME_SERIES): DataQualitySummary {
  let validRecordsCount = 0;
  let missingRecordsCount = 0;
  let duplicateRecordsCount = 0;
  let invalidValueCount = 0;
  let staleRecordsCount = 0;

  const qualityIssues: DataQualitySummary['qualityIssues'] = [];

  records.forEach((rec, idx) => {
    let hasIssue = false;

    if (rec.isDuplicateDataPoint) {
      duplicateRecordsCount++;
      hasIssue = true;
      qualityIssues.push({
        id: `qual_dup_${idx}`,
        source: 'clinic',
        areaName: rec.areaName,
        issueType: 'DUPLICATE',
        description: `Duplicate record payload received on ${rec.date}.`,
        actionTaken: 'Flagged & deduplicated from baseline calculation.',
        timestamp: rec.timestamp
      });
    }

    if (rec.isInvalidDataPoint || rec.clinicCases < 0 || rec.pharmacySales < 0 || rec.citizenReports < 0) {
      invalidValueCount++;
      hasIssue = true;
      qualityIssues.push({
        id: `qual_inv_${idx}`,
        source: 'clinic',
        areaName: rec.areaName,
        issueType: 'INVALID_NUMERICAL',
        description: `Invalid negative case count (${rec.clinicCases}) encountered in payload on ${rec.date}.`,
        actionTaken: 'Sanitized to 0; excluded from deviation weighting.',
        timestamp: rec.timestamp
      });
    }

    if (rec.labFreshness === 'MISSING' || rec.labConfirmations < 0) {
      missingRecordsCount++;
      hasIssue = true;
      qualityIssues.push({
        id: `qual_miss_${idx}`,
        source: 'laboratory',
        areaName: rec.areaName,
        issueType: 'MISSING',
        description: `Laboratory confirmation feed missing on ${rec.date}.`,
        actionTaken: 'Confidence penalty applied; non-missing weights re-normalized.',
        timestamp: rec.timestamp
      });
    }

    if (rec.pharmacyFreshness === 'STALE' || rec.clinicFreshness === 'STALE') {
      staleRecordsCount++;
      hasIssue = true;
      qualityIssues.push({
        id: `qual_stale_${idx}`,
        source: rec.pharmacyFreshness === 'STALE' ? 'pharmacy' : 'clinic',
        areaName: rec.areaName,
        issueType: 'STALE',
        description: `Pharmacy transmission delayed by > 6 hours on ${rec.date}.`,
        actionTaken: '25% freshness penalty applied to confidence score.',
        timestamp: rec.timestamp
      });
    }

    if (!hasIssue) {
      validRecordsCount++;
    }
  });

  const total = records.length;
  const completenessPercentage = Math.round((validRecordsCount / total) * 100);

  return {
    totalRecordsProcessed: total,
    validRecordsCount,
    missingRecordsCount,
    duplicateRecordsCount,
    invalidValueCount,
    staleRecordsCount,
    completenessPercentage,
    lastSyncTimestamp: new Date().toISOString(),
    qualityIssues
  };
}

export function cleanDataset(records: TimeSeriesRecord[] = SYNTHETIC_TIME_SERIES): TimeSeriesRecord[] {
  // Deduplicate and sanitize negative counts
  const seenKeys = new Set<string>();
  const cleaned: TimeSeriesRecord[] = [];

  records.forEach(rec => {
    const key = `${rec.date}_${rec.areaId}_${rec.clinicCases}_${rec.pharmacySales}`;
    if (seenKeys.has(key) || rec.isDuplicateDataPoint) {
      return; // Skip duplicate
    }
    seenKeys.add(key);

    cleaned.push({
      ...rec,
      clinicCases: Math.max(0, rec.clinicCases),
      pharmacySales: Math.max(0, rec.pharmacySales),
      citizenReports: Math.max(0, rec.citizenReports),
      labConfirmations: Math.max(0, rec.labConfirmations),
      isInvalidDataPoint: false,
      isDuplicateDataPoint: false
    });
  });

  return cleaned;
}
