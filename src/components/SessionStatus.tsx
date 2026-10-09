import React, { useState, useEffect } from 'react';
import { ActiveSession } from '../types';
import { Button } from './ui/Button';
import { 
  WifiHigh, 
  ArrowClockwise, 
  SignOut, 
  Clock, 
  DownloadSimple, 
  UploadSimple
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
  const [secondsRemaining, setSecondsRemaining] = useState(session.timeRemainingSeconds);
  const [downloadBytes, setDownloadBytes] = useState(session.bytesDown);
  const [uploadBytes, setUploadBytes] = useState(session.bytesUp);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => Math.max(0, prev - 1));
      setDownloadBytes((prev) => prev + Math.floor(Math.random() * 45000 + 10000));
      setUploadBytes((prev) => prev + Math.floor(Math.random() * 12000 + 2000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const seconds = secs % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatBytes = (bytes: number) => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="nixtio-card p-5 space-y-4 border-emerald-500/40">
      {/* Session Title Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#1f2738]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <WifiHigh size={18} weight="bold" />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Online • {session.planName}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              IP: {session.ipAddress} • MAC: {session.macAddress}
            </div>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          MikroTik Hotspot
        </span>
      </div>

      {/* Countdown Card */}
      <div className="bg-[#141924] rounded-xl p-4 border border-[#232c3d] text-center space-y-1">
        <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 flex items-center justify-center gap-1">
          <Clock size={12} />
          <span>Active Session Time Remaining</span>
        </div>
        <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400 tracking-tight">
          {formatTime(secondsRemaining)}
        </div>
        <div className="text-[11px] text-slate-500">
          Scheduled expiration: {session.expiresAt}
        </div>
      </div>

      {/* Bandwidth Usage Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="bg-[#0e121b] rounded-lg p-3 border border-[#1f2738]">
          <div className="text-[11px] text-slate-400 flex items-center gap-1">
            <DownloadSimple size={13} className="text-emerald-400" />
            <span>Downloaded</span>
          </div>
          <div className="text-base font-bold font-mono text-slate-100 mt-1">
            {formatBytes(downloadBytes)}
          </div>
        </div>

        <div className="bg-[#0e121b] rounded-lg p-3 border border-[#1f2738]">
          <div className="text-[11px] text-slate-400 flex items-center gap-1">
            <UploadSimple size={13} className="text-sky-400" />
            <span>Uploaded</span>
          </div>
          <div className="text-base font-bold font-mono text-slate-100 mt-1">
            {formatBytes(uploadBytes)}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 pt-1">
        <Button
          onClick={onExtend}
          variant="mpesa"
          size="sm"
          className="flex-1 text-xs font-semibold gap-1.5"
        >
          <ArrowClockwise size={14} weight="bold" />
          <span>Renew / Change Plan</span>
        </Button>
        <Button
          onClick={onDisconnect}
          variant="outline"
          size="sm"
          className="text-rose-400 border-rose-900/40 hover:bg-rose-950/30 text-xs"
        >
          <SignOut size={14} weight="bold" />
          <span>Disconnect</span>
        </Button>
      </div>
    </div>
  );
};
