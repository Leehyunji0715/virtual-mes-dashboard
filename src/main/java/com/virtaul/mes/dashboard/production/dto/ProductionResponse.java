package com.virtaul.mes.dashboard.production.dto;

import java.time.LocalDate;

import com.virtaul.mes.dashboard.production.Production;

public record ProductionResponse(  
    Long id,
    String equipmentCode,
    String equipmentName,
    LocalDate prodDate,
    String shift,
    int targetQty,
    int actualQty,
    int defectQty
) {
    public static ProductionResponse from(Production production) {
        return new ProductionResponse(
            production.getId(),
            production.getEquipment().getEquipmentCode(),  // Equipment 객체 통째로가 아니라
            production.getEquipment().getName(),            // 필요한 필드만 뽑아옴
            production.getProdDate(),
            production.getShift(),
            production.getTargetQty(),
            production.getActualQty(),
            production.getDefectQty()
        );
    }
}
