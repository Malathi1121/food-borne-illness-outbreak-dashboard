import React, { useState } from 'react';
import { AlertOctagon, FileSearch, MapPin, History, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WhyFlaggedPanel } from '../components/WhyFlaggedPanel';
import { AreaRiskTable } from '../components/AreaRiskTable';
import { EscalationRecord } from '../types';

export const InvestigationAndAlertsPage: React.FC = () => {
  const { fusionResult, escalationRecords, handleEscalationChange } = useApp();

  const getStatusBadge = (status: EscalationRecord['status']) => {
    switch (status) {
      case 'ESCALATED': return 'bg-rose-600 text-white font-bold';
      case 'UNDER_REVIEW': return 'bg-amber-500 text-slate-900 font-bold';
      case 'ACKNOWLEDGED': return 'bg-sky-600 text-white font-bold';
      case 'RESOLVED': return 'bg-emerald-600 text-white font-bold';
      default: return 'bg-slate-700 text-slate-300 font-bold';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-4">
          <div className="p-3 bg-rose-500/10 text-rose-400 border border-rose-500/30 rounded-xl">
            <AlertOctagon className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-100">Investigation & Alerts Center</h1>
            <p className="text-xs text-slate-400">
              Outbreak Sector Mapping, Drill-Down Evidence Breakdown & Escalation Triage Pipeline
            </p>
          </div>
        </div>

        {/* Visual Escalation Path Diagram */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs flex flex-wrap items-center justify-between gap-2">
          <span className="font-bold text-slate-400 uppercase text-[10px] tracking-wider">Escalation Path:</span>
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="bg-slate-800 px-2 py-0.5 rounded font-semibold text-[11px]">1. Signal Detected</span>
            <ArrowRight className="w-3 h-3 text-sky-400" />
            <span className="bg-slate-800 px-2 py-0.5 rounded font-semibold text-[11px]">2. Risk Assessed</span>
            <ArrowRight className="w-3 h-3 text-sky-400" />
            <span className="bg-slate-800 px-2 py-0.5 rounded font-semibold text-[11px]">3. Alert Triage</span>
            <ArrowRight className="w-3 h-3 text-sky-400" />
            <span className="bg-slate-800 px-2 py-0.5 rounded font-semibold text-[11px]">4. Investigator Review</span>
            <ArrowRight className="w-3 h-3 text-sky-400" />
            <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded font-extrabold text-[11px]">5. Escalate / Resolve</span>
          </div>
        </div>
      </div>

      {/* SECTION A: OUTBREAK AREAS */}
      <div className="glass-panel p-5 space-y-4">
        <h2 className="text-base font-bold text-slate-100 border-b border-slate-800 pb-2 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-sky-400" />
          <span>Section A: Outbreak Surveillance Sectors & Risk Overview</span>
        </h2>
        <AreaRiskTable />
      </div>

      {/* SECTION B: DRILL-DOWN EVIDENCE */}
      <div className="glass-panel p-5 space-y-4">
        <h2 className="text-base font-bold text-slate-100 border-b border-slate-800 pb-2 flex items-center gap-2">
          <FileSearch className="w-5 h-5 text-purple-400" />
          <span>Section B: Why Was This Area Flagged? (Drill-Down Evidence)</span>
        </h2>
        <WhyFlaggedPanel />
      </div>

      {/* SECTION C: ALERTS & ESCALATION PIPELINE */}
      <div className="glass-panel p-5 space-y-4">
        <h2 className="text-base font-bold text-slate-100 border-b border-slate-800 pb-2 flex items-center gap-2">
          <AlertOctagon className="w-5 h-5 text-rose-400" />
          <span>Section C: Alert Triage & Response Workflow Controls</span>
        </h2>

        {/* 4 Classification Tiers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-2">
          <div className="bg-emerald-950/30 border border-emerald-500/30 p-3 rounded-lg text-center space-y-1">
            <span className="px-2 py-0.5 text-[10px] font-extrabold bg-emerald-500 text-slate-950 rounded">NORMAL</span>
            <p className="text-[11px] text-slate-300">Routine Surveillance</p>
            <p className="text-[10px] text-slate-500">Score &lt; 35</p>
          </div>

          <div className="bg-sky-950/30 border border-sky-500/30 p-3 rounded-lg text-center space-y-1">
            <span className="px-2 py-0.5 text-[10px] font-extrabold bg-sky-500 text-slate-950 rounded">WATCH</span>
            <p className="text-[11px] text-slate-300">Elevated Surveillance</p>
            <p className="text-[10px] text-slate-500">Score 35 – 50</p>
          </div>

          <div className="bg-amber-950/30 border border-amber-500/30 p-3 rounded-lg text-center space-y-1">
            <span className="px-2 py-0.5 text-[10px] font-extrabold bg-amber-500 text-slate-950 rounded">AMBIGUOUS</span>
            <p className="text-[11px] text-slate-300">Manual Review Required</p>
            <p className="text-[10px] text-slate-500">Signal Divergence</p>
          </div>

          <div className="bg-rose-950/30 border border-rose-500/30 p-3 rounded-lg text-center space-y-1">
            <span className="px-2 py-0.5 text-[10px] font-extrabold bg-rose-600 text-white rounded">CRITICAL</span>
            <p className="text-[11px] text-slate-300">Immediate Investigation</p>
            <p className="text-[10px] text-slate-500">Score &gt; 65</p>
          </div>
        </div>

        {/* Escalation Cases List */}
        <div className="space-y-4 pt-2">
          {escalationRecords.map((rec) => {
            const areaRes = fusionResult.areaResults.find(a => a.areaId === rec.areaId);
            const scoreText = areaRes ? `Score: ${areaRes.riskScore}/100 • Conf: ${areaRes.confidenceScore}%` : '';

            return (
              <div
                key={rec.id}
                className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-extrabold text-slate-100">{rec.areaName}</h3>
                      <span className={`px-2 py-0.5 rounded text-xs uppercase ${getStatusBadge(rec.status)}`}>
                        {rec.status}
                      </span>
                      <span className="px-2 py-0.5 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded text-[11px] font-bold">
                        {areaRes?.riskLevel || rec.riskLevel} ({scoreText})
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{rec.reason}</p>
                  </div>

                  <div className="text-right text-xs text-slate-400 shrink-0">
                    <span className="block font-semibold text-slate-300">Assigned Team:</span>
                    <span className="text-sky-400 font-bold">{rec.assignedRoleOrTeam}</span>
                    <span className="block text-[10px] text-slate-500 mt-0.5">{rec.timestamp}</span>
                  </div>
                </div>

                {/* Functional Action Buttons */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-xs font-semibold text-slate-400 mr-2">Action Controls:</span>

                  <button
                    onClick={() => handleEscalationChange(rec.id, 'UNDER_REVIEW')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                      rec.status === 'UNDER_REVIEW'
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                        : 'bg-slate-800 hover:bg-amber-500/20 text-amber-300 border-amber-500/40'
                    }`}
                  >
                    Mark for Review
                  </button>

                  <button
                    onClick={() => handleEscalationChange(rec.id, 'ESCALATED')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                      rec.status === 'ESCALATED'
                        ? 'bg-rose-600 text-white border-rose-400 font-bold'
                        : 'bg-slate-800 hover:bg-rose-600/20 text-rose-300 border-rose-500/40'
                    }`}
                  >
                    Escalate
                  </button>

                  <button
                    onClick={() => handleEscalationChange(rec.id, 'ACKNOWLEDGED')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                      rec.status === 'ACKNOWLEDGED'
                        ? 'bg-sky-600 text-white border-sky-400 font-bold'
                        : 'bg-slate-800 hover:bg-sky-600/20 text-sky-300 border-sky-500/40'
                    }`}
                  >
                    Acknowledge
                  </button>

                  <button
                    onClick={() => handleEscalationChange(rec.id, 'RESOLVED')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                      rec.status === 'RESOLVED'
                        ? 'bg-emerald-600 text-white border-emerald-400 font-bold'
                        : 'bg-slate-800 hover:bg-emerald-600/20 text-emerald-300 border-emerald-500/40'
                    }`}
                  >
                    Resolve Case
                  </button>
                </div>

                {/* Audit Trail History */}
                <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-slate-300 mb-2">
                    <History className="w-3.5 h-3.5 text-sky-400" />
                    <span>Escalation History & Audit Trail</span>
                  </div>
                  <div className="space-y-1.5">
                    {rec.history.map((h, idx) => (
                      <div key={idx} className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800/50 pb-1">
                        <span>
                          <strong className="text-slate-200">{h.action}</strong> by {h.role}
                          {h.note && <span className="text-slate-400 ml-2">— "{h.note}"</span>}
                        </span>
                        <span className="text-slate-500 font-mono">{h.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
