import { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import { pageTitle, type Page } from './components/layout/navigation';
import DashboardPage from './pages/DashboardPage';
import EquipmentManagementPage from './pages/EquipmentManagementPage';
import { useWebSocket } from './hooks/useWebSocket';
import styles from './App.module.css';

function App() {
  const { connected, equipmentUpdate, newAlarm } = useWebSocket();
  const [page, setPage] = useState<Page>('dashboard');

  return (
    <div className={styles.shell}>
      <Sidebar active={page} onNavigate={setPage} />
      <div className={styles.column}>
        <Header connected={connected} title={pageTitle(page)} />
        <main className={styles.main}>
          {page === 'dashboard' ? (
            <DashboardPage equipmentUpdate={equipmentUpdate} newAlarm={newAlarm} />
          ) : (
            <EquipmentManagementPage />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
