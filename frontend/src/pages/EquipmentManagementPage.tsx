import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { getEquipmentList, getProduction, getAlarms, resolveAlarm } from '../api/mesApi';
import type { Equipment, Production, Alarm } from '../types/mes';
import StatusBadge from '../components/common/StatusBadge';
import AlarmList from '../components/dashboard/AlarmList';

function getISODate(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

const cardStyle: CSSProperties = {
  background: 'var(--surface-card)',
  border: '1px solid var(--border)',
  borderRadius: 12,
  padding: 16,
};

export default function EquipmentManagementPage() {
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
  const [productions, setProductions] = useState<Production[]>([]);
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    getEquipmentList().then((list) => {
      setEquipmentList(list);
      if (list.length > 0) setSelectedId(list[0].id);
    });
    getProduction(getISODate(6), getISODate(0)).then(setProductions);
    getAlarms().then(setAlarms);
  }, []);

  const selected = equipmentList.find((e) => e.id === selectedId) ?? null;

  const relatedProduction = useMemo(
    () => (selected ? productions.filter((p) => p.equipmentCode === selected.equipmentCode) : []),
    [productions, selected],
  );
  const relatedAlarms = useMemo(
    () => (selected ? alarms.filter((a) => a.equipmentCode === selected.equipmentCode) : []),
    [alarms, selected],
  );

  const handleResolve = (id: number) => {
    resolveAlarm(id).then(() => {
      setAlarms((prev) => prev.map((a) => (a.id === id ? { ...a, isResolved: true } : a)));
    });
  };

  return (
    <div
      style={{
        padding: 20,
        display: 'grid',
        gridTemplateColumns: '280px 1fr',
        gap: 16,
        alignItems: 'stretch',
      }}
    >
      <div style={{ ...cardStyle, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <h2 style={{ fontSize: 14, fontWeight: 600, margin: '0 0 12px', color: 'var(--text-primary)' }}>
          설비 목록
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, overflowY: 'auto' }}>
          {equipmentList.map((eq) => {
            const active = eq.id === selectedId;
            return (
              <button
                key={eq.id}
                onClick={() => setSelectedId(eq.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  borderRadius: 8,
                  border: 'none',
                  background: active ? 'var(--surface-page)' : 'transparent',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: 13,
                  color: 'var(--text-primary)',
                  fontFamily: 'inherit',
                }}
              >
                <span>{eq.name}</span>
                <StatusBadge status={eq.status} />
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%' }}>
        {selected && (
          <div style={{ ...cardStyle, flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: 'var(--text-primary)' }}>
                {selected.name} ({selected.equipmentCode})
              </h2>
              <StatusBadge status={selected.status} />
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
              {selected.line} · {selected.type}
            </div>
          </div>
        )}

        <div style={{ ...cardStyle, flexShrink: 0 }}>
          <h2 style={{ fontSize: 14, fontWeight: 600, margin: '0 0 12px', color: 'var(--text-primary)' }}>
            최근 생산실적 (7일)
          </h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--gridline)' }}>
                <th style={thStyle}>날짜</th>
                <th style={thStyle}>교대</th>
                <th style={thStyle}>목표</th>
                <th style={thStyle}>실제</th>
                <th style={thStyle}>불량</th>
              </tr>
            </thead>
            <tbody>
              {relatedProduction.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid var(--gridline)' }}>
                  <td style={tdStyle}>{p.prodDate}</td>
                  <td style={tdStyle}>{p.shift}</td>
                  <td style={tdStyle}>{p.targetQty}</td>
                  <td style={tdStyle}>{p.actualQty}</td>
                  <td style={tdStyle}>{p.defectQty}</td>
                </tr>
              ))}
              {relatedProduction.length === 0 && (
                <tr>
                  <td style={tdStyle} colSpan={5}>
                    데이터 없음
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div style={{ flex: 1, minHeight: 0, display: 'flex' }}>
          <AlarmList alarms={relatedAlarms} fillHeight onResolve={handleResolve} />
        </div>
      </div>
    </div>
  );
}

const thStyle: CSSProperties = { textAlign: 'left', padding: '8px 8px', color: 'var(--text-muted)', fontWeight: 500 };
const tdStyle: CSSProperties = { padding: '8px 8px', color: 'var(--text-primary)' };
