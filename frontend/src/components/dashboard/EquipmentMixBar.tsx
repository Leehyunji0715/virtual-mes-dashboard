import type { CSSProperties } from 'react';
import type { DashboardKpi } from '../../types/mes';
import { TONE, type Tone } from '../ui/status';
import styles from './KpiCards.module.css';

type Summary = DashboardKpi['equipmentSummary'];

interface Segment {
  readonly key: keyof Summary;
  readonly label: string;
  readonly tone: Tone;
}

/** 표시 순서: 정상 → 주의 → 정지 */
const SEGMENTS: ReadonlyArray<Segment> = [
  { key: 'running', label: '가동', tone: 'good' },
  { key: 'maintenance', label: '정비', tone: 'warning' },
  { key: 'stop', label: '정지', tone: 'critical' },
];

/** 설비 10대가 어떤 상태로 나뉘어 있는지 한 줄로 보여준다 */
export default function EquipmentMixBar({ summary }: { summary: Summary }) {
  const total = summary.running + summary.stop + summary.maintenance;
  if (total === 0) return null;

  const visible = SEGMENTS.filter((s) => summary[s.key] > 0);

  return (
    <div>
      <div className={styles.bar}>
        {visible.map((s) => (
          <div
            key={s.key}
            className={styles.segment}
            style={
              {
                width: `${(summary[s.key] / total) * 100}%`,
                '--segment-fill': TONE[s.tone].fill,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <div className={styles.legend}>
        {visible.map((s) => (
          <span key={s.key} className={styles.legendItem}>
            <span
              className={styles.dot}
              style={{ '--segment-fill': TONE[s.tone].fill } as CSSProperties}
              aria-hidden
            />
            {s.label} <strong className="tabular">{summary[s.key]}</strong>
          </span>
        ))}
      </div>
    </div>
  );
}
