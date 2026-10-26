import StatusMark from '../ui/StatusMark';
import styles from './Header.module.css';

interface HeaderProps {
  connected: boolean;
  title: string;
}

/** WebSocket 연결 상태. 연결 중이면 표식이 맥박처럼 깜빡인다. */
function ConnectionStatus({ connected }: { connected: boolean }) {
  const className = connected ? `${styles.connection} ${styles.connected}` : styles.connection;

  return (
    <div className={className} role="status">
      {connected ? <StatusMark tone="good" pulse /> : <span className={styles.idleDot} aria-hidden />}
      {connected ? '실시간 연결됨' : '연결 대기중'}
    </div>
  );
}

export default function Header({ connected, title }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div>
        <div className={styles.breadcrumb}>MES / 모니터링</div>
        <h1 className={styles.title}>{title}</h1>
      </div>
      <ConnectionStatus connected={connected} />
    </header>
  );
}
