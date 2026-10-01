import React from 'react';
import { ShieldAlert, Users, Target, Activity, FileText, AlertTriangle } from 'lucide-react';

export const ProjectOverviewPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-4">
          <div className="p-3 bg-sky-500/10 text-sky-400 border border-sky-500/30 rounded-xl">
            <FileText className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-100">Project Overview & Problem Analysis</h1>
            <p className="text-xs text-slate-400">
              Field-Ready Prototype for Public Health Teams Investigating Food-Borne Illness Complaints
            </p>
          </div>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 text-xs text-amber-300 flex items-start gap-2 mb-4">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>
            <strong>SYNTHETIC / DEMONSTRATION DATA:</strong> This system uses synthetic data for public health workflow research. Not for real-world medical decision-making.
          </span>
        </div>
      </div>

      {/* Problem & Goal Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* The Problem */}
        <div className="glass-panel p-5 space-y-4">
          <div className="flex items-center gap-2 text-rose-400 font-bold border-b border-slate-800 pb-2">
            <ShieldAlert className="w-5 h-5" />
            <h2 className="text-base text-slate-100">The Problem</h2>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Public health teams face major bottlenecks during food-borne illness surveillance. Signals arrive from clinics, pharmacies, citizen complaints, and laboratories at drastically different speeds, formats, and reliability levels:
          </p>
          <ul className="space-y-2 text-xs text-slate-400 list-disc list-inside">
            <li><strong className="text-slate-200">Fragmented Data Streams:</strong> Signals are isolated across clinic systems, retail logs, and hotline reports.</li>
            <li><strong className="text-slate-200">Variable Speed & Latency:</strong> Lab confirmations take days, while pharmacy sales and citizen reports arrive rapidly.</li>
            <li><strong className="text-slate-200">Data Quality Issues:</strong> Missing lab confirmations, stale pharmacy feeds, duplicate complaints, and noise.</li>
            <li><strong className="text-slate-200">Slow Detection:</strong> Traditional manual surveillance takes up to <span className="text-rose-400 font-semibold">60 minutes</span> to correlate signals.</li>
          </ul>
        </div>

        {/* System Goal */}
        <div className="glass-panel p-5 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-bold border-b border-slate-800 pb-2">
            <Target className="w-5 h-5" />
            <h2 className="text-base text-slate-100">System Goal</h2>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Provide automated, multi-source outbreak signal fusion to detect localized abnormal clusters rapidly while explicitly accounting for source reliability, data freshness, and signal uncertainty:
          </p>
          <ul className="space-y-2 text-xs text-slate-400 list-disc list-inside">
            <li><strong className="text-slate-200">Multi-Source Fusion:</strong> Dynamically combine clinic, pharmacy, citizen, and lab signals.</li>
            <li><strong className="text-slate-200">Reliability Weighting:</strong> Apply mathematical weights and reliability factors to prevent false alarms.</li>
            <li><strong className="text-slate-200">Uncertainty Communication:</strong> Explicitly flag missing data without treating missing cases as zero.</li>
            <li><strong className="text-slate-200">Rapid Response:</strong> Reduce detection time from 60 minutes to <span className="text-emerald-400 font-bold">&lt; 10 minutes</span> (Measured: <span className="text-emerald-400 font-bold">5.2 min</span>).</li>
          </ul>
        </div>
      </div>

      {/* Target User Roles */}
      <div className="glass-panel p-5 space-y-4">
        <div className="flex items-center gap-2 text-sky-400 font-bold border-b border-slate-800 pb-2">
          <Users className="w-5 h-5" />
          <h2 className="text-base text-slate-100">Target Public Health Roles & Workflows</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 space-y-2">
            <span className="px-2 py-0.5 text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30 rounded">Investigator</span>
            <h3 className="text-xs font-bold text-slate-200">Public Health Investigator</h3>
            <p className="text-[11px] text-slate-400 leading-tight">Reviews drill-down evidence, cross-validates cluster signals, and coordinates initial field checks.</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 space-y-2">
            <span className="px-2 py-0.5 text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded">Epidemiologist</span>
            <h3 className="text-xs font-bold text-slate-200">Epidemiologist</h3>
            <p className="text-[11px] text-slate-400 leading-tight">Analyzes outbreak trajectories, baselines, signal weights, and pathogen confirmation models.</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 space-y-2">
            <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded">Surveillance</span>
            <h3 className="text-xs font-bold text-slate-200">Surveillance Officer</h3>
            <p className="text-[11px] text-slate-400 leading-tight">Monitors data quality feeds, freshness status, stale thresholds, and missing laboratory test results.</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 space-y-2">
            <span className="px-2 py-0.5 text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded">Coordinator</span>
            <h3 className="text-xs font-bold text-slate-200">Response Coordinator</h3>
            <p className="text-[11px] text-slate-400 leading-tight">Manages case escalations, assigns outbreak investigation teams, and oversees emergency response.</p>
          </div>
        </div>
      </div>

      {/* Measurable Success Metrics */}
      <div className="glass-panel p-5 space-y-4">
        <div className="flex items-center gap-2 text-purple-400 font-bold border-b border-slate-800 pb-2">
          <Activity className="w-5 h-5" />
          <h2 className="text-base text-slate-100">Key Success Metrics</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3 text-center">
            <p className="text-[10px] text-slate-400 font-semibold uppercase">Detection Time</p>
            <p className="text-lg font-extrabold text-emerald-400 mt-1">5.2 min</p>
            <span className="text-[9px] text-slate-500">Goal: &lt; 10 min</span>
          </div>
          <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3 text-center">
            <p className="text-[10px] text-slate-400 font-semibold uppercase">Speedup Factor</p>
            <p className="text-lg font-extrabold text-sky-400 mt-1">11.5x</p>
            <span className="text-[9px] text-slate-500">vs 60 min baseline</span>
          </div>
          <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3 text-center">
            <p className="text-[10px] text-slate-400 font-semibold uppercase">False Positive Rate</p>
            <p className="text-lg font-extrabold text-emerald-400 mt-1">0%</p>
            <span className="text-[9px] text-slate-500">During baseline</span>
          </div>
          <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3 text-center">
            <p className="text-[10px] text-slate-400 font-semibold uppercase">False Negative Rate</p>
            <p className="text-lg font-extrabold text-emerald-400 mt-1">0%</p>
            <span className="text-[9px] text-slate-500">Post-breach</span>
          </div>
          <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3 text-center">
            <p className="text-[10px] text-slate-400 font-semibold uppercase">Confidence Score</p>
            <p className="text-lg font-extrabold text-purple-400 mt-1">84%</p>
            <span className="text-[9px] text-slate-500">Reliability weighted</span>
          </div>
          <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3 text-center">
            <p className="text-[10px] text-slate-400 font-semibold uppercase">Escalation Accuracy</p>
            <p className="text-lg font-extrabold text-amber-400 mt-1">100%</p>
            <span className="text-[9px] text-slate-500">Audited pipeline</span>
          </div>
        </div>
      </div>
    </div>
  );
};
