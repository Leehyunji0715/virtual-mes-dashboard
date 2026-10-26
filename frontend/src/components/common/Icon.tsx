/**
 * 선형 SVG 아이콘.
 * Purity UI 시스템은 이모지를 쓰지 않으므로 stroke 기반 아이콘으로 통일한다.
 * 색은 currentColor 를 따르므로 부모의 color 로 제어한다.
 */

export type IconName =
  'dashboard' | 'equipment' | 'gauge' | 'output' | 'defect' | 'alarm' | 'check' | 'chevron-right';

const PATHS: Record<IconName, React.ReactNode> = {
  dashboard: (
    <>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </>
  ),
  equipment: (
    <>
      <path d="M3 20V9l5-3 5 3v11" />
      <path d="M13 20V12l4-2.5 4 2.5v8" />
      <path d="M2 20h20" />
      <path d="M6.5 12.5h2M6.5 16h2M16.5 15h2" />
    </>
  ),
  gauge: (
    <>
      <path d="M4 18a8 8 0 1 1 16 0" />
      <path d="M12 18l4.5-5" />
      <circle cx="12" cy="18" r="1.3" />
    </>
  ),
  output: (
    <>
      <path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5z" />
      <path d="M3 7.5 12 12l9-4.5M12 12v9" />
    </>
  ),
  defect: (
    <>
      <path d="M12 3.5 21 19H3z" />
      <path d="M12 9.5v4" />
      <circle cx="12" cy="16.3" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  alarm: (
    <>
      <path d="M18 9a6 6 0 1 0-12 0c0 5-2 6.5-2 6.5h16S18 14 18 9" />
      <path d="M10.3 19a2 2 0 0 0 3.4 0" />
    </>
  ),
  check: <path d="M4.5 12.5 9.5 17.5 19.5 7" />,
  'chevron-right': <path d="M9 5l7 7-7 7" />,
};

interface IconProps {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  /** 의미를 전달하는 아이콘이면 라벨을 넘긴다. 없으면 장식으로 간주해 숨긴다. */
  label?: string;
}

export default function Icon({ name, size = 18, strokeWidth = 1.7, label }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={{ flexShrink: 0, display: 'block' }}
    >
      {PATHS[name]}
    </svg>
  );
}
