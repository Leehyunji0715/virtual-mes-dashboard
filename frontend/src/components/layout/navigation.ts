import type { IconName } from '../common/Icon';

export type Page = 'dashboard' | 'equipment';

interface NavItem {
  readonly key: Page;
  readonly label: string;
  readonly icon: IconName;
}

/** 사이드바 항목이자 페이지 제목의 출처. 두 곳에 같은 문자열을 두지 않는다. */
export const NAV_ITEMS: ReadonlyArray<NavItem> = [
  { key: 'dashboard', label: '대시보드', icon: 'dashboard' },
  { key: 'equipment', label: '설비 관리', icon: 'equipment' },
];

export function pageTitle(page: Page): string {
  return NAV_ITEMS.find((item) => item.key === page)?.label ?? '';
}
