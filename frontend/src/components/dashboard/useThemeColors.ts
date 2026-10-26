import { useEffect, useState } from 'react';

/** ECharts 처럼 CSS 변수를 해석하지 못하는 곳에 넘길 실제 색 */
export interface ThemeColors {
  actual: string;
  target: string;
  text: string;
  muted: string;
  grid: string;
  surface: string;
}

function readColors(): ThemeColors {
  const s = getComputedStyle(document.documentElement);
  const get = (name: string) => s.getPropertyValue(name).trim();
  return {
    actual: get('--series-1'),
    target: get('--series-2'),
    text: get('--text-secondary'),
    muted: get('--text-muted'),
    grid: get('--gridline'),
    surface: get('--surface-card'),
  };
}

/**
 * 토큰에서 실제 색을 읽고, 테마가 바뀌면 다시 읽는다.
 * CSS 변수를 직접 쓸 수 없는 캔버스 기반 라이브러리를 위한 다리다.
 */
export function useThemeColors(): ThemeColors {
  const [colors, setColors] = useState<ThemeColors>(readColors);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const update = () => setColors(readColors());
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return colors;
}
