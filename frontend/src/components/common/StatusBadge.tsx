import type { EquipmentStatus } from '../../types/mes';

export const EQUIPMENT_STATUS_META: Record<EquipmentStatus, { label: string; color: string }> = {
  RUNNING: { label: 'RUNNING', color: 'var(--status-good)' },
  MAINTENANCE: { label: 'MAINTENANCE', color: 'var(--status-warning)' },
  STOP: { label: 'STOP', color: 'var(--status-critical)' },
};

export default function StatusBadge({ status }: { status: EquipmentStatus }) {
  const meta = EQUIPMENT_STATUS_META[status];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 12,
        fontWeight: 600,
        color: meta.color,
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: meta.color,
          display: 'inline-block',
        }}
        aria-hidden
      />
      {meta.label}
    </span>
  );
}
