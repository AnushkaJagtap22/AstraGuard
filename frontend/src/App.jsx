import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate, useParams, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import CommandPalette from './components/CommandPalette';
import AstraAssistant from './components/AstraAssistant';
import ReportModal from './components/ReportModal';
import { ErrorBoundary } from './components/ErrorBoundary';
import DashboardPage from './pages/DashboardPage';
import InvestigatePage from './pages/InvestigatePage';
import InvestigationResultPage from './pages/InvestigationResultPage';
import EvidenceGraphPage from './pages/EvidenceGraphPage';
import RiskRadarPage from './pages/RiskRadarPage';
import IdentityPage from './pages/IdentityPage';
import EvidenceVaultPage from './pages/EvidenceVaultPage';
import HelpFinderPage from './pages/HelpFinderPage';
import ThreatSimulationPage from './pages/ThreatSimulationPage';
import NotFoundPage from './pages/NotFoundPage';
import InteractionStatusPanel from './components/InteractionStatusPanel';
import { demoInvestigations } from './lib/demoData';
import { Search, Bot, Command } from 'lucide-react';

// Dynamic Title Helper Hook
function useDocumentTitle() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    if (path.startsWith('/demo/scholarship')) {
      document.title = 'ScholarConnect — Student Scholarship Portal';
    } else if (path.startsWith('/demo/job-offer')) {
      document.title = 'CareerBridge — Remote Careers Portal';
    } else if (path.startsWith('/demo/parcel')) {
      document.title = 'QuickShip Express — Delivery Tracking';
    } else if (path.startsWith('/demo/bank-alert')) {
      document.title = 'SecurePay Notice — Banking Security';
    } else if (path.startsWith('/demo/admission')) {
      document.title = 'CampusApply Edu — Admissions Portal';
    } else if (path === '/') {
      document.title = 'Dashboard | AstraGuard';
    } else if (path.startsWith('/investigate')) {
      const parts = path.split('/');
      if (parts[2]) {
        document.title = `Investigation ${parts[2]} | AstraGuard`;
      } else {
        document.title = 'Investigate | AstraGuard';
      }
    } else if (path.startsWith('/identity')) {
      document.title = 'Identity Intelligence | AstraGuard';
    } else if (path.startsWith('/risk-radar')) {
      document.title = 'Risk Radar | AstraGuard';
    } else if (path.startsWith('/evidence')) {
      const parts = path.split('/');
      if (parts[2]) {
        document.title = `Evidence ${parts[2]} | AstraGuard`;
      } else {
        document.title = 'Evidence Vault | AstraGuard';
      }
    } else if (path.startsWith('/history')) {
      document.title = 'Investigation History | AstraGuard';
    } else if (path.startsWith('/assistant')) {
      document.title = 'Astra Assistant | AstraGuard';
    } else if (path.startsWith('/police')) {
      document.title = 'Law Enforcement Portal | AstraGuard';
    } else if (path.startsWith('/incident')) {
      const parts = path.split('/');
      if (parts[2]) {
        document.title = `Incident ${parts[2]} | AstraGuard`;
      } else {
        document.title = 'Incident Management | AstraGuard';
      }
    } else {
      document.title = 'AstraGuard — AI Digital Safety Layer';
    }
  }, [location]);
}

// Wrapper for Dynamic Investigation Case Routes
function InvestigationRouteWrapper({ currentInvestigation, setCurrentInvestigation }) {
  const { investigationId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (investigationId) {
      fetch(`/api/investigations/${investigationId}`)
        .then((res) => res.ok ? res.json() : Promise.reject())
        .then((data) => setCurrentInvestigation(data))
        .catch(() => {
          const matched = demoInvestigations.find(d => d.id === investigationId) || demoInvestigations[0];
          setCurrentInvestigation(matched);
        });
    }
  }, [investigationId, setCurrentInvestigation]);

  return (
    <InvestigatePage
      initialCaseId={investigationId}
      onStartInvestigation={(type, content, presetId) => {
        const matched = demoInvestigations.find(d => d.id === presetId) || demoInvestigations[0];
        setCurrentInvestigation({ ...matched, input_content: content || matched.input_content });
      }}
    />
  );
}

