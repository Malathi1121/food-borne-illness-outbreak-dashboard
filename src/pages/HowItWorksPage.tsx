import React from 'react';
import { GitCommit, ArrowDown, ShieldAlert, Target, Users, Activity, FileText, CheckCircle2 } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-4">
          <div className="p-3 bg-sky-500/10 text-sky-400 border border-sky-500/30 rounded-xl">
            <GitCommit className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-100">How It Works — System Overview & Workflow</h1>
            <p className="text-xs text-slate-400">
              Problem Statement, Solution Architecture, Target User Roles & End-to-End Decision Pipeline
            </p>
          </div>
        </div>

        {/* Problem vs Solution Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900/90 border border-rose-500/30 p-4 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <ShieldAlert className="w-4 h-4" />
              <span>THE PROBLEM</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Food-borne illness signals arrive from clinics, pharmacies, citizen hotlines, and laboratories at different speeds, formats, and reliability levels. Manual surveillance is slow, taking up to <strong className="text-rose-400">60 minutes</strong> to connect signals across fragmented streams.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-emerald-500/30 p-4 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Target className="w-4 h-4" />
              <span>THE SOLUTION</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              An automated multi-source fusion engine collects raw signals, verifies data quality and freshness, applies reliability weighting, computes localized risk scores, generates alerts, and guides investigator action in under <strong className="text-emerald-400">5.2 minutes</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Visual Workflow Diagram */}
      <div className="glass-panel p-6 space-y-6">
        <h2 className="text-base font-bold text-slate-100 border-b border-slate-800 pb-2">
          End-to-End Surveillance & Decision Pipeline
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

          {/* Step 2: Data Quality Check */}
          <div className="w-full bg-slate-900/90 border border-slate-800 p-4 rounded-xl text-center space-y-1 shadow-lg">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              2. Data Quality & Freshness Check
            </span>
            <p className="text-xs font-bold text-slate-200">
              Sanitizes Negative Values • Deduplicates Records • Applies Freshness Penalties (Stale &gt;6h)
            </p>
            <p className="text-[11px] text-amber-400">
              Missing lab tests trigger confidence penalties (-20%) without assuming zero cases.
            </p>
          </div>

          <ArrowDown className="w-5 h-5 text-sky-400 animate-bounce my-1" />

          {/* Step 3: Signal Fusion & Risk Score */}
          <div className="w-full bg-slate-900/90 border border-slate-800 p-4 rounded-xl text-center space-y-1 shadow-lg">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              3. Multi-Source Signal Fusion & Reliability Scoring
            </span>
            <p className="text-xs font-bold text-slate-200">
              Calculates Area Risk Score (0-100) & Confidence Score (%) using weighted reliability products
            </p>
            <p className="text-[11px] text-sky-300 font-mono">
              Area A Outbreak Fusion: 84 / 100 Risk (27 Clinic + 16 Pharm + 12 Citizen + 29 Lab = 84)
            </p>
          </div>

          <ArrowDown className="w-5 h-5 text-sky-400 animate-bounce my-1" />

          {/* Step 4: Alert Classification */}
          <div className="w-full bg-slate-950 border border-slate-700 p-4 rounded-xl space-y-3">
            <div className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              4. Alert Classification Triage
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="bg-emerald-950/40 border border-emerald-500/40 p-2.5 rounded-lg text-center">
                <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500 text-slate-950 rounded">NORMAL</span>
                <p className="text-[10px] text-slate-400 mt-1">Score &lt; 35</p>
              </div>
              <div className="bg-sky-950/40 border border-sky-500/40 p-2.5 rounded-lg text-center">
                <span className="px-2 py-0.5 text-[10px] font-bold bg-sky-500 text-slate-950 rounded">WATCH</span>
                <p className="text-[10px] text-slate-400 mt-1">Score 35-50</p>
              </div>
              <div className="bg-amber-950/40 border border-amber-500/40 p-2.5 rounded-lg text-center">
                <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-500 text-slate-950 rounded">AMBIGUOUS</span>
                <p className="text-[10px] text-slate-400 mt-1">Divergent Signals</p>
              </div>
              <div className="bg-rose-950/40 border border-rose-500/40 p-2.5 rounded-lg text-center">
                <span className="px-2 py-0.5 text-[10px] font-bold bg-rose-600 text-white rounded">CRITICAL</span>
                <p className="text-[10px] text-slate-400 mt-1">Score &gt; 65</p>
              </div>
            </div>
          </div>

          <ArrowDown className="w-5 h-5 text-sky-400 animate-bounce my-1" />

          {/* Step 5: Investigator Action */}
          <div className="w-full bg-slate-900 border border-sky-500/30 p-4 rounded-xl text-center space-y-1 shadow-lg">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              5. Public Health Investigator Action & Escalation Log
            </span>
            <p className="text-xs font-bold text-slate-200">
              Drill-down evidence review $\rightarrow$ Assign investigation team $\rightarrow$ Mark Under Review / Escalate / Resolve
            </p>
          </div>
        </div>
      </div>

      {/* Target User Roles & Project Objectives */}
      <div className="glass-panel p-5 space-y-4">
        <div className="flex items-center gap-2 text-sky-400 font-bold border-b border-slate-800 pb-2">
          <Users className="w-5 h-5" />
          <h2 className="text-base text-slate-100">Target Users & Success Criteria</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 space-y-1">
            <span className="px-2 py-0.5 text-[10px] font-bold bg-sky-500/20 text-sky-300 rounded">Investigator</span>
            <h3 className="font-bold text-slate-200">Public Health Investigator</h3>
            <p className="text-slate-400 text-[11px]">Inspects drill-down evidence, checks baseline spikes, and initiates field investigations.</p>
          </div>
          <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 space-y-1">
            <span className="px-2 py-0.5 text-[10px] font-bold bg-purple-500/20 text-purple-300 rounded">Epidemiologist</span>
            <h3 className="font-bold text-slate-200">Epidemiologist</h3>
            <p className="text-slate-400 text-[11px]">Analyzes outbreak trajectories, signal weights, pathogen probabilities, and cluster trends.</p>
          </div>
          <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 space-y-1">
            <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 rounded">Surveillance</span>
            <h3 className="font-bold text-slate-200">Surveillance Officer</h3>
            <p className="text-slate-400 text-[11px]">Monitors data quality feeds, transmission freshness, missing data penalties, and stale records.</p>
          </div>
          <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 space-y-1">
            <span className="px-2 py-0.5 text-[10px] font-bold bg-rose-500/20 text-rose-300 rounded">Coordinator</span>
            <h3 className="font-bold text-slate-200">Response Coordinator</h3>
            <p className="text-slate-400 text-[11px]">Manages escalation pipelines, assigns outbreak teams, and logs emergency response actions.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
