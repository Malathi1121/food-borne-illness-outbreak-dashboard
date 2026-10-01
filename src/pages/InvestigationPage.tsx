import React from 'react';
import { AlertOctagon, FileSearch, ShieldAlert } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AreaFusionResult } from '../types';

export const InvestigationPage: React.FC = () => {
  const { selectedAreaId, setSelectedAreaId, fusionResult, handleEscalationChange } = useApp();

  const activeArea = fusionResult.areaResults.find(a => a.areaId === selectedAreaId) || fusionResult.areaResults[0];

  return (
    <div className="space-y-6">
      <div className="glass-panel p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-sky-500/10 text-sky-400 border border-sky-500/30 rounded-xl">
              <FileSearch className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">
                Epidemiological Evidence Investigation Center
              </h2>
              <p className="text-xs text-slate-400">
                Detailed signal audit for public health investigators & field teams
              </p>
            </div>
          </div>

          {/* Area Selector dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-300">Select Area:</span>
            <select
              value={activeArea.areaId}
              onChange={(e) => setSelectedAreaId(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-xs font-bold text-white rounded-lg px-3 py-1.5 focus:outline-none focus:border-sky-500 cursor-pointer"
            >
              {fusionResult.areaResults.map(a => (
                <option key={a.areaId} value={a.areaId}>
                  {a.areaName} ({a.riskLevel})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Full Detailed Area Evidence Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-slate-100">{activeArea.areaName}</h3>
                <span className={`px-2.5 py-0.5 text-xs font-bold uppercase rounded ${activeArea.riskLevel === 'CRITICAL' ? 'bg-rose-600 text-white' : activeArea.riskLevel === 'HIGH' ? 'bg-orange-500 text-white' : 'bg-amber-500 text-slate-900'}`}>
                  {activeArea.riskLevel} ALERT
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Primary Signal Driver: <strong className="text-sky-300">{activeArea.primaryDriver}</strong>
              </p>
            </div>

            <div className="flex items-center gap-4 bg-slate-950 px-4 py-2 rounded-lg border border-slate-800">
              <div>
                <span className="block text-[10px] uppercase font-bold text-slate-400">Risk Score</span>
                <span className="text-2xl font-black text-rose-400">{activeArea.riskScore} / 100</span>
              </div>
              <div className="w-px h-8 bg-slate-800"></div>
              <div>
                <span className="block text-[10px] uppercase font-bold text-slate-400">Confidence</span>
                <span className="text-2xl font-black text-sky-400">{activeArea.confidenceScore}%</span>
              </div>
            </div>
          </div>

          {/* 4 Signals Itemized Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Clinic */}
            <div className="bg-slate-800/60 p-4 rounded-lg border border-slate-700/60 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-300 block mb-1">Clinic Admissions</span>
                <div className="text-2xl font-bold text-slate-100">
                  {activeArea.clinicCases.current} <span className="text-xs text-slate-400 font-normal">cases</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Baseline: <strong className="text-slate-200">{activeArea.clinicCases.baseline}</strong>
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-700/50 flex justify-between items-center text-xs">
                <span className="text-slate-400">Spike Ratio:</span>
                <strong className="text-rose-400">+{activeArea.clinicCases.increase}%</strong>
              </div>
            </div>

            {/* Pharmacy */}
            <div className="bg-slate-800/60 p-4 rounded-lg border border-slate-700/60 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-300 block mb-1">Pharmacy OTC Sales</span>
                <div className="text-2xl font-bold text-slate-100">
                  {activeArea.pharmacySales.current} <span className="text-xs text-slate-400 font-normal font-sans">units</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Baseline: <strong className="text-slate-200">{activeArea.pharmacySales.baseline}</strong>
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-700/50 flex justify-between items-center text-xs">
                <span className="text-slate-400">Spike Ratio:</span>
                <strong className="text-rose-400">+{activeArea.pharmacySales.increase}%</strong>
              </div>
            </div>

            {/* Citizen */}
            <div className="bg-slate-800/60 p-4 rounded-lg border border-slate-700/60 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-300 block mb-1">Citizen Reports</span>
                <div className="text-2xl font-bold text-slate-100">
                  {activeArea.citizenReports.current} <span className="text-xs text-slate-400 font-normal font-sans">reports</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Baseline: <strong className="text-slate-200">{activeArea.citizenReports.baseline}</strong>
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-700/50 flex justify-between items-center text-xs">
                <span className="text-slate-400">Spike Ratio:</span>
                <strong className="text-rose-400">+{activeArea.citizenReports.increase}%</strong>
              </div>
            </div>

            {/* Lab */}
            <div className="bg-slate-800/60 p-4 rounded-lg border border-slate-700/60 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-300 block mb-1">Lab Pathogen Confirmations</span>
                <div className="text-2xl font-bold text-rose-400">
                  {activeArea.labConfirmations.freshness === 'MISSING' ? 'Unavailable' : `${activeArea.labConfirmations.current} Confirmed`}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Culture Result: <strong className="text-slate-200">{activeArea.labConfirmations.current > 0 ? 'Salmonella & E. coli' : 'Pending'}</strong>
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-700/50 flex justify-between items-center text-xs">
                <span className="text-slate-400">Reliability:</span>
                <strong className="text-emerald-400">98% (Lab LIMS)</strong>
              </div>
            </div>
          </div>

          {/* Action Trigger Box */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-slate-400 block uppercase">Recommended Protocol</span>
              <p className="text-sm font-bold text-white mt-0.5">{activeArea.recommendedAction}</p>
            </div>

            <button
              onClick={() => handleEscalationChange('esc_area_a_01', 'ESCALATED')}
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg font-bold text-xs shadow-lg transition flex items-center gap-2 shrink-0"
            >
              <ShieldAlert className="w-4 h-4" /> Trigger Immediate Escalation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
