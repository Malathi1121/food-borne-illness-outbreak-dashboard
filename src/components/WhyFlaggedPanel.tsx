import React from 'react';
import { AlertCircle, AlertOctagon, CheckCircle2, ChevronRight, HelpCircle, ShieldAlert, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const WhyFlaggedPanel: React.FC = () => {
  const { fusionResult } = useApp();

  // Display whenever Risk Level is HIGH, CRITICAL, or AMBIGUOUS
  if (
    fusionResult.riskLevel !== 'HIGH' &&
    fusionResult.riskLevel !== 'CRITICAL' &&
    fusionResult.riskLevel !== 'AMBIGUOUS'
  ) {
    return null;
  }

  const evidence = fusionResult.whyFlaggedEvidence;
  if (!evidence) return null;

  return (
    <div className="glass-panel p-6 border border-rose-500/40 bg-gradient-to-br from-slate-900 via-rose-950/20 to-slate-900 shadow-2xl relative overflow-hidden my-6">
      {/* Top Banner Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-rose-500/20 text-rose-400 border border-rose-500/40 rounded-xl">
            <AlertOctagon className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-white tracking-tight">
                Why was this flagged?
              </h2>
              <span className="px-2.5 py-0.5 text-xs font-bold uppercase rounded bg-rose-600 text-white shadow-sm">
                {evidence.riskLevel} ALERT
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Transparent Automated Signal Fusion Audit — Affected Area: <strong className="text-sky-300">{evidence.areaName}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-2">
          <div>
            <span className="block text-[10px] uppercase font-bold text-slate-400">Outbreak Risk Score</span>
            <span className="text-2xl font-black text-rose-400">{evidence.riskScore}<span className="text-sm font-normal text-slate-400">/100</span></span>
          </div>
          <div className="w-px h-8 bg-slate-800"></div>
          <div>
            <span className="block text-[10px] uppercase font-bold text-slate-400">Confidence Factor</span>
            <span className="text-2xl font-black text-sky-400">{evidence.confidenceScore}%</span>
          </div>
        </div>
      </div>

      {/* Itemized Source Contribution Breakdown */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {evidence.contributions.map((c, idx) => (
          <div key={idx} className="bg-slate-900/80 border border-slate-800 rounded-lg p-3.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1">
                <span>{c.sourceName}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${c.freshness === 'FRESH' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                  {c.freshness}
                </span>
              </div>

              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-xl font-bold text-slate-100">
                  {c.currentValue}
                  <span className="text-xs text-slate-400 font-normal ml-1">
                    (base: {c.baselineValue})
                  </span>
                </span>
                {c.baselineValue > 0 && c.percentageIncrease > 0 && (
                  <span className="text-xs font-extrabold text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/20">
                    +{c.percentageIncrease}%
                  </span>
                )}
                {c.baselineValue === 0 && c.currentValue > 0 && (
                  <span className="text-xs font-extrabold text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/20">
                    New signal
                  </span>
                )}
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-800 text-[11px] space-y-1 text-slate-400">
              <div className="flex justify-between">
                <span>Weight: <strong className="text-slate-300">{c.weight}%</strong></span>
                <span>Reliability: <strong className="text-sky-400">{c.reliability}%</strong></span>
              </div>
              <div className="flex justify-between font-mono text-[10px] text-slate-300 pt-1">
                <span>Risk Contribution:</span>
                <span className="text-amber-400 font-bold">+{c.pointsContributed} pts</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Warnings & Recommended Action Box */}
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
        {/* Warnings */}
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-lg p-3.5 text-xs text-amber-200">
          <div className="flex items-center gap-2 font-bold text-amber-300 mb-2">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Data Freshness & Uncertainty Warnings ({evidence.warnings.length})</span>
          </div>
          {evidence.warnings.length > 0 ? (
            <ul className="list-disc list-inside space-y-1 text-amber-200/90 text-[11px]">
              {evidence.warnings.map((w, idx) => (
                <li key={idx}>{w}</li>
              ))}
            </ul>
          ) : (
            <p className="text-[11px] text-emerald-400">No missing or stale signal warnings. High concurrence.</p>
          )}
        </div>

        {/* Recommended Action */}
        <div className="bg-sky-950/20 border border-sky-500/30 rounded-lg p-3.5 text-xs text-sky-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 font-bold text-sky-300 mb-1">
              <ShieldAlert className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Recommended Escalation Protocol</span>
            </div>
            <p className="text-sm font-bold text-white mt-1">
              {evidence.recommendedAction}
            </p>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Automated recommendation based on public-health outbreak triage matrix.
          </p>
        </div>
      </div>
    </div>
  );
};
