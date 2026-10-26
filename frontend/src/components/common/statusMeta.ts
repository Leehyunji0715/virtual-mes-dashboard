import type { EquipmentStatus, AlarmLevel } from '../../types/mes';
import type { Tone } from '../ui/status';

/** 도메인 값 하나를 화면에서 어떻게 보일지 */
interface DisplayMeta {
  readonly tone: Tone;
  readonly label: string;
}

/** 설비 상태 → 표시 규칙 */
export const EQUIPMENT_STATUS: Readonly<Record<EquipmentStatus, DisplayMeta>> = {
  RUNNING: { tone: 'good', label: '가동' },
  MAINTENANCE: { tone: 'warning', label: '정비' },
  STOP: { tone: 'critical', label: '정지' },
};

/** 가동 중인 설비만 표식이 깜빡인다 */
export function isLive(status: EquipmentStatus): boolean {
  return status === 'RUNNING';
}

/** 알람 레벨 → 표시 규칙. label 은 원문 코드를 그대로 보인다. */
export const ALARM_LEVEL: Readonly<Record<AlarmLevel, DisplayMeta>> = {
  CRITICAL: { tone: 'critical', label: 'CRITICAL' },
  WARNING: { tone: 'warning', label: 'WARNING' },
  INFO: { tone: 'info', label: 'INFO' },
};

/** 미해결 알람 정렬 우선순위. 낮을수록 위로 */
const LEVEL_RANK: Readonly<Record<AlarmLevel, number>> = {
  CRITICAL: 0,
  WARNING: 1,
  INFO: 2,
};

export function alarmLevelRank(level: AlarmLevel): number {
  return LEVEL_RANK[level];
}
