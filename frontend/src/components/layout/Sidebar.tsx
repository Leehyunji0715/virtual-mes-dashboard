export type Page = 'dashboard' | 'equipment';

interface SidebarProps {
  active: Page;
  onNavigate: (page: Page) => void;
}

const NAV_ITEMS: { key: Page; label: string; icon: string }[] = [
  { key: 'dashboard', label: '대시보드', icon: '📊' },
  { key: 'equipment', label: '설비 관리', icon: '⚙️' },
];

export default function Sidebar({ active, onNavigate }: SidebarProps) {
  return (
    <aside
      style={{
        width: 'var(--sidebar-width)',
        flexShrink: 0,
        background: 'var(--surface-card)',
        borderRight: '1px solid var(--border)',
        padding: '20px 12px',
      }}
    >
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            onClick={() => onNavigate(item.key)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 12px',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: active === item.key ? 600 : 500,
              color: active === item.key ? 'var(--text-primary)' : 'var(--text-secondary)',
              background: active === item.key ? 'var(--surface-page)' : 'transparent',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              width: '100%',
              fontFamily: 'inherit',
            }}
          >
            <span aria-hidden>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
