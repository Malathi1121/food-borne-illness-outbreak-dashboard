import { AreaData, FreshnessStatus, SourceDataPoint } from '../types';

export const AREAS = [
  { id: 'area_a', name: 'Area A (Riverside District)', population: 145000 },
  { id: 'area_b', name: 'Area B (Central Metro)', population: 320000 },
  { id: 'area_c', name: 'Area C (Harbor North)', population: 98000 },
  { id: 'area_d', name: 'Area D (Westside Heights)', population: 210000 },
];

export interface TimeSeriesRecord {
  date: string;          // e.g. "2026-08-15"
  timestamp: string;     // ISO timestamp
  areaId: string;
  areaName: string;
  clinicCases: number;
  clinicBaseline: number;
  pharmacySales: number;
  pharmacyBaseline: number;
  citizenReports: number;
  citizenBaseline: number;
  labConfirmations: number;
  labBaseline: number;
  clinicFreshness: FreshnessStatus;
  pharmacyFreshness: FreshnessStatus;
  citizenFreshness: FreshnessStatus;
  labFreshness: FreshnessStatus;
  isInvalidDataPoint?: boolean;
  isDuplicateDataPoint?: boolean;
  notes?: string;
}

// Generate 30 days of synthetic historical data
export function generateSyntheticTimeSeries(): TimeSeriesRecord[] {
  const records: TimeSeriesRecord[] = [];
  const startDate = new Date('2026-08-05T08:00:00Z');

  for (let day = 0; day < 30; day++) {
    const currentDate = new Date(startDate.getTime() + day * 24 * 60 * 60 * 1000);
    const dateStr = currentDate.toISOString().split('T')[0];

    AREAS.forEach((area) => {
      // Standard baseline activity per area
      let clinicBaseline = area.id === 'area_a' ? 43 : Math.round(area.population / 18000);
      let pharmacyBaseline = area.id === 'area_a' ? 109 : Math.round(area.population / 7000);
      let citizenBaseline = area.id === 'area_a' ? 16 : Math.round(area.population / 45000);
      let labBaseline = 0;

      let clinicCases = clinicBaseline + Math.floor(Math.random() * 3) - 1;
      let pharmacySales = pharmacyBaseline + Math.floor(Math.random() * 5) - 2;
      let citizenReports = citizenBaseline + Math.floor(Math.random() * 2) - 1;
      let labConfirmations = 0;

      clinicCases = Math.max(0, clinicCases);
      pharmacySales = Math.max(0, pharmacySales);
      citizenReports = Math.max(0, citizenReports);

      let clinicFreshness: FreshnessStatus = 'FRESH';
      let pharmacyFreshness: FreshnessStatus = 'FRESH';
      let citizenFreshness: FreshnessStatus = 'FRESH';
      let labFreshness: FreshnessStatus = 'FRESH';

      let isInvalidDataPoint = false;
      let isDuplicateDataPoint = false;
      let notes = 'Normal surveillance baseline';

      // Simulate Localized Outbreak in Area A from Day 22 onwards
      if (area.id === 'area_a' && day >= 22) {
        const progress = (day - 21) / 8; // 1/8 to 8/8 (1.0 on day 29)
        clinicCases = Math.round(clinicBaseline + (72 - clinicBaseline) * progress);
        pharmacySales = Math.round(pharmacyBaseline + (147 - pharmacyBaseline) * progress);
        citizenReports = Math.round(citizenBaseline + (35 - citizenBaseline) * progress);
        labConfirmations = day >= 24 ? Math.round(5 * ((day - 23) / 6)) : 0;
        if (day === 29) {
          clinicCases = 72;
          pharmacySales = 147;
          citizenReports = 35;
          labConfirmations = 5;
        }
        notes = 'Localized Salmonella / E.coli cluster outbreak signal active';
      }

      // Inject synthetic data quality anomalies on specific days for realistic stress testing
      if (area.id === 'area_c' && day === 28) {
        pharmacyFreshness = 'STALE';
        notes = 'Pharmacy feed transmission delayed by 8 hours';
      }

      if (area.id === 'area_b' && day === 27) {
        labFreshness = 'MISSING';
        labConfirmations = -1; // Missing signal value
        notes = 'Laboratory LIMS connection offline';
      }

      if (area.id === 'area_d' && day === 15) {
        isInvalidDataPoint = true;
        clinicCases = -15; // Corrupted negative entry
        notes = 'Corrupted numerical record detected and flagged';
      }

      if (area.id === 'area_a' && day === 10) {
        isDuplicateDataPoint = true;
        notes = 'Duplicate automated payload sync from regional clinic';
      }

      records.push({
        date: dateStr,
        timestamp: currentDate.toISOString(),
        areaId: area.id,
        areaName: area.name,
        clinicCases,
        clinicBaseline,
        pharmacySales,
        pharmacyBaseline,
        citizenReports,
        citizenBaseline,
        labConfirmations,
        labBaseline,
        clinicFreshness,
        pharmacyFreshness,
        citizenFreshness,
        labFreshness,
        isInvalidDataPoint,
        isDuplicateDataPoint,
        notes
      });
    });
  }

  return records;
}

export const SYNTHETIC_TIME_SERIES = generateSyntheticTimeSeries();

// Get latest snapshot per area from synthetic dataset
export function getLatestAreaSnapshot(timeSeries: TimeSeriesRecord[] = SYNTHETIC_TIME_SERIES): AreaData[] {
  const latestDate = timeSeries[timeSeries.length - 1]?.date;
  const latestRecords = timeSeries.filter(r => r.date === latestDate);

  return AREAS.map(area => {
    const record = latestRecords.find(r => r.areaId === area.id) || {
      clinicCases: 8, clinicBaseline: 8, clinicFreshness: 'FRESH',
      pharmacySales: 20, pharmacyBaseline: 20, pharmacyFreshness: 'FRESH',
      citizenReports: 3, citizenBaseline: 3, citizenFreshness: 'FRESH',
      labConfirmations: 0, labBaseline: 0, labFreshness: 'FRESH'
    };

    return {
      areaId: area.id,
      areaName: area.name,
      population: area.population,
      clinic: {
        current: Math.max(0, record.clinicCases),
        baseline: record.clinicBaseline,
        freshness: record.clinicFreshness as FreshnessStatus,
        lastUpdatedMinutesAgo: record.clinicFreshness === 'STALE' ? 480 : record.clinicFreshness === 'DELAYED' ? 120 : 5
      },
      pharmacy: {
        current: Math.max(0, record.pharmacySales),
        baseline: record.pharmacyBaseline,
        freshness: record.pharmacyFreshness as FreshnessStatus,
        lastUpdatedMinutesAgo: record.pharmacyFreshness === 'STALE' ? 360 : 15
      },
      citizen: {
        current: Math.max(0, record.citizenReports),
        baseline: record.citizenBaseline,
        freshness: record.citizenFreshness as FreshnessStatus,
        lastUpdatedMinutesAgo: 10
      },
      laboratory: {
        current: Math.max(0, record.labConfirmations),
        baseline: record.labBaseline,
        freshness: record.labFreshness as FreshnessStatus,
        lastUpdatedMinutesAgo: record.labFreshness === 'MISSING' ? 2880 : record.labFreshness === 'STALE' ? 1440 : 30
      }
    };
  });
}
