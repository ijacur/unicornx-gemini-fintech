# SPEC-002: Real-time Room Health Monitoring & Failover Telemetry

- **Spec ID**: SPEC-002
- **Feature**: Real-time Room Health Monitoring & Failover Telemetry
- **Status**: 03-EXECUTE
- **Created**: 2026-10-25
- **Author**: Antigravity Spec Architect

---

## 1. Executive Summary & Goals
Provide real-time connection telemetry and failover resilience for Turnir's multiplayer RolePlay game arena and room sync:
1. **Latency Telemetry**: Track round-trip time (RTT in ms) on each sync/heartbeat poll.
2. **Health Categorization**:
   - `STABLE` (green): RTT < 250ms, 0 missed heartbeats.
   - `DEGRADED` (amber): RTT 250–800ms, or 1–2 dropped heartbeats.
   - `FAILOVER` (red): >2 consecutive network timeouts, automatic retry backoff.
3. **Telemetry UI**: Provide an accessible, compact room health telemetry badge in the Arena header.

---

## 2. Interface Contract

```typescript
export type RoomHealthStatus = 'connecting' | 'stable' | 'degraded' | 'failover' | 'disconnected';

export interface RoomHealthMetrics {
  status: RoomHealthStatus;
  latencyMs: number;
  missedHeartbeats: number;
  consecutiveFailures: number;
  lastHeartbeat: number | null;
  reconnectCount: number;
}
```

---

## 3. Edge Cases & Resilience
- **Offline / Static Vercel preview**: When `/api/sync` endpoint is unreachable, fallback gracefully to mock local room state rather than crashing or spamming console errors.
- **Background tab throttling**: Accommodate browser `requestAnimationFrame` / `setTimeout` throttling when tab is inactive without marking room as dead.
- **Zero Memory Leaks**: Clean up timers, abort in-flight `fetch` controllers on unmount.
