import type { EquipmentStatusEvent, NewAlarmEvent } from '../types/mes';
import { useDashboardData } from '../hooks/useDashboardData';
import KpiCards from '../components/dashboard/KpiCards';
import AlarmList from '../components/dashboard/AlarmList';
import ProductionChart from '../components/dashboard/ProductionChart';
import EquipmentTable from '../components/equipment/EquipmentTable';
import styles from './DashboardPage.module.css';

interface DashboardPageProps {
  equipmentUpdate: EquipmentStatusEvent | null;
  newAlarm: NewAlarmEvent | null;
}

export default function DashboardPage({ equipmentUpdate, newAlarm }: DashboardPageProps) {
  const { equipmentList, alarms, kpi, changedEquipmentIds, newAlarmIds, resolve } =
    useDashboardData(equipmentUpdate, newAlarm);

  return (
    <div className={styles.page}>
      <KpiCards kpi={kpi} />

      <div className={styles.row}>
        <ProductionChart />
        <EquipmentTable equipmentList={equipmentList} highlightIds={changedEquipmentIds} />
      </div>

      <AlarmList alarms={alarms} onResolve={resolve} highlightIds={newAlarmIds} />
    </div>
  );
}
