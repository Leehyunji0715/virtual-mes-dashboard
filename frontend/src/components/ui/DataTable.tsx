import type { ReactNode } from 'react';
import styles from './DataTable.module.css';

export interface Column<T> {
  /** 헤더에 보일 이름 */
  header: string;
  /** 한 행에서 이 열이 그릴 내용 */
  cell: (row: T) => ReactNode;
  /** 수치 열은 우측 정렬한다 */
  align?: 'left' | 'right';
  /** 이 열 셀에 추가로 붙일 클래스 (등폭 수치 등) */
  cellClassName?: string;
}

interface DataTableProps<T> {
  columns: ReadonlyArray<Column<T>>;
  rows: ReadonlyArray<T>;
  /** 행의 React key */
  rowKey: (row: T) => string | number;
  /** 행 전체에 붙일 클래스 — 실시간 변경 강조 등 */
  rowClassName?: (row: T) => string | undefined;
  onRowClick?: (row: T) => void;
  isSelected?: (row: T) => boolean;
  emptyMessage?: string;
}

/**
 * 열 정의를 데이터로 받는 표.
 *
 * 열 구성이 타입으로 드러나므로, 헤더와 셀이 어긋나는 실수를 컴파일 단계에서 막는다.
 */
export default function DataTable<T>({
  columns,
  rows,
  rowKey,
  rowClassName,
  onRowClick,
  isSelected,
  emptyMessage = '데이터가 없습니다.',
}: DataTableProps<T>) {
  const cellClass = (col: Column<T>) =>
    [styles.td, col.align === 'right' ? styles.alignRight : '', col.cellClassName ?? '']
      .filter(Boolean)
      .join(' ');

  return (
    <div className={styles.scroll}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.header}
                className={`${styles.th} ${col.align === 'right' ? styles.alignRight : ''}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td colSpan={columns.length} className={`${styles.td} ${styles.empty}`}>
                {emptyMessage}
              </td>
            </tr>
          )}
          {rows.map((row) => (
            <tr
              key={rowKey(row)}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={[
                styles.row,
                onRowClick ? styles.clickable : '',
                isSelected?.(row) ? styles.selected : '',
                rowClassName?.(row) ?? '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {columns.map((col) => (
                <td key={col.header} className={cellClass(col)}>
                  {col.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
