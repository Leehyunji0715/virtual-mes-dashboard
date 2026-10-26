import type { CSSProperties, ReactNode } from 'react';
import styles from './Card.module.css';

interface CardProps {
  children: ReactNode;
  /** 카드 제목. 주면 헤더가 함께 렌더링된다. */
  title?: string;
  /** 제목 옆 보조 설명 */
  subtitle?: string;
  /** 헤더 우측 영역 (필터, 요약 수치 등) */
  action?: ReactNode;
  /** 제목 바로 옆에 붙는 요소 (건수 배지 등) */
  badge?: ReactNode;
  /** 제목과 우측 영역의 기준선을 맞춘다 (수치가 들어갈 때) */
  alignBaseline?: boolean;
  className?: string;
  /** 그리드 배치 등 바깥 맥락에 속한 값만 넘긴다. 카드 내부 스타일은 CSS 에 둔다. */
  style?: CSSProperties;
}

/** 모든 콘텐츠가 올라가는 기본 면. Purity UI 의 .pu-card 에 해당한다. */
export default function Card({
  children,
  title,
  subtitle,
  action,
  badge,
  alignBaseline = false,
  className,
  style,
}: CardProps) {
  const classes = className ? `${styles.card} ${className}` : styles.card;

  return (
    <section className={classes} style={style}>
      {(title || action) && (
        <header className={`${styles.header} ${alignBaseline ? styles.headerBaseline : ''}`}>
          {title && (
            <div className={styles.titleGroup}>
              <div>
                <h2 className={styles.title}>{title}</h2>
                {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
              </div>
              {badge}
            </div>
          )}
          {action}
        </header>
      )}
      {children}
    </section>
  );
}
