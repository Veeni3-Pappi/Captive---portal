import React, { useState, useEffect } from 'react';
import { ActiveSession } from '../types';
import {
  DownloadSimple,
  UploadSimple,
  ArrowClockwise,
  SignOut,
} from '@phosphor-icons/react';

interface SessionStatusProps {
  session: ActiveSession;
  onDisconnect: () => void;
  onExtend: () => void;
}

export const SessionStatus: React.FC<SessionStatusProps> = ({
  session,
  onDisconnect,
  onExtend,
}) => {
  const [seconds, setSeconds] = useState(session.timeRemainingSeconds);
  const [down, setDown] = useState(session.bytesDown);
  const [up, setUp] = useState(session.bytesUp);

  useEffect(() => {
    const t = setInterval(() => {
      setSeconds((s) => Math.max(0, s - 1));
      setDown((d) => d + Math.floor(Math.random() * 40000 + 8000));
      setUp((u) => u + Math.floor(Math.random() * 10000 + 2000));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600).toString().padStart(2, '0');
    const m = Math.floor((s % 3600) / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${h}:${m}:${sec}`;
  };

  const formatBytes = (b: number) =>
    b < 1024 * 1024
      ? `${(b / 1024).toFixed(1)} KB`
      : `${(b / (1024 * 1024)).toFixed(2)} MB`;

  return (
    <div>
      {/* Status line */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#4a5468', marginBottom: '10px' }}>
          Active Session
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="live-dot" />
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#e2e8f0' }}>
            Online · {session.planName}
          </span>
        </div>
      </div>

      {/* Timer */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '10px', color: '#4a5468', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
          Time remaining
        </div>
        <div className="session-timer">{formatTime(seconds)}</div>
        <div style={{ fontSize: '11px', color: '#4a5468', marginTop: '6px' }}>
          Expires at {session.expiresAt}
        </div>
      </div>

      {/* Stats */}
      <div style={{ marginBottom: '24px' }}>
        <div className="stat-row">
          <span className="stat-label">IP Address</span>
          <span className="stat-value">{session.ipAddress}</span>
        </div>
        <div className="stat-row">
          <span className="stat-label">MAC</span>
          <span className="stat-value">{session.macAddress}</span>
        </div>
        <div className="stat-row">
          <span className="stat-label">
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <DownloadSimple size={12} /> Downloaded
            </span>
          </span>
          <span className="stat-value">{formatBytes(down)}</span>
        </div>
        <div className="stat-row">
          <span className="stat-label">
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <UploadSimple size={12} /> Uploaded
            </span>
          </span>
          <span className="stat-value">{formatBytes(up)}</span>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button className="btn-primary" style={{ flex: 1, fontSize: '12px' }} onClick={onExtend}>
          <ArrowClockwise size={14} weight="bold" />
          Renew Plan
        </button>
        <button
          className="btn-outline"
          style={{ color: '#ef4444', borderColor: '#2d1515' }}
          onClick={onDisconnect}
        >
          <SignOut size={14} weight="bold" />
          Disconnect
        </button>
      </div>
    </div>
  );
};
