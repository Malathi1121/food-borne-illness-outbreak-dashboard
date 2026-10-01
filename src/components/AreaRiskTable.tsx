import React from 'react';
import { AlertCircle, ChevronRight, Eye, ShieldAlert } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AreaFusionResult } from '../types';

export const AreaRiskTable: React.FC = () => {
  const { fusionResult, setSelectedAreaId, setIsInvestigationModalOpen } = useApp();

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'CRITICAL': return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'HIGH': return 'bg-orange-500/20 text-orange-300 border-orange-500/40';
      case 'WATCH': return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'AMBIGUOUS': return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      default: return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    }
  };

  const handleDrillDown = (areaId: string) => {
    setSelectedAreaId(areaId);
    setIsInvestigationModalOpen(true);
  };

  return (
    <div className="glass-panel p-5 my-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            Localized Sector Risk Breakdown & Cluster Signals
          </h3>
          <p className="text-xs text-slate-400">
            Real-time surveillance matrix across all monitored municipal health zones
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
              <th className="py-3 px-3">Area Name</th>
              <th className="py-3 px-3 text-center">Risk Level</th>
              <th className="py-3 px-3 text-right">Risk Score</th>
              <th className="py-3 px-3 text-right">Clinic Cases (Base)</th>
              <th className="py-3 px-3 text-right">Pharmacy Sales</th>
              <th className="py-3 px-3 text-right">Citizen Reports</th>
              <th className="py-3 px-3 text-center">Lab Positive</th>
              <th className="py-3 px-3 text-right">Confidence</th>
              <th className="py-3 px-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {fusionResult.areaResults.map((area: AreaFusionResult) => (
              <tr key={area.areaId} className="hover:bg-slate-800/40 transition">
                <td className="py-3.5 px-3 font-semibold text-slate-100">
                  {area.areaName}
                </td>
                <td className="py-3.5 px-3 text-center">
                  <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold uppercase border ${getRiskBadge(area.riskLevel)}`}>
                    {area.riskLevel}
                  </span>
                </td>
                <td className="py-3.5 px-3 text-right font-extrabold text-slate-100">
                  {area.riskScore} <span className="text-slate-500 font-normal">/100</span>
                </td>
                <td className="py-3.5 px-3 text-right">
                  <span className="font-bold text-slate-200">{area.clinicCases.current}</span>
                  <span className="text-slate-400 ml-1 text-[11px]">({area.clinicCases.baseline})</span>
                  {area.clinicCases.increase > 0 && (
                    <span className="block text-[10px] text-rose-400 font-bold">+{area.clinicCases.increase}%</span>
                  )}
                </td>
                <td className="py-3.5 px-3 text-right">
                  <span className="font-bold text-slate-200">{area.pharmacySales.current}</span>
                  <span className="text-slate-400 ml-1 text-[11px]">({area.pharmacySales.baseline})</span>
                  {area.pharmacySales.increase > 0 && (
                    <span className="block text-[10px] text-rose-400 font-bold">+{area.pharmacySales.increase}%</span>
                  )}
                </td>
                <td className="py-3.5 px-3 text-right">
                  <span className="font-bold text-slate-200">{area.citizenReports.current}</span>
                  <span className="text-slate-400 ml-1 text-[11px]">({area.citizenReports.baseline})</span>
                  {area.citizenReports.increase > 0 && (
                    <span className="block text-[10px] text-rose-400 font-bold">+{area.citizenReports.increase}%</span>
                  )}
                </td>
                <td className="py-3.5 px-3 text-center font-bold">
                  {area.labConfirmations.freshness === 'MISSING' ? (
                    <span className="text-rose-400 text-[10px]">Unavailable</span>
                  ) : (
                    <span className={area.labConfirmations.current > 0 ? 'text-rose-400 font-extrabold' : 'text-slate-400'}>
                      {area.labConfirmations.current}
                    </span>
                  )}
                </td>
                <td className="py-3.5 px-3 text-right font-bold text-sky-400">
                  {area.confidenceScore}%
                </td>
                <td className="py-3.5 px-3 text-center">
                  <button
                    onClick={() => handleDrillDown(area.areaId)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-sky-400 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 px-2.5 py-1 rounded transition"
                  >
                    <Eye className="w-3.5 h-3.5" /> Evidence
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
