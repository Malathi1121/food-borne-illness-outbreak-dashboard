import React from 'react';
import { AlertBanner } from '../components/AlertBanner';
import { AreaRiskTable } from '../components/AreaRiskTable';
import { DataExportButtons } from '../components/DataExportButtons';
import { RiskGauge } from '../components/RiskGauge';
import { SummaryCards } from '../components/SummaryCards';
import { TimeSeriesCharts } from '../components/TimeSeriesCharts';
import { WhyFlaggedPanel } from '../components/WhyFlaggedPanel';
import { useApp } from '../context/AppContext';

export const DashboardPage: React.FC = () => {
  const { activeRole } = useApp();

  return (
    <div className="space-y-6">
      <AlertBanner />

      {/* Role-based banner indicator */}
      <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-xs">
        <span className="text-slate-400">
          Viewing dashboard as: <strong className="text-sky-400 uppercase">{activeRole}</strong>
        </span>
        <span className="text-slate-500 text-[11px]">
          {activeRole === 'investigator' ? 'Showing detailed evidence, area breakdown, and escalation controls.' : activeRole === 'manager' ? 'Showing high-level outbreak risk, aggregated trends, and escalation overview.' : 'Showing source reliability, freshness timers, and scoring diagnostics.'}
        </span>
      </div>

      <RiskGauge />
      <SummaryCards />

      {/* Transparent evidence section for HIGH/CRITICAL signals */}
      <WhyFlaggedPanel />

      <TimeSeriesCharts />
      <AreaRiskTable />
      <DataExportButtons />
    </div>
  );
};
