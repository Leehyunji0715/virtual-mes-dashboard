import type { CSSProperties, ReactNode } from 'react';
import { TONE, type Tone } from './status';
import styles from './Metric.module.css';

interface MetricProps {
  /** 라벨이 이미 바깥에 있으면 생략한다 */
  label?: string;
  /** 포맷이 끝난 문자열. 자릿수·소수점 결정은 호출부의 책임이다. */
  value: string;
  unit?: string;
  /** 'lead' 는 한 화면의 주역 수치. 여러 개 쓰면 위계가 사라진다. */
  size?: 'default' | 'lead';
  /** 값에 상태색을 입힌다 (임계값 초과 등) */
  tone?: Tone;
  /** 값 우측 끝에 붙는 요소 (상태 배지 등) */
  trailing?: ReactNode;
}

/** 라벨 + 수치 + 단위. 수치는 항상 등폭이라 실시간 갱신에도 자릿수가 흔들리지 않는다. */
export default function Metric({
  label,
  value,
  unit,
  size = 'default',
  tone,
  trailing,
}: MetricProps) {
  const valueClass = [styles.value, size === 'lead' ? styles.lead : '', tone ? styles.toned : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div>
      {label && <div className={styles.label}>{label}</div>}
      <div className={styles.row}>
        <span
          className={valueClass}
          style={tone ? ({ '--metric-color': TONE[tone].text } as CSSProperties) : undefined}
        >
          {value}
        </span>
        {unit && <span className={styles.unit}>{unit}</span>}
        {trailing && <span className={styles.trailing}>{trailing}</span>}
      </div>
    </div>
  );
}
