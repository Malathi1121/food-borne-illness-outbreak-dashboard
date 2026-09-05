import React from 'react';
import { Activity, AlertTriangle, ShieldCheck, UserCheck, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DEMO_SCENARIOS } from '../data/demoScenarios';
import { DemoScenarioId, Role } from '../types';

export const Navbar: React.FC = () => {
  const {
    activeScenarioId,
    setActiveScenarioId,
    activeRole,
    setActiveRole,
    fusionResult
  } = useApp();

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 px-4 py-3 shadow-md">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Title and Synthetic Data Badge */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-sky-500/10 border border-sky-500/30 rounded-xl text-sky-400">
            <Activity className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-100 tracking-tight">
                Food-Borne Illness Outbreak Signal Dashboard
              </h1>
              <span className="px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded-md">
                SYNTHETIC / DEMONSTRATION DATA
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-2">
              <span>Multi-Source Signal Fusion System</span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" /> Data Freshness: Optimal
              </span>
            </p>
          </div>
        </div>

        {/* Controls: Demo Scenario Switcher & Role Switcher */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Demo Scenario Selector */}
          <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-1.5">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-medium text-slate-300">Demo Scenario:</span>
            <select
              value={activeScenarioId}
              onChange={(e) => setActiveScenarioId(e.target.value as DemoScenarioId)}
              className="bg-slate-900 text-slate-100 text-xs font-medium rounded border border-slate-700 px-2 py-1 focus:outline-none focus:border-sky-500 cursor-pointer"
            >
              {DEMO_SCENARIOS.map(sc => (
                <option key={sc.id} value={sc.id}>
                  {sc.name}
                </option>
              ))}
            </select>
          </div>

          {/* Role Switcher */}
          <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-1.5">
            <UserCheck className="w-4 h-4 text-sky-400" />
            <span className="text-xs font-medium text-slate-300">Role View:</span>
            <select
              value={activeRole}
              onChange={(e) => setActiveRole(e.target.value as Role)}
              className="bg-slate-900 text-slate-100 text-xs font-medium rounded border border-slate-700 px-2 py-1 focus:outline-none focus:border-sky-500 cursor-pointer capitalize"
            >
              <option value="investigator">Public Health Investigator</option>
              <option value="manager">Public Health Manager</option>
              <option value="analyst">Data Analyst</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
