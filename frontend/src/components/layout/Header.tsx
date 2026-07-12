interface HeaderProps {
  connected: boolean;
}

export default function Header({ connected }: HeaderProps) {
  return (
    <header
      style={{
        height: 56,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        background: 'var(--surface-card)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <h1 style={{ fontSize: 16, fontWeight: 600, margin: 0, color: 'var(--text-primary)' }}>
        MES 설비 모니터링 대시보드
      </h1>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 13,
          color: 'var(--text-secondary)',
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: connected ? 'var(--status-good)' : 'var(--text-muted)',
            display: 'inline-block',
          }}
          aria-hidden
        />
        {connected ? '실시간 연결됨' : '연결 대기중'}
      </div>
    </header>
  );
}
