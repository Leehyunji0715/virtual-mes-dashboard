package com.virtaul.mes.dashboard.production;

import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface ProductionRepository extends JpaRepository<Production, Long> {
    List<Production> findByProdDateBetween(LocalDate startDate, LocalDate endDate);
    List<Production> findByProdDateBetweenAndEquipment_Line(LocalDate startDate, LocalDate endDate, String line);
}
