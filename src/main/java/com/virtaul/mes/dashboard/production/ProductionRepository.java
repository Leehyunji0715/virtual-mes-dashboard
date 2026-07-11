package com.virtaul.mes.dashboard.production;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ProductionRepository extends JpaRepository<Production, Long> {
    List<Production> findByProdDateBetween(LocalDate startDate, LocalDate endDate);
    List<Production> findByProdDateBetweenAndEquipment_Line(LocalDate startDate, LocalDate endDate, String line);

    @Query("SELECT COALESCE(SUM(p.actualQty), 0) FROM Production p WHERE p.prodDate = :date")
    int sumActualQtyByProdDate(@Param("date") LocalDate date);

    @Query("SELECT COALESCE(SUM(p.defectQty), 0) FROM Production p WHERE p.prodDate = :date")
    int sumDefectQtyByProdDate(@Param("date") LocalDate date);
}
