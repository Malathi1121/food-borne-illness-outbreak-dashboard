import React from 'react';
import { AlertBanner } from '../components/AlertBanner';
import { AreaRiskTable } from '../components/AreaRiskTable';
import { DataExportButtons } from '../components/DataExportButtons';
import { RiskGauge } from '../components/RiskGauge';
import { SummaryCards } from '../components/SummaryCards';
import { TimeSeriesCharts } from '../components/TimeSeriesCharts';
import { WhyFlaggedPanel } from '../components/WhyFlaggedPanel';
import { useApp } from '../context/AppContext';
import { ShieldAlert, UserCheck, Activity, BarChart3, AlertOctagon } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { activeRole, fusionResult } = useApp();

  const getRoleTitle = (role: string) => {
    switch (role) {
      case 'chief_epidemiologist': return 'CHIEF EPIDEMIOLOGIST VIEW';
      case 'analyst': return 'DATA ANALYST VIEW';
      default: return 'TRIAGE INVESTIGATOR VIEW';
    }
  };

  const getRoleDescription = (role: string) => {
    switch (role) {
      case 'chief_epidemiologist':
        return 'Prioritizing overall surveillance system status, multi-area risk comparison, signal agreement trends, system-level reliability, and detection performance benchmarks.';
      case 'analyst':
        return 'Prioritizing dynamic reliability discounting, feed freshness timers, data quality audit metrics, signal weights, and multi-format exports.';
      default:
        return 'Prioritizing immediate cluster alerts, affected area evidence breakdown, transparent "Why flagged" evidence, and direct escalation controls.';
    }
  };

  return (
    <div className="space-y-6">
      <AlertBanner />

      {/* Role-based banner indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs shadow-sm">
        <div className="flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-sky-400 shrink-0" />
          <span className="text-slate-400">
            Active Role Perspective: <strong className="text-sky-300 font-extrabold uppercase">{getRoleTitle(activeRole)}</strong>
          </span>
        </div>
        <span className="text-slate-400 text-[11px] max-w-2xl">
          {getRoleDescription(activeRole)}
        </span>
      </div>

      {/* Role-Specific Content Ordering */}
      {activeRole === 'chief_epidemiologist' ? (
        <>
          {/* Chief Epidemiologist Priority Layout */}
          <RiskGauge />

          {/* System Overview Cards */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Activity className="w-4 h-4 text-sky-400" /> System-Level Outbreak Signal & Multi-Source Agreement
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Surveillance Scope</span>
                <strong className="text-slate-100 text-sm">4 Municipal Sectors</strong>
                <span className="block text-[11px] text-slate-400 mt-0.5">Population: 773,000 residents</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Signal Convergence</span>
                <strong className="text-rose-400 text-sm">Cluster Detected in Area A</strong>
                <span className="block text-[11px] text-slate-400 mt-0.5">High multi-source concurrence</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Detection Lag</span>
                <strong className="text-emerald-400 text-sm">5.2 min (11.5x speedup)</strong>
                <span className="block text-[11px] text-slate-400 mt-0.5">vs 60 min reference baseline</span>
              </div>
            </div>
          </div>

          <AreaRiskTable />
          <SummaryCards />
          <TimeSeriesCharts />
          <WhyFlaggedPanel />
          <DataExportButtons />
        </>
      ) : activeRole === 'analyst' ? (
        <>
          {/* Data Analyst Priority Layout */}
          <SummaryCards />

          {/* Dynamic Reliability Diagnostics Box */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-purple-400" /> Dynamic Reliability & Source Quality Diagnostics
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              {fusionResult.systemReliabilityDetails.map(rd => (
                <div key={rd.source} className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <div className="flex justify-between font-semibold text-slate-200 mb-1">
                    <span>{rd.sourceName}</span>
                    <span className="text-sky-400">{rd.dynamicReliabilityPct}%</span>
                  </div>
                  <div className="text-[10px] text-slate-400 space-y-0.5">
                    <div>Base: <strong>{rd.baseReliabilityPct}%</strong> | Weight: <strong>{rd.fusionWeightPct}%</strong></div>
                    <div>Freshness: <strong className={rd.freshnessStatus === 'FRESH' ? 'text-emerald-400' : 'text-amber-400'}>{rd.freshnessStatus}</strong></div>
                    <div className="text-[10px] text-slate-400 pt-1 italic">{rd.adjustmentReason}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <RiskGauge />
          <WhyFlaggedPanel />
          <AreaRiskTable />
          <TimeSeriesCharts />
          <DataExportButtons />
        </>
      ) : (
        <>
          {/* Triage Investigator Priority Layout (Default) */}
          <RiskGauge />
          <WhyFlaggedPanel />
          <SummaryCards />
          <AreaRiskTable />
          <TimeSeriesCharts />
          <DataExportButtons />
        </>
      )}
    </div>
  );
};
