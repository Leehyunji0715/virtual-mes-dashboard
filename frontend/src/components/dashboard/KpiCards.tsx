import type { DashboardKpi } from '../../types/mes';

interface KpiCardsProps {
  kpi: DashboardKpi | null;
}

type StatusLevel = 'good' | 'warning' | 'critical';

const STATUS_COLOR: Record<StatusLevel, string> = {
  good: 'var(--status-good)',
  warning: 'var(--status-warning)',
  critical: 'var(--status-critical)',
};

const STATUS_LABEL: Record<StatusLevel, string> = {
  good: '정상',
  warning: '주의',
  critical: '위험',
};

function operationRateStatus(rate: number): StatusLevel {
  if (rate >= 80) return 'good';
  if (rate >= 60) return 'warning';
  return 'critical';
}

function defectRateStatus(rate: number): StatusLevel {
  if (rate <= 2) return 'good';
  if (rate <= 5) return 'warning';
  return 'critical';
}

function alarmStatus(count: number): StatusLevel {
  if (count === 0) return 'good';
  if (count <= 3) return 'warning';
  return 'critical';
}

function Card({
  title,
  value,
  unit,
  status,
}: {
  title: string;
  value: string;
  unit?: string;
  status?: StatusLevel;
}) {
  return (
    <div
      style={{
        background: 'var(--surface-card)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: '16px 20px',
        flex: 1,
        minWidth: 160,
      }}
    >
      <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8 }}>{title}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <span style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-primary)' }}>{value}</span>
        {unit && <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{unit}</span>}
      </div>
      {status && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            marginTop: 8,
            fontSize: 12,
            color: STATUS_COLOR[status],
          }}
        >
          <span aria-hidden>●</span>
          {STATUS_LABEL[status]}
        </div>
      )}
    </div>
  );
}

export default function KpiCards({ kpi }: KpiCardsProps) {
  if (!kpi) {
    return <div style={{ color: 'var(--text-muted)', fontSize: 14 }}>KPI 불러오는 중...</div>;
  }

  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <Card
        title="가동률"
        value={kpi.operationRate.toFixed(1)}
        unit="%"
        status={operationRateStatus(kpi.operationRate)}
      />
      <Card title="오늘 생산량" value={kpi.totalProduction.toLocaleString()} unit="대" />
      <Card
        title="불량률"
        value={kpi.defectRate.toFixed(1)}
        unit="%"
        status={defectRateStatus(kpi.defectRate)}
      />
      <Card
        title="미해결 알람"
        value={String(kpi.activeAlarms)}
        unit="건"
        status={alarmStatus(kpi.activeAlarms)}
      />
    </div>
  );
}
