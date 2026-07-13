package com.virtaul.mes.dashboard.equipment.dto;

import com.virtaul.mes.dashboard.equipment.Equipment;
import com.virtaul.mes.dashboard.equipment.EquipmentStatus;

public record EquipmentResponse(
    Long id,
    String equipmentCode,
    String name,
    String line,
    String type,
    EquipmentStatus status
) {
    public static EquipmentResponse from(Equipment equipment) {
        return new EquipmentResponse(equipment.getId(), equipment.getEquipmentCode(), equipment.getName(), equipment.getLine(), equipment.getType(), equipment.getStatus());
    }
}
