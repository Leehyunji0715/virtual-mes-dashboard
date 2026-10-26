import type { Equipment } from '../../types/mes';
import Card from '../ui/Card';
import StatusBadge from '../common/StatusBadge';
import styles from './EquipmentListPanel.module.css';

interface EquipmentListPanelProps {
  equipmentList: ReadonlyArray<Equipment>;
  selectedId: number | null;
  onSelect: (id: number) => void;
}

/** 설비를 골라 상세를 여는 목록. 선택된 항목은 좌측 teal 바로 표시한다. */
export default function EquipmentListPanel({
  equipmentList,
  selectedId,
  onSelect,
}: EquipmentListPanelProps) {
  return (
    <Card title="설비 목록">
      <div className={styles.list}>
        {equipmentList.map((eq) => (
          <button
            key={eq.id}
            className={styles.item}
            aria-current={eq.id === selectedId ? 'true' : undefined}
            onClick={() => onSelect(eq.id)}
          >
            <span className={styles.name}>{eq.name}</span>
            <StatusBadge status={eq.status} />
          </button>
        ))}
      </div>
    </Card>
  );
}
