import React, { useState } from 'react';
import { ActiveSession } from '../types';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Ticket, ArrowRight, Info } from '@phosphor-icons/react';

interface VoucherLoginFormProps {
  onConnect: (session: ActiveSession) => void;
}

export const VoucherLoginForm: React.FC<VoucherLoginFormProps> = ({ onConnect }) => {
  const [voucherCode, setVoucherCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = voucherCode.trim().toUpperCase();
    if (!clean) {
      setError('Please enter your voucher code');
      return;
    }
    if (clean.length < 4) {
      setError('Voucher codes are at least 4 characters long');
      return;
    }

    setError('');
    setIsLoading(true);

    // Simulate validation
    setTimeout(() => {
      setIsLoading(false);
      onConnect({
        isConnected: true,
        ipAddress: '192.168.88.192',
        macAddress: 'DC:A6:32:8B:11:0E',
        planName: 'Voucher Pass (24 Hours)',
        timeRemainingSeconds: 86400,
        bytesDown: 2500000,
        bytesUp: 800000,
        uptimeSeconds: 0,
        expiresAt: new Date(Date.now() + 86400000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    }, 1200);
  };

  return (
    <div className="surface-card rounded-2xl p-5 border border-slate-800 space-y-4">
      <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800/80">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
          <Ticket size={18} weight="bold" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-100">Voucher / Ticket Login</h3>
          <p className="text-[11px] text-slate-400">Enter a prepaid voucher code or scratch card token</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Voucher Code
          </label>
          <Input
            placeholder="e.g. WSH-7892 or 109283"
            value={voucherCode}
            onChange={(e) => {
              setVoucherCode(e.target.value.toUpperCase());
              if (error) setError('');
            }}
            leftAddon={<Ticket size={18} className="text-emerald-400" />}
            error={error}
            className="uppercase font-mono tracking-widest text-base"
          />
        </div>

        <Button
          type="submit"
          variant="mpesa"
          size="lg"
          isLoading={isLoading}
          className="w-full"
        >
          <span>CONNECT WITH VOUCHER</span>
          <ArrowRight size={18} weight="bold" />
        </Button>

        <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-850 flex items-start gap-2 text-[11px] text-slate-400">
          <Info size={16} className="text-emerald-400 shrink-0 mt-0.5" />
          <span>
            Lost your code or need a physical scratch card? Contact support or buy online instantly via M-PESA.
          </span>
        </div>
      </form>
    </div>
  );
};
