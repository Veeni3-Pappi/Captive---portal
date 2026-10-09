import React from 'react';
import { 
  WifiHigh, 
  Lightning, 
  Storefront, 
  Broadcast,
  CheckCircle
} from '@phosphor-icons/react';
import { SITE_CONFIG } from '../config/site';

interface NetworkMetricsProps {
  isConnected: boolean;
}

export const NetworkMetrics: React.FC<NetworkMetricsProps> = ({ isConnected }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {/* Metric 1: Bandwidth */}
      <div className="nixtio-card-subtle p-3.5 flex items-center justify-between gap-3">
        <div>
          <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            Peak Speed
          </div>
          <div className="text-sm font-bold text-slate-100 flex items-center gap-1 mt-0.5">
            <span>{SITE_CONFIG.speeds.download}</span>
          </div>
          <div className="text-[10px] text-emerald-400 font-medium mt-0.5">
            Unlimited Bandwidth
          </div>
        </div>
        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
          <Lightning size={16} weight="fill" />
        </div>
      </div>

      {/* Metric 2: Signal */}
      <div className="nixtio-card-subtle p-3.5 flex items-center justify-between gap-3">
        <div>
          <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            WiFi Signal
          </div>
          <div className="text-sm font-bold text-slate-100 mt-0.5">
            Wi-Fi 6 (5 GHz)
          </div>
          <div className="text-[10px] text-sky-400 font-medium mt-0.5">
            -52 dBm • Strong
          </div>
        </div>
        <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
          <WifiHigh size={16} weight="bold" />
        </div>
      </div>

      {/* Metric 3: Till Number */}
      <div className="nixtio-card-subtle p-3.5 flex items-center justify-between gap-3">
        <div>
          <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            M-PESA Till
          </div>
          <div className="text-sm font-mono font-bold text-emerald-400 mt-0.5">
            {SITE_CONFIG.tillNumber}
          </div>
          <div className="text-[10px] text-slate-400 font-medium mt-0.5">
            Buy Goods & Services
          </div>
        </div>
        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
          <Storefront size={16} weight="bold" />
        </div>
      </div>

      {/* Metric 4: Gateway Status */}
      <div className="nixtio-card-subtle p-3.5 flex items-center justify-between gap-3">
        <div>
          <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            Network State
          </div>
          <div className="text-sm font-bold text-slate-100 flex items-center gap-1.5 mt-0.5">
            <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span>{isConnected ? 'Online' : 'Portal Auth'}</span>
          </div>
          <div className="text-[10px] text-slate-400 font-medium mt-0.5">
            {isConnected ? 'Connected' : 'MikroTik Gateway'}
          </div>
        </div>
        <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
          {isConnected ? <CheckCircle size={16} weight="fill" /> : <Broadcast size={16} weight="bold" />}
        </div>
      </div>
    </div>
  );
};
