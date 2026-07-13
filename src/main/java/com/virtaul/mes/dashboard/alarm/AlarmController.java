package com.virtaul.mes.dashboard.alarm;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.virtaul.mes.dashboard.alarm.dto.AlarmResponse;
import com.virtaul.mes.dashboard.common.ApiResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/alarms")
@RequiredArgsConstructor
public class AlarmController {
    private final AlarmService alarmService;

    @GetMapping
    public ApiResponse<List<AlarmResponse>> getByFilter(
        @RequestParam(required = false) AlarmLevel level,
        @RequestParam(required = false) Boolean resolved
    ) {
        return ApiResponse.success(alarmService.findByFilter(level, resolved));
    }

    @PatchMapping("/{id}/resolve")
    public ApiResponse<AlarmResponse> resolve(@PathVariable Long id) {
        return ApiResponse.success(alarmService.resolve(id));
    }
}
