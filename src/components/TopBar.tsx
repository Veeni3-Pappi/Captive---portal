import React from 'react';
import { Headset } from '@phosphor-icons/react';
import { SITE_CONFIG } from '../config/site';

interface TopBarProps {
  isConnected: boolean;
  onOpenSupport: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ isConnected, onOpenSupport }) => {
  return (
    <div className="topbar">
      {/* Left: breadcrumb */}
      <div className="flex items-center gap-2" style={{ fontSize: '13px' }}>
        <span style={{ color: '#4a5468' }}>{SITE_CONFIG.brandName}</span>
        <span style={{ color: '#2a3347' }}>/</span>
        <span style={{ color: '#8a95a8' }}>Hotspot Gateway</span>
        <span style={{ color: '#2a3347', margin: '0 4px' }}>•</span>
        <span style={{ fontSize: '11px', color: '#4a5468' }}>
          {SITE_CONFIG.networkSSID}
        </span>
        {isConnected && (
          <span className="flex items-center gap-1.5" style={{ fontSize: '11px', color: '#34d399', marginLeft: '6px' }}>
            <span className="live-dot" />
            Online
          </span>
        )}
      </div>

      {/* Right: support */}
      <button className="btn-ghost" onClick={onOpenSupport}>
        <Headset size={14} />
        <span>{SITE_CONFIG.supportPhone}</span>
      </button>
    </div>
  );
};
