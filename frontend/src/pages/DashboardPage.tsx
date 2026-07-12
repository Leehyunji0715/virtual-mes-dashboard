import { useEffect, useState } from 'react';
import { getEquipmentList, getAlarms, getDashboardKpi } from '../api/mesApi';
import type {
  Equipment,
  Alarm,
  DashboardKpi,
  EquipmentStatusEvent,
  NewAlarmEvent,
} from '../types/mes';
import KpiCards from '../components/dashboard/KpiCards';
import AlarmList from '../components/dashboard/AlarmList';
import ProductionChart from '../components/dashboard/ProductionChart';
import EquipmentTable from '../components/equipment/EquipmentTable';

interface DashboardPageProps {
  equipmentUpdate: EquipmentStatusEvent | null;
  newAlarm: NewAlarmEvent | null;
}

export default function DashboardPage({ equipmentUpdate, newAlarm }: DashboardPageProps) {
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [kpi, setKpi] = useState<DashboardKpi | null>(null);

  useEffect(() => {
    getEquipmentList().then(setEquipmentList);
    getAlarms().then(setAlarms);
    getDashboardKpi().then(setKpi);
  }, []);

  useEffect(() => {
    if (!equipmentUpdate) return;
    setEquipmentList((prev) =>
      prev.map((eq) =>
        eq.id === equipmentUpdate.data.equipmentId
          ? { ...eq, status: equipmentUpdate.data.currentStatus }
          : eq,
      ),
    );
  }, [equipmentUpdate]);

  useEffect(() => {
    if (!newAlarm) return;
    const alarm: Alarm = {
      id: newAlarm.data.id,
      equipmentCode: '',
      equipmentName: newAlarm.data.equipmentName,
      level: newAlarm.data.level,
      message: newAlarm.data.message,
      isResolved: false,
      createdAt: newAlarm.data.createdAt,
      resolvedAt: null,
    };

    setAlarms((prev) => [alarm, ...prev]);
  }, [newAlarm]);

  return (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <KpiCards kpi={kpi} />

      <div
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignItems: 'start' }}
      >
        <ProductionChart />
        <EquipmentTable equipmentList={equipmentList} />
      </div>

      <AlarmList alarms={alarms} />
    </div>
  );
}
