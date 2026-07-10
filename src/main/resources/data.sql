-- ===== 설비 10대 =====
-- id는 IDENTITY 자동 채번: EQ-001~010이 순서대로 1~10번을 받음
INSERT INTO equipment (equipment_code, name, line, type, status, created_at, updated_at) VALUES
('EQ-001', 'CNC선반-01',  'A라인', '가공', 'RUNNING',     NOW(), NOW()),
('EQ-002', 'CNC선반-02',  'A라인', '가공', 'RUNNING',     NOW(), NOW()),
('EQ-003', '용접로봇-01', 'A라인', '조립', 'RUNNING',     NOW(), NOW()),
('EQ-004', '용접로봇-02', 'B라인', '조립', 'STOP',        NOW(), NOW()),
('EQ-005', '프레스-01',   'B라인', '가공', 'RUNNING',     NOW(), NOW()),
('EQ-006', '프레스-02',   'B라인', '가공', 'MAINTENANCE', NOW(), NOW()),
('EQ-007', '도장로봇-01', 'C라인', '도장', 'RUNNING',     NOW(), NOW()),
('EQ-008', '도장로봇-02', 'C라인', '도장', 'RUNNING',     NOW(), NOW()),
('EQ-009', '검사장비-01', 'C라인', '검사', 'RUNNING',     NOW(), NOW()),
('EQ-010', '검사장비-02', 'C라인', '검사', 'RUNNING',     NOW(), NOW());

-- ===== 생산실적: 설비 10대 x 최근 7일 = 70건 =====
-- equipment_id는 위 삽입 순서 그대로 1~10
-- target_qty는 설비 타입별 기준치(가공100/조립70/도장80/검사50), actual_qty는 요일별로 변동

-- equipment_id 1 (CNC선반-01, 가공 baseline 100)
INSERT INTO production (equipment_id, prod_date, shift, target_qty, actual_qty, defect_qty, created_at) VALUES
(1, CURRENT_DATE - 0, 'DAY',   100, 95,  1, NOW()),
(1, CURRENT_DATE - 1, 'NIGHT', 100, 88,  3, NOW()),
(1, CURRENT_DATE - 2, 'DAY',   100, 102, 0, NOW()),
(1, CURRENT_DATE - 3, 'NIGHT', 100, 85,  2, NOW()),
(1, CURRENT_DATE - 4, 'DAY',   100, 91,  1, NOW()),
(1, CURRENT_DATE - 5, 'NIGHT', 100, 97,  2, NOW()),
(1, CURRENT_DATE - 6, 'DAY',   100, 93,  1, NOW());

-- equipment_id 2 (CNC선반-02, 가공 baseline 100)
INSERT INTO production (equipment_id, prod_date, shift, target_qty, actual_qty, defect_qty, created_at) VALUES
(2, CURRENT_DATE - 0, 'DAY',   100, 95,  1, NOW()),
(2, CURRENT_DATE - 1, 'NIGHT', 100, 88,  3, NOW()),
(2, CURRENT_DATE - 2, 'DAY',   100, 102, 0, NOW()),
(2, CURRENT_DATE - 3, 'NIGHT', 100, 85,  2, NOW()),
(2, CURRENT_DATE - 4, 'DAY',   100, 91,  1, NOW()),
(2, CURRENT_DATE - 5, 'NIGHT', 100, 97,  2, NOW()),
(2, CURRENT_DATE - 6, 'DAY',   100, 93,  1, NOW());

-- equipment_id 3 (용접로봇-01, 조립 baseline 70)
INSERT INTO production (equipment_id, prod_date, shift, target_qty, actual_qty, defect_qty, created_at) VALUES
(3, CURRENT_DATE - 0, 'DAY',   70, 67, 1, NOW()),
(3, CURRENT_DATE - 1, 'NIGHT', 70, 62, 3, NOW()),
(3, CURRENT_DATE - 2, 'DAY',   70, 71, 0, NOW()),
(3, CURRENT_DATE - 3, 'NIGHT', 70, 60, 2, NOW()),
(3, CURRENT_DATE - 4, 'DAY',   70, 64, 1, NOW()),
(3, CURRENT_DATE - 5, 'NIGHT', 70, 68, 2, NOW()),
(3, CURRENT_DATE - 6, 'DAY',   70, 65, 1, NOW());

