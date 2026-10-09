import React, { useState, useEffect } from 'react';
import { WifiPlan, ActiveSession } from '../types';
import { SITE_CONFIG } from '../config/site';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { 
  DeviceMobile, 
  ShieldCheck, 
  CheckCircle, 
  Receipt, 
  ClockCountdown, 
  Storefront,
  ArrowRight
} from '@phosphor-icons/react';

interface MpesaSectionProps {
  selectedPlan: WifiPlan;
  onConnect: (session: ActiveSession) => void;
}

export const MpesaSection: React.FC<MpesaSectionProps> = ({
  selectedPlan,
  onConnect,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'initiating' | 'waiting_pin' | 'verifying' | 'success'>('idle');
  const [countdown, setCountdown] = useState(30);
  const [mpesaCode, setMpesaCode] = useState('');
  const [showManualCode, setShowManualCode] = useState(false);
  const [manualCodeError, setManualCodeError] = useState('');

  // Countdown timer when waiting for PIN
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (paymentStatus === 'waiting_pin' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0 && paymentStatus === 'waiting_pin') {
      // Prompt timeout
    }
    return () => clearInterval(timer);
  }, [paymentStatus, countdown]);

  const validatePhone = (phone: string): boolean => {
    const clean = phone.replace(/\s+/g, '').replace(/[-+]/g, '');
    // Kenyan numbers: 07XX, 01XX (10 digits) or 2547XX, 2541XX (12 digits)
    const kenyaRegex = /^(?:254|\+254|0)?([17]\d{8})$/;
    if (!kenyaRegex.test(clean)) {
      setPhoneError('Please enter a valid Safaricom/Airtel number (e.g. 0790 322 397)');
      return false;
    }
    setPhoneError('');
    return true;
  };

  const handleInitiatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhone(phoneNumber)) return;

    setPaymentStatus('initiating');
    // Simulate API request to M-Pesa Daraja
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
      }, 1500);
    }, 1500);
  };

  const handleManualCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = mpesaCode.trim().toUpperCase();
    if (clean.length < 8) {
      setManualCodeError('Enter a valid 10-character M-Pesa code (e.g. SKL84920KL)');
      return;
    }
    setManualCodeError('');
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
    }, 1200);
  };

  return (
    <div className="surface-card rounded-2xl p-5 border border-slate-800 space-y-5">
      {/* Till Info Banner */}
      <div className="bg-slate-950/80 rounded-xl p-3.5 border border-slate-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <Storefront size={18} weight="bold" />
          </div>
          <div>
            <div className="text-[11px] font-medium text-slate-400">
              Lipa na M-PESA • Buy Goods Till
            </div>
            <div className="text-sm font-bold text-slate-100 tracking-wider font-mono">
              Till Number: <span className="text-emerald-400 font-extrabold">{SITE_CONFIG.tillNumber}</span>
            </div>
          </div>
        </div>
        <div className="text-right shrink-0">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
            Payable
          </span>
          <span className="text-base font-extrabold text-emerald-400">
            Ksh {selectedPlan.priceKes}/=
          </span>
        </div>
      </div>

      {paymentStatus === 'idle' && (
        <form onSubmit={handleInitiatePayment} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
              <span>M-PESA Phone Number</span>
              <span className="text-[11px] text-slate-400 font-normal">STK Push prompt</span>
            </label>
            <Input
              type="tel"
              placeholder="07XX XXX XXX or 01XX XXX XXX"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                if (phoneError) setPhoneError('');
              }}
              leftAddon={<DeviceMobile size={18} weight="bold" className="text-emerald-400" />}
              error={phoneError}
              autoComplete="tel"
            />
          </div>

          <Button
            type="submit"
            variant="mpesa"
            size="lg"
            className="w-full shadow-lg shadow-emerald-950/50"
          >
            <span>PAY KSH {selectedPlan.priceKes}/= VIA M-PESA</span>
            <ArrowRight size={18} weight="bold" />
          </Button>

          {/* Toggle Manual Code fallback */}
          <div className="text-center pt-1">
            <button
              type="button"
              onClick={() => setShowManualCode(!showManualCode)}
              className="text-xs text-slate-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
            >
              <Receipt size={14} />
              <span>Already paid manually to Till {SITE_CONFIG.tillNumber}? Click here</span>
            </button>
          </div>

          {/* Manual Code Input Drawer */}
          {showManualCode && (
            <div className="bg-slate-950/90 rounded-xl p-4 border border-slate-800 space-y-3 pt-3">
              <div className="text-xs text-slate-300 font-medium">
                Enter your M-PESA confirmation code:
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="e.g. SKL84920KL"
                  value={mpesaCode}
                  onChange={(e) => setMpesaCode(e.target.value.toUpperCase())}
                  error={manualCodeError}
                  className="uppercase font-mono tracking-wider text-xs"
                />
                <Button
                  type="button"
                  onClick={handleManualCodeSubmit}
                  variant="default"
                  className="shrink-0"
                >
                  Verify
                </Button>
              </div>
              <p className="text-[11px] text-slate-400">
                Send Ksh {selectedPlan.priceKes} to Buy Goods Till <strong className="text-slate-200">{SITE_CONFIG.tillNumber}</strong> then paste the M-Pesa SMS code above.
              </p>
            </div>
          )}

          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
            <ShieldCheck size={14} className="text-emerald-400" weight="fill" />
            <span>Instant access is granted immediately after entering your PIN</span>
          </div>
        </form>
      )}

      {paymentStatus === 'initiating' && (
        <div className="py-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin mx-auto" />
          <h4 className="text-sm font-bold text-white">Sending STK Push to Phone...</h4>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Contacting Safaricom M-Pesa servers for {phoneNumber}...
          </p>
        </div>
      )}

      {paymentStatus === 'waiting_pin' && (
        <div className="py-4 text-center space-y-4">
          <div className="relative w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
            <DeviceMobile size={28} weight="bold" className="animate-bounce" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>

          <div className="space-y-1">
            <h4 className="text-base font-bold text-white">
              Check Your Phone!
            </h4>
            <p className="text-xs text-slate-300 max-w-xs mx-auto leading-relaxed">
              An M-PESA prompt for <strong className="text-emerald-400">Ksh {selectedPlan.priceKes}</strong> has been sent to <strong className="text-white">{phoneNumber}</strong>.
            </p>
            <p className="text-xs text-slate-400 pt-1">
              Enter your M-PESA PIN to complete payment to <strong className="text-slate-200">{SITE_CONFIG.brandName}</strong>.
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs font-mono text-amber-300 bg-amber-500/10 border border-amber-500/20 py-1.5 px-3 rounded-lg w-fit mx-auto">
            <ClockCountdown size={16} />
            <span>Waiting for PIN ({countdown}s)</span>
          </div>

          {/* Realistic simulation action button */}
          <div className="pt-2 flex flex-col gap-2 max-w-xs mx-auto">
            <Button
              type="button"
              variant="mpesa"
              onClick={handleSimulatePinEntered}
              className="w-full"
            >
              I have entered my PIN
            </Button>
            <button
              type="button"
              onClick={() => setPaymentStatus('idle')}
              className="text-xs text-slate-400 hover:text-slate-200 transition-colors py-1"
            >
              Cancel or change number
            </button>
          </div>
        </div>
      )}

      {paymentStatus === 'verifying' && (
        <div className="py-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin mx-auto" />
          <h4 className="text-sm font-bold text-white">Verifying Transaction...</h4>
          <p className="text-xs text-slate-400">
            Confirming M-Pesa receipt with Till {SITE_CONFIG.tillNumber}...
          </p>
        </div>
      )}

      {paymentStatus === 'success' && (
        <div className="py-6 text-center space-y-3">
          <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400">
            <CheckCircle size={32} weight="fill" />
          </div>
          <h4 className="text-base font-bold text-white">Payment Confirmed!</h4>
          <p className="text-xs text-emerald-400 font-medium">
            Granting high-speed internet access...
          </p>
        </div>
      )}
    </div>
  );
};
