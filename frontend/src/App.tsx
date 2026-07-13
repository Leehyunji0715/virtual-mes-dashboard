import { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import type { Page } from './components/layout/Sidebar';
import Header from './components/layout/Header';
import DashboardPage from './pages/DashboardPage';
import EquipmentManagementPage from './pages/EquipmentManagementPage';
import { useWebSocket } from './hooks/useWebSocket';

function App() {
  const { connected, equipmentUpdate, newAlarm } = useWebSocket();
  const [page, setPage] = useState<Page>('dashboard');

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar active={page} onNavigate={setPage} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Header connected={connected} />
        <main style={{ flex: 1, overflowY: 'auto' }}>
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
