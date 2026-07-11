package com.virtaul.mes.dashboard.alarm;

import com.virtaul.mes.dashboard.alarm.dto.AlarmResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AlarmService {
     private final AlarmRepository alarmRepository;

     public List<AlarmResponse> findByFilter(AlarmLevel level, Boolean isResolved) {
        List<Alarm> alarms;
        if (level != null && isResolved != null) {
            alarms = alarmRepository.findByLevelAndIsResolvedOrderByCreatedAtDesc(level, isResolved);
        } else if (level != null) {
            alarms = alarmRepository.findByLevelOrderByCreatedAtDesc(level);
        } else if (isResolved != null) {
            alarms = alarmRepository.findByIsResolvedOrderByCreatedAtDesc(isResolved);
        } else {
            alarms = alarmRepository.findAllByOrderByCreatedAtDesc();
        }

        return alarms.stream().map(AlarmResponse::from).toList();
     }
    
}
