import type { Production } from '../../types/mes';
import Card from '../ui/Card';
import DataTable, { type Column } from '../ui/DataTable';
import styles from './ProductionTable.module.css';

const COLUMNS: ReadonlyArray<Column<Production>> = [
  { header: '날짜', cell: (p) => p.prodDate, cellClassName: 'tabular' },
  {
    header: '교대',
    cell: (p) => <span className={styles.shift}>{p.shift}</span>,
  },
  {
    header: '목표',
    cell: (p) => p.targetQty.toLocaleString(),
    align: 'right',
    cellClassName: 'tabular',
  },
  {
    header: '실적',
    cell: (p) => (
      <span className={p.actualQty >= p.targetQty ? styles.achieved : undefined}>
        {p.actualQty.toLocaleString()}
      </span>
    ),
    align: 'right',
    cellClassName: 'tabular',
  },
  {
    header: '불량',
    cell: (p) => (
      <span className={p.defectQty > 0 ? styles.hasDefect : styles.noDefect}>
        {p.defectQty.toLocaleString()}
      </span>
    ),
    align: 'right',
    cellClassName: 'tabular',
  },
];

export default function ProductionTable({
  productions,
}: {
  productions: ReadonlyArray<Production>;
}) {
  return (
    <Card title="생산실적" subtitle="최근 7일">
      <DataTable
        columns={COLUMNS}
        rows={productions}
        rowKey={(p) => p.id}
        emptyMessage="생산실적이 없습니다."
      />
    </Card>
  );
}
