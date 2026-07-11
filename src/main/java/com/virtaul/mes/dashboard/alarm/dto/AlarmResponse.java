package com.virtaul.mes.dashboard.alarm.dto;

import java.time.LocalDateTime;

import com.virtaul.mes.dashboard.alarm.Alarm;
import com.virtaul.mes.dashboard.alarm.AlarmLevel;

public record AlarmResponse(
    Long id,
    String equipmentCode,
    String equipmentName,
    AlarmLevel level,
    String message,
    boolean isResolved,
    LocalDateTime createdAt,
    LocalDateTime resolvedAt
) {
   public static AlarmResponse from(Alarm alarm) {
        return new AlarmResponse(
            alarm.getId(),
            alarm.getEquipment().getEquipmentCode(),
            alarm.getEquipment().getName(),
            alarm.getLevel(),
            alarm.getMessage(),
            alarm.isResolved(),
            alarm.getCreatedAt(),
            alarm.getResolvedAt()
        );
    } 
}
