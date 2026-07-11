package com.virtaul.mes.dashboard.production;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.virtaul.mes.dashboard.production.dto.ProductionResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductionService {
    private final ProductionRepository productionRepository;
    public List<ProductionResponse> findByFilter(LocalDate startDate, LocalDate endDate, String line) {
        List<Production> productions = (line == null)
            ? productionRepository.findByProdDateBetween(startDate, endDate) 
            : productionRepository.findByProdDateBetweenAndEquipment_Line(startDate, endDate, line);
         return productions.stream().map(ProductionResponse::from).toList();
    }
}
