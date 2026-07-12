import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import DashboardPage from './pages/DashboardPage';
import { useWebSocket } from './hooks/useWebSocket';

function App() {
  const { connected, equipmentUpdate, newAlarm } = useWebSocket();

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Header connected={connected} />
        <main style={{ flex: 1, overflowY: 'auto' }}>
          <DashboardPage equipmentUpdate={equipmentUpdate} newAlarm={newAlarm} />
        </main>
      </div>
    </div>
  );
}

export default App;
