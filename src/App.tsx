import React, { useState } from 'react';
import { Footer } from './components/Footer';
import { InvestigationModal } from './components/InvestigationModal';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { AppProvider } from './context/AppContext';
import { DashboardPage } from './pages/DashboardPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { DataAndQualityPage } from './pages/DataAndQualityPage';
import { InvestigationAndAlertsPage } from './pages/InvestigationAndAlertsPage';
import { EvaluationAndTestingPage } from './pages/EvaluationAndTestingPage';
import { ProjectAndDocsPage } from './pages/ProjectAndDocsPage';

const MainContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 p-6 overflow-x-hidden">
          {activeTab === 'dashboard' && <DashboardPage />}
          {activeTab === 'how-it-works' && <HowItWorksPage />}
          {activeTab === 'data-quality' && <DataAndQualityPage />}
          {activeTab === 'investigation-alerts' && <InvestigationAndAlertsPage />}
          {activeTab === 'evaluation-testing' && <EvaluationAndTestingPage />}
          {activeTab === 'project-docs' && <ProjectAndDocsPage onNavigate={setActiveTab} />}
        </main>
      </div>

      <InvestigationModal />
      <Footer />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
