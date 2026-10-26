import { useEffect, useState } from 'react';
import { getEquipmentList, getAlarms, getDashboardKpi, resolveAlarm } from '../api/mesApi';
import type {
  Equipment,
  Alarm,
  DashboardKpi,
  EquipmentStatusEvent,
  NewAlarmEvent,
} from '../types/mes';
import { useRecentIds } from './useRecentIds';

/** 실시간 변경을 강조해두는 시간 */
const HIGHLIGHT_MS = 2000;

interface DashboardData {
  equipmentList: Equipment[];
  alarms: Alarm[];
  kpi: DashboardKpi | null;
  /** 상태가 막 바뀐 설비 */
  changedEquipmentIds: ReadonlySet<number>;
  /** 막 도착한 알람 */
  newAlarmIds: ReadonlySet<number>;
  resolve: (id: number) => void;
}

/** WebSocket 이벤트를 받아 알람으로 바꾼다. 서버가 보내지 않는 필드는 비워둔다. */
function toAlarm(event: NewAlarmEvent): Alarm {
  return {
    id: event.data.id,
    equipmentCode: '',
    equipmentName: event.data.equipmentName,
    level: event.data.level,
    message: event.data.message,
    isResolved: false,
    createdAt: event.data.createdAt,
    resolvedAt: null,
  };
}

/**
 * 대시보드가 쓰는 데이터와 실시간 반영을 한곳에 모은다.
 * 화면 컴포넌트는 이 훅이 돌려주는 값만 그린다.
 */
export function useDashboardData(
  equipmentUpdate: EquipmentStatusEvent | null,
  newAlarm: NewAlarmEvent | null,
): DashboardData {
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [kpi, setKpi] = useState<DashboardKpi | null>(null);

  const [changedEquipmentIds, markEquipment] = useRecentIds(HIGHLIGHT_MS);
  const [newAlarmIds, markAlarm] = useRecentIds(HIGHLIGHT_MS);

  useEffect(() => {
    getEquipmentList().then(setEquipmentList);
    getAlarms().then(setAlarms);
    getDashboardKpi().then(setKpi);
  }, []);

  // 설비 상태 변경
  useEffect(() => {
    if (!equipmentUpdate) return;
    const { equipmentId, currentStatus } = equipmentUpdate.data;

    setEquipmentList((prev) =>
      prev.map((eq) => (eq.id === equipmentId ? { ...eq, status: currentStatus } : eq)),
    );
    markEquipment(equipmentId);

    // 상태가 바뀌면 가동률도 달라진다
    getDashboardKpi().then(setKpi);
  }, [equipmentUpdate, markEquipment]);

  // 신규 알람
  useEffect(() => {
    if (!newAlarm) return;
    const alarm = toAlarm(newAlarm);

    // 같은 알람이 두 경로로 들어올 수 있으므로 id 로 중복을 막는다
    setAlarms((prev) => (prev.some((a) => a.id === alarm.id) ? prev : [alarm, ...prev]));
    markAlarm(alarm.id);
    getDashboardKpi().then(setKpi);
  }, [newAlarm, markAlarm]);

  const resolve = (id: number) => {
    resolveAlarm(id).then(() => {
      setAlarms((prev) => prev.map((a) => (a.id === id ? { ...a, isResolved: true } : a)));
      getDashboardKpi().then(setKpi);
    });
  };

  return { equipmentList, alarms, kpi, changedEquipmentIds, newAlarmIds, resolve };
}
