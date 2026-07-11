package com.virtaul.mes.dashboard.equipment;

import org.springframework.stereotype.Service;

import com.virtaul.mes.dashboard.common.ResourceNotFoundException;
import com.virtaul.mes.dashboard.equipment.dto.EquipmentResponse;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EquipmentService {
    private final EquipmentRepository equipmentRepository;

    public List<EquipmentResponse> findAll() {
        return equipmentRepository.findAll().stream().map(EquipmentResponse::from).toList();
    }

    public EquipmentResponse findById(Long id) {
        Equipment equipment = equipmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("설비를 찾을 수 없습니다: " + id));
        return EquipmentResponse.from(equipment);
    }
}
