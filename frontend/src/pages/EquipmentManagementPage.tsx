import { useEquipmentDetail } from '../hooks/useEquipmentDetail';
import EquipmentListPanel from '../components/equipment/EquipmentListPanel';
import EquipmentSummaryCard from '../components/equipment/EquipmentSummaryCard';
import ProductionTable from '../components/equipment/ProductionTable';
import AlarmList from '../components/dashboard/AlarmList';
import styles from './EquipmentManagementPage.module.css';

export default function EquipmentManagementPage() {
  const { equipmentList, selectedId, select, selected, productions, alarms, resolve } =
    useEquipmentDetail();

  return (
    <div className={styles.page}>
      <EquipmentListPanel
        equipmentList={equipmentList}
        selectedId={selectedId}
        onSelect={select}
      />

      <div className={styles.detail}>
        {selected && <EquipmentSummaryCard equipment={selected} productions={productions} />}
        <ProductionTable productions={productions} />
        <AlarmList alarms={alarms} onResolve={resolve} />
      </div>
    </div>
  );
}
