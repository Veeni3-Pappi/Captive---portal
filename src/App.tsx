import React, { useState } from 'react';
import { SITE_CONFIG, WIFI_PLANS } from './config/site';
import { WifiPlan, ActiveSession } from './types';
import { Header } from './components/Header';
import { NetworkMetrics } from './components/NetworkMetrics';
import { PlanSelector } from './components/PlanSelector';
import { CheckoutPanel } from './components/CheckoutPanel';
import { SessionStatus } from './components/SessionStatus';
import { SupportModal } from './components/SupportModal';
import { Footer } from './components/Footer';
import { 
  Sparkle, 
  ShieldCheck, 
  Lightning, 
  Check, 
  LockKey
} from '@phosphor-icons/react';

export const App: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<WifiPlan>(
    WIFI_PLANS.find((p) => p.id === 'plan-1d') || WIFI_PLANS[0]
  );
  const [activeSession, setActiveSession] = useState<ActiveSession | null>(null);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [claimedTrial, setClaimedTrial] = useState(false);

  const handleConnect = (session: ActiveSession) => {
    setActiveSession(session);
  };

  const handleDisconnect = () => {
    setActiveSession(null);
  };

  const handleClaimFreeTrial = () => {
    setClaimedTrial(true);
    handleConnect({
      isConnected: true,
      ipAddress: '192.168.88.243',
      macAddress: 'DC:A6:32:8B:11:0E',
      planName: '5-Minute Speed Test Pass',
      timeRemainingSeconds: 300,
      bytesDown: 450000,
      bytesUp: 120000,
      uptimeSeconds: 0,
      expiresAt: new Date(Date.now() + 300000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0d14] text-slate-100 flex flex-col justify-between dashboard-grid">
      {/* Top Header */}
      <Header
        isConnected={!!activeSession}
        onOpenSupport={() => setIsSupportOpen(true)}
        onViewSession={() => {
          // scrolls to or focuses session
        }}
      />

      {/* Main Command Center Layout */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 flex-1 space-y-6">
        {/* Top Metric Strip (Nixtio & Fireart Style) */}
        <NetworkMetrics isConnected={!!activeSession} />

        {/* 2-Column Responsive Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Plan Explorer & Network Highlights (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Free Trial Callout Banner */}
            {SITE_CONFIG.freeTrialAvailable && !claimedTrial && !activeSession && (
              <div className="nixtio-card-subtle p-3.5 border-amber-500/30 flex items-center justify-between gap-3 bg-[#161a12]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300 shrink-0">
                    <Sparkle size={16} weight="fill" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>Complimentary 5-Minute Speed Pass</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300">
                        FREE
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-300">
                      Test speed & latency on your phone before paying
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleClaimFreeTrial}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shrink-0 shadow-sm"
                >
                  Claim Pass
                </button>
              </div>
            )}

            {/* Plan Selector Card */}
            <div className="nixtio-card p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#1f2738]">
                <div>
                  <h2 className="text-sm font-bold text-white tracking-tight">
                    Select Access Tier
                  </h2>
                  <p className="text-[11px] text-slate-400">
                    High-speed fiber connectivity with zero throttling
                  </p>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#1e2738] text-slate-300 border border-slate-700">
                  {WIFI_PLANS.length} Tiers Available
                </span>
              </div>

              <PlanSelector
                selectedPlan={selectedPlan}
                onSelectPlan={(plan) => setSelectedPlan(plan)}
              />
            </div>

            {/* Network Assurances Bento Strip */}
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="nixtio-card-subtle p-3 space-y-1">
                <div className="text-emerald-400 font-bold flex items-center gap-1 text-[11px]">
                  <Lightning size={14} weight="fill" />
                  <span>Unlimited Data</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  No bandwidth caps or throttling on all packages
                </div>
              </div>

              <div className="nixtio-card-subtle p-3 space-y-1">
                <div className="text-sky-400 font-bold flex items-center gap-1 text-[11px]">
                  <ShieldCheck size={14} weight="fill" />
                  <span>Instant STK Push</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Automated PIN prompt to Buy Goods Till 7181852
                </div>
              </div>

              <div className="nixtio-card-subtle p-3 space-y-1">
                <div className="text-amber-400 font-bold flex items-center gap-1 text-[11px]">
                  <LockKey size={14} weight="fill" />
                  <span>MikroTik Guard</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Dedicated bandwidth allocation per connected device
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Checkout & Authentication Terminal (5 cols) */}
          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-20">
            {activeSession ? (
              <div className="space-y-4">
                <SessionStatus
                  session={activeSession}
                  onDisconnect={handleDisconnect}
                  onExtend={() => {
                    // allows choosing another plan
                  }}
                />

                <div className="nixtio-card-subtle p-4 border-[#1f2738] text-xs text-slate-300 space-y-2">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <Check size={14} className="text-emerald-400" />
                    <span>Device Authenticated</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Your MAC address has been granted full internet access via MikroTik RouterOS gateway.
                  </p>
                </div>
              </div>
            ) : (
              <CheckoutPanel
                selectedPlan={selectedPlan}
                onConnect={handleConnect}
              />
            )}
          </div>
        </div>
      </main>

      {/* Support & Payment Assistance Modal */}
      <SupportModal
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
      />

      {/* Footer */}
      <Footer onOpenSupport={() => setIsSupportOpen(true)} />
    </div>
  );
};

export default App;
