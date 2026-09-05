import React from 'react';
import { AlertTriangle, CheckCircle2, Clock, Database, RefreshCw, ShieldCheck } from 'lucide-react';
import { DataExportButtons } from '../components/DataExportButtons';
import { useApp } from '../context/AppContext';
import { analyzeDataQuality } from '../services/dataQuality';

export const DataQualityPage: React.FC = () => {
  const { reliability } = useApp();
  const summary = analyzeDataQuality();

  return (
    <div className="space-y-6">
      <div className="glass-panel p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-sky-500/10 text-sky-400 border border-sky-500/30 rounded-xl">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">
                Data Quality, Freshness & Integrity Audit
              </h2>
              <p className="text-xs text-slate-400">
                Real-time tracking of source reliability, transmission latency, missing data, and duplicate records
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Completeness Score: <strong className="text-emerald-400 font-extrabold">{summary.completenessPercentage}%</strong></span>
          </div>
        </div>

        {/* 4 Summary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-4">
          <div className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-800 text-center">
            <span className="block text-[10px] uppercase font-bold text-slate-400">Processed Records</span>
            <span className="text-2xl font-black text-slate-100">{summary.totalRecordsProcessed}</span>
          </div>
          <div className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-800 text-center">
            <span className="block text-[10px] uppercase font-bold text-slate-400">Missing / Unavailable</span>
            <span className="text-2xl font-black text-rose-400">{summary.missingRecordsCount}</span>
          </div>
          <div className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-800 text-center">
            <span className="block text-[10px] uppercase font-bold text-slate-400">Stale / Delayed</span>
            <span className="text-2xl font-black text-amber-400">{summary.staleRecordsCount}</span>
          </div>
          <div className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-800 text-center">
            <span className="block text-[10px] uppercase font-bold text-slate-400">Invalid / Duplicates</span>
            <span className="text-2xl font-black text-purple-400">{summary.invalidValueCount + summary.duplicateRecordsCount}</span>
          </div>
        </div>

        {/* Source Reliability Matrix */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 my-6">
          <h3 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-sky-400" /> Source Reliability Matrix & Freshness Tolerances
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                  <th className="py-2.5 px-3">Surveillance Source</th>
                  <th className="py-2.5 px-3 text-center">Reliability Score</th>
                  <th className="py-2.5 px-3 text-center">Reliability Status</th>
                  <th className="py-2.5 px-3 text-center">Freshness Status</th>
                  <th className="py-2.5 px-3 text-right">Confidence Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-3 font-semibold text-slate-100">Clinic Admissions Feed</td>
                  <td className="py-3 px-3 text-center font-bold text-sky-400">{Math.round(reliability.clinic * 100)}%</td>
                  <td className="py-3 px-3 text-center"><span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded text-[10px] font-bold">Reliable</span></td>
                  <td className="py-3 px-3 text-center"><span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded text-[10px] font-bold">FRESH (5m)</span></td>
                  <td className="py-3 px-3 text-right text-slate-300">0% Penalty</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-3 font-semibold text-slate-100">Pharmacy OTC Sales Feed</td>
                  <td className="py-3 px-3 text-center font-bold text-sky-400">{Math.round(reliability.pharmacy * 100)}%</td>
                  <td className="py-3 px-3 text-center"><span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded text-[10px] font-bold">Reliable</span></td>
                  <td className="py-3 px-3 text-center"><span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded text-[10px] font-bold">FRESH (15m)</span></td>
                  <td className="py-3 px-3 text-right text-slate-300">0% Penalty</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-3 font-semibold text-slate-100">Citizen Complaints Hotline</td>
                  <td className="py-3 px-3 text-center font-bold text-amber-400">{Math.round(reliability.citizen * 100)}%</td>
                  <td className="py-3 px-3 text-center"><span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 rounded text-[10px] font-bold">Moderate</span></td>
                  <td className="py-3 px-3 text-center"><span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded text-[10px] font-bold">FRESH (10m)</span></td>
                  <td className="py-3 px-3 text-right text-slate-300">0% Penalty</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-3 font-semibold text-slate-100">Laboratory LIMS System</td>
                  <td className="py-3 px-3 text-center font-bold text-emerald-400">{Math.round(reliability.laboratory * 100)}%</td>
                  <td className="py-3 px-3 text-center"><span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded text-[10px] font-bold">Highly Reliable</span></td>
                  <td className="py-3 px-3 text-center"><span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded text-[10px] font-bold">FRESH (30m)</span></td>
                  <td className="py-3 px-3 text-right text-slate-300">0% Penalty</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Data Quality Issues Audit Log */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
          <h3 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" /> Data Quality Anomalies & Automated Cleansing Log
          </h3>

          <div className="space-y-2.5 text-xs">
            {summary.qualityIssues.map((issue) => (
              <div key={issue.id} className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${issue.issueType === 'MISSING' ? 'bg-rose-500/20 text-rose-300' : issue.issueType === 'STALE' ? 'bg-amber-500/20 text-amber-300' : 'bg-purple-500/20 text-purple-300'}`}>
                      {issue.issueType}
                    </span>
                    <strong className="text-slate-200">{issue.areaName} ({issue.source})</strong>
                  </div>
                  <p className="text-slate-400 text-xs mt-1">{issue.description}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-sky-400 font-semibold block text-[11px]">{issue.actionTaken}</span>
                  <span className="text-slate-500 text-[10px]">{issue.timestamp.substring(0, 10)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <DataExportButtons />
    </div>
  );
};
