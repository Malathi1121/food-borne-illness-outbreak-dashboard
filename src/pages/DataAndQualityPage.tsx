import React, { useState } from 'react';
import { Database, AlertTriangle, Filter, CheckCircle2, XCircle, ShieldCheck, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { analyzeDataQuality } from '../services/dataQuality';
import { DataExportButtons } from '../components/DataExportButtons';

interface SyntheticRecord {
  id: string;
  date: string;
  area: string;
  clinicCases: number;
  pharmacySales: number;
  citizenComplaints: number;
  labConfirmations: number;
  clinicFreshness: string;
  pharmacyFreshness: string;
  citizenFreshness: string;
  labFreshness: string;
  qualityStatus: 'FRESH' | 'STALE' | 'MISSING' | 'DUPLICATE' | 'INVALID_SANITIZED';
  duplicateFlag: boolean;
  notes: string;
}

const mockDataset: SyntheticRecord[] = [
  {
    id: 'SYN-101',
    date: '2026-08-29',
    area: 'Area A (Riverside District)',
    clinicCases: 72,
    pharmacySales: 147,
    citizenComplaints: 35,
    labConfirmations: 5,
    clinicFreshness: '15m ago',
    pharmacyFreshness: '30m ago',
    citizenFreshness: '1h ago',
    labFreshness: '2h ago',
    qualityStatus: 'FRESH',
    duplicateFlag: false,
    notes: 'Localized outbreak cluster signal (Risk Score: 84/100)'
  },
  {
    id: 'SYN-102',
    date: '2026-08-29',
    area: 'Area B (Westside Industrial)',
    clinicCases: 14,
    pharmacySales: 45,
    citizenComplaints: 6,
    labConfirmations: 0,
    clinicFreshness: '20m ago',
    pharmacyFreshness: '8h ago (Stale)',
    citizenFreshness: '2h ago',
    labFreshness: 'Missing feed',
    qualityStatus: 'STALE',
    duplicateFlag: false,
    notes: 'Stale pharmacy data (>6h latency penalty applied)'
  },
  {
    id: 'SYN-103',
    date: '2026-08-29',
    area: 'Area C (Northside Suburbs)',
    clinicCases: 6,
    pharmacySales: 18,
    citizenComplaints: 2,
    labConfirmations: 0,
    clinicFreshness: '10m ago',
    pharmacyFreshness: '45m ago',
    citizenFreshness: '3h ago',
    labFreshness: 'No cultures',
    qualityStatus: 'FRESH',
    duplicateFlag: false,
    notes: 'Normal baseline surveillance'
  },
  {
    id: 'SYN-104',
    date: '2026-08-28',
    area: 'Area A (Riverside District)',
    clinicCases: 64,
    pharmacySales: 132,
    citizenComplaints: 28,
    labConfirmations: 3,
    clinicFreshness: '1d ago',
    pharmacyFreshness: '1d ago',
    citizenFreshness: '1d ago',
    labFreshness: '1d ago',
    qualityStatus: 'FRESH',
    duplicateFlag: false,
    notes: 'Escalating outbreak trajectory'
  },
  {
    id: 'SYN-105',
    date: '2026-08-28',
    area: 'Area A (Riverside District)',
    clinicCases: 64,
    pharmacySales: 132,
    citizenComplaints: 28,
    labConfirmations: 3,
    clinicFreshness: '1d ago',
    pharmacyFreshness: '1d ago',
    citizenFreshness: '1d ago',
    labFreshness: '1d ago',
    qualityStatus: 'DUPLICATE',
    duplicateFlag: true,
    notes: 'Duplicate transmission detected and excluded from baseline'
  },
  {
    id: 'SYN-106',
    date: '2026-08-27',
    area: 'Area B (Westside Industrial)',
    clinicCases: 0, // Sanitized from -5
    pharmacySales: 40,
    citizenComplaints: 5,
    labConfirmations: 0,
    clinicFreshness: '2d ago',
    pharmacyFreshness: '2d ago',
    citizenFreshness: '2d ago',
    labFreshness: 'Missing',
    qualityStatus: 'INVALID_SANITIZED',
    duplicateFlag: false,
    notes: 'Sanitized negative clinic count (-5 -> 0)'
  },
  {
    id: 'SYN-107',
    date: '2026-08-26',
    area: 'Area C (Northside Suburbs)',
    clinicCases: 8,
    pharmacySales: 22,
    citizenComplaints: 3,
    labConfirmations: 0,
    clinicFreshness: '3d ago',
    pharmacyFreshness: '3d ago',
    citizenFreshness: '3d ago',
    labFreshness: 'No cultures',
    qualityStatus: 'FRESH',
    duplicateFlag: false,
    notes: 'Normal baseline surveillance'
  }
];

export const DataAndQualityPage: React.FC = () => {
  const { reliability } = useApp();
  const summary = analyzeDataQuality();
  const [selectedAreaFilter, setSelectedAreaFilter] = useState<string>('ALL');

  const filteredData = selectedAreaFilter === 'ALL'
    ? mockDataset
    : mockDataset.filter(d => d.area.includes(selectedAreaFilter));

  return (
    <div className="space-y-6">
      {/* Header & Disclaimer */}
      <div className="glass-panel p-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-4">
          <div className="p-3 bg-sky-500/10 text-sky-400 border border-sky-500/30 rounded-xl">
            <Database className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-100">Data & Quality Management</h1>
            <p className="text-xs text-slate-400">
              Synthetic Surveillance Dataset, Source Reliability Matrix, Data Freshness Audit & Quality Controls
            </p>
          </div>
        </div>

        {/* Mandatory PHI Disclaimer Banner */}
        <div className="bg-amber-500/15 border border-amber-500/40 rounded-xl p-4 text-xs text-amber-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-extrabold uppercase tracking-wide text-amber-300">
              SYNTHETIC / DEMONSTRATION DATA — NOT FOR REAL-WORLD MEDICAL OR PUBLIC-HEALTH DECISION MAKING.
            </p>
            <p className="text-amber-200/80 mt-1 leading-relaxed text-[11px]">
              This dataset contains synthetically generated observations for public health workflow testing. No real patient protected health information (PHI) is used.
            </p>
          </div>
        </div>
      </div>

      {/* Source Reliability & Freshness Matrix */}
      <div className="glass-panel p-5 space-y-4">
        <h2 className="text-base font-bold text-slate-100 border-b border-slate-800 pb-2 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-sky-400" /> Source Reliability Scores & Quality Impact
          </span>
          <span className="text-xs text-emerald-400 font-mono font-bold">Completeness: {summary.completenessPercentage}%</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sky-400">Clinic Admissions</span>
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded text-[10px] font-extrabold">FRESH</span>
            </div>
            <p className="text-2xl font-black text-slate-100">{Math.round(reliability.clinic * 100)}% <span className="text-xs font-normal text-slate-400">Reliability</span></p>
            <p className="text-[11px] text-slate-400">Weight: 30% | Latency: 15m</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-purple-400">Pharmacy OTC Sales</span>
              <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded text-[10px] font-extrabold">STALE (&gt;6h)</span>
            </div>
            <p className="text-2xl font-black text-slate-100">{Math.round(reliability.pharmacy * 100)}% <span className="text-xs font-normal text-slate-400">Reliability</span></p>
            <p className="text-[11px] text-slate-400">Weight: 20% | Penalty: +1.5 min latency</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-400">Citizen Complaints</span>
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded text-[10px] font-extrabold">FRESH</span>
            </div>
            <p className="text-2xl font-black text-slate-100">{Math.round(reliability.citizen * 100)}% <span className="text-xs font-normal text-slate-400">Reliability</span></p>
            <p className="text-[11px] text-slate-400">Weight: 20% | Latency: 1h</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-400">Lab Confirmations</span>
              <span className="px-2 py-0.5 bg-rose-500/20 text-rose-300 rounded text-[10px] font-extrabold">MISSING PENALTY</span>
            </div>
            <p className="text-2xl font-black text-slate-100">{Math.round(reliability.laboratory * 100)}% <span className="text-xs font-normal text-slate-400">Reliability</span></p>
            <p className="text-[11px] text-slate-400">Weight: 30% | Missing Impact: -20% Conf</p>
          </div>
        </div>
      </div>

      {/* Synthetic Dataset Table */}
      <div className="glass-panel p-5 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-3">
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Filter className="w-4 h-4 text-sky-400" /> Synthetic Surveillance Observations
          </h2>

          <div className="flex items-center gap-3 text-xs text-slate-300">
            <span className="text-slate-400">Area Filter:</span>
            <select
              value={selectedAreaFilter}
              onChange={(e) => setSelectedAreaFilter(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-slate-200 rounded px-2.5 py-1 text-xs focus:outline-none focus:border-sky-500 font-semibold"
            >
              <option value="ALL">All Areas (A, B, C)</option>
              <option value="Area A">Area A (Riverside District)</option>
              <option value="Area B">Area B (Westside Industrial)</option>
              <option value="Area C">Area C (Northside Suburbs)</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 border-collapse">
            <thead>
              <tr className="bg-slate-900/90 text-slate-400 border-b border-slate-800 text-[11px] uppercase tracking-wider font-semibold">
                <th className="p-3">Record ID</th>
                <th className="p-3">Date</th>
                <th className="p-3">Area</th>
                <th className="p-3 text-right">Clinic Cases</th>
                <th className="p-3 text-right">Pharmacy OTC</th>
                <th className="p-3 text-right">Citizen Complaints</th>
                <th className="p-3 text-right">Lab Confirmations</th>
                <th className="p-3">Freshness</th>
                <th className="p-3">Quality Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
              {filteredData.map((row) => (
                <tr key={row.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-3 font-bold text-sky-400">{row.id}</td>
                  <td className="p-3 text-slate-300">{row.date}</td>
                  <td className="p-3 font-semibold text-slate-100">{row.area}</td>
                  <td className="p-3 text-right font-extrabold text-sky-300">{row.clinicCases}</td>
                  <td className="p-3 text-right font-extrabold text-purple-300">{row.pharmacySales}</td>
                  <td className="p-3 text-right font-extrabold text-amber-300">{row.citizenComplaints}</td>
                  <td className="p-3 text-right font-extrabold text-emerald-300">{row.labConfirmations}</td>
                  <td className="p-3 text-slate-400 text-[10px]">
                    {row.clinicFreshness} | {row.pharmacyFreshness}
                  </td>
                  <td className="p-3 font-sans">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      row.qualityStatus === 'FRESH' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                      row.qualityStatus === 'STALE' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      row.qualityStatus === 'DUPLICATE' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                      'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    }`}>
                      {row.qualityStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <DataExportButtons />
    </div>
  );
};
