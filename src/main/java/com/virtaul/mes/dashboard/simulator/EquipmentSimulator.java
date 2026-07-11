package com.virtaul.mes.dashboard.simulator;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.virtaul.mes.dashboard.alarm.Alarm;
import com.virtaul.mes.dashboard.alarm.AlarmLevel;
import com.virtaul.mes.dashboard.alarm.AlarmRepository;
import com.virtaul.mes.dashboard.equipment.Equipment;
import com.virtaul.mes.dashboard.equipment.EquipmentRepository;
import com.virtaul.mes.dashboard.equipment.EquipmentStatus;
import com.virtaul.mes.dashboard.simulator.dto.EquipmentStatusEvent;
import com.virtaul.mes.dashboard.simulator.dto.NewAlarmEvent;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class EquipmentSimulator {
    private final EquipmentRepository equipmentRepository;
    private final AlarmRepository alarmRepository;
    private final SimpMessagingTemplate messagingTemplate;
    private final Random random = new Random();

    @Scheduled(fixedRate = 7000)
    public void simulate() {
        List<Equipment> equipmentList =  equipmentRepository.findAll();
        if (equipmentList.isEmpty()) {
            return;
        }

        Equipment target = equipmentList.get(random.nextInt(equipmentList.size()));
        if (random.nextInt(100) < 10)  { 
            changeStatus(target);
        }
        if (random.nextInt(100) < 5) { 
            createCriticalAlarm(target);
        }
    }

    private void changeStatus(Equipment equipment) {
        EquipmentStatus previousStatus = equipment.getStatus();
        EquipmentStatus nextStatus = previousStatus == EquipmentStatus.RUNNING
                ? EquipmentStatus.STOP
                : EquipmentStatus.RUNNING;

        equipment.setStatus(nextStatus);
        equipment.setUpdatedAt(LocalDateTime.now());
        equipmentRepository.save(equipment);
        messagingTemplate.convertAndSend(
            "/topic/equipment-status",
            EquipmentStatusEvent.of(equipment, previousStatus)
        );
    }

     private void createCriticalAlarm(Equipment equipment) {
        Alarm alarm = new Alarm();
        alarm.setEquipment(equipment);
        alarm.setLevel(AlarmLevel.CRITICAL);
        alarm.setMessage(equipment.getName() + " 이상 감지 (시뮬레이션)");
        alarm.setResolved(false);
        alarm.setCreatedAt(LocalDateTime.now());
        alarmRepository.save(alarm);

        messagingTemplate.convertAndSend("/topic/new-alarm", NewAlarmEvent.of(alarm));
     }
}
