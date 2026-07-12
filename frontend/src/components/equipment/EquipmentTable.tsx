import { useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import type { Equipment, EquipmentStatus } from '../../types/mes';

interface EquipmentTableProps {
  equipmentList: Equipment[];
}

const STATUS_META: Record<EquipmentStatus, { label: string; color: string }> = {
  RUNNING: { label: 'RUNNING', color: 'var(--status-good)' },
  MAINTENANCE: { label: 'MAINTENANCE', color: 'var(--status-warning)' },
  STOP: { label: 'STOP', color: 'var(--status-critical)' },
};

function StatusBadge({ status }: { status: EquipmentStatus }) {
  const meta = STATUS_META[status];
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

export default function EquipmentTable({ equipmentList }: EquipmentTableProps) {
  const [lineFilter, setLineFilter] = useState<string>('ALL');

  const lines = useMemo(() => {
    const set = new Set(equipmentList.map((e) => e.line));
    return ['ALL', ...Array.from(set)];
  }, [equipmentList]);

  const filtered =
    lineFilter === 'ALL' ? equipmentList : equipmentList.filter((e) => e.line === lineFilter);

  return (
    <div
      style={{
        background: 'var(--surface-card)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: 16,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 12,
        }}
      >
        <h2 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: 'var(--text-primary)' }}>
          설비 현황
        </h2>
        <select
          value={lineFilter}
          onChange={(e) => setLineFilter(e.target.value)}
          style={{
            fontSize: 13,
            padding: '4px 8px',
            borderRadius: 6,
            border: '1px solid var(--border)',
            background: 'var(--surface-page)',
            color: 'var(--text-primary)',
          }}
        >
          {lines.map((line) => (
            <option key={line} value={line}>
              {line === 'ALL' ? '전체 라인' : line}
            </option>
          ))}
        </select>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--gridline)' }}>
            <th style={thStyle}>코드</th>
            <th style={thStyle}>이름</th>
            <th style={thStyle}>라인</th>
            <th style={thStyle}>상태</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((eq) => (
            <tr key={eq.id} style={{ borderBottom: '1px solid var(--gridline)' }}>
              <td style={tdStyle}>{eq.equipmentCode}</td>
              <td style={tdStyle}>{eq.name}</td>
              <td style={tdStyle}>{eq.line}</td>
              <td style={tdStyle}>
                <StatusBadge status={eq.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle: CSSProperties = {
  textAlign: 'left',
  padding: '8px 8px',
  color: 'var(--text-muted)',
  fontWeight: 500,
};
const tdStyle: CSSProperties = { padding: '10px 8px', color: 'var(--text-primary)' };
