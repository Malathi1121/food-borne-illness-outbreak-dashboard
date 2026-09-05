import React from 'react';
import { Download, FileCode, FileSpreadsheet, ShieldCheck } from 'lucide-react';
import {
  exportCleanedCSV,
  exportCleanedJSON,
  exportDataQualityReport,
  exportSyntheticCSV,
  exportSyntheticJSON
} from '../services/exportService';

export const DataExportButtons: React.FC = () => {
  return (
    <div className="glass-panel p-5 my-6 border border-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Download className="w-4 h-4 text-sky-400" /> Complete Public Health Data Export Suite
          </h3>
          <p className="text-xs text-slate-400">
            Export full synthetic time-series, cleaned dataset, and data quality audit reports in CSV and JSON formats.
          </p>
        </div>
        <span className="px-2.5 py-1 text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-md shrink-0">
          <ShieldCheck className="w-3.5 h-3.5 inline mr-1" /> Live Blob Generators Ready
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <button
          onClick={exportSyntheticCSV}
          className="flex flex-col items-center justify-center p-3 bg-slate-850 hover:bg-sky-950/40 border border-slate-700 hover:border-sky-500/50 rounded-lg transition group text-center"
        >
          <FileSpreadsheet className="w-6 h-6 text-sky-400 mb-1.5 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold text-slate-100">Download Synthetic CSV</span>
          <span className="text-[10px] text-slate-400">Raw Time-Series</span>
        </button>

        <button
          onClick={exportSyntheticJSON}
          className="flex flex-col items-center justify-center p-3 bg-slate-850 hover:bg-purple-950/40 border border-slate-700 hover:border-purple-500/50 rounded-lg transition group text-center"
        >
          <FileCode className="w-6 h-6 text-purple-400 mb-1.5 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold text-slate-100">Download Synthetic JSON</span>
          <span className="text-[10px] text-slate-400">Full Payload</span>
        </button>

        <button
          onClick={exportCleanedCSV}
          className="flex flex-col items-center justify-center p-3 bg-slate-850 hover:bg-emerald-950/40 border border-slate-700 hover:border-emerald-500/50 rounded-lg transition group text-center"
        >
          <FileSpreadsheet className="w-6 h-6 text-emerald-400 mb-1.5 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold text-slate-100">Download Cleaned CSV</span>
          <span className="text-[10px] text-slate-400">Deduplicated</span>
        </button>

        <button
          onClick={exportCleanedJSON}
          className="flex flex-col items-center justify-center p-3 bg-slate-850 hover:bg-emerald-950/40 border border-slate-700 hover:border-emerald-500/50 rounded-lg transition group text-center"
        >
          <FileCode className="w-6 h-6 text-emerald-400 mb-1.5 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold text-slate-100">Download Cleaned JSON</span>
          <span className="text-[10px] text-slate-400">Sanitized</span>
        </button>

        <button
          onClick={exportDataQualityReport}
          className="flex flex-col items-center justify-center p-3 bg-slate-850 hover:bg-amber-950/40 border border-slate-700 hover:border-amber-500/50 rounded-lg transition group text-center"
        >
          <ShieldCheck className="w-6 h-6 text-amber-400 mb-1.5 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold text-slate-100">Download Quality Report</span>
          <span className="text-[10px] text-slate-400">Audit Metrics JSON</span>
        </button>
      </div>
    </div>
  );
};
