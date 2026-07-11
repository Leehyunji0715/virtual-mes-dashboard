package com.virtaul.mes.dashboard.simulator.dto;

import java.time.LocalDateTime;

import com.virtaul.mes.dashboard.alarm.Alarm;

public record NewAlarmEvent(String type, Data data) {
       public record Data(
        Long id,
        Long equipmentId,
        String equipmentName,
        String level,
        String message,
        LocalDateTime createdAt
    ) {}

    public static NewAlarmEvent of(Alarm alarm) {
        return new NewAlarmEvent(
            "NEW_ALARM",
            new Data(
                alarm.getId(),
                alarm.getEquipment().getId(),
                alarm.getEquipment().getName(),
                alarm.getLevel().name(),
                alarm.getMessage(),
                alarm.getCreatedAt()
            )
        );
    }
}
