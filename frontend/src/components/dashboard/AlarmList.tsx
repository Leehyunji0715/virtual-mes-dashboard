import type { Alarm, AlarmLevel } from '../../types/mes';

interface AlarmListProps {
  alarms: Alarm[];
  fillHeight?: boolean;
  onResolve?: (id: number) => void;
}

const LEVEL_META: Record<AlarmLevel, { label: string; color: string }> = {
  INFO: { label: 'INFO', color: 'var(--status-info)' },
  WARNING: { label: 'WARNING', color: 'var(--status-warning)' },
  CRITICAL: { label: 'CRITICAL', color: 'var(--status-critical)' },
};

function LevelBadge({ level }: { level: AlarmLevel }) {
  const meta = LEVEL_META[level];
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 700,
        color: meta.color,
        border: `1px solid ${meta.color}`,
        borderRadius: 4,
        padding: '2px 6px',
        flexShrink: 0,
      }}
    >
      {meta.label}
    </span>
  );
}

export default function AlarmList({ alarms, fillHeight = false, onResolve }: AlarmListProps) {
  const sorted = [...alarms].sort((a, b) => {
    if (a.isResolved !== b.isResolved) return a.isResolved ? 1 : -1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div
      style={{
        background: 'var(--surface-card)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: fillHeight ? '100%' : undefined,
        maxHeight: fillHeight ? undefined : 320,
      }}
    >
      <h2
        style={{ fontSize: 14, fontWeight: 600, margin: '0 0 12px', color: 'var(--text-primary)' }}
      >
        알람
      </h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
        }}
      >
        {sorted.length === 0 && (
          <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>알람이 없습니다.</div>
        )}
        {sorted.map((alarm) => (
          <div
            key={alarm.id}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 10,
              padding: '8px 10px',
              borderRadius: 8,
              background: alarm.isResolved ? 'transparent' : 'var(--surface-page)',
              opacity: alarm.isResolved ? 0.55 : 1,
            }}
          >
            <LevelBadge level={alarm.level} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, color: 'var(--text-primary)' }}>{alarm.message}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                {alarm.equipmentName} · {new Date(alarm.createdAt).toLocaleString('ko-KR')}
              </div>
            </div>
            {!alarm.isResolved && onResolve && (
              <button
                onClick={() => onResolve(alarm.id)}
                style={{
                  flexShrink: 0,
                  fontSize: 12,
                  padding: '4px 10px',
                  borderRadius: 6,
                  border: '1px solid var(--border)',
                  background: 'var(--surface-card)',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                해결 처리
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
