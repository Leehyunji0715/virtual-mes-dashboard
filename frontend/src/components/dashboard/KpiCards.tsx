import type { DashboardKpi } from '../../types/mes';
import Card from '../ui/Card';
import Metric from '../ui/Metric';
import StatusChip from '../ui/StatusChip';
import Icon, { type IconName } from '../common/Icon';
import {
  operationRateTone,
  defectRateTone,
  activeAlarmTone,
  TONE_LABEL,
  type Tone,
} from '../ui/status';
import EquipmentMixBar from './EquipmentMixBar';
import styles from './KpiCards.module.css';

/** 보조 KPI 한 장 */
function StatCard({
  label,
  value,
  unit,
  icon,
  tone,
}: {
  label: string;
  value: string;
  unit: string;
  icon: IconName;
  tone?: Tone;
}) {
  return (
    <Card className={styles.stat}>
      <div className={styles.statBody}>
        <Metric
          label={label}
          value={value}
          unit={unit}
          trailing={tone && <StatusChip tone={tone} label={TONE_LABEL[tone]} />}
        />
      </div>
      <div className={`${styles.iconBox} ${styles.iconBoxMuted}`}>
        <Icon name={icon} size={20} />
      </div>
    </Card>
  );
}

/** 가동률 — 한 화면의 주역. 설비 구성까지 함께 보여준다. */
function OperationRateCard({ kpi }: { kpi: DashboardKpi }) {
  const { running, stop, maintenance } = kpi.equipmentSummary;
  const total = running + stop + maintenance;
  const tone = operationRateTone(kpi.operationRate);

  return (
    <Card className={styles.primary}>
      <div className={styles.primaryHead}>
        <div>
          <div className={styles.overline}>설비 가동률</div>
          <div className={styles.caption}>
            설비 {total}대 중 {running}대 가동
          </div>
        </div>
        <div className={`${styles.iconBox} ${styles.iconBoxPrimary}`}>
          <Icon name="gauge" size={22} />
        </div>
      </div>

      <Metric
        value={kpi.operationRate.toFixed(1)}
        unit="%"
        size="lead"
        trailing={<StatusChip tone={tone} label={TONE_LABEL[tone]} />}
      />

      <EquipmentMixBar summary={kpi.equipmentSummary} />
    </Card>
  );
}

export default function KpiCards({ kpi }: { kpi: DashboardKpi | null }) {
  if (!kpi) {
    return <Card className={styles.loading}>KPI 불러오는 중…</Card>;
  }

  return (
    <div className={styles.grid}>
      <OperationRateCard kpi={kpi} />
      <StatCard
        label="오늘 생산량"
        value={kpi.totalProduction.toLocaleString()}
        unit="대"
        icon="output"
      />
      <StatCard
        label="불량률"
        value={kpi.defectRate.toFixed(1)}
        unit="%"
        icon="defect"
        tone={defectRateTone(kpi.defectRate)}
      />
      <StatCard
        label="미해결 알람"
        value={String(kpi.activeAlarms)}
        unit="건"
        icon="alarm"
        tone={activeAlarmTone(kpi.activeAlarms)}
      />
    </div>
  );
}