-- equipment_id 4 (용접로봇-02, 조립 baseline 70, 현재 STOP)
INSERT INTO production (equipment_id, prod_date, shift, target_qty, actual_qty, defect_qty, created_at) VALUES
(4, CURRENT_DATE - 0, 'DAY',   70, 67, 1, NOW()),
(4, CURRENT_DATE - 1, 'NIGHT', 70, 62, 3, NOW()),
(4, CURRENT_DATE - 2, 'DAY',   70, 71, 0, NOW()),
(4, CURRENT_DATE - 3, 'NIGHT', 70, 60, 2, NOW()),
(4, CURRENT_DATE - 4, 'DAY',   70, 64, 1, NOW()),
(4, CURRENT_DATE - 5, 'NIGHT', 70, 68, 2, NOW()),
(4, CURRENT_DATE - 6, 'DAY',   70, 65, 1, NOW());

-- equipment_id 5 (프레스-01, 가공 baseline 100)
INSERT INTO production (equipment_id, prod_date, shift, target_qty, actual_qty, defect_qty, created_at) VALUES
(5, CURRENT_DATE - 0, 'DAY',   100, 95,  1, NOW()),
(5, CURRENT_DATE - 1, 'NIGHT', 100, 88,  3, NOW()),
(5, CURRENT_DATE - 2, 'DAY',   100, 102, 0, NOW()),
(5, CURRENT_DATE - 3, 'NIGHT', 100, 85,  2, NOW()),
(5, CURRENT_DATE - 4, 'DAY',   100, 91,  1, NOW()),
(5, CURRENT_DATE - 5, 'NIGHT', 100, 97,  2, NOW()),
(5, CURRENT_DATE - 6, 'DAY',   100, 93,  1, NOW());

-- equipment_id 6 (프레스-02, 가공 baseline 100, 현재 MAINTENANCE)
INSERT INTO production (equipment_id, prod_date, shift, target_qty, actual_qty, defect_qty, created_at) VALUES
(6, CURRENT_DATE - 0, 'DAY',   100, 95,  1, NOW()),
(6, CURRENT_DATE - 1, 'NIGHT', 100, 88,  3, NOW()),
(6, CURRENT_DATE - 2, 'DAY',   100, 102, 0, NOW()),
(6, CURRENT_DATE - 3, 'NIGHT', 100, 85,  2, NOW()),
(6, CURRENT_DATE - 4, 'DAY',   100, 91,  1, NOW()),
(6, CURRENT_DATE - 5, 'NIGHT', 100, 97,  2, NOW()),
(6, CURRENT_DATE - 6, 'DAY',   100, 93,  1, NOW());

-- equipment_id 7 (도장로봇-01, 도장 baseline 80)
INSERT INTO production (equipment_id, prod_date, shift, target_qty, actual_qty, defect_qty, created_at) VALUES
(7, CURRENT_DATE - 0, 'DAY',   80, 76, 2, NOW()),
(7, CURRENT_DATE - 1, 'NIGHT', 80, 70, 4, NOW()),
(7, CURRENT_DATE - 2, 'DAY',   80, 82, 1, NOW()),
(7, CURRENT_DATE - 3, 'NIGHT', 80, 68, 3, NOW()),
(7, CURRENT_DATE - 4, 'DAY',   80, 73, 2, NOW()),
(7, CURRENT_DATE - 5, 'NIGHT', 80, 78, 2, NOW()),
(7, CURRENT_DATE - 6, 'DAY',   80, 74, 1, NOW());

-- equipment_id 8 (도장로봇-02, 도장 baseline 80)
INSERT INTO production (equipment_id, prod_date, shift, target_qty, actual_qty, defect_qty, created_at) VALUES
(8, CURRENT_DATE - 0, 'DAY',   80, 76, 2, NOW()),
(8, CURRENT_DATE - 1, 'NIGHT', 80, 70, 4, NOW()),
(8, CURRENT_DATE - 2, 'DAY',   80, 82, 1, NOW()),
(8, CURRENT_DATE - 3, 'NIGHT', 80, 68, 3, NOW()),
(8, CURRENT_DATE - 4, 'DAY',   80, 73, 2, NOW()),
(8, CURRENT_DATE - 5, 'NIGHT', 80, 78, 2, NOW()),
(8, CURRENT_DATE - 6, 'DAY',   80, 74, 1, NOW());

