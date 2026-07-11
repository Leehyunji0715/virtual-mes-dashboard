package com.virtaul.mes.dashboard.kpi;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.virtaul.mes.dashboard.common.ApiResponse;
import com.virtaul.mes.dashboard.kpi.dto.DashboardKpiResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/dashboard")
@RequiredArgsConstructor
public class DashboardController {
    private final DashboardService dashboardService;

    @GetMapping("/kpi")
    public ApiResponse<DashboardKpiResponse> getKpi() {
        return ApiResponse.success(dashboardService.getKpi());
    }
}
