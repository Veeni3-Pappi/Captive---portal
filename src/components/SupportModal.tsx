import React from 'react';
import { SITE_CONFIG } from '../config/site';
import {
  X,
  WhatsappLogo,
  PhoneCall,
} from '@phosphor-icons/react';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #1b1f2b' }}>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#e2e8f0' }}>Help & Support</div>
            <div style={{ fontSize: '12px', color: '#4a5468', marginTop: '2px' }}>{SITE_CONFIG.brandName} · Hotspot Assistance</div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#4a5468', cursor: 'pointer', padding: '4px' }}
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        {/* Contact buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
          <a
            href={`https://wa.me/${SITE_CONFIG.supportWhatsApp}?text=Hello%20Whoosh-online,%20I%20need%20help%20with%20WiFi%20access`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ textDecoration: 'none', fontSize: '12px' }}
          >
            <WhatsappLogo size={16} weight="fill" />
            WhatsApp
          </a>
          <a
            href={`tel:${SITE_CONFIG.supportPhone}`}
            className="btn-outline"
            style={{ textDecoration: 'none', justifyContent: 'center', fontSize: '12px' }}
          >
            <PhoneCall size={16} weight="bold" />
            Call Support
          </a>
        </div>

        {/* Manual payment guide */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#4a5468', marginBottom: '12px' }}>
            Pay Manually via M-Pesa Till
          </div>
          <ol style={{ paddingLeft: '18px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              'Open M-Pesa or SIM Toolkit on your phone.',
              'Select Lipa na M-Pesa.',
              'Choose Buy Goods and Services.',
              <>Enter Till Number: <span className="mono" style={{ color: '#34d399' }}>{SITE_CONFIG.tillNumber}</span></>,
              'Enter the amount for your plan (e.g. Ksh 20, 40, 140).',
              'Enter your M-Pesa PIN and confirm.',
              'Paste the SMS confirmation code in the portal to connect.',
            ].map((step, i) => (
              <li key={i} style={{ fontSize: '12px', color: '#8a95a8', lineHeight: 1.6 }}>
                {step}
              </li>
            ))}
          </ol>
        </div>

        {/* Hotline */}
        <div style={{ fontSize: '12px', color: '#4a5468', textAlign: 'center', paddingTop: '16px', borderTop: '1px solid #1b1f2b' }}>
          Customer care: <strong style={{ color: '#8a95a8' }}>{SITE_CONFIG.supportPhone}</strong>
          <div style={{ fontSize: '11px', marginTop: '2px' }}>Available 24/7</div>
        </div>

        <button
          onClick={onClose}
          className="btn-outline"
          style={{ width: '100%', marginTop: '16px', justifyContent: 'center' }}
        >
          Close
        </button>
      </div>
    </div>
  );
};
