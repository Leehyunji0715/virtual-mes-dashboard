import type { CSSProperties } from 'react';
import { TONE, TONE_SHAPE, type Tone } from './status';
import styles from './StatusMark.module.css';

interface StatusMarkProps {
  tone: Tone;
  /** 가동 중처럼 "살아 있음"을 보여야 할 때 맥박처럼 깜빡인다 */
  pulse?: boolean;
}

/**
 * 상태 표식. 색과 함께 도형이 바뀌므로 색각 이상에서도 구분된다.
 * 항상 라벨과 함께 쓰고, 단독으로 의미를 전달하지 않는다.
 */
export default function StatusMark({ tone, pulse = false }: StatusMarkProps) {
  const shape = TONE_SHAPE[tone];
  const className = [styles.mark, styles[shape], pulse ? 'pulse-dot' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <span
      className={className}
      style={{ '--mark-fill': TONE[tone].fill } as CSSProperties}
      aria-hidden
    />
  );
}
