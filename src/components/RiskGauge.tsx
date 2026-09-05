import React from 'react';
import { AlertCircle, AlertOctagon, CheckCircle2, Clock, ShieldAlert } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const RiskGauge: React.FC = () => {
  const { fusionResult } = useApp();

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'CRITICAL': return { bg: 'bg-rose-500/20', text: 'text-rose-400', border: 'border-rose-500/40', badge: 'bg-rose-600 text-white' };
      case 'HIGH': return { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/40', badge: 'bg-orange-500 text-white' };
      case 'WATCH': return { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/40', badge: 'bg-amber-500 text-slate-900' };
      case 'AMBIGUOUS': return { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/40', badge: 'bg-purple-600 text-white' };
      default: return { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/40', badge: 'bg-emerald-600 text-white' };
    }
  };

  const style = getRiskColor(fusionResult.riskLevel);

  return (
    <div className={`glass-panel p-5 border ${style.border} relative overflow-hidden`}>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Left score gauge */}
        <div className="flex items-center gap-5">
          <div className="relative flex items-center justify-center w-24 h-24 rounded-full border-4 border-slate-800 bg-slate-900 shadow-inner">
            <div className="text-center">
              <span className={`text-3xl font-black ${style.text}`}>
                {fusionResult.overallRiskScore}
              </span>
              <span className="block text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                Risk Score
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-3 py-1 text-xs font-bold uppercase rounded-md ${style.badge}`}>
                {fusionResult.riskLevel}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-500" /> Updated {fusionResult.lastUpdated}
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-100 tracking-tight">
              {fusionResult.statusText}
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              {fusionResult.recommendedAction}
            </p>
          </div>
        </div>

        {/* Right metrics */}
        <div className="flex flex-col sm:flex-row items-stretch gap-3 shrink-0">
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-lg px-4 py-2.5 text-center min-w-[130px]">
            <span className="block text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
              Signal Confidence
            </span>
            <span className="text-2xl font-bold text-sky-400">
              {fusionResult.confidenceScore}%
            </span>
            <span className="block text-[10px] text-slate-400 mt-0.5">
              Weighted Reliability
            </span>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/60 rounded-lg px-4 py-2.5 text-center min-w-[130px]">
            <span className="block text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
              Active Signals
            </span>
            <span className="text-2xl font-bold text-slate-100">
              4 / 4
            </span>
            <span className="block text-[10px] text-emerald-400 mt-0.5">
              Clin, Pharm, Cit, Lab
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
