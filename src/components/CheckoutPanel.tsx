import React, { useState, useEffect } from 'react';
import { WifiPlan, ActiveSession } from '../types';
import { SITE_CONFIG } from '../config/site';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { 
  DeviceMobile, 
  ShieldCheck, 
  CheckCircle, 
  Storefront,
  ArrowRight,
  ClockCountdown,
  Receipt,
  Ticket,
  LockKey,
  Lightning
} from '@phosphor-icons/react';

interface CheckoutPanelProps {
  selectedPlan: WifiPlan;
  onConnect: (session: ActiveSession) => void;
}

export const CheckoutPanel: React.FC<CheckoutPanelProps> = ({
  selectedPlan,
  onConnect,
}) => {
  const [checkoutMode, setCheckoutMode] = useState<'stk' | 'manual_code' | 'voucher'>('stk');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [mpesaCode, setMpesaCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [voucherCode, setVoucherCode] = useState('');
  const [voucherError, setVoucherError] = useState('');

  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'initiating' | 'waiting_pin' | 'verifying' | 'success'>('idle');
  const [countdown, setCountdown] = useState(30);

  // Countdown timer when waiting for PIN
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (paymentStatus === 'waiting_pin' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [paymentStatus, countdown]);

  const validatePhone = (phone: string): boolean => {
    const clean = phone.replace(/\s+/g, '').replace(/[-+]/g, '');
    const kenyaRegex = /^(?:254|\+254|0)?([17]\d{8})$/;
    if (!kenyaRegex.test(clean)) {
      setPhoneError('Enter a valid Safaricom/Airtel number (e.g. 0790 322 397)');
      return false;
    }
    setPhoneError('');
    return true;
  };

  const handleInitiateSTK = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhone(phoneNumber)) return;

    setPaymentStatus('initiating');
    setTimeout(() => {
      setPaymentStatus('waiting_pin');
      setCountdown(30);
    }, 1200);
  };

  const handleSimulatePinEntered = () => {
    setPaymentStatus('verifying');
    setTimeout(() => {
      setPaymentStatus('success');
      setTimeout(() => {
        onConnect({
          isConnected: true,
          ipAddress: '192.168.88.243',
          macAddress: 'DC:A6:32:8B:11:0E',
          planName: selectedPlan.name,
          timeRemainingSeconds: selectedPlan.durationMinutes * 60,
          bytesDown: 1420500,
          bytesUp: 450200,
          uptimeSeconds: 0,
          expiresAt: new Date(Date.now() + selectedPlan.durationMinutes * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });
      }, 1200);
    }, 1400);
  };

  const handleManualCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = mpesaCode.trim().toUpperCase();
    if (clean.length < 8) {
      setCodeError('Enter a valid 10-character M-Pesa receipt code');
      return;
    }
    setCodeError('');
    setPaymentStatus('verifying');
    setTimeout(() => {
      setPaymentStatus('success');
      setTimeout(() => {
        onConnect({
          isConnected: true,
          ipAddress: '192.168.88.243',
          macAddress: 'DC:A6:32:8B:11:0E',
          planName: selectedPlan.name,
          timeRemainingSeconds: selectedPlan.durationMinutes * 60,
          bytesDown: 1420500,
          bytesUp: 450200,
          uptimeSeconds: 0,
          expiresAt: new Date(Date.now() + selectedPlan.durationMinutes * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });
      }, 1000);
    }, 1200);
  };

  const handleVoucherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = voucherCode.trim().toUpperCase();
    if (clean.length < 4) {
      setVoucherError('Enter a valid voucher token code');
      return;
    }
    setVoucherError('');
    setPaymentStatus('verifying');
    setTimeout(() => {
      setPaymentStatus('success');
      setTimeout(() => {
        onConnect({
          isConnected: true,
          ipAddress: '192.168.88.192',
          macAddress: 'DC:A6:32:8B:11:0E',
          planName: 'Voucher Ticket Pass',
          timeRemainingSeconds: 86400,
          bytesDown: 2400000,
          bytesUp: 650000,
          uptimeSeconds: 0,
          expiresAt: new Date(Date.now() + 86400000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });
      }, 1000);
    }, 1200);
  };

  return (
    <div className="nixtio-card p-5 space-y-4">
      {/* Checkout Terminal Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#1f2738]">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
            <LockKey size={15} className="text-emerald-400" />
            <span>Payment Terminal</span>
          </h3>
          <p className="text-[11px] text-slate-400">Direct gateway for {SITE_CONFIG.brandName}</p>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Till {SITE_CONFIG.tillNumber}</span>
        </div>
      </div>

      {/* Selected Plan Summary Itemization */}
      <div className="bg-[#141924] rounded-xl p-3.5 border border-[#232c3d] space-y-2.5">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Selected Package
            </div>
            <div className="text-sm font-bold text-slate-100 flex items-center gap-1.5 mt-0.5">
              <span>{selectedPlan.name}</span>
              {selectedPlan.badge && (
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {selectedPlan.badge}
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-extrabold font-mono text-emerald-400">
              Ksh {selectedPlan.priceKes}
            </div>
            <div className="text-[10px] text-slate-500">
              Zero fees
            </div>
          </div>
        </div>

        {/* Feature bullets */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1f2738] text-[11px] text-slate-300">
          <div className="flex items-center gap-1">
            <Lightning size={12} className="text-emerald-400" weight="fill" />
            <span>{selectedPlan.speedLabel}</span>
          </div>
          <div className="flex items-center gap-1">
            <ShieldCheck size={12} className="text-sky-400" weight="fill" />
            <span>Unlimited Quota</span>
          </div>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="grid grid-cols-3 gap-1 p-1 bg-[#0d1017] rounded-xl border border-[#1f2738] text-xs font-semibold">
        <button
          type="button"
          onClick={() => { setCheckoutMode('stk'); setPaymentStatus('idle'); }}
          className={`py-1.5 px-2 rounded-lg transition-all ${
            checkoutMode === 'stk'
              ? 'bg-[#1e2738] text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          STK Push
        </button>
        <button
          type="button"
          onClick={() => { setCheckoutMode('manual_code'); setPaymentStatus('idle'); }}
          className={`py-1.5 px-2 rounded-lg transition-all ${
            checkoutMode === 'manual_code'
              ? 'bg-[#1e2738] text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          SMS Code
        </button>
        <button
          type="button"
          onClick={() => { setCheckoutMode('voucher'); setPaymentStatus('idle'); }}
          className={`py-1.5 px-2 rounded-lg transition-all ${
            checkoutMode === 'voucher'
              ? 'bg-[#1e2738] text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Voucher
        </button>
      </div>

      {/* Mode 1: STK Push Form */}
      {checkoutMode === 'stk' && (
        <>
          {paymentStatus === 'idle' && (
            <form onSubmit={handleInitiateSTK} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>M-PESA Phone Number</span>
                  <span className="text-[10px] text-emerald-400 font-normal">Safaricom STK</span>
                </label>
                <Input
                  type="tel"
                  placeholder="07XX XXX XXX or 01XX XXX XXX"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    if (phoneError) setPhoneError('');
                  }}
                  leftAddon={<DeviceMobile size={18} className="text-emerald-400" weight="bold" />}
                  error={phoneError}
                  autoComplete="tel"
                  className="bg-[#0e121b] border-[#222b3d] text-sm"
                />
              </div>

              <Button
                type="submit"
                variant="mpesa"
                size="lg"
                className="w-full h-12 text-xs font-bold uppercase tracking-wider gap-2 shadow-lg shadow-emerald-950/40"
              >
                <span>Pay Ksh {selectedPlan.priceKes} via M-PESA</span>
                <ArrowRight size={16} weight="bold" />
              </Button>

              <div className="bg-[#0d1017] rounded-lg p-2.5 border border-[#1e2738] flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Storefront size={14} className="text-emerald-400" />
                  <span>Buy Goods Till:</span>
                </div>
                <span className="font-mono font-bold text-slate-200">{SITE_CONFIG.tillNumber}</span>
              </div>
            </form>
          )}

          {paymentStatus === 'initiating' && (
            <div className="py-8 text-center space-y-3">
              <div className="w-10 h-10 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin mx-auto" />
              <div className="text-xs font-bold text-white">Sending STK Push to phone...</div>
              <p className="text-[11px] text-slate-400">Contacting Safaricom Daraja API for {phoneNumber}...</p>
            </div>
          )}

          {paymentStatus === 'waiting_pin' && (
            <div className="py-4 text-center space-y-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                <DeviceMobile size={24} weight="bold" className="animate-bounce" />
              </div>

              <div className="space-y-1">
                <div className="text-sm font-bold text-white">Prompt Sent to Your Phone!</div>
                <p className="text-xs text-slate-300">
                  Enter your M-PESA PIN for <span className="font-bold text-emerald-400">Ksh {selectedPlan.priceKes}</span> to Till <span className="font-mono text-white">{SITE_CONFIG.tillNumber}</span>.
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-300 bg-amber-500/10 border border-amber-500/20 py-1 px-3 rounded-lg">
                <ClockCountdown size={14} />
                <span>Expires in {countdown}s</span>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <Button
                  type="button"
                  variant="mpesa"
                  onClick={handleSimulatePinEntered}
                  className="w-full text-xs"
                >
                  I have entered my PIN
                </Button>
                <button
                  type="button"
                  onClick={() => setPaymentStatus('idle')}
                  className="text-[11px] text-slate-400 hover:text-slate-200"
                >
                  Cancel or retry
                </button>
              </div>
            </div>
          )}

          {paymentStatus === 'verifying' && (
            <div className="py-8 text-center space-y-3">
              <div className="w-10 h-10 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin mx-auto" />
              <div className="text-xs font-bold text-white">Verifying Payment...</div>
              <p className="text-[11px] text-slate-400">Authorizing access on MikroTik RouterOS...</p>
            </div>
          )}

          {paymentStatus === 'success' && (
            <div className="py-6 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle size={28} weight="fill" />
              </div>
              <div className="text-sm font-bold text-white">Payment Verified!</div>
              <p className="text-xs text-emerald-400">Activating your high-speed connection...</p>
            </div>
          )}
        </>
      )}

      {/* Mode 2: Manual M-Pesa Code Fallback */}
      {checkoutMode === 'manual_code' && (
        <form onSubmit={handleManualCodeSubmit} className="space-y-3.5">
          <div className="text-xs text-slate-300 leading-relaxed bg-[#0d1017] p-3 rounded-xl border border-[#1e2738]">
            Pay <strong className="text-emerald-400">Ksh {selectedPlan.priceKes}</strong> to Buy Goods Till <strong className="text-white font-mono">{SITE_CONFIG.tillNumber}</strong>, then paste the M-Pesa SMS code below:
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              M-PESA Confirmation Code
            </label>
            <Input
              placeholder="e.g. SKL84920KL"
              value={mpesaCode}
              onChange={(e) => {
                setMpesaCode(e.target.value.toUpperCase());
                if (codeError) setCodeError('');
              }}
              leftAddon={<Receipt size={18} className="text-emerald-400" />}
              error={codeError}
              className="uppercase font-mono tracking-wider text-sm bg-[#0e121b] border-[#222b3d]"
            />
          </div>

          <Button
            type="submit"
            variant="mpesa"
            size="lg"
            className="w-full text-xs font-bold uppercase tracking-wider"
          >
            Verify Code & Connect
          </Button>
        </form>
      )}

      {/* Mode 3: Voucher Code */}
      {checkoutMode === 'voucher' && (
        <form onSubmit={handleVoucherSubmit} className="space-y-3.5">
          <div className="text-xs text-slate-300 leading-relaxed bg-[#0d1017] p-3 rounded-xl border border-[#1e2738]">
            Enter a prepaid voucher or ticket token issued by {SITE_CONFIG.brandName}:
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Voucher Ticket Code
            </label>
            <Input
              placeholder="e.g. WSH-8921"
              value={voucherCode}
              onChange={(e) => {
                setVoucherCode(e.target.value.toUpperCase());
                if (voucherError) setVoucherError('');
              }}
              leftAddon={<Ticket size={18} className="text-emerald-400" />}
              error={voucherError}
              className="uppercase font-mono tracking-wider text-sm bg-[#0e121b] border-[#222b3d]"
            />
          </div>

          <Button
            type="submit"
            variant="mpesa"
            size="lg"
            className="w-full text-xs font-bold uppercase tracking-wider"
          >
            Authenticate Voucher
          </Button>
        </form>
      )}
    </div>
  );
};
