import React, { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line
} from 'recharts';
import { SYNTHETIC_TIME_SERIES } from '../data/syntheticData';
import { useApp } from '../context/AppContext';
import { evaluateAreaFusion } from '../services/fusionEngine';
import { AreaData } from '../types';

export const TimeSeriesCharts: React.FC = () => {
  const { selectedAreaId, weights, reliability } = useApp();
  const [activeTab, setActiveTab] = useState<'combined' | 'clinic' | 'pharmacy' | 'citizen' | 'lab'>('combined');

  // Filter records for selected area (default to Area A if null)
  const targetAreaId = selectedAreaId || 'area_a';
  const filteredData = SYNTHETIC_TIME_SERIES.filter(r => r.areaId === targetAreaId);

  // Transform records for Recharts
  const chartData = filteredData.map(r => {
    const areaDataPoint: AreaData = {
      areaId: r.areaId,
      areaName: r.areaName,
      population: 100000,
      clinic: { current: Math.max(0, r.clinicCases), baseline: r.clinicBaseline, freshness: r.clinicFreshness, lastUpdatedMinutesAgo: 5 },
      pharmacy: { current: Math.max(0, r.pharmacySales), baseline: r.pharmacyBaseline, freshness: r.pharmacyFreshness, lastUpdatedMinutesAgo: 15 },
      citizen: { current: Math.max(0, r.citizenReports), baseline: r.citizenBaseline, freshness: r.citizenFreshness, lastUpdatedMinutesAgo: 10 },
      laboratory: { current: Math.max(0, r.labConfirmations), baseline: r.labBaseline, freshness: r.labFreshness, lastUpdatedMinutesAgo: 30 }
    };

    const fusion = evaluateAreaFusion(areaDataPoint, weights, reliability);
    const combinedScore = fusion.riskScore;

    return {
      date: r.date.substring(5), // "08-15"
      fullDate: r.date,
      ClinicCases: Math.max(0, r.clinicCases),
      ClinicBaseline: r.clinicBaseline,
      PharmacySales: Math.max(0, r.pharmacySales),
      PharmacyBaseline: r.pharmacyBaseline,
      CitizenReports: Math.max(0, r.citizenReports),
      CitizenBaseline: r.citizenBaseline,
      LabConfirmations: Math.max(0, r.labConfirmations),
      CombinedRiskScore: combinedScore,
      ThresholdHigh: 70
    };
  });

  const areaName = filteredData[0]?.areaName || 'Area A (Riverside District)';

  return (
    <div className="glass-panel p-5 my-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            Multi-Source Surveillance Time-Series (30-Day Trend)
          </h3>
          <p className="text-xs text-slate-400">
            Showing historical & live signal trends for <strong className="text-sky-400">{areaName}</strong>
          </p>
        </div>

        {/* Chart Selector Tabs */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('combined')}
            className={`px-3 py-1.5 rounded font-medium transition ${activeTab === 'combined' ? 'bg-sky-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Combined Signal
          </button>
          <button
            onClick={() => setActiveTab('clinic')}
            className={`px-3 py-1.5 rounded font-medium transition ${activeTab === 'clinic' ? 'bg-sky-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Clinic
          </button>
          <button
            onClick={() => setActiveTab('pharmacy')}
            className={`px-3 py-1.5 rounded font-medium transition ${activeTab === 'pharmacy' ? 'bg-sky-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Pharmacy
          </button>
          <button
            onClick={() => setActiveTab('citizen')}
            className={`px-3 py-1.5 rounded font-medium transition ${activeTab === 'citizen' ? 'bg-sky-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Citizen
          </button>
          <button
            onClick={() => setActiveTab('lab')}
            className={`px-3 py-1.5 rounded font-medium transition ${activeTab === 'lab' ? 'bg-sky-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Lab
          </button>
        </div>
      </div>

      {/* Render selected chart */}
      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          {activeTab === 'combined' ? (
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc', fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
              <Area type="monotone" dataKey="CombinedRiskScore" stroke="#ef4444" strokeWidth={2.5} fillOpacity={1} fill="url(#riskGrad)" name="Combined Outbreak Signal Score (0-100)" />
              <Line type="monotone" dataKey="ThresholdHigh" stroke="#f59e0b" strokeDasharray="5 5" strokeWidth={1.5} name="HIGH Risk Threshold (70)" />
            </AreaChart>
          ) : activeTab === 'clinic' ? (
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc', fontSize: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line type="monotone" dataKey="ClinicCases" stroke="#38bdf8" strokeWidth={2.5} dot={{ r: 3 }} name="Current Clinic Admissions" />
              <Line type="monotone" dataKey="ClinicBaseline" stroke="#64748b" strokeDasharray="4 4" strokeWidth={1.5} name="Clinic 7-Day Baseline" />
            </LineChart>
          ) : activeTab === 'pharmacy' ? (
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc', fontSize: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line type="monotone" dataKey="PharmacySales" stroke="#c084fc" strokeWidth={2.5} dot={{ r: 3 }} name="Pharmacy OTC Sales" />
              <Line type="monotone" dataKey="PharmacyBaseline" stroke="#64748b" strokeDasharray="4 4" strokeWidth={1.5} name="Pharmacy Baseline" />
            </LineChart>
          ) : activeTab === 'citizen' ? (
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc', fontSize: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line type="monotone" dataKey="CitizenReports" stroke="#fbbf24" strokeWidth={2.5} dot={{ r: 3 }} name="Citizen Reports" />
              <Line type="monotone" dataKey="CitizenBaseline" stroke="#64748b" strokeDasharray="4 4" strokeWidth={1.5} name="Citizen Baseline" />
            </LineChart>
          ) : (
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc', fontSize: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Area type="stepAfter" dataKey="LabConfirmations" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.3} name="Lab Confirmed Pathogen Cases" />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};
