/**
 * 상태 표현의 단일 출처.
 *
 * 설비 상태(RUNNING/STOP/MAINTENANCE), 알람 레벨(INFO/WARNING/CRITICAL),
 * KPI 임계값 판정이 모두 같은 시각 어휘를 쓰도록 여기서 한 번만 정의한다.
 */

/** 시각적 심각도. 도메인 값은 모두 이 네 단계 중 하나로 환산된다. */
export type Tone = 'good' | 'warning' | 'critical' | 'info';

/**
 * 색만으로 구분하지 않기 위한 도형.
 * 색각 이상에서도 상태를 구분할 수 있어야 한다.
 */
export type MarkShape = 'circle' | 'triangle' | 'square';

/** Tone 별 CSS 변수 묶음. 값이 아니라 변수명을 들고 있어 테마 전환이 자동으로 된다. */
interface ToneTokens {
  /** 채움 — 점, 바, 아이콘 */
  readonly fill: string;
  /** 텍스트 — 채움색을 글자에 쓰면 대비가 부족하다 */
  readonly text: string;
  /** 연한 배경 — 배지, 강조 영역 */
  readonly bg: string;
}

export const TONE: Readonly<Record<Tone, ToneTokens>> = {
  good: {
    fill: 'var(--status-good)',
    text: 'var(--status-good-text)',
    bg: 'var(--status-good-bg)',
  },
  warning: {
    fill: 'var(--status-warning)',
    text: 'var(--status-warning-text)',
    bg: 'var(--status-warning-bg)',
  },
  critical: {
    fill: 'var(--status-critical)',
    text: 'var(--status-critical-text)',
    bg: 'var(--status-critical-bg)',
  },
  info: {
    fill: 'var(--status-info)',
    text: 'var(--status-info-text)',
    bg: 'var(--status-info-bg)',
  },
};

/** Tone 에 대응하는 도형. good 만 원이고 나머지는 모양이 달라 색 없이도 구분된다. */
export const TONE_SHAPE: Readonly<Record<Tone, MarkShape>> = {
  good: 'circle',
  warning: 'triangle',
  critical: 'square',
  info: 'circle',
};

// ---------- 임계값 판정 ----------
// 수치를 Tone 으로 바꾸는 규칙. 화면이 아니라 여기에 모아둔다.

/** 가동률: 높을수록 좋다 */
export function operationRateTone(ratePercent: number): Tone {
  if (ratePercent >= 80) return 'good';
  if (ratePercent >= 60) return 'warning';
  return 'critical';
}

/** 불량률: 낮을수록 좋다 */
export function defectRateTone(ratePercent: number): Tone {
  if (ratePercent <= 2) return 'good';
  if (ratePercent <= 5) return 'warning';
  return 'critical';
}

/** 미해결 알람 수 */
export function activeAlarmTone(count: number): Tone {
  if (count === 0) return 'good';
  if (count <= 3) return 'warning';
  return 'critical';
}

/** KPI 카드에 쓰는 한글 라벨 */
export const TONE_LABEL: Readonly<Record<Tone, string>> = {
  good: '정상',
  warning: '주의',
  critical: '위험',
  info: '안내',
};
