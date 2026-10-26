import styles from './LineFilter.module.css';

/** "전체"를 나타내는 센티넬. 라인 이름과 겹치지 않는 값이어야 한다. */
export const ALL_LINES = '__ALL__';

interface LineFilterProps {
  lines: ReadonlyArray<string>;
  value: string;
  onChange: (line: string) => void;
}

export default function LineFilter({ lines, value, onChange }: LineFilterProps) {
  return (
    <label className={styles.wrapper}>
      <span className={styles.label}>라인</span>
      <select
        className={styles.select}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value={ALL_LINES}>전체</option>
        {lines.map((line) => (
          <option key={line} value={line}>
            {line}
          </option>
        ))}
      </select>
    </label>
  );
}
