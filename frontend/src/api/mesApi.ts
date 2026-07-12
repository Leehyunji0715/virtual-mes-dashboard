import axios from 'axios';
import type { ApiResponse, Equipment, Production, Alarm, DashboardKpi } from '../types/mes';

const client = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
});

export const getEquipmentList = () =>
  client.get<ApiResponse<Equipment[]>>('/equipment').then((res) => res.data.data);

export const getEquipmentById = (id: number) =>
  client.get<ApiResponse<Equipment>>(`/equipment/${id}`).then((res) => res.data.data);

export const getProduction = (startDate: string, endDate: string, line?: string) =>
  client
    .get<ApiResponse<Production[]>>('/production', { params: { startDate, endDate, line } })
    .then((res) => res.data.data);

export const getAlarms = (level?: AlarmLevelParam, resolved?: boolean) =>
  client
    .get<ApiResponse<Alarm[]>>('/alarms', { params: { level, resolved } })
    .then((res) => res.data.data);

export const getDashboardKpi = () =>
  client.get<ApiResponse<DashboardKpi>>('/dashboard/kpi').then((res) => res.data.data);

type AlarmLevelParam = 'INFO' | 'WARNING' | 'CRITICAL';
