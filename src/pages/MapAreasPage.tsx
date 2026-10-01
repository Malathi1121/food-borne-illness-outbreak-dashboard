import React from 'react';
import { Eye, MapPin, ShieldAlert, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AreaFusionResult } from '../types';

export const MapAreasPage: React.FC = () => {
  const { fusionResult, setSelectedAreaId, setIsInvestigationModalOpen } = useApp();

  const getRiskBorder = (level: string) => {
    switch (level) {
      case 'CRITICAL': return 'border-rose-500/80 bg-rose-950/20';
      case 'HIGH': return 'border-orange-500/80 bg-orange-950/20';
      case 'WATCH': return 'border-amber-500/80 bg-amber-950/20';
      case 'AMBIGUOUS': return 'border-purple-500/80 bg-purple-950/20';
      default: return 'border-emerald-500/40 bg-slate-900';
    }
  };

  const handleInspect = (areaId: string) => {
    setSelectedAreaId(areaId);
    setIsInvestigationModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="glass-panel p-5">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-3 mb-4">
          <div className="p-2.5 bg-sky-500/10 text-sky-400 border border-sky-500/30 rounded-xl">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100">
              Municipal Sector Outbreak Map & Spatial Cluster Grid
            </h2>
            <p className="text-xs text-slate-400">
              Geographic distribution of multi-source signals across health districts
            </p>
          </div>
        </div>

        {/* Spatial Grid Layout representing municipal sectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-4">
          {fusionResult.areaResults.map((area: AreaFusionResult) => (
            <div
              key={area.areaId}
              className={`p-5 rounded-xl border transition duration-200 hover:shadow-2xl flex flex-col justify-between ${getRiskBorder(area.riskLevel)}`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className={`w-4 h-4 ${area.riskLevel === 'CRITICAL' ? 'text-rose-400' : 'text-sky-400'}`} />
                    <h3 className="text-base font-bold text-slate-100">
                      {area.areaName}
                    </h3>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded text-xs font-extrabold uppercase ${area.riskLevel === 'CRITICAL' ? 'bg-rose-600 text-white' : area.riskLevel === 'HIGH' ? 'bg-orange-500 text-white' : area.riskLevel === 'WATCH' ? 'bg-amber-500 text-slate-900' : area.riskLevel === 'AMBIGUOUS' ? 'bg-purple-600 text-white' : 'bg-emerald-600 text-white'}`}>
                    {area.riskLevel} ({area.riskScore}/100)
                  </span>
                </div>

                {/* Sub metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-300 my-3">
                  <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
                    <span className="block text-[10px] text-slate-400">Clinic Cases</span>
                    <strong className="text-slate-100">{area.clinicCases.current}</strong>
                    <span className="text-[10px] text-slate-400 block">(base: {area.clinicCases.baseline})</span>
                  </div>
                  <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
                    <span className="block text-[10px] text-slate-400">Pharmacy OTC</span>
                    <strong className="text-slate-100">{area.pharmacySales.current}</strong>
                    <span className="text-[10px] text-slate-400 block">(base: {area.pharmacySales.baseline})</span>
                  </div>
                  <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
                    <span className="block text-[10px] text-slate-400">Citizen Reports</span>
                    <strong className="text-slate-100">{area.citizenReports.current}</strong>
                    <span className="text-[10px] text-slate-400 block">(base: {area.citizenReports.baseline})</span>
                  </div>
                  <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
                    <span className="block text-[10px] text-slate-400">Lab Positive</span>
                    <strong className={area.labConfirmations.current > 0 ? 'text-rose-400 font-bold' : 'text-slate-400'}>
                      {area.labConfirmations.freshness === 'MISSING' ? 'N/A' : area.labConfirmations.current}
                    </strong>
                    <span className="text-[10px] text-slate-400 block">cultures</span>
                  </div>
                </div>

                <div className="text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded border border-slate-800 flex justify-between items-center">
                  <span>Primary Driver: <strong className="text-sky-300">{area.primaryDriver}</strong></span>
                  <span className="text-sky-400 font-bold">Confidence: {area.confidenceScore}%</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-slate-500" /> Action: {area.recommendedAction}
                </span>
                <button
                  onClick={() => handleInspect(area.areaId)}
                  className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded text-xs font-semibold shadow transition flex items-center gap-1 shrink-0"
                >
                  <Eye className="w-3.5 h-3.5" /> Drill-Down Evidence
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
