import { SYNTHETIC_TIME_SERIES } from '../data/syntheticData';
import { analyzeDataQuality, cleanDataset } from './dataQuality';

function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportSyntheticJSON() {
  const jsonStr = JSON.stringify(SYNTHETIC_TIME_SERIES, null, 2);
  downloadFile(jsonStr, 'synthetic_foodborne_outbreak_dataset.json', 'application/json');
}

export function exportSyntheticCSV() {
  const headers = ['Date', 'Timestamp', 'AreaID', 'AreaName', 'ClinicCases', 'ClinicBaseline', 'PharmacySales', 'PharmacyBaseline', 'CitizenReports', 'CitizenBaseline', 'LabConfirmations', 'LabBaseline', 'ClinicFreshness', 'PharmacyFreshness', 'CitizenFreshness', 'LabFreshness', 'IsInvalid', 'IsDuplicate', 'Notes'];

  const rows = SYNTHETIC_TIME_SERIES.map(r => [
    r.date, r.timestamp, r.areaId, `"${r.areaName}"`,
    r.clinicCases, r.clinicBaseline,
    r.pharmacySales, r.pharmacyBaseline,
    r.citizenReports, r.citizenBaseline,
    r.labConfirmations, r.labBaseline,
    r.clinicFreshness, r.pharmacyFreshness, r.citizenFreshness, r.labFreshness,
    r.isInvalidDataPoint ? 'TRUE' : 'FALSE',
    r.isDuplicateDataPoint ? 'TRUE' : 'FALSE',
    `"${r.notes || ''}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
  downloadFile(csvContent, 'synthetic_foodborne_outbreak_dataset.csv', 'text/csv');
}

export function exportCleanedCSV() {
  const cleaned = cleanDataset(SYNTHETIC_TIME_SERIES);
  const headers = ['Date', 'Timestamp', 'AreaID', 'AreaName', 'ClinicCases', 'ClinicBaseline', 'PharmacySales', 'PharmacyBaseline', 'CitizenReports', 'CitizenBaseline', 'LabConfirmations', 'LabBaseline', 'ClinicFreshness', 'PharmacyFreshness', 'CitizenFreshness', 'LabFreshness'];

  const rows = cleaned.map(r => [
    r.date, r.timestamp, r.areaId, `"${r.areaName}"`,
    r.clinicCases, r.clinicBaseline,
    r.pharmacySales, r.pharmacyBaseline,
    r.citizenReports, r.citizenBaseline,
    r.labConfirmations, r.labBaseline,
    r.clinicFreshness, r.pharmacyFreshness, r.citizenFreshness, r.labFreshness
  ]);

  const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
  downloadFile(csvContent, 'cleaned_foodborne_outbreak_dataset.csv', 'text/csv');
}

export function exportCleanedJSON() {
  const cleaned = cleanDataset(SYNTHETIC_TIME_SERIES);
  const jsonStr = JSON.stringify(cleaned, null, 2);
  downloadFile(jsonStr, 'cleaned_foodborne_outbreak_dataset.json', 'application/json');
}

export function exportDataQualityReport() {
  const summary = analyzeDataQuality(SYNTHETIC_TIME_SERIES);
  const reportStr = JSON.stringify(summary, null, 2);
  downloadFile(reportStr, 'data_quality_audit_report.json', 'application/json');
}
