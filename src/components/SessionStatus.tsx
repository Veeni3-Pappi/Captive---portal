import React, { useState, useEffect } from 'react';
import { ActiveSession } from '../types';
import { SITE_CONFIG } from '../config/site';
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

  // Live countdown & realistic network traffic simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => Math.max(0, prev - 1));
      // Simulate live bytes transfer
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
    <div className="surface-card rounded-2xl p-5 border border-emerald-500/40 space-y-5 shadow-xl shadow-emerald-950/20">
      {/* Connected Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <WifiHigh size={24} weight="bold" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <h3 className="text-sm font-bold text-white">Connected & Online</h3>
            </div>
            <p className="text-xs text-slate-400">{SITE_CONFIG.networkSSID}</p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
          Active Plan: {session.planName}
        </span>
      </div>

      {/* Countdown Clock Display */}
      <div className="bg-slate-950/90 rounded-2xl p-5 border border-slate-800/80 text-center space-y-1">
        <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 flex items-center justify-center gap-1.5">
          <Clock size={13} />
          Time Remaining
        </div>
        <div className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight text-emerald-400">
          {formatTime(secondsRemaining)}
        </div>
        <div className="text-xs text-slate-500">
          Session expires at {session.expiresAt}
        </div>
      </div>

      {/* Traffic & Device Telemetry Grid */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/60 space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400 font-medium">
            <DownloadSimple size={14} className="text-emerald-400" />
            Downloaded
          </div>
          <div className="text-sm font-bold font-mono text-slate-200">
            {formatBytes(downloadBytes)}
          </div>
        </div>

        <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/60 space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400 font-medium">
            <UploadSimple size={14} className="text-blue-400" />
            Uploaded
          </div>
          <div className="text-sm font-bold font-mono text-slate-200">
            {formatBytes(uploadBytes)}
          </div>
        </div>

        <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/60 space-y-1">
          <div className="text-slate-400 font-medium">IP Address</div>
          <div className="text-xs font-bold font-mono text-slate-300">
            {session.ipAddress}
          </div>
        </div>

        <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/60 space-y-1">
          <div className="text-slate-400 font-medium">MAC Address</div>
          <div className="text-xs font-bold font-mono text-slate-300">
            {session.macAddress}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-1 flex gap-2.5">
        <Button
          onClick={onExtend}
          variant="mpesa"
          className="flex-1"
        >
          <ArrowClockwise size={16} weight="bold" />
          <span>Extend / Buy Time</span>
        </Button>
        <Button
          onClick={onDisconnect}
          variant="outline"
          className="text-rose-400 border-rose-900/40 hover:bg-rose-950/30"
        >
          <SignOut size={16} weight="bold" />
          <span>Disconnect</span>
        </Button>
      </div>
    </div>
  );
};
