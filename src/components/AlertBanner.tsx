import React from 'react';
import { AlertCircle, AlertOctagon, Bell, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AlertBanner: React.FC = () => {
  const { fusionResult, setIsInvestigationModalOpen, setSelectedAreaId } = useApp();

  if (fusionResult.riskLevel === 'NORMAL') return null;

  const handleOpenAlertArea = () => {
    const topArea = fusionResult.areaResults[0];
    if (topArea) {
      setSelectedAreaId(topArea.areaId);
      setIsInvestigationModalOpen(true);
    }
  };

  return (
    <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 shadow-lg ${
      fusionResult.riskLevel === 'CRITICAL'
        ? 'bg-rose-950/40 border-rose-500/50 text-rose-200'
        : fusionResult.riskLevel === 'HIGH'
        ? 'bg-orange-950/40 border-orange-500/50 text-orange-200'
        : fusionResult.riskLevel === 'AMBIGUOUS'
        ? 'bg-purple-950/40 border-purple-500/50 text-purple-200'
        : 'bg-amber-950/40 border-amber-500/50 text-amber-200'
    }`}>
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-slate-900/60 shrink-0">
          <AlertOctagon className="w-5 h-5 text-rose-400 animate-pulse" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <span>AUTOMATED OUTBREAK SIGNAL ALERT:</span>
            <span className="uppercase text-xs px-2 py-0.5 rounded bg-slate-900 border border-slate-700 font-extrabold">
              {fusionResult.riskLevel}
            </span>
          </h4>
          <p className="text-xs text-slate-300 mt-0.5">
            {fusionResult.statusText} — {fusionResult.recommendedAction}
          </p>
        </div>
      </div>

      <button
        onClick={handleOpenAlertArea}
        className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold border border-slate-700 transition flex items-center gap-1 shrink-0 self-end sm:self-auto"
      >
        <span>View Evidence</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
