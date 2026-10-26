import type { Equipment, Production } from '../../types/mes';
import Card from '../ui/Card';
import Metric from '../ui/Metric';
import StatusBadge from '../common/StatusBadge';
import { defectRateTone } from '../ui/status';
import styles from './EquipmentSummaryCard.module.css';

interface EquipmentSummaryCardProps {
  equipment: Equipment;
  productions: ReadonlyArray<Production>;
}

interface Totals {
  target: number;
  actual: number;
  defect: number;
  /** 실적이 0이면 계산할 수 없다 */
  defectRate: number | null;
}

function sumTotals(productions: ReadonlyArray<Production>): Totals {
  const target = productions.reduce((s, p) => s + p.targetQty, 0);
  const actual = productions.reduce((s, p) => s + p.actualQty, 0);
  const defect = productions.reduce((s, p) => s + p.defectQty, 0);
  return {
    target,
    actual,
    defect,
    defectRate: actual === 0 ? null : (defect / actual) * 100,
  };
}

/** 선택한 설비의 신원과 7일 누적 실적 */
export default function EquipmentSummaryCard({
  equipment,
  productions,
}: EquipmentSummaryCardProps) {
  const totals = sumTotals(productions);

  return (
    <Card>
      <div className={styles.head}>
        <div>
          <div className={`${styles.code} tabular`}>{equipment.equipmentCode}</div>
          <h2 className={styles.name}>{equipment.name}</h2>
          <div className={styles.meta}>
            {equipment.line} · {equipment.type}
          </div>
        </div>
        <StatusBadge status={equipment.status} />
      </div>

      <div className={styles.totals}>
        <Metric label="목표" value={totals.target.toLocaleString()} unit="대" />
        <Metric label="실적" value={totals.actual.toLocaleString()} unit="대" />
        <Metric label="불량" value={totals.defect.toLocaleString()} unit="대" />
        <Metric
          label="불량률"
          value={totals.defectRate === null ? '—' : totals.defectRate.toFixed(1)}
          unit={totals.defectRate === null ? undefined : '%'}
          tone={totals.defectRate === null ? undefined : defectRateTone(totals.defectRate)}
        />
      </div>
    </Card>
  );
}
