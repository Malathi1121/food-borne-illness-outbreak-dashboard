import React from 'react';
import { AlertTriangle, CheckCircle2, Clock, Database, RefreshCw, ShieldCheck, Sliders, Info } from 'lucide-react';
import { DataExportButtons } from '../components/DataExportButtons';
import { useApp } from '../context/AppContext';
import { analyzeDataQuality } from '../services/dataQuality';

export const DataQualityPage: React.FC = () => {
  const { fusionResult } = useApp();
  const summary = analyzeDataQuality();
  const reliabilityDetails = fusionResult.systemReliabilityDetails || [];

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

        {/* HOW DYNAMIC RELIABILITY WORKS TABLE */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 my-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-sky-400" /> How Dynamic Reliability Works
            </h3>
            <span className="text-[11px] text-slate-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800 font-mono">
              Formula: DynamicRel = BaseRel × Freshness × Completeness × Quality × Consistency
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                  <th className="py-2.5 px-3">Source</th>
                  <th className="py-2.5 px-3 text-center">Base Reliability</th>
                  <th className="py-2.5 px-3 text-center">Freshness</th>
                  <th className="py-2.5 px-3 text-center">Completeness</th>
                  <th className="py-2.5 px-3 text-center">Quality</th>
                  <th className="py-2.5 px-3 text-center">Dynamic Reliability</th>
                  <th className="py-2.5 px-3 text-center">Fusion Weight</th>
                  <th className="py-2.5 px-3 text-left">Adjustment Rationale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {reliabilityDetails.map(rd => (
                  <tr key={rd.source} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-3 font-semibold text-slate-100">{rd.sourceName}</td>
                    <td className="py-3 px-3 text-center font-bold text-slate-300">{rd.baseReliabilityPct}%</td>
                    <td className="py-3 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${rd.freshnessStatus === 'FRESH' ? 'bg-emerald-500/20 text-emerald-300' : rd.freshnessStatus === 'STALE' ? 'bg-orange-500/20 text-orange-300' : rd.freshnessStatus === 'AGING' ? 'bg-amber-500/20 text-amber-300' : 'bg-rose-500/20 text-rose-300'}`}>
                        {rd.freshnessStatus}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-slate-300">{Math.round(rd.completenessFactor * 100)}%</td>
                    <td className="py-3 px-3 text-center font-bold text-slate-300">{rd.qualityFactor === 1.0 ? 'Good (100%)' : 'Deducted (75%)'}</td>
                    <td className="py-3 px-3 text-center font-extrabold text-sky-400">{rd.dynamicReliabilityPct}%</td>
                    <td className="py-3 px-3 text-center font-bold text-purple-400">{rd.fusionWeightPct}%</td>
                    <td className="py-3 px-3 text-left text-[11px] text-slate-300 italic">{rd.adjustmentReason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* WHY DID RELIABILITY CHANGE EXPLANATION CALLOUTS */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 my-6 space-y-3">
          <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-400" /> Why did source reliability change?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {reliabilityDetails.map(rd => (
              <div key={`exp_${rd.source}`} className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between font-bold text-slate-200 mb-1">
                    <span>{rd.sourceName}</span>
                    <span className="text-sky-400">{rd.baseReliabilityPct}% → {rd.dynamicReliabilityPct}%</span>
                  </div>
                  <p className="text-slate-300 text-xs mt-1">{rd.adjustmentReason}</p>
                </div>
                <span className="text-[10px] text-slate-500 mt-2 block pt-1 border-t border-slate-900">
                  Reliability Factor: {rd.dynamicReliabilityPct}% | Effective Weight: {rd.fusionWeightPct}%
                </span>
              </div>
            ))}
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
