package com.virtaul.mes.dashboard.kpi.dto;

public record DashboardKpiResponse(
    double operationRate,
    int totalProduction,
    double defectRate,
    long activeAlarms,
    EquipmentSummary equipmentSummary
) {
    public record EquipmentSummary(long running, long stop, long maintenance) {}
}
