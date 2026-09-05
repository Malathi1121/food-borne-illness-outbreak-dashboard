import React from 'react';
import {
  LayoutDashboard,
  GitCommit,
  Database,
  AlertOctagon,
  BarChart3,
  BookOpen,
  ShieldAlert
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'how-it-works', label: 'How It Works', icon: GitCommit },
    { id: 'data-quality', label: 'Data & Quality', icon: Database },
    { id: 'investigation-alerts', label: 'Investigation & Alerts', icon: AlertOctagon },
    { id: 'evaluation-testing', label: 'Evaluation & Testing', icon: BarChart3 },
    { id: 'project-docs', label: 'Project & Documentation', icon: BookOpen },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 shrink-0 min-h-[calc(100vh-65px)] p-3">
      <nav className="space-y-1">
        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30 shadow-sm font-semibold'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-8 p-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-xs text-slate-400">
        <div className="flex items-center gap-1.5 font-medium text-slate-300 mb-1">
          <ShieldAlert className="w-3.5 h-3.5 text-sky-400" />
          <span>System Status</span>
        </div>
        <p className="text-[11px] leading-tight text-slate-400">
          Fusion engine active with 4 multi-source streams.
        </p>
      </div>
    </aside>
  );
};
