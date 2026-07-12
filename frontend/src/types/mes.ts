export type EquipmentStatus = 'RUNNING' | 'STOP' | 'MAINTENANCE';
export type AlarmLevel = 'INFO' | 'WARNING' | 'CRITICAL';

export interface Equipment {
  id: number;
  equipmentCode: string;
  name: string;
  line: string;
  type: string;
  status: EquipmentStatus;
}

export interface Production {
  id: number;
  equipmentCode: string;
  equipmentName: string;
  prodDate: string;
  shift: string;
  targetQty: number;
  actualQty: number;
  defectQty: number;
}

export interface Alarm {
  id: number;
  equipmentCode: string;
  equipmentName: string;
  level: AlarmLevel;
  message: string;
  isResolved: boolean;
  createdAt: string;
  resolvedAt: string | null;
}

export interface DashboardKpi {
  operationRate: number;
  totalProduction: number;
  defectRate: number;
  activeAlarms: number;
  equipmentSummary: {
    running: number;
    stop: number;
    maintenance: number;
  };
}

export interface ApiResponse<T> {
  status: string;
  data: T;
  message: string | null;
  timestamp: string;
}

export interface EquipmentStatusEvent {
  type: 'EQUIPMENT_STATUS_CHANGED';
  data: {
    equipmentId: number;
    equipmentCode: string;
    name: string;
    previousStatus: EquipmentStatus;
    currentStatus: EquipmentStatus;
    timestamp: string;
  };
}

export interface NewAlarmEvent {
  type: 'NEW_ALARM';
  data: {
    id: number;
    equipmentId: number;
    equipmentName: string;
    level: AlarmLevel;
    message: string;
    createdAt: string;
  };
}
