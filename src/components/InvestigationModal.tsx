import React from 'react';
import { AlertCircle, AlertOctagon, CheckCircle2, ShieldAlert, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const InvestigationModal: React.FC = () => {
  const {
    selectedAreaId,
    isInvestigationModalOpen,
    setIsInvestigationModalOpen,
    fusionResult,
    handleEscalationChange
  } = useApp();

  if (!isInvestigationModalOpen || !selectedAreaId) return null;

  const areaResult = fusionResult.areaResults.find(a => a.areaId === selectedAreaId) || fusionResult.areaResults[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={() => setIsInvestigationModalOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-4">
          <div className="p-2.5 bg-sky-500/10 text-sky-400 border border-sky-500/30 rounded-xl">
            <AlertOctagon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-100">
                Detailed Investigation: {areaResult.areaName}
              </h2>
              <span className={`px-2.5 py-0.5 text-xs font-bold uppercase rounded ${areaResult.riskLevel === 'CRITICAL' ? 'bg-rose-600 text-white' : areaResult.riskLevel === 'HIGH' ? 'bg-orange-500 text-white' : 'bg-amber-500 text-slate-900'}`}>
                {areaResult.riskLevel}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Surveillance Signal Drill-Down Audit & Evidence Verification
            </p>
          </div>
        </div>

        {/* Itemized Evidence Summary Grid */}
        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3 bg-slate-850 p-3 rounded-lg border border-slate-800">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Risk Score</span>
              <span className="text-2xl font-black text-rose-400">{areaResult.riskScore} <span className="text-xs font-normal text-slate-400">/ 100</span></span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Signal Confidence</span>
              <span className="text-2xl font-black text-sky-400">{areaResult.confidenceScore}%</span>
            </div>
          </div>

          <div className="border border-slate-800 rounded-lg p-3.5 space-y-3 bg-slate-900/50">
            <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-1.5 text-xs uppercase tracking-wider">
              Signal Breakdown & Percentage Spikes vs Baseline
            </h3>

            {/* Clinic */}
            <div className="flex items-center justify-between py-1 border-b border-slate-800/50">
              <div>
                <span className="font-semibold text-slate-200">Clinic Admissions:</span>
                <span className="text-slate-400 ml-1.5">Baseline: {areaResult.clinicCases.baseline} | Current: {areaResult.clinicCases.current}</span>
              </div>
              <span className="font-bold text-rose-400">
                +{areaResult.clinicCases.increase}% increase
              </span>
            </div>

            {/* Pharmacy */}
            <div className="flex items-center justify-between py-1 border-b border-slate-800/50">
              <div>
                <span className="font-semibold text-slate-200">Pharmacy OTC Sales:</span>
                <span className="text-slate-400 ml-1.5">Baseline: {areaResult.pharmacySales.baseline} | Current: {areaResult.pharmacySales.current}</span>
              </div>
              <span className="font-bold text-rose-400">
                +{areaResult.pharmacySales.increase}% increase
              </span>
            </div>

            {/* Citizen */}
            <div className="flex items-center justify-between py-1 border-b border-slate-800/50">
              <div>
                <span className="font-semibold text-slate-200">Citizen Reports:</span>
                <span className="text-slate-400 ml-1.5">Baseline: {areaResult.citizenReports.baseline} | Current: {areaResult.citizenReports.current}</span>
              </div>
              <span className="font-bold text-rose-400">
                +{areaResult.citizenReports.increase}% increase
              </span>
            </div>

            {/* Lab */}
            <div className="flex items-center justify-between py-1">
              <div>
                <span className="font-semibold text-slate-200">Lab Pathogen Confirmations:</span>
                <span className="text-slate-400 ml-1.5">
                  {areaResult.labConfirmations.current > 0 ? 'Culture Result: Salmonella & E. coli' : 'Pending'}
                </span>
              </div>
              <span className="font-bold text-rose-400">
                {areaResult.labConfirmations.freshness === 'MISSING'
                  ? 'Unavailable'
                  : areaResult.labConfirmations.current > 0
                  ? `${areaResult.labConfirmations.current} Confirmed`
                  : '0 Confirmed'}
              </span>
            </div>
          </div>

          {/* Reliability Matrix */}
          <div className="border border-slate-800 rounded-lg p-3 bg-slate-900/50">
            <h3 className="font-bold text-slate-200 mb-2 text-xs uppercase tracking-wider">
              Source Reliability Scores
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[11px]">
              <div className="bg-slate-800/70 p-2 rounded border border-slate-700/50">
                <span className="block text-slate-400 text-[10px]">Clinic</span>
                <strong className="text-sky-400">90% (Reliable)</strong>
              </div>
              <div className="bg-slate-800/70 p-2 rounded border border-slate-700/50">
                <span className="block text-slate-400 text-[10px]">Pharmacy</span>
                <strong className="text-sky-400">80% (Reliable)</strong>
              </div>
              <div className="bg-slate-800/70 p-2 rounded border border-slate-700/50">
                <span className="block text-slate-400 text-[10px]">Citizen</span>
                <strong className="text-amber-400">60% (Moderate)</strong>
              </div>
              <div className="bg-slate-800/70 p-2 rounded border border-slate-700/50">
                <span className="block text-slate-400 text-[10px]">Laboratory</span>
                <strong className="text-emerald-400">98% (High)</strong>
              </div>
            </div>
          </div>

          {/* Recommendation */}
          <div className="bg-rose-950/20 border border-rose-500/30 rounded-lg p-3.5 text-xs text-rose-200">
            <div className="flex items-center gap-1.5 font-bold text-rose-300 mb-1">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>Recommended Action Protocol</span>
            </div>
            <p className="text-white font-semibold">
              {areaResult.recommendedAction}
            </p>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={() => setIsInvestigationModalOpen(false)}
            className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-xs font-semibold hover:bg-slate-700 transition"
          >
            Close Window
          </button>
          <button
            onClick={() => {
              handleEscalationChange('esc_area_a_01', 'ESCALATED');
              setIsInvestigationModalOpen(false);
            }}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-extrabold shadow transition flex items-center gap-1.5"
          >
            <ShieldAlert className="w-4 h-4" /> Escalate to Outbreak Response Team
          </button>
        </div>
      </div>
    </div>
  );
};
