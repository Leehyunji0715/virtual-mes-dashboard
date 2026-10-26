import type { CSSProperties } from 'react';
import type { Alarm } from '../../types/mes';
import StatusChip from '../ui/StatusChip';
import { TONE } from '../ui/status';
import Icon from '../common/Icon';
import { ALARM_LEVEL } from '../common/statusMeta';
import styles from './AlarmList.module.css';

interface AlarmRowProps {
  alarm: Alarm;
  /** 실시간으로 막 도착한 알람이면 진입 애니메이션을 준다 */
  isNew?: boolean;
  onResolve?: (id: number) => void;
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleString('ko-KR', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function AlarmRow({ alarm, isNew = false, onResolve }: AlarmRowProps) {
  const { tone, label } = ALARM_LEVEL[alarm.level];

  const className = [styles.row, alarm.isResolved ? styles.resolved : '', isNew ? 'slide-in' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <article
      className={className}
      style={{ '--row-accent': TONE[tone].fill } as CSSProperties}
    >
      <StatusChip tone={tone} label={label} withMark={false} variant="code" />

      <div className={styles.body}>
        <div className={styles.message}>{alarm.message}</div>
        <div className={styles.meta}>
          {alarm.equipmentName} · <span className="tabular">{formatTime(alarm.createdAt)}</span>
        </div>
      </div>

      {!alarm.isResolved && onResolve && (
        <button className={styles.resolveButton} onClick={() => onResolve(alarm.id)}>
          <Icon name="check" size={13} strokeWidth={2.2} />
          해결
        </button>
      )}
    </article>
  );
}
