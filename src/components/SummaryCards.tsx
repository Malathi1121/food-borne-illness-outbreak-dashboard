import React from 'react';
import { AlertTriangle, CheckCircle2, Clock, FlaskConical, Stethoscope, ShoppingBag, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FreshnessStatus } from '../types';

export const SummaryCards: React.FC = () => {
  const { areaDataList, selectedAreaId, reliability } = useApp();

  const selectedArea = areaDataList.find(a => a.areaId === (selectedAreaId || 'area_a')) || areaDataList[0];

  // Freshness status checks for selected area
  const clinicFreshness = selectedArea.clinic.freshness;
  const pharmacyFreshness = selectedArea.pharmacy.freshness;
  const citizenFreshness = selectedArea.citizen.freshness;
  const labFreshness = selectedArea.laboratory.freshness;

  const renderFreshnessBadge = (freshness: FreshnessStatus) => {
    switch (freshness) {
      case 'FRESH':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">
            <CheckCircle2 className="w-3 h-3" /> Fresh (5m ago)
          </span>
        );
      case 'DELAYED':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded">
            <Clock className="w-3 h-3" /> Delayed (2h ago)
          </span>
        );
      case 'STALE':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-orange-400 bg-orange-500/10 border border-orange-500/30 px-2 py-0.5 rounded">
            <AlertTriangle className="w-3 h-3" /> Stale (8h ago)
          </span>
        );
      case 'MISSING':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/30 px-2 py-0.5 rounded">
            <AlertTriangle className="w-3 h-3" /> Missing Feed
          </span>
        );
      default:
        return null;
    }
  };

  const cards = [
    {
      title: 'Clinic Admissions',
      icon: Stethoscope,
      iconColor: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
      current: selectedArea.clinic.current,
      baseline: selectedArea.clinic.baseline,
      unit: 'cases',
      reliabilityPct: Math.round(reliability.clinic * 100),
      reliabilityLabel: 'Reliable',
      freshness: clinicFreshness
    },
    {
      title: 'Pharmacy OTC Sales',
      icon: ShoppingBag,
      iconColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
      current: selectedArea.pharmacy.current,
      baseline: selectedArea.pharmacy.baseline,
      unit: 'units',
      reliabilityPct: Math.round(reliability.pharmacy * 100),
      reliabilityLabel: 'Reliable',
      freshness: pharmacyFreshness
    },
    {
      title: 'Citizen Complaints',
      icon: Users,
      iconColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      current: selectedArea.citizen.current,
      baseline: selectedArea.citizen.baseline,
      unit: 'reports',
      reliabilityPct: Math.round(reliability.citizen * 100),
      reliabilityLabel: 'Moderate',
      freshness: citizenFreshness
    },
    {
      title: 'Laboratory Confirmations',
      icon: FlaskConical,
      iconColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
      current: labFreshness === 'MISSING' ? 'Unavailable' : Math.max(0, selectedArea.laboratory.current),
      baseline: selectedArea.laboratory.baseline,
      unit: 'positive cultures',
      reliabilityPct: Math.round(reliability.laboratory * 100),
      reliabilityLabel: 'Highly Reliable',
      freshness: labFreshness
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;

        return (
          <div key={idx} className="glass-card flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg border ${card.iconColor}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-semibold text-slate-200">
                    {card.title}
                  </h3>
                </div>
                {renderFreshnessBadge(card.freshness)}
              </div>

              <div className="mt-3 flex items-baseline justify-between">
                <div>
                  <span className="text-2xl font-extrabold text-slate-100">
                    {card.current}
                  </span>
                  <span className="text-xs text-slate-400 ml-1.5 font-medium">
                    {card.unit}
                  </span>
                </div>
                {card.baseline > 0 && typeof card.current === 'number' && card.current > card.baseline && (
                  <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                    +{Math.round(((card.current - card.baseline) / card.baseline) * 100)}% vs base
                  </span>
                )}
                {card.baseline === 0 && typeof card.current === 'number' && card.current > 0 && (
                  <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                    New signal
                  </span>
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-700/50 flex items-center justify-between text-[11px] text-slate-400">
              <span>
                Baseline: <strong className="text-slate-300">{card.baseline}</strong>
              </span>
              <span>
                Reliability: <strong className="text-sky-400">{card.reliabilityPct}% ({card.reliabilityLabel})</strong>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
