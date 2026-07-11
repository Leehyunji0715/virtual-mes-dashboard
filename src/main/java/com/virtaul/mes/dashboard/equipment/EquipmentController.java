package com.virtaul.mes.dashboard.equipment;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.virtaul.mes.dashboard.common.ApiResponse;
import com.virtaul.mes.dashboard.equipment.dto.EquipmentResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/equipment")
@RequiredArgsConstructor
public class EquipmentController {
    private final EquipmentService equipmentService;

    @GetMapping
    public ApiResponse<List<EquipmentResponse>> getAll() {
        return ApiResponse.success(equipmentService.findAll());
    }

    @GetMapping("/{id}")
    public ApiResponse<EquipmentResponse> getById(@PathVariable Long id) {
        return ApiResponse.success(equipmentService.findById(id));
    }
}
