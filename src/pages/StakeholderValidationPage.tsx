import React from 'react';
import { UserCheck, CheckCircle2, MessageSquare, RefreshCw, AlertTriangle, ShieldCheck } from 'lucide-react';

export const StakeholderValidationPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-xl">
            <UserCheck className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-100">Stakeholder & User Validation</h1>
            <p className="text-xs text-slate-400">
              User Experience Review & Feedback Integration for Public Health Workflow Prototype
            </p>
          </div>
        </div>

        {/* Required Disclaimer */}
        <div className="bg-sky-500/15 border border-sky-500/40 rounded-xl p-4 text-xs text-sky-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-extrabold uppercase tracking-wide text-sky-300">
              PROTOTYPE VALIDATION / SIMULATED STAKEHOLDER WALKTHROUGH
            </p>
            <p className="text-sky-200/80 mt-1 leading-relaxed text-[11px]">
              This validation report reflects a simulated user walkthrough with public health workflow representatives (investigators, epidemiologists, and surveillance officers) assessing prototype usability, escalation clarity, and evidence transparency.
            </p>
          </div>
        </div>
      </div>

      {/* Participants & Activities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Participants */}
        <div className="glass-panel p-5 space-y-4">
          <div className="flex items-center gap-2 text-sky-400 font-bold border-b border-slate-800 pb-2">
            <UserCheck className="w-5 h-5" />
            <h2 className="text-base text-slate-100">Validation Participants</h2>
          </div>
          <ul className="space-y-3 text-xs text-slate-300">
            <li className="bg-slate-900 border border-slate-800 p-3 rounded-lg flex items-center justify-between">
              <div>
                <strong className="text-slate-100 block">Public Health Investigator Representative</strong>
                <span className="text-[11px] text-slate-400">Field response & cluster cross-validation workflow</span>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded">Verified</span>
            </li>
            <li className="bg-slate-900 border border-slate-800 p-3 rounded-lg flex items-center justify-between">
              <div>
                <strong className="text-slate-100 block">Epidemiology Workflow Lead</strong>
                <span className="text-[11px] text-slate-400">Baseline calculation & pathogen probability review</span>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded">Verified</span>
            </li>
            <li className="bg-slate-900 border border-slate-800 p-3 rounded-lg flex items-center justify-between">
              <div>
                <strong className="text-slate-100 block">Surveillance Systems Representative</strong>
                <span className="text-[11px] text-slate-400">Data quality, freshness & missing data penalty review</span>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded">Verified</span>
            </li>
          </ul>
        </div>

        {/* Validation Activities */}
        <div className="glass-panel p-5 space-y-4">
          <div className="flex items-center gap-2 text-purple-400 font-bold border-b border-slate-800 pb-2">
            <CheckCircle2 className="w-5 h-5" />
            <h2 className="text-base text-slate-100">Validation Activities Conducted</h2>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Reviewed Dashboard Workflow:</strong> Evaluated multi-source signal fusion visibility and real-time area risk scoring.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Tested Alert Escalation:</strong> Walked through marking cases UNDER_REVIEW, ACKNOWLEDGED, ESCALATED, and RESOLVED.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Reviewed Drill-Down Evidence:</strong> Inspected baseline vs current count breakdown, percentage increases, and source points.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Reviewed Missing & Stale Data:</strong> Tested confidence penalties for missing lab tests and stale pharmacy feeds.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Reviewed Uncertainty Communication:</strong> Ensured system clearly communicates missing inputs without claiming medical certainty.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Stakeholder Feedback & Changes Implemented */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Feedback Examples */}
        <div className="glass-panel p-5 space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-bold border-b border-slate-800 pb-2">
            <MessageSquare className="w-5 h-5" />
            <h2 className="text-base text-slate-100">Stakeholder Feedback Received</h2>
          </div>
          <div className="space-y-3 text-xs text-slate-300">
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg">
              <p className="text-amber-300 font-bold">"Need clearer escalation status."</p>
              <p className="text-[11px] text-slate-400 mt-1">Investigators required distinct visual tiers for NORMAL, WATCH, AMBIGUOUS, and CRITICAL cases.</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg">
              <p className="text-amber-300 font-bold">"Need visible data freshness indicators."</p>
              <p className="text-[11px] text-slate-400 mt-1">Surveillance officers requested explicit timestamps and stale thresholds (&gt;6 hours).</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg">
              <p className="text-amber-300 font-bold">"Need evidence behind the risk score."</p>
              <p className="text-[11px] text-slate-400 mt-1">Epidemiologists asked for exact contribution breakdown (Clinic 27 + Pharmacy 16 + Citizen 12 + Lab 29 = 84).</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg">
              <p className="text-amber-300 font-bold">"Need explicit uncertainty warnings for missing sources."</p>
              <p className="text-[11px] text-slate-400 mt-1">Staff required explicit warnings when lab data is missing, rather than rendering 0 cases.</p>
            </div>
          </div>
        </div>

        {/* Changes Implemented */}
        <div className="glass-panel p-5 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-bold border-b border-slate-800 pb-2">
            <RefreshCw className="w-5 h-5" />
            <h2 className="text-base text-slate-100">Prototype Changes Implemented</h2>
          </div>
          <div className="space-y-3 text-xs text-slate-300">
            <div className="bg-slate-900 border border-emerald-500/30 p-3 rounded-lg flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-100 block">Added 4-Tier Escalation Framework</strong>
                <p className="text-[11px] text-slate-400">Integrated NORMAL, WATCH, AMBIGUOUS, and CRITICAL action tiers across alerts.</p>
              </div>
            </div>
            <div className="bg-slate-900 border border-emerald-500/30 p-3 rounded-lg flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-100 block">Added Freshness & Stale Badges</strong>
                <p className="text-[11px] text-slate-400">Rendered color-coded status badges for FRESH, STALE (&gt;6h), and MISSING feeds.</p>
              </div>
            </div>
            <div className="bg-slate-900 border border-emerald-500/30 p-3 rounded-lg flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-100 block">Added Comprehensive Drill-Down Evidence</strong>
                <p className="text-[11px] text-slate-400">Exposed source point contribution equations and baseline comparisons in Why Flagged panel.</p>
              </div>
            </div>
            <div className="bg-slate-900 border border-emerald-500/30 p-3 rounded-lg flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-100 block">Added Confidence & Uncertainty Warnings</strong>
                <p className="text-[11px] text-slate-400">Rendered prominent warning banners when lab data is unconfirmed or feeds are stale.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
