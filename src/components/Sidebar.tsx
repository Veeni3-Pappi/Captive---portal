import React from 'react';
import {
  WifiHigh,
  ListBullets,
  Monitor,
  Question,
} from '@phosphor-icons/react';
import { SITE_CONFIG } from '../config/site';

type NavView = 'plans' | 'session' | 'help';

interface SidebarProps {
  activeView: NavView;
  onNavigate: (view: NavView) => void;
  isConnected: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onNavigate, isConnected }) => {
  const navItems: { id: NavView; label: string; icon: React.ReactNode }[] = [
    { id: 'plans', label: 'Access Plans', icon: <ListBullets size={16} weight="regular" /> },
    { id: 'session', label: 'My Session', icon: <Monitor size={16} weight="regular" /> },
    { id: 'help', label: 'Help & Support', icon: <Question size={16} weight="regular" /> },
  ];

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="flex items-center gap-2.5">
          <WifiHigh size={18} weight="bold" style={{ color: '#34d399' }} />
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#e2e8f0', letterSpacing: '-0.01em' }}>
              {SITE_CONFIG.brandName}
            </div>
            <div style={{ fontSize: '10px', color: '#4a5468', marginTop: '1px' }}>
              Hotspot Gateway
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const disabled = item.id === 'session' && !isConnected;
          return (
            <div
              key={item.id}
              className={`nav-item${activeView === item.id ? ' active' : ''}${disabled ? ' opacity-40 pointer-events-none' : ''}`}
              onClick={() => !disabled && onNavigate(item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          );
        })}
      </nav>

      {/* Footer info */}
      <div className="sidebar-footer">
        <div style={{ fontSize: '10px', color: '#4a5468', lineHeight: 1.7 }}>
          <div>Till: <span className="mono" style={{ color: '#6b7280' }}>{SITE_CONFIG.tillNumber}</span></div>
          <div>Support: <span style={{ color: '#6b7280' }}>{SITE_CONFIG.supportPhone}</span></div>
        </div>
      </div>
    </aside>
  );
};
