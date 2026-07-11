package com.virtaul.mes.dashboard.alarm;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AlarmRepository extends JpaRepository<Alarm, Long> {
    List<Alarm> findAllByOrderByCreatedAtDesc();
    List<Alarm> findByLevelOrderByCreatedAtDesc(AlarmLevel level);
    List<Alarm> findByIsResolvedOrderByCreatedAtDesc(boolean isResolved);
    List<Alarm> findByLevelAndIsResolvedOrderByCreatedAtDesc(AlarmLevel level, boolean isResolved);
}
