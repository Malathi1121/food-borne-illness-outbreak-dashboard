import React from 'react';
import { RotateCcw, Save, Settings, ShieldCheck, Sliders } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SettingsPage: React.FC = () => {
  const { weights, setWeights, reliability, setReliability } = useApp();

  const handleReset = () => {
    setWeights({ clinic: 0.30, pharmacy: 0.20, citizen: 0.20, laboratory: 0.30 });
    setReliability({ clinic: 0.90, pharmacy: 0.80, citizen: 0.60, laboratory: 0.98 });
  };

  return (
    <div className="space-y-6">
      <div className="glass-panel p-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-sky-500/10 text-sky-400 border border-sky-500/30 rounded-xl">
              <Settings className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">
                Signal Fusion Weights & Reliability Calibration
              </h2>
              <p className="text-xs text-slate-400">
                Configure surveillance signal weights and baseline source reliability coefficients
              </p>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold border border-slate-700 transition flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Defaults
          </button>
        </div>

        {/* Signal Weight Tuner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-slate-200 border-b border-slate-800 pb-2 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-sky-400" /> Multi-Source Fusion Signal Weights
            </h3>

            {/* Clinic Weight */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-300">Clinic Admissions Weight:</span>
                <span className="text-sky-400 font-bold">{Math.round(weights.clinic * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.60"
                step="0.05"
                value={weights.clinic}
                onChange={(e) => setWeights(prev => ({ ...prev, clinic: parseFloat(e.target.value) }))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
              />
            </div>

            {/* Pharmacy Weight */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-300">Pharmacy OTC Sales Weight:</span>
                <span className="text-purple-400 font-bold">{Math.round(weights.pharmacy * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.60"
                step="0.05"
                value={weights.pharmacy}
                onChange={(e) => setWeights(prev => ({ ...prev, pharmacy: parseFloat(e.target.value) }))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
              />
            </div>

            {/* Citizen Weight */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-300">Citizen Complaints Weight:</span>
                <span className="text-amber-400 font-bold">{Math.round(weights.citizen * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.60"
                step="0.05"
                value={weights.citizen}
                onChange={(e) => setWeights(prev => ({ ...prev, citizen: parseFloat(e.target.value) }))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>

            {/* Lab Weight */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-300">Laboratory Confirmations Weight:</span>
                <span className="text-emerald-400 font-bold">{Math.round(weights.laboratory * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.60"
                step="0.05"
                value={weights.laboratory}
                onChange={(e) => setWeights(prev => ({ ...prev, laboratory: parseFloat(e.target.value) }))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>
          </div>

          {/* Reliability Coefficients */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-slate-200 border-b border-slate-800 pb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Source Reliability Coefficients
            </h3>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-300">Clinic Reliability:</span>
                <span className="text-sky-400 font-bold">{Math.round(reliability.clinic * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.50"
                max="1.00"
                step="0.05"
                value={reliability.clinic}
                onChange={(e) => setReliability(prev => ({ ...prev, clinic: parseFloat(e.target.value) }))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-300">Pharmacy Reliability:</span>
                <span className="text-purple-400 font-bold">{Math.round(reliability.pharmacy * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.50"
                max="1.00"
                step="0.05"
                value={reliability.pharmacy}
                onChange={(e) => setReliability(prev => ({ ...prev, pharmacy: parseFloat(e.target.value) }))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-300">Citizen Reliability:</span>
                <span className="text-amber-400 font-bold">{Math.round(reliability.citizen * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.40"
                max="1.00"
                step="0.05"
                value={reliability.citizen}
                onChange={(e) => setReliability(prev => ({ ...prev, citizen: parseFloat(e.target.value) }))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-300">Laboratory Reliability:</span>
                <span className="text-emerald-400 font-bold">{Math.round(reliability.laboratory * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.80"
                max="1.00"
                step="0.01"
                value={reliability.laboratory}
                onChange={(e) => setReliability(prev => ({ ...prev, laboratory: parseFloat(e.target.value) }))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