export default function App() {
  const [currentInvestigation, setCurrentInvestigation] = useState(demoInvestigations[0]);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Set document title dynamically
  useDocumentTitle();

  const isDemoRoute = location.pathname.startsWith('/demo');

  // If path is /demo/*, render standalone simulation page without AstraGuard layout shell
  if (isDemoRoute) {
    return (
      <ErrorBoundary>
        <Routes>
          <Route path="/demo/*" element={<ThreatSimulationPage />} />
        </Routes>
      </ErrorBoundary>
    );
  }

  const handleStartInvestigation = async (input_type, content, preset_id) => {
    try {
      const res = await fetch('/api/investigations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input_type: input_type,
          input_content: content,
          preset_id: preset_id
        })
      });
      if (!res.ok) throw new Error('API offline');
      const data = await res.json();
      setCurrentInvestigation(data);
      navigate(`/investigate/${data.id || 'AG-CASE-001'}`);
    } catch (err) {
      const matched = demoInvestigations.find(d => d.id === preset_id) || demoInvestigations[0];
      setCurrentInvestigation({
        ...matched,
        input_content: content || matched.input_content
      });
      navigate(`/investigate/${matched.id}`);
    }
  };

  const handleSelectRadarItem = async (radarItem) => {
    try {
      const res = await fetch(`/api/radar/${radarItem.id}/investigate`, {
        method: 'POST'
      });
      if (!res.ok) throw new Error('API offline');
      const data = await res.json();
      setCurrentInvestigation(data);
      navigate(`/investigate/${data.id}`);
    } catch (err) {
      const matched = demoInvestigations[0];
      setCurrentInvestigation({
        ...matched,
        title: radarItem.title,
        input_content: radarItem.preloaded_input
      });
      navigate(`/investigate/${matched.id}`);
    }
  };

  const handleSelectSavedInvestigation = async (inv_id) => {
    try {
      const res = await fetch(`/api/investigations/${inv_id}`);
      if (!res.ok) throw new Error('API offline');
      const data = await res.json();
      setCurrentInvestigation(data);
    } catch (err) {
      const matched = demoInvestigations.find(d => d.id === inv_id) || demoInvestigations[0];
      setCurrentInvestigation(matched);
    } finally {
      navigate(`/investigate/${inv_id}`);
    }
  };

  const activeTabName = () => {
    const p = location.pathname;
    if (p === '/') return 'DASHBOARD';
    if (p.startsWith('/investigate')) return 'INVESTIGATE';
    if (p.startsWith('/identity')) return 'IDENTITY';
    if (p.startsWith('/risk-radar')) return 'RISK RADAR';
    if (p.startsWith('/evidence')) return 'EVIDENCE VAULT';
    if (p.startsWith('/history')) return 'HISTORY';
    if (p.startsWith('/assistant')) return 'ASSISTANT';
    if (p.startsWith('/police')) return 'POLICE PORTAL';
    if (p.startsWith('/incident')) return 'INCIDENT MANAGEMENT';
    return 'WORKSPACE';
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#F5F1E8] text-[#1C1C1A] flex font-sans">
        
        {/* SIDEBAR NAVIGATION */}
        <Sidebar
          onOpenAssistant={() => setIsAssistantOpen(true)}
        />

        {/* MAIN CONTAINER */}
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto bg-[#F5F1E8]">
          
          {/* TOP HEADER */}
          <header className="sticky top-0 z-20 w-full bg-[#FFFFFF] backdrop-blur border-b border-[#D4CEC2] px-6 py-3 flex items-center justify-between shadow-subtle">
            <div className="flex items-center space-x-3">
              <span className="text-xs font-mono font-bold text-[#1C1C1A]">ASTRAGUARD INTELLIGENCE OS</span>
              <span className="text-[#858078] text-xs">•</span>
              <span className="text-[11px] font-mono text-[#C74634] font-bold">
                {activeTabName()} WORKSPACE
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setIsCommandPaletteOpen(true)}
                className="hidden sm:flex items-center space-x-2 bg-[#FAF8F4] hover:bg-[#FAF8F4]/80 border border-[#D4CEC2] px-3 py-1.5 rounded-lg text-xs text-[#1C1C1A] hover:text-[#C74634] transition-all font-mono cursor-pointer"
              >
                <Search className="w-3.5 h-3.5 text-[#C74634]" />
                <span>Command Palette...</span>
                <kbd className="bg-[#FFFFFF] border border-[#D4CEC2] px-1.5 py-0.5 text-[9px] font-mono text-[#858078] rounded flex items-center">
                  <Command className="w-2.5 h-2.5 mr-0.5" /> K
                </kbd>
              </button>

              <button
                type="button"
                onClick={() => setIsAssistantOpen(true)}
                className="flex items-center space-x-2 bg-[#C74634] hover:bg-[#9F2F24] text-white px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer shadow-subtle"
              >
                <Bot className="w-4 h-4 text-white" />
                <span>Astra Assistant</span>
              </button>
            </div>
          </header>

          {/* PAGE CONTENT ROUTES */}
          <main className="flex-1 p-3 sm:p-6 bg-[#F5F1E8] pb-12">
            <Routes>
              <Route
                path="/"
                element={
                  <DashboardPage
                    onStartInvestigation={handleStartInvestigation}
                    onSelectSavedInvestigation={handleSelectSavedInvestigation}
                  />
                }
              />

              <Route
                path="/investigate"
                element={
                  <InvestigatePage
                    onStartInvestigation={handleStartInvestigation}
                  />
                }
              />

              <Route
                path="/investigate/:investigationId"
                element={
                  <InvestigationRouteWrapper
                    currentInvestigation={currentInvestigation}
                    setCurrentInvestigation={setCurrentInvestigation}
                  />
                }
              />

              <Route path="/identity" element={<IdentityPage />} />

              <Route
                path="/risk-radar"
                element={<RiskRadarPage onInvestigateRadarItem={handleSelectRadarItem} />}
              />

              <Route
                path="/evidence"
                element={
                  <EvidenceVaultPage
                    onSelectSavedInvestigation={handleSelectSavedInvestigation}
                  />
                }
              />

              <Route
                path="/evidence/:evidenceId"
                element={
                  <EvidenceGraphPage
                    investigation={currentInvestigation || demoInvestigations[0]}
                  />
                }
              />

              <Route
                path="/history"
                element={
                  <EvidenceVaultPage
                    onSelectSavedInvestigation={handleSelectSavedInvestigation}
                  />
                }
              />

              <Route
                path="/assistant"
                element={
                  <DashboardPage
                    onStartInvestigation={handleStartInvestigation}
                    onSelectSavedInvestigation={handleSelectSavedInvestigation}
                  />
                }
              />

              <Route path="/police" element={<HelpFinderPage />} />

              <Route path="/incident" element={<HelpFinderPage />} />
              <Route path="/incident/:incidentId" element={<HelpFinderPage />} />

              {/* 404 NOT FOUND CATCH-ALL ROUTE */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

        </div>

        {/* DEVELOPER INTERACTION TELEMETRY BAR */}
        <InteractionStatusPanel activeTab={location.pathname.replace('/', '') || 'dashboard'} inputMode="desk" />

        {/* MODALS & DRAWERS */}
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          onSelectPreset={(presetId) => handleStartInvestigation('text', '', presetId)}
        />

        <AstraAssistant
          isOpen={isAssistantOpen || location.pathname === '/assistant'}
          onClose={() => {
            setIsAssistantOpen(false);
            if (location.pathname === '/assistant') navigate(-1);
          }}
          activeCaseId={currentInvestigation?.id}
        />

        <ReportModal
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
          investigation={currentInvestigation || demoInvestigations[0]}
        />

      </div>
    </ErrorBoundary>
  );
}
