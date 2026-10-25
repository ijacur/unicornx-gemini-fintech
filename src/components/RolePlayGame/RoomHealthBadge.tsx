import React from 'react';
import type { RoomHealthMetrics } from '../../types/game';

interface Props {
  metrics: RoomHealthMetrics;
  className?: string;
}

export const RoomHealthBadge: React.FC<Props> = ({ metrics, className = '' }) => {
  const { status, latencyMs } = metrics;

  let badgeColor = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
  let dotColor = 'bg-emerald-400 animate-pulse';
  let label = `${latencyMs}ms • Barqaror`;

  if (status === 'connecting') {
    badgeColor = 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
    dotColor = 'bg-cyan-400 animate-ping';
    label = 'Ulanmoqda...';
  } else if (status === 'degraded') {
    badgeColor = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    dotColor = 'bg-amber-400';
    label = `${latencyMs}ms • Sekin`;
  } else if (status === 'failover') {
    badgeColor = 'bg-rose-500/10 text-rose-400 border-rose-500/30';
    dotColor = 'bg-rose-400 animate-ping';
    label = `Failover (${metrics.consecutiveFailures}x)`;
  } else if (status === 'disconnected') {
    badgeColor = 'bg-slate-800 text-slate-400 border-slate-700';
    dotColor = 'bg-slate-500';
    label = 'Oflayn';
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-mono font-medium border backdrop-blur-md transition-colors ${badgeColor} ${className}`}
      title={`Xona holati: ${status.toUpperCase()} | RTT: ${latencyMs}ms | Uzilishlar: ${metrics.consecutiveFailures}`}
    >
      <span className={`w-2 h-2 rounded-full shrink-0 ${dotColor}`} />
      <span>{label}</span>
    </div>
  );
};
