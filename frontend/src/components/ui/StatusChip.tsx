import type { CSSProperties } from 'react';
import { TONE, type Tone } from './status';
import StatusMark from './StatusMark';
import styles from './StatusChip.module.css';

interface StatusChipProps {
  tone: Tone;
  label: string;
  /** 도형 표식을 함께 보인다. 라벨이 한글일 때 유용하다. */
  withMark?: boolean;
  /** 표식을 깜빡인다 (가동 중 등) */
  pulse?: boolean;
  /** CRITICAL 같은 영문 코드용 — 작고 자간이 넓다 */
  variant?: 'default' | 'code';
}

/** 상태를 색·도형·라벨 세 가지로 동시에 전달하는 배지 */
export default function StatusChip({
  tone,
  label,
  withMark = true,
  pulse = false,
  variant = 'default',
}: StatusChipProps) {
  const { bg, text } = TONE[tone];
  const className = variant === 'code' ? `${styles.chip} ${styles.code}` : styles.chip;

  return (
    <span
      className={className}
      style={{ '--chip-bg': bg, '--chip-text': text } as CSSProperties}
    >
      {withMark && <StatusMark tone={tone} pulse={pulse} />}
      {label}
    </span>
  );
}
