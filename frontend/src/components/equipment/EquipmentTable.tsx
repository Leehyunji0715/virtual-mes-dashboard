import { useMemo, useState } from 'react';
import type { Equipment } from '../../types/mes';
import Card from '../ui/Card';
import DataTable, { type Column } from '../ui/DataTable';
import StatusBadge from '../common/StatusBadge';
import LineFilter, { ALL_LINES } from './LineFilter';

interface EquipmentTableProps {
  equipmentList: ReadonlyArray<Equipment>;
  /** 상태가 막 바뀐 설비 id — 해당 행을 한 번 깜빡인다 */
  highlightIds?: ReadonlySet<number>;
  selectedId?: number | null;
  onSelect?: (equipment: Equipment) => void;
}

const COLUMNS: ReadonlyArray<Column<Equipment>> = [
  { header: '코드', cell: (eq) => eq.equipmentCode, cellClassName: 'tabular' },
  { header: '설비명', cell: (eq) => eq.name },
  { header: '라인', cell: (eq) => eq.line },
  { header: '상태', cell: (eq) => <StatusBadge status={eq.status} />, align: 'right' },
];

export default function EquipmentTable({
  equipmentList,
  highlightIds,
  selectedId,
  onSelect,
}: EquipmentTableProps) {
  const [line, setLine] = useState<string>(ALL_LINES);

  const lines = useMemo(
    () => Array.from(new Set(equipmentList.map((e) => e.line))),
    [equipmentList],
  );

  const rows = useMemo(
    () => (line === ALL_LINES ? equipmentList : equipmentList.filter((e) => e.line === line)),
    [equipmentList, line],
  );

  return (
    <Card title="설비 현황" action={<LineFilter lines={lines} value={line} onChange={setLine} />}>
      <DataTable
        columns={COLUMNS}
        rows={rows}
        rowKey={(eq) => eq.id}
        rowClassName={(eq) => (highlightIds?.has(eq.id) ? 'flash-update' : undefined)}
        isSelected={selectedId != null ? (eq) => eq.id === selectedId : undefined}
        onRowClick={onSelect}
        emptyMessage="해당 라인의 설비가 없습니다."
      />
    </Card>
  );
}
