import React from 'react';
import { 
  WifiHigh, 
  Gauge, 
  Headset
} from '@phosphor-icons/react';
import { SITE_CONFIG } from '../config/site';

interface HeaderProps {
  isConnected: boolean;
  onOpenSupport: () => void;
  onViewSession: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  isConnected, 
  onOpenSupport,
  onViewSession 
}) => {
  return (
    <header className="w-full border-b border-[#1f2738] bg-[#0d1017]/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand & Breadcrumb Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
            <WifiHigh size={20} weight="bold" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-tight text-white">
                {SITE_CONFIG.brandName}
              </span>
              <span className="text-slate-600">/</span>
              <span className="text-xs font-medium text-slate-400">
                Hotspot Gateway
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Wi-Fi 6 Active
              </span>
            </div>
            <div className="text-[11px] text-slate-500 hidden sm:block">
              {SITE_CONFIG.networkSSID} • Till: {SITE_CONFIG.tillNumber}
            </div>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          {isConnected && (
            <button
              onClick={onViewSession}
              className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 px-3 py-1.5 rounded-lg transition-colors"
            >
              <Gauge size={14} weight="bold" />
              <span>Active Session</span>
            </button>
          )}

          <button
            onClick={onOpenSupport}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-[#141924] hover:bg-[#1a2230] border border-[#232c3d] px-3 py-1.5 rounded-lg transition-colors active:scale-95"
            title="Customer Support hotline"
          >
            <Headset size={14} weight="bold" className="text-emerald-400" />
            <span className="hidden sm:inline">Support:</span>
            <span>{SITE_CONFIG.supportPhone}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
