import Icon from '../common/Icon';
import { NAV_ITEMS, type Page } from './navigation';
import styles from './Sidebar.module.css';

interface SidebarProps {
  active: Page;
  onNavigate: (page: Page) => void;
}

export default function Sidebar({ active, onNavigate }: SidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <div className={styles.brandName}>MES MONITOR</div>
        <div className={styles.brandCaption}>설비 모니터링</div>
      </div>

      <nav className={styles.nav}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            className={styles.item}
            aria-current={active === item.key ? 'page' : undefined}
            onClick={() => onNavigate(item.key)}
          >
            <span className={styles.iconBox}>
              <Icon name={item.icon} size={15} />
            </span>
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
