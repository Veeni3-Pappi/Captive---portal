import React from 'react';
import { SITE_CONFIG } from '../config/site';
import { Button } from './ui/Button';
import { 
  X, 
  WhatsappLogo, 
  PhoneCall, 
  Storefront, 
  Question
} from '@phosphor-icons/react';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md surface-card rounded-2xl border border-slate-750 p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Question size={20} weight="bold" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Help & Customer Support</h3>
              <p className="text-xs text-slate-400">{SITE_CONFIG.brandName} Hotspot Assistance</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        {/* Quick Contact Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <a
            href={`https://wa.me/${SITE_CONFIG.supportWhatsApp}?text=Hello%20Whoosh-online,%20I%20need%20help%20with%20WiFi%20access`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs py-3 px-3 rounded-xl transition-all shadow-md active:scale-95"
          >
            <WhatsappLogo size={18} weight="fill" />
            <span>Chat WhatsApp</span>
          </a>

          <a
            href={`tel:${SITE_CONFIG.supportPhone}`}
            className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs py-3 px-3 rounded-xl transition-all border border-slate-700 active:scale-95"
          >
            <PhoneCall size={18} weight="bold" className="text-emerald-400" />
            <span>Call Support</span>
          </a>
        </div>

        {/* Till Payment Guide */}
        <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800/90 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
            <Storefront size={16} className="text-emerald-400" />
            <span>How to Pay Manually via M-PESA Till</span>
          </div>

          <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside pl-1 leading-relaxed">
            <li>Open SIM Toolkit or M-PESA App on your phone.</li>
            <li>Select <strong className="text-slate-100">Lipa na M-PESA</strong>.</li>
            <li>Choose <strong className="text-slate-100">Buy Goods and Services</strong>.</li>
            <li>
              Enter Till Number: <span className="font-mono font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">{SITE_CONFIG.tillNumber}</span>
            </li>
            <li>Enter the amount for your selected package (e.g. 10, 20, 40, 140).</li>
            <li>Enter your M-PESA PIN and confirm.</li>
            <li>Paste your SMS confirmation code into the portal to connect instantly.</li>
          </ol>
        </div>

        {/* Support Hotline Details */}
        <div className="text-center pt-1 text-xs text-slate-400 space-y-1">
          <div>Customer Care Hotline: <strong className="text-slate-200">{SITE_CONFIG.supportPhone}</strong></div>
          <div className="text-[11px] text-slate-500">Available 24/7 for network connectivity inquiries</div>
        </div>

        <Button
          onClick={onClose}
          variant="outline"
          className="w-full text-xs"
        >
          Close Help
        </Button>
      </div>
    </div>
  );
};
