package com.virtaul.mes.dashboard.production;

import com.virtaul.mes.dashboard.equipment.Equipment;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name="production")
@Getter
@Setter
@NoArgsConstructor
public class Production {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "equipment_id", nullable = false)
    private Equipment equipment;

    @Column(nullable = false)
    private LocalDate prodDate;

    @Column(nullable = false)
    private String shift;

    @Column(nullable = false)
    private int targetQty;

    @Column(nullable = false)
    private int actualQty;

    @Column(nullable = false)
    private int defectQty;

    @Column(nullable = false)
    private LocalDateTime createdAt;
}
