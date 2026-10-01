import React from 'react';
import { GitCommit, ArrowDown, ShieldCheck, CheckCircle2, AlertOctagon, FileSearch, UserCheck, Activity } from 'lucide-react';

export const UserWorkflowPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-4">
          <div className="p-3 bg-sky-500/10 text-sky-400 border border-sky-500/30 rounded-xl">
            <GitCommit className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-100">User & Workflow Map</h1>
            <p className="text-xs text-slate-400">
              End-to-End Surveillance Data Pipeline & Public Health Investigation Workflow
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-300">
          This architectural diagram illustrates how raw surveillance feeds from multiple independent channels are ingested, validated for quality and freshness, fused using mathematical reliability weighting, and converted into actionable outbreak investigation evidence.
        </p>
      </div>

      {/* Visual Workflow Diagram */}
      <div className="glass-panel p-6 space-y-6">
        <h2 className="text-base font-bold text-slate-100 border-b border-slate-800 pb-2">
          Surveillance Pipeline & Action Decision Tree
        </h2>

        <div className="flex flex-col items-center space-y-3 max-w-4xl mx-auto py-2">
          {/* Step 1: Input Sources */}
          <div className="w-full">
            <div className="text-center text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              1. Multi-Source Raw Data Ingestion
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-900 border border-sky-500/30 p-3 rounded-lg text-center">
                <p className="text-xs font-bold text-sky-400">Clinic Admissions</p>
                <p className="text-[10px] text-slate-400 mt-0.5">30% Weight • 90% Rel</p>
              </div>
              <div className="bg-slate-900 border border-purple-500/30 p-3 rounded-lg text-center">
                <p className="text-xs font-bold text-purple-400">Pharmacy OTC Sales</p>
                <p className="text-[10px] text-slate-400 mt-0.5">20% Weight • 80% Rel</p>
              </div>
              <div className="bg-slate-900 border border-amber-500/30 p-3 rounded-lg text-center">
                <p className="text-xs font-bold text-amber-400">Citizen Reports</p>
                <p className="text-[10px] text-slate-400 mt-0.5">20% Weight • 60% Rel</p>
              </div>
              <div className="bg-slate-900 border border-emerald-500/30 p-3 rounded-lg text-center">
                <p className="text-xs font-bold text-emerald-400">Lab Confirmations</p>
                <p className="text-[10px] text-slate-400 mt-0.5">30% Weight • 98% Rel</p>
              </div>
            </div>
          </div>

          <ArrowDown className="w-5 h-5 text-sky-400 animate-bounce my-1" />

          {/* Step 2: Quality & Freshness Check */}
          <div className="w-full bg-slate-900/90 border border-slate-800 p-4 rounded-xl text-center space-y-1 shadow-lg">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              2. Data Quality & Freshness Assessment
            </span>
            <p className="text-xs font-bold text-slate-200">
              Sanitizes Negative Values • Detects Duplicates • Evaluates Stale (&gt;6h) & Missing Feeds
            </p>
            <p className="text-[11px] text-amber-400">
              Applies confidence penalties for missing/stale sources (Missing ≠ Zero)
            </p>
          </div>

          <ArrowDown className="w-5 h-5 text-sky-400 animate-bounce my-1" />

          {/* Step 3: Fusion & Risk Scoring */}
          <div className="w-full bg-slate-900/90 border border-slate-800 p-4 rounded-xl text-center space-y-1 shadow-lg">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              3. Multi-Source Fusion & Reliability Scoring
            </span>
            <p className="text-xs font-bold text-slate-200">
              Calculates Risk Score (0-100) & Confidence Score (%) using weighted reliability product
            </p>
            <p className="text-[11px] text-sky-300 font-mono">
              Area A Outbreak Fusion Score: 84 / 100 (Confidence: 84%)
            </p>
          </div>

          <ArrowDown className="w-5 h-5 text-sky-400 animate-bounce my-1" />

          {/* Step 4: Cluster & Anomaly Detection */}
          <div className="w-full bg-slate-900/90 border border-slate-800 p-4 rounded-xl text-center space-y-1 shadow-lg">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              4. Cluster & Anomaly Detection
            </span>
            <p className="text-xs font-bold text-slate-200">
              Compares current counts against 7-day rolling baselines per localized area
            </p>
          </div>

          <ArrowDown className="w-5 h-5 text-sky-400 animate-bounce my-1" />

          {/* Step 5: Alert Classification Decision Box */}
          <div className="w-full bg-slate-950 border border-slate-700 p-4 rounded-xl space-y-3">
            <div className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              5. Alert Classification & Triage
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-emerald-950/40 border border-emerald-500/40 p-3 rounded-lg text-center space-y-1">
                <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500 text-slate-950 rounded">NORMAL</span>
                <p className="text-[11px] text-emerald-300 font-semibold">Routine Monitoring</p>
                <p className="text-[10px] text-slate-400">Score &lt; 35 • No action needed</p>
              </div>
              <div className="bg-amber-950/40 border border-amber-500/40 p-3 rounded-lg text-center space-y-1">
                <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-500 text-slate-950 rounded">AMBIGUOUS</span>
                <p className="text-[11px] text-amber-300 font-semibold">Manual Review Required</p>
                <p className="text-[10px] text-slate-400">Score 35-65 or signal divergence</p>
              </div>
              <div className="bg-rose-950/40 border border-rose-500/40 p-3 rounded-lg text-center space-y-1">
                <span className="px-2 py-0.5 text-[10px] font-bold bg-rose-600 text-white rounded">CRITICAL</span>
                <p className="text-[11px] text-rose-300 font-semibold">Immediate Investigation</p>
                <p className="text-[10px] text-slate-400">Score &gt; 65 • Escalate to team</p>
              </div>
            </div>
          </div>

          <ArrowDown className="w-5 h-5 text-sky-400 animate-bounce my-1" />

          {/* Step 6: Public Health Investigation & Action */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg text-center space-y-1">
              <UserCheck className="w-5 h-5 text-sky-400 mx-auto" />
              <p className="text-xs font-bold text-slate-200">Public Health Investigator</p>
              <p className="text-[10px] text-slate-400">Assigned role opens investigation case</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg text-center space-y-1">
              <FileSearch className="w-5 h-5 text-purple-400 mx-auto" />
              <p className="text-xs font-bold text-slate-200">Drill-Down Evidence</p>
              <p className="text-[10px] text-slate-400">Inspects baseline vs current breakdown</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg text-center space-y-1">
              <ShieldCheck className="w-5 h-5 text-emerald-400 mx-auto" />
              <p className="text-xs font-bold text-slate-200">Response Action</p>
              <p className="text-[10px] text-slate-400">Logs escalation audit trail & resolution</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
