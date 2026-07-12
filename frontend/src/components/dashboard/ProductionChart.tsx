import EChartsReact from 'echarts-for-react';
import { useEffect, useState, useMemo } from 'react';
import { getProduction } from '../../api/mesApi';
import type { Production } from '../../types/mes';

function getISODate(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

export default function ProductionChart() {
  const [productions, setProductions] = useState<Production[]>([]);

  useEffect(() => {
    getProduction(getISODate(6), getISODate(0)).then(setProductions);
  }, []);

  const { dates, targetData, actualData } = useMemo(() => {
    const byDate = new Map<string, { target: number; actual: number }>();
    for (const p of productions) {
      const entry = byDate.get(p.prodDate) ?? { target: 0, actual: 0 };
      entry.target += p.targetQty;
      entry.actual += p.actualQty;
      byDate.set(p.prodDate, entry);
    }
    const dates = Array.from(byDate.keys()).sort();
    return {
      dates,
      targetData: dates.map((d) => byDate.get(d)!.target),
      actualData: dates.map((d) => byDate.get(d)!.actual),
    };
  }, [productions]);

  const option = {
    color: ['#2a78d6', '#1baf7a'],
    legend: { data: ['목표', '실제'], bottom: 0 },
    grid: { left: 40, right: 20, top: 30, bottom: 40 },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: dates },
    yAxis: { type: 'value' },
    series: [
      { name: '목표', type: 'bar', data: targetData, itemStyle: { borderRadius: [4, 4, 0, 0] } },
      { name: '실제', type: 'bar', data: actualData, itemStyle: { borderRadius: [4, 4, 0, 0] } },
    ],
  };

  return (
    <div
      style={{
        background: 'var(--surface-card)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: 16,
      }}
    >
      <h2
        style={{ fontSize: 14, fontWeight: 600, margin: '0 0 12px', color: 'var(--text-primary)' }}
      >
        생산실적 (최근 7일)
      </h2>
      <EChartsReact option={option} style={{ height: 300 }} />
    </div>
  );
}
