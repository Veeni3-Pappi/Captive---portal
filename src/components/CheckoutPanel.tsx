import React, { useState, useEffect } from 'react';
import { WifiPlan, ActiveSession } from '../types';
import { SITE_CONFIG } from '../config/site';
import {
  DeviceMobile,
  Receipt,
  Ticket,
  ArrowRight,
  ClockCountdown,
  CheckCircle,
} from '@phosphor-icons/react';

interface CheckoutPanelProps {
  selectedPlan: WifiPlan;
  onConnect: (session: ActiveSession) => void;
  onClaimTrial: () => void;
}

type PayMode = 'stk' | 'code' | 'voucher';
type PayStatus = 'idle' | 'initiating' | 'waiting_pin' | 'verifying' | 'success';

export const CheckoutPanel: React.FC<CheckoutPanelProps> = ({
  selectedPlan,
  onConnect,
  onClaimTrial,
}) => {
  const [mode, setMode] = useState<PayMode>('stk');
  const [phone, setPhone] = useState('');
  const [phoneErr, setPhoneErr] = useState('');
  const [mpesaCode, setMpesaCode] = useState('');
  const [codeErr, setCodeErr] = useState('');
  const [voucher, setVoucher] = useState('');
  const [voucherErr, setVoucherErr] = useState('');
  const [status, setStatus] = useState<PayStatus>('idle');
  const [countdown, setCountdown] = useState(30);

  // Reset status when plan changes
  useEffect(() => {
    setStatus('idle');
  }, [selectedPlan.id]);

  // Countdown ticker
  useEffect(() => {
    if (status !== 'waiting_pin') return;
    if (countdown <= 0) {
      setStatus('idle');
      return;
    }
    const t = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(t);
  }, [status, countdown]);

  const buildSession = (): ActiveSession => ({
    isConnected: true,
    ipAddress: '192.168.88.243',
    macAddress: 'DC:A6:32:8B:11:0E',
    planName: selectedPlan.name,
    timeRemainingSeconds: selectedPlan.durationMinutes * 60,
    bytesDown: 1024 * 1024,
    bytesUp: 256 * 1024,
    uptimeSeconds: 0,
    expiresAt: new Date(Date.now() + selectedPlan.durationMinutes * 60000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
  });

  const handleSTK = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = phone.replace(/\s+/g, '').replace(/[-+]/g, '');
    if (!/^(?:254|0)?[17]\d{8}$/.test(clean)) {
      setPhoneErr('Enter a valid Safaricom number (e.g. 0712 345 678)');
      return;
    }
    setPhoneErr('');
    setStatus('initiating');
    setTimeout(() => { setStatus('waiting_pin'); setCountdown(30); }, 1200);
  };

  const handlePinEntered = () => {
    setStatus('verifying');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => onConnect(buildSession()), 1200);
    }, 1400);
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mpesaCode.trim().length < 8) {
      setCodeErr('Enter a valid M-Pesa confirmation code (e.g. SKL84920KL)');
      return;
    }
    setCodeErr('');
    setStatus('verifying');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => onConnect(buildSession()), 1000);
    }, 1200);
  };

  const handleVoucherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (voucher.trim().length < 4) {
      setVoucherErr('Enter a valid voucher code');
      return;
    }
    setVoucherErr('');
    setStatus('verifying');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => onConnect({
        ...buildSession(),
        planName: 'Voucher Pass',
        timeRemainingSeconds: 86400,
      }), 1000);
    }, 1200);
  };

  const switchMode = (m: PayMode) => { setMode(m); setStatus('idle'); };

  return (
    <div>
      {/* Receipt header */}
      <div className="receipt-header">
        <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#4a5468', marginBottom: '12px' }}>
          Order Summary
        </div>

        {/* Line items */}
        <div className="receipt-line">
          <span style={{ color: '#8a95a8', fontSize: '12px' }}>Package</span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#e2e8f0' }}>{selectedPlan.name}</span>
        </div>
        <div className="receipt-line">
          <span style={{ color: '#8a95a8', fontSize: '12px' }}>Duration</span>
          <span style={{ color: '#c9d1e0', fontSize: '12px' }}>{selectedPlan.durationLabel}</span>
        </div>
        <div className="receipt-line">
          <span style={{ color: '#8a95a8', fontSize: '12px' }}>Data</span>
          <span style={{ color: '#c9d1e0', fontSize: '12px' }}>Unlimited</span>
        </div>
        <div className="receipt-line">
          <span style={{ color: '#8a95a8', fontSize: '12px' }}>Speed</span>
          <span style={{ color: '#c9d1e0', fontSize: '12px' }}>{selectedPlan.speedLabel}</span>
        </div>

        {/* Total */}
        <div className="receipt-total">
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#e2e8f0' }}>Total Due</span>
          <span
            className="mono"
            style={{ fontSize: '22px', fontWeight: 700, color: '#34d399', letterSpacing: '-0.02em' }}
          >
            Ksh {selectedPlan.priceKes}
          </span>
        </div>
      </div>

      {/* Payment tabs */}
      <div className="pay-tabs">
        <button className={`pay-tab${mode === 'stk' ? ' active' : ''}`} onClick={() => switchMode('stk')}>STK Push</button>
        <button className={`pay-tab${mode === 'code' ? ' active' : ''}`} onClick={() => switchMode('code')}>SMS Code</button>
        <button className={`pay-tab${mode === 'voucher' ? ' active' : ''}`} onClick={() => switchMode('voucher')}>Voucher</button>
      </div>

      {/* ── STK Push ── */}
      {mode === 'stk' && (
        <>
          {status === 'idle' && (
            <form onSubmit={handleSTK} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#8a95a8', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  M-Pesa Phone Number
                </label>
                <div style={{ position: 'relative' }}>
                  <DeviceMobile
                    size={15}
                    style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#4a5468' }}
                  />
                  <input
                    className={`field-input${phoneErr ? ' error' : ''}`}
                    style={{ paddingLeft: '32px' }}
                    type="tel"
                    placeholder="0712 345 678"
                    value={phone}
                    autoComplete="tel"
                    onChange={(e) => { setPhone(e.target.value); setPhoneErr(''); }}
                  />
                </div>
                {phoneErr && (
                  <div style={{ fontSize: '11px', color: '#ef4444', marginTop: '5px' }}>{phoneErr}</div>
                )}
              </div>

              <button type="submit" className="btn-primary">
                <span>Pay Ksh {selectedPlan.priceKes} via M-Pesa</span>
                <ArrowRight size={15} weight="bold" />
              </button>

              <div style={{ fontSize: '11px', color: '#4a5468', textAlign: 'center', paddingTop: '4px' }}>
                Lipa na M-Pesa · Buy Goods Till{' '}
                <span className="mono" style={{ color: '#6b7280' }}>{SITE_CONFIG.tillNumber}</span>
              </div>
            </form>
          )}

          {status === 'initiating' && (
            <div style={{ padding: '28px 0', textAlign: 'center' }}>
              <div className="spinner" style={{ margin: '0 auto 14px' }} />
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#e2e8f0' }}>Sending STK Push…</div>
              <div style={{ fontSize: '11px', color: '#4a5468', marginTop: '4px' }}>Contacting Safaricom for {phone}</div>
            </div>
          )}

          {status === 'waiting_pin' && (
            <div style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#e2e8f0', marginBottom: '4px' }}>
                  Check your phone
                </div>
                <div style={{ fontSize: '12px', color: '#8a95a8', lineHeight: 1.6 }}>
                  Enter your M-Pesa PIN to pay{' '}
                  <span className="mono" style={{ color: '#34d399' }}>Ksh {selectedPlan.priceKes}</span>{' '}
                  to Till <span className="mono" style={{ color: '#c9d1e0' }}>{SITE_CONFIG.tillNumber}</span>.
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#4a5468' }}>
                <ClockCountdown size={13} />
                <span>Expires in <span className="mono" style={{ color: '#8a95a8' }}>{countdown}s</span></span>
              </div>

              <button type="button" className="btn-primary" onClick={handlePinEntered}>
                I've entered my PIN
              </button>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                style={{ background: 'none', border: 'none', color: '#4a5468', fontSize: '11px', cursor: 'pointer', textAlign: 'center' }}
              >
                Cancel / retry
              </button>
            </div>
          )}

          {status === 'verifying' && (
            <div style={{ padding: '28px 0', textAlign: 'center' }}>
              <div className="spinner" style={{ margin: '0 auto 14px' }} />
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#e2e8f0' }}>Verifying payment…</div>
              <div style={{ fontSize: '11px', color: '#4a5468', marginTop: '4px' }}>Authorizing access on gateway</div>
            </div>
          )}

          {status === 'success' && (
            <div style={{ padding: '24px 0', textAlign: 'center' }}>
              <CheckCircle size={36} weight="fill" style={{ color: '#34d399', display: 'block', margin: '0 auto 12px' }} />
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#e2e8f0' }}>Payment confirmed</div>
              <div style={{ fontSize: '11px', color: '#34d399', marginTop: '4px' }}>Activating your connection…</div>
            </div>
          )}
        </>
      )}

      {/* ── SMS Code ── */}
      {mode === 'code' && (
        <form onSubmit={handleCodeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ fontSize: '12px', color: '#8a95a8', lineHeight: 1.6, padding: '10px 12px', background: '#0b0d12', borderRadius: '6px', border: '1px solid #1b1f2b' }}>
            Pay <strong style={{ color: '#34d399' }}>Ksh {selectedPlan.priceKes}</strong> to Buy Goods Till{' '}
            <strong className="mono" style={{ color: '#c9d1e0' }}>{SITE_CONFIG.tillNumber}</strong>, then paste the confirmation code below.
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#8a95a8', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              M-Pesa Code
            </label>
            <div style={{ position: 'relative' }}>
              <Receipt
                size={15}
                style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#4a5468' }}
              />
              <input
                className={`field-input mono${codeErr ? ' error' : ''}`}
                style={{ paddingLeft: '32px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                placeholder="e.g. SKL84920KL"
                value={mpesaCode}
                onChange={(e) => { setMpesaCode(e.target.value.toUpperCase()); setCodeErr(''); }}
              />
            </div>
            {codeErr && <div style={{ fontSize: '11px', color: '#ef4444', marginTop: '5px' }}>{codeErr}</div>}
          </div>

          <button type="submit" className="btn-primary">
            Verify & Connect
          </button>

          {status === 'verifying' && (
            <div style={{ textAlign: 'center', paddingTop: '8px' }}>
              <div className="spinner" style={{ margin: '0 auto' }} />
            </div>
          )}
          {status === 'success' && (
            <div style={{ textAlign: 'center' }}>
              <CheckCircle size={28} weight="fill" style={{ color: '#34d399' }} />
            </div>
          )}
        </form>
      )}

      {/* ── Voucher ── */}
      {mode === 'voucher' && (
        <form onSubmit={handleVoucherSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ fontSize: '12px', color: '#8a95a8', lineHeight: 1.6 }}>
            Enter a prepaid voucher or ticket token issued by {SITE_CONFIG.brandName}.
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#8a95a8', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Voucher Code
            </label>
            <div style={{ position: 'relative' }}>
              <Ticket
                size={15}
                style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#4a5468' }}
              />
              <input
                className={`field-input mono${voucherErr ? ' error' : ''}`}
                style={{ paddingLeft: '32px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                placeholder="WSH-8921"
                value={voucher}
                onChange={(e) => { setVoucher(e.target.value.toUpperCase()); setVoucherErr(''); }}
              />
            </div>
            {voucherErr && <div style={{ fontSize: '11px', color: '#ef4444', marginTop: '5px' }}>{voucherErr}</div>}
          </div>

          <button type="submit" className="btn-primary">
            Activate Voucher
          </button>
        </form>
      )}

      {/* Trial link */}
      <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #1b1f2b', textAlign: 'center' }}>
        <button
          onClick={onClaimTrial}
          style={{ background: 'none', border: 'none', color: '#4a5468', fontSize: '11px', cursor: 'pointer' }}
        >
          Claim 5-min free speed test →
        </button>
      </div>
    </div>
  );
};
