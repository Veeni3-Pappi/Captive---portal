import React, { useState } from 'react';
import { SITE_CONFIG, WIFI_PLANS } from './config/site';
import { WifiPlan, ActiveSession } from './types';
import { Header } from './components/Header';
import { PlanSelector } from './components/PlanSelector';
import { MpesaSection } from './components/MpesaSection';
import { VoucherLoginForm } from './components/VoucherLoginForm';
import { SessionStatus } from './components/SessionStatus';
import { SupportModal } from './components/SupportModal';
import { Footer } from './components/Footer';
import { 
  CreditCard, 
  Ticket, 
  Gauge, 
  Sparkle, 
  Lightning
} from '@phosphor-icons/react';

export const App: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<WifiPlan>(
    WIFI_PLANS.find((p) => p.id === 'plan-1d') || WIFI_PLANS[0]
  );
  const [activeTab, setActiveTab] = useState<'mpesa' | 'voucher' | 'status'>('mpesa');
  const [activeSession, setActiveSession] = useState<ActiveSession | null>(null);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [claimedTrial, setClaimedTrial] = useState(false);

  const handleConnect = (session: ActiveSession) => {
    setActiveSession(session);
    setActiveTab('status');
  };

  const handleDisconnect = () => {
    setActiveSession(null);
    setActiveTab('mpesa');
  };

  const handleClaimFreeTrial = () => {
    setClaimedTrial(true);
    handleConnect({
      isConnected: true,
      ipAddress: '192.168.88.243',
      macAddress: 'DC:A6:32:8B:11:0E',
      planName: '5-Minute Complimentary Pass',
      timeRemainingSeconds: 300,
      bytesDown: 450000,
      bytesUp: 120000,
      uptimeSeconds: 0,
      expiresAt: new Date(Date.now() + 300000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col justify-between bg-grid-pattern">
      {/* Top Bar */}
      <Header onOpenSupport={() => setIsSupportOpen(true)} />

      {/* Main Content Container */}
      <main className="w-full max-w-xl mx-auto px-4 py-5 flex-1 space-y-5">
        {/* Hero Header Card */}
        <div className="surface-card rounded-2xl p-5 border border-slate-800 text-center relative overflow-hidden">
          <div className="space-y-1.5 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold mb-1">
              <Lightning size={14} weight="fill" />
              <span>Fastest Internet in Town</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
              Connect to {SITE_CONFIG.brandName}
            </h2>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Select an unlimited package below and pay with M-PESA for instant, seamless WiFi access.
            </p>
          </div>

          {/* Complimentary Free Trial banner if not claimed */}
          {SITE_CONFIG.freeTrialAvailable && !claimedTrial && !activeSession && (
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 text-left bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkle size={18} weight="fill" className="text-amber-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">Test Our Speed (5 Mins Free)</div>
                  <div className="text-[11px] text-slate-400">No payment required for trial</div>
                </div>
              </div>
              <button
                onClick={handleClaimFreeTrial}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors shrink-0"
              >
                Claim Pass
              </button>
            </div>
          )}
        </div>

        {/* Tab Navigation (M-Pesa / Voucher / My Session) */}
        <div className="grid grid-cols-3 gap-1.5 p-1.5 bg-slate-950/90 rounded-2xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('mpesa')}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl transition-all duration-150 ${
              activeTab === 'mpesa'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <CreditCard size={15} weight="bold" />
            <span>M-PESA</span>
          </button>

          <button
            onClick={() => setActiveTab('voucher')}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl transition-all duration-150 ${
              activeTab === 'voucher'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Ticket size={15} weight="bold" />
            <span>Voucher</span>
          </button>

          <button
            onClick={() => setActiveTab('status')}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl transition-all duration-150 relative ${
              activeTab === 'status'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Gauge size={15} weight="bold" />
            <span>My Session</span>
            {activeSession && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 absolute top-2 right-2" />
            )}
          </button>
        </div>

        {/* Tab 1: M-PESA Purchase Flow */}
        {activeTab === 'mpesa' && (
          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2.5 px-0.5">
                <h3 className="text-sm font-bold text-slate-200">
                  Step 1: Choose Your Plan
                </h3>
                <span className="text-xs text-slate-400">
                  {WIFI_PLANS.length} Unlimited Tiers
                </span>
              </div>
              <PlanSelector
                selectedPlan={selectedPlan}
                onSelectPlan={(plan) => setSelectedPlan(plan)}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2.5 px-0.5">
                <h3 className="text-sm font-bold text-slate-200">
                  Step 2: Pay & Connect
                </h3>
                <span className="text-xs text-emerald-400 font-medium">
                  Instant STK Push
                </span>
              </div>
              <MpesaSection
                selectedPlan={selectedPlan}
                onConnect={handleConnect}
              />
            </div>
          </div>
        )}

        {/* Tab 2: Voucher / Scratch Card Flow */}
        {activeTab === 'voucher' && (
          <div className="space-y-4">
            <VoucherLoginForm onConnect={handleConnect} />
          </div>
        )}

        {/* Tab 3: Session Status Flow */}
        {activeTab === 'status' && (
          <div className="space-y-4">
            {activeSession ? (
              <SessionStatus
                session={activeSession}
                onDisconnect={handleDisconnect}
                onExtend={() => setActiveTab('mpesa')}
              />
            ) : (
              <div className="surface-card rounded-2xl p-8 border border-slate-800 text-center space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-400 mx-auto">
                  <Gauge size={26} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">No Active Session Found</h3>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1">
                    You are not currently authenticated on this device. Purchase a package or log in with a voucher to start browsing.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('mpesa')}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold transition-colors"
                >
                  View WiFi Plans
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Support & Help Modal */}
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
