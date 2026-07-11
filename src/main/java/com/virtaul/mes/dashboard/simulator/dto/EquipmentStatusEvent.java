package com.virtaul.mes.dashboard.simulator.dto;

import java.time.LocalDateTime;

import com.virtaul.mes.dashboard.equipment.Equipment;
import com.virtaul.mes.dashboard.equipment.EquipmentStatus;

public record EquipmentStatusEvent(String type, Data data) {
     public record Data(
        Long equipmentId,
        String equipmentCode,
        String name,
        String previousStatus,
        String currentStatus,
        LocalDateTime timestamp
    ) {}

      public static EquipmentStatusEvent of(Equipment equipment, EquipmentStatus previousStatus) {
        return new EquipmentStatusEvent(
            "EQUIPMENT_STATUS_CHANGED",
            new Data(
                equipment.getId(),
                equipment.getEquipmentCode(),
                equipment.getName(),
                previousStatus.name(),
                equipment.getStatus().name(),
                LocalDateTime.now()
            )
        );
    }

}
