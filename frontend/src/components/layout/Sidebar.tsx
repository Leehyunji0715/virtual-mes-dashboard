const NAV_ITEMS = [
  { label: '대시보드', icon: '📊', active: true },
  { label: '설비 관리', icon: '⚙️', active: false },
];

export default function Sidebar() {
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
          <div
            key={item.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 12px',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: item.active ? 600 : 500,
              color: item.active ? 'var(--text-primary)' : 'var(--text-secondary)',
              background: item.active ? 'var(--surface-page)' : 'transparent',
              cursor: item.active ? 'default' : 'not-allowed',
            }}
          >
            <span aria-hidden>{item.icon}</span>
            {item.label}
          </div>
        ))}
      </nav>
    </aside>
  );
}
