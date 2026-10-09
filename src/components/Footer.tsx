import React from 'react';
import { SITE_CONFIG } from '../config/site';
import { ShieldCheck } from '@phosphor-icons/react';

interface FooterProps {
  onOpenSupport: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSupport }) => {
  return (
    <footer className="w-full py-6 px-4 text-center text-xs text-slate-500 space-y-3 border-t border-slate-900 mt-8">
      <div className="flex items-center justify-center gap-2 text-[11px] font-mono tracking-wider text-slate-400 uppercase">
        <span className="flex items-center gap-1">
          <ShieldCheck size={14} className="text-emerald-500" />
          SECURED
        </span>
        <span>•</span>
        <span>POWERED BY MIKROTIK ROUTEROS</span>
        <span>•</span>
        <span>{SITE_CONFIG.brandName.toUpperCase()}</span>
      </div>

      <div className="flex items-center justify-center gap-4 text-xs text-slate-400">
        <button
          onClick={onOpenSupport}
          className="hover:text-emerald-400 transition-colors"
        >
          Customer Care ({SITE_CONFIG.supportPhone})
        </button>
        <span>•</span>
        <button
          onClick={onOpenSupport}
          className="hover:text-emerald-400 transition-colors"
        >
          Payment Help (Till {SITE_CONFIG.tillNumber})
        </button>
      </div>

      <p className="text-[11px] text-slate-600 max-w-sm mx-auto">
        By connecting to this hotspot, you agree to our fair usage policy. Access is provisioned instantly upon payment verification.
      </p>
    </footer>
  );
};
