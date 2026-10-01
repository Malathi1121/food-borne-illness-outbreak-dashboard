import React from 'react';
import { AlertCircle, ShieldAlert } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900/90 border-t border-slate-800 text-slate-400 py-4 px-6 text-xs mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-slate-300">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
          <p className="leading-tight">
            <strong className="text-amber-300">MANDATORY PROJECT DISCLAIMER:</strong> Prototype only — uses synthetic demonstration data and is not intended for real-world medical or public-health decision making.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="px-2 py-0.5 bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[11px] rounded">
            DATASET: SYNTHETIC / DEMONSTRATION DATA
          </span>
          <span className="text-slate-500">v1.0.0</span>
        </div>
      </div>
    </footer>
  );
};
