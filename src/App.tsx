import React, { useState } from 'react';
import { WIFI_PLANS } from './config/site';
import { WifiPlan, ActiveSession } from './types';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { PlanTable } from './components/PlanTable';
import { CheckoutPanel } from './components/CheckoutPanel';
import { SessionStatus } from './components/SessionStatus';
import { SupportModal } from './components/SupportModal';

type NavView = 'plans' | 'session' | 'help';

export const App: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<WifiPlan>(
    WIFI_PLANS.find((p) => p.id === 'plan-1d') || WIFI_PLANS[0]
  );
  const [activeSession, setActiveSession] = useState<ActiveSession | null>(null);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [activeView, setActiveView] = useState<NavView>('plans');

  const handleConnect = (session: ActiveSession) => {
    setActiveSession(session);
    setActiveView('session');
  };

  const handleDisconnect = () => {
    setActiveSession(null);
    setActiveView('plans');
  };

  const handleClaimTrial = () => {
    handleConnect({
      isConnected: true,
      ipAddress: '192.168.88.243',
      macAddress: 'DC:A6:32:8B:11:0E',
      planName: '5-Minute Speed Test Pass',
      timeRemainingSeconds: 300,
      bytesDown: 450000,
      bytesUp: 120000,
      uptimeSeconds: 0,
      expiresAt: new Date(Date.now() + 300000).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    });
  };

  const handleNavigate = (view: NavView) => {
    if (view === 'help') {
      setIsSupportOpen(true);
      return;
    }
    setActiveView(view);
  };

  return (
    <div className="app-shell">
      {/* ── Sidebar ── */}
      <Sidebar
        activeView={activeView}
        onNavigate={handleNavigate}
        isConnected={!!activeSession}
      />

      {/* ── Main content ── */}
      <div className="main-content">
        <TopBar isConnected={!!activeSession} onOpenSupport={() => setIsSupportOpen(true)} />

        <div className="page-body">
          {/* ── Plans view ── */}
          {activeView === 'plans' && (
            <>
              <div className="plan-column">
                <PlanTable
                  selectedPlan={selectedPlan}
                  onSelectPlan={setSelectedPlan}
                />
              </div>
              <div className="checkout-column">
                <CheckoutPanel
                  selectedPlan={selectedPlan}
                  onConnect={handleConnect}
                  onClaimTrial={handleClaimTrial}
                />
              </div>
            </>
          )}

          {/* ── Session view ── */}
          {activeView === 'session' && activeSession && (
            <>
              <div className="plan-column">
                <SessionStatus
                  session={activeSession}
                  onDisconnect={handleDisconnect}
                  onExtend={() => setActiveView('plans')}
                />
              </div>
              <div className="checkout-column" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: '0' }}>
                {/* Compact plan info when in session */}
                <div style={{ marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #1b1f2b' }}>
                  <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#4a5468', marginBottom: '10px' }}>
                    Current Package
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#e2e8f0' }}>
                    {activeSession.planName}
                  </div>
                  <div style={{ fontSize: '12px', color: '#4a5468', marginTop: '4px' }}>
                    Device authenticated · Full access granted
                  </div>
                </div>
                <button
                  className="btn-outline"
                  style={{ width: '100%', justifyContent: 'center', marginBottom: '10px' }}
                  onClick={() => setActiveView('plans')}
                >
                  View all plans
                </button>
                <button
                  className="btn-ghost"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => setIsSupportOpen(true)}
                >
                  Contact support
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Support Modal ── */}
      <SupportModal isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />
    </div>
  );
};

export default App;
