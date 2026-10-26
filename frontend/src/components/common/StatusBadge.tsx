import type { EquipmentStatus } from '../../types/mes';
import StatusChip from '../ui/StatusChip';
import { EQUIPMENT_STATUS, isLive } from './statusMeta';

/** 설비 상태 배지. 가동 중이면 표식이 깜빡인다. */
export default function StatusBadge({ status }: { status: EquipmentStatus }) {
  const { tone, label } = EQUIPMENT_STATUS[status];
  return <StatusChip tone={tone} label={label} pulse={isLive(status)} />;
}
