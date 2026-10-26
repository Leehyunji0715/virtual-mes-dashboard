# 실시간 이벤트 유실 분석

> 대상: WebSocket 기반 설비 상태 및 알람 전달 경로
> 작성일: 2026-10-26

## 배경

이 시스템은 설비 이상 상태를 운영자에게 **즉시** 알리는 것을 목적으로 한다.
알람 전달이 지연되거나 누락되면 설비 이상을 인지하지 못하므로, 전달 보장은 부가 기능이 아니라 핵심 요구사항이다.

실시간 전달 경로가 이 요구사항을 만족하는지 확인하기 위해 메시지 흐름을 추적했고,
전달이 보장되지 않는 구간 세 곳을 확인했다.

## 전달 경로

```
EquipmentSimulator (@Scheduled 7s)
  │  ① alarmRepository.save(alarm)              → PostgreSQL
  │  ② messagingTemplate.convertAndSend(...)    → STOMP SimpleBroker
  ▼
SimpleBroker (/topic/new-alarm)
  │  ③ 현재 구독자에게 fan-out
  ▼
useWebSocket (SockJS + STOMP)
  │  ④ setNewAlarm(event)
  ▼
AlarmList 렌더링
```

## 확인한 문제

### L-1. 구독자가 없는 순간에 발행된 이벤트는 폐기된다

**구간:** ③

`WebSocketConfig` 는 `enableSimpleBroker("/topic")` 를 사용한다.

```java
config.enableSimpleBroker("/topic");
```

`SimpleBroker` 는 Spring 이 제공하는 인메모리 브로커로, **메시지를 보관하지 않는다.**
발행 시점의 구독 레지스트리를 조회해 대상에게 전달하고, 대상이 없으면 그대로 폐기한다.
재전달 큐나 보관 기간 개념이 없다.

따라서 클라이언트 연결이 끊긴 구간에 발행된 알람은 **다시 접속해도 수신되지 않는다.**
알람 자체는 ①에서 DB 에 저장되므로 REST 조회(`GET /api/v1/alarms`)로는 보이지만,
실시간 경로에는 나타나지 않는다. 사용자가 수동으로 새로고침하지 않으면 인지 수단이 없다.

**영향:** CRITICAL 레벨 알람도 동일하게 폐기된다. 실시간 모니터링의 목적과 직접 충돌한다.

**재현:** 모든 클라이언트를 종료한 뒤 시뮬레이터가 알람을 생성하도록 대기 →
재접속 시 해당 알람이 실시간 수신되지 않고, REST 목록에만 존재함을 확인.

### L-2. 연결 복구 전략이 정의되어 있지 않다

**구간:** ④ 진입 전

```ts
const client = new Client({
  webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
  onConnect: () => { ... },
  onDisconnect: () => { setConnected(false); },
});
```

- `reconnectDelay` 를 지정하지 않아 재연결 간격이 라이브러리 기본값에 의존한다
- `onWebSocketError` / `onStompError` 핸들러가 없어 연결 실패가 관측되지 않는다
- 재연결 간격이 고정이면 서버 재시작 시 다수 클라이언트의 재접속 요청이 동시에 몰린다

또한 STOMP 구독은 연결에 종속되므로, 재연결 후 **구독이 자동 복구되지 않는다.**
현재 코드는 `onConnect` 콜백 안에서 구독하므로 재연결 시 구독 자체는 복원되지만,
L-1 에 따라 그 사이의 이벤트는 복구되지 않는다.

### L-3. 수신 상태가 단일 값이라 동시 도착 이벤트를 덮어쓴다

**구간:** ④

```ts
const [newAlarm, setNewAlarm] = useState<NewAlarmEvent | null>(null);
```

수신 결과를 **최신 1건만** 보관한다.
한 렌더 사이클 안에 두 개의 알람이 도착하면 앞의 알람은 화면에 반영되지 않고 사라진다.

이 문제가 중요한 이유는 **네트워크 단절과 무관하게 발생**한다는 점이다.
연결이 정상인 상태에서도 이벤트가 유실될 수 있으므로, 유실의 원인이 L-1 하나가 아니다.
현재는 시뮬레이터 주기가 7초여서 드물게 나타나지만, 이벤트 빈도가 올라가면 상시 발생한다.

### L-4. 저장과 발행이 원자적이지 않다 (이번 범위에서는 해결하지 않음)

**구간:** ① → ②

```java
alarmRepository.save(alarm);
messagingTemplate.convertAndSend("/topic/new-alarm", NewAlarmEvent.of(alarm));
```

`EquipmentSimulator.simulate()` 에는 트랜잭션 경계가 선언되어 있지 않다.
트랜잭션은 `SimpleJpaRepository.save()` 단위로 적용되므로, ①의 커밋과 ②의 발행은 별개 작업이다.

이론적으로 ②가 성공한 뒤 ①의 커밋이 실패하면, DB 에 존재하지 않는 알람이 화면에 표시될 수 있다.
반대로 ② 직전에 예외가 발생하면 DB 에만 남고 실시간 전달은 누락된다.

해결 방향은 트랜잭션 커밋 이후 발행하도록 바꾸는 것(`@TransactionalEventListener(AFTER_COMMIT)`)이지만,
이번 작업의 범위는 **구독 단절 구간의 유실 복구**로 한정했다.
L-4 는 발생 조건이 다르고 해결 방식도 다르므로 별도 과제로 분리한다.

## 분류

| 문제 | 발생 조건 | 결과 | 이번 범위 |
|---|---|---|---|
| L-1 | 구독자 없는 시점에 이벤트 발행 | 영구 유실 | 해결 |
| L-2 | 서버 재시작, 네트워크 불안정 | 복구 지연, 실패 미관측 | 해결 |
| L-3 | 동일 렌더 사이클에 2건 이상 도착 | 유실 | 해결 |
| L-4 | DB 커밋 실패 | 화면과 DB 불일치 | 별도 과제 |

## 설계로 이어지는 결론

1. **유실을 탐지할 수단이 없다.** 클라이언트가 "어디까지 받았는지" 표현할 방법이 없으므로,
   누락 여부를 판단할 수 없다. 식별자 체계가 선행되어야 한다.
2. **복구 데이터는 이미 존재한다.** 알람이 DB 에 저장되고 있으므로, 브로커를 교체하지 않고도
   DB 를 사실의 원천으로 사용하는 복구 경로를 만들 수 있다.
3. **재전달은 중복을 만든다.** 복구 조회 구간과 실시간 수신 구간은 겹치므로,
   중복 제거는 선택이 아니라 필수 후속 작업이다.

→ 설계: `docs/design/event-recovery.md`
