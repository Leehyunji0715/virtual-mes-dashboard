package com.virtaul.mes.dashboard.production;

import java.time.LocalDate;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.virtaul.mes.dashboard.common.ApiResponse;
import com.virtaul.mes.dashboard.production.dto.ProductionResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/production")
@RequiredArgsConstructor
public class ProductionController {
    private final ProductionService productionService;

    @GetMapping
    public ApiResponse<List<ProductionResponse>> getByFilter(
            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate,
            @RequestParam(required = false) String line
    ) {
        return ApiResponse.success(productionService.findByFilter(startDate, endDate, line));
    }
}
