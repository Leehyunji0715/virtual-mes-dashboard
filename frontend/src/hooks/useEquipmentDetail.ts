import { useEffect, useMemo, useState } from 'react';
import { getEquipmentList, getProduction, getAlarms, resolveAlarm } from '../api/mesApi';
import type { Equipment, Production, Alarm } from '../types/mes';

function getISODate(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

interface EquipmentDetail {
  equipmentList: Equipment[];
  selectedId: number | null;
  select: (id: number) => void;
  /** 선택된 설비. 목록이 비었으면 null */
  selected: Equipment | null;
  /** 선택된 설비의 최근 7일 생산실적 */
  productions: Production[];
  /** 선택된 설비의 알람 */
  alarms: Alarm[];
  resolve: (id: number) => void;
}

/** 설비 관리 화면의 데이터. 선택된 설비에 맞춰 실적·알람을 걸러낸다. */
export function useEquipmentDetail(): EquipmentDetail {
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
  const [allProductions, setAllProductions] = useState<Production[]>([]);
  const [allAlarms, setAllAlarms] = useState<Alarm[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    getEquipmentList().then((list) => {
      setEquipmentList(list);
      if (list.length > 0) setSelectedId(list[0].id);
    });
    getProduction(getISODate(6), getISODate(0)).then(setAllProductions);
    getAlarms().then(setAllAlarms);
  }, []);

  const selected = useMemo(
    () => equipmentList.find((e) => e.id === selectedId) ?? null,
    [equipmentList, selectedId],
  );

  const productions = useMemo(
    () =>
      selected ? allProductions.filter((p) => p.equipmentCode === selected.equipmentCode) : [],
    [allProductions, selected],
  );

  const alarms = useMemo(
    () => (selected ? allAlarms.filter((a) => a.equipmentCode === selected.equipmentCode) : []),
    [allAlarms, selected],
  );

  const resolve = (id: number) => {
    resolveAlarm(id).then(() => {
      setAllAlarms((prev) => prev.map((a) => (a.id === id ? { ...a, isResolved: true } : a)));
    });
  };

  return {
    equipmentList,
    selectedId,
    select: setSelectedId,
    selected,
    productions,
    alarms,
    resolve,
  };
}