-- equipment_id 9 (검사장비-01, 검사 baseline 50)
INSERT INTO production (equipment_id, prod_date, shift, target_qty, actual_qty, defect_qty, created_at) VALUES
(9, CURRENT_DATE - 0, 'DAY',   50, 48, 0, NOW()),
(9, CURRENT_DATE - 1, 'NIGHT', 50, 44, 1, NOW()),
(9, CURRENT_DATE - 2, 'DAY',   50, 51, 0, NOW()),
(9, CURRENT_DATE - 3, 'NIGHT', 50, 43, 1, NOW()),
(9, CURRENT_DATE - 4, 'DAY',   50, 46, 0, NOW()),
(9, CURRENT_DATE - 5, 'NIGHT', 50, 49, 1, NOW()),
(9, CURRENT_DATE - 6, 'DAY',   50, 47, 0, NOW());

-- equipment_id 10 (검사장비-02, 검사 baseline 50)
INSERT INTO production (equipment_id, prod_date, shift, target_qty, actual_qty, defect_qty, created_at) VALUES
(10, CURRENT_DATE - 0, 'DAY',   50, 48, 0, NOW()),
(10, CURRENT_DATE - 1, 'NIGHT', 50, 44, 1, NOW()),
(10, CURRENT_DATE - 2, 'DAY',   50, 51, 0, NOW()),
(10, CURRENT_DATE - 3, 'NIGHT', 50, 43, 1, NOW()),
(10, CURRENT_DATE - 4, 'DAY',   50, 46, 0, NOW()),
(10, CURRENT_DATE - 5, 'NIGHT', 50, 49, 1, NOW()),
(10, CURRENT_DATE - 6, 'DAY',   50, 47, 0, NOW());

-- ===== 알람 18건 (CRITICAL 3 / WARNING 5 / INFO 10, 미해결 4건) =====
INSERT INTO alarm (equipment_id, level, message, is_resolved, created_at, resolved_at) VALUES
-- CRITICAL 3건 (1건 미해결)
(4, 'CRITICAL', '용접 전류 상한 초과 (285A > 250A)', false, NOW() - INTERVAL '1 hour', NULL),
(6, 'CRITICAL', '프레스 압력 센서 이상 감지', true, NOW() - INTERVAL '1 day', NOW() - INTERVAL '20 hours'),
(9, 'CRITICAL', '비전 카메라 통신 두절', true, NOW() - INTERVAL '3 days', NOW() - INTERVAL '2 days 22 hours'),

-- WARNING 5건 (3건 미해결)
(1, 'WARNING', '스핀들 온도 상한 근접 (78°C)', true, NOW() - INTERVAL '2 days', NOW() - INTERVAL '1 day 20 hours'),
(3, 'WARNING', '용접 와이어 잔량 부족', false, NOW() - INTERVAL '3 hours', NULL),
(7, 'WARNING', '도장 두께 편차 발생', true, NOW() - INTERVAL '2 days 5 hours', NOW() - INTERVAL '2 days'),
(8, 'WARNING', '불량률 5.2% - 기준치(3%) 초과', false, NOW() - INTERVAL '30 minutes', NULL),
(2, 'WARNING', '절삭유 레벨 낮음', false, NOW() - INTERVAL '5 hours', NULL),

-- INFO 10건 (전부 해결/확인 처리)
(1, 'INFO', '정기 점검 완료', true, NOW() - INTERVAL '6 days', NOW() - INTERVAL '6 days' + INTERVAL '10 minutes'),
(2, 'INFO', '가동 시작 (DAY 교대)', true, NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days' + INTERVAL '5 minutes'),
(3, 'INFO', '가동 시작 (DAY 교대)', true, NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days' + INTERVAL '5 minutes'),
(5, 'INFO', '생산 목표 달성', true, NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 days' + INTERVAL '10 minutes'),
(6, 'INFO', '정비 모드 진입', true, NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day' + INTERVAL '10 minutes'),
(7, 'INFO', '가동 시작 (NIGHT 교대)', true, NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days' + INTERVAL '5 minutes'),
(8, 'INFO', '가동 시작 (NIGHT 교대)', true, NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days' + INTERVAL '5 minutes'),
(9, 'INFO', '검사 완료 - 이상 없음', true, NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days' + INTERVAL '5 minutes'),
(10, 'INFO', '검사 완료 - 이상 없음', true, NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days' + INTERVAL '5 minutes'),
(10, 'INFO', '가동 종료 (일일 목표 달성)', true, NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day' + INTERVAL '5 minutes');
