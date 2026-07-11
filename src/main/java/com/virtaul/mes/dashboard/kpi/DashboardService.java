package com.virtaul.mes.dashboard.kpi;

import java.time.LocalDate;

import org.springframework.stereotype.Service;

import com.virtaul.mes.dashboard.alarm.AlarmRepository;
import com.virtaul.mes.dashboard.equipment.EquipmentRepository;
import com.virtaul.mes.dashboard.equipment.EquipmentStatus;
import com.virtaul.mes.dashboard.kpi.dto.DashboardKpiResponse;
import com.virtaul.mes.dashboard.production.ProductionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DashboardService {
    private final EquipmentRepository equipmentRepository;
    private final ProductionRepository productionRepository;
    private final AlarmRepository alarmRepository;

    public DashboardKpiResponse getKpi() {
        long running = equipmentRepository.countByStatus(EquipmentStatus.RUNNING);
        long stop = equipmentRepository.countByStatus(EquipmentStatus.STOP);
        long maintenance = equipmentRepository.countByStatus(EquipmentStatus.MAINTENANCE);
        long totalEquipment = equipmentRepository.count();

        double operationRate = totalEquipment == 0 ? 0 : (running * 100.0) / totalEquipment;
        LocalDate today = LocalDate.now();
        int totalProduction = productionRepository.sumActualQtyByProdDate(today);
        int totalDefect = productionRepository.sumDefectQtyByProdDate(today);
        double defectRate = totalProduction == 0 ? 0 : (totalDefect * 100.0) / totalProduction;
        long activeAlarms = alarmRepository.countByIsResolved(false);

        return new DashboardKpiResponse(
            Math.round(operationRate * 10) / 10.0,
            totalProduction,
            Math.round(defectRate * 10) / 10.0,
            activeAlarms,
            new DashboardKpiResponse.EquipmentSummary(running, stop, maintenance)
        );
    }
}
