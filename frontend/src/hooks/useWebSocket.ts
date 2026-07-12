import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import type { EquipmentStatusEvent, NewAlarmEvent } from '../types/mes';

interface UseWebSocketResult {
  connected: boolean;
  equipmentUpdate: EquipmentStatusEvent | null;
  newAlarm: NewAlarmEvent | null;
}

export const useWebSocket = (): UseWebSocketResult => {
  const [connected, setConnected] = useState(false);
  const [equipmentUpdate, setEquipmentUpdate] = useState<EquipmentStatusEvent | null>(null);
  const [newAlarm, setNewAlarm] = useState<NewAlarmEvent | null>(null);

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      onConnect: () => {
        setConnected(true);
        client.subscribe('/topic/equipment-status', (message) => {
          const event: EquipmentStatusEvent = JSON.parse(message.body);
          console.error('event', event);
          setEquipmentUpdate(event);
        });
        client.subscribe('/topic/new-alarm', (message) => {
          const alarm: NewAlarmEvent = JSON.parse(message.body);
          setNewAlarm(alarm);
        });
      },
      onDisconnect: () => {
        setConnected(false);
      },
    });
    client.activate();

    return () => {
      client.deactivate();
    };
  }, []);

  return { connected, equipmentUpdate, newAlarm };
};
