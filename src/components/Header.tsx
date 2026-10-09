import React from 'react';
import { WifiHigh, Lightning, PhoneCall } from '@phosphor-icons/react';
import { SITE_CONFIG } from '../config/site';

interface HeaderProps {
  onOpenSupport: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSupport }) => {
  return (
    <header className="w-full border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-2xl mx-auto px-4 py-3.5 flex items-center justify-between">
        {/* Brand and Network Status */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 text-emerald-400">
            <WifiHigh size={24} weight="bold" />
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
                {SITE_CONFIG.brandName}
              </h1>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                5G WiFi
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Lightning size={12} weight="fill" className="text-amber-400" />
                {SITE_CONFIG.speeds.download}
              </span>
              <span>•</span>
              <span className="text-slate-400">Unlimited Data</span>
            </div>
          </div>
        </div>

        {/* Quick Support hotline button */}
        <button
          onClick={onOpenSupport}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-750 px-3 py-1.5 rounded-lg transition-colors border-slate-700/80 active:scale-95"
          title="Customer Support hotline"
        >
          <PhoneCall size={14} weight="bold" className="text-emerald-400" />
          <span>Support</span>
        </button>
      </div>
    </header>
  );
};
