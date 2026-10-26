import { useMemo } from 'react';
import type { Alarm } from '../../types/mes';
import Card from '../ui/Card';
import { alarmLevelRank } from '../common/statusMeta';
import AlarmRow from './AlarmRow';
import styles from './AlarmList.module.css';

interface AlarmListProps {
  alarms: ReadonlyArray<Alarm>;
  /** 부모 높이를 채운다 (상세 페이지 등) */
  fillHeight?: boolean;
  onResolve?: (id: number) => void;
  /** 실시간으로 막 도착한 알람 id */
  highlightIds?: ReadonlySet<number>;
}

/** 미해결 우선 → 심각도 → 최신순 */
function sortAlarms(alarms: ReadonlyArray<Alarm>): Alarm[] {
  return [...alarms].sort((a, b) => {
    if (a.isResolved !== b.isResolved) return a.isResolved ? 1 : -1;
    if (!a.isResolved) {
      const rank = alarmLevelRank(a.level) - alarmLevelRank(b.level);
      if (rank !== 0) return rank;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

function Summary({ alarms }: { alarms: ReadonlyArray<Alarm> }) {
  const unresolved = alarms.filter((a) => !a.isResolved);
  if (unresolved.length === 0) return null;

  const critical = unresolved.filter((a) => a.level === 'CRITICAL').length;
  const className = critical > 0 ? `${styles.summary} ${styles.summaryUrgent}` : styles.summary;

  return (
    <span className={className}>
      미해결 <span className="tabular">{unresolved.length}</span>
      {critical > 0 && (
        <>
          {' · CRITICAL '}
          <span className="tabular">{critical}</span>
        </>
      )}
    </span>
  );
}

export default function AlarmList({
  alarms,
  fillHeight = false,
  onResolve,
  highlightIds,
}: AlarmListProps) {
  const sorted = useMemo(() => sortAlarms(alarms), [alarms]);

  const className = [styles.card, fillHeight ? styles.fill : styles.bounded].join(' ');

  return (
    <Card title="알람" badge={<Summary alarms={alarms} />} className={className}>
      <div className={styles.list}>
        {sorted.length === 0 && <div className={styles.empty}>알람이 없습니다.</div>}
        {sorted.map((alarm) => (
          <AlarmRow
            key={alarm.id}
            alarm={alarm}
            isNew={highlightIds?.has(alarm.id)}
            onResolve={onResolve}
          />
        ))}
      </div>
    </Card>
  );
}
