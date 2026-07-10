package com.virtaul.mes.dashboard.alarm;

import com.virtaul.mes.dashboard.equipment.Equipment;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name="alarm")
@Getter
@Setter
@NoArgsConstructor
public class Alarm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "equipment_id", nullable = false)
    private Equipment equipment;

    @Enumerated(EnumType.STRING)
    private AlarmLevel level;

    @Column(nullable = false)
    private String message;

    @Column(nullable = false)
    private boolean isResolved;

    @Column(nullable = false)
    private LocalDateTime createdAt;
    @Column
    private LocalDateTime resolvedAt;
}
