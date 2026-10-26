import EChartsReact from 'echarts-for-react';
import { useEffect, useState, useMemo } from 'react';
import { getProduction } from '../../api/mesApi';
import type { Production } from '../../types/mes';
import Card from '../ui/Card';
import Metric from '../ui/Metric';
import { useThemeColors, type ThemeColors } from './useThemeColors';

function getISODate(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

interface DailyTotals {
  dates: string[];
  targetData: number[];
  actualData: number[];
  /** 7일 누적 목표 달성률(%). 실적이 없으면 null */
  achievedPercent: number | null;
}

function aggregateByDate(productions: ReadonlyArray<Production>): DailyTotals {
  const byDate = new Map<string, { target: number; actual: number }>();
  for (const p of productions) {
    const entry = byDate.get(p.prodDate) ?? { target: 0, actual: 0 };
    entry.target += p.targetQty;
    entry.actual += p.actualQty;
    byDate.set(p.prodDate, entry);
  }

  const dates = Array.from(byDate.keys()).sort();
  const targetData = dates.map((d) => byDate.get(d)!.target);
  const actualData = dates.map((d) => byDate.get(d)!.actual);
  const totalTarget = targetData.reduce((a, b) => a + b, 0);
  const totalActual = actualData.reduce((a, b) => a + b, 0);

  return {
    dates,
    targetData,
    actualData,
    achievedPercent: totalTarget === 0 ? null : (totalActual / totalTarget) * 100,
  };
}

function buildChartOption(totals: DailyTotals, c: ThemeColors) {
  const bar = (name: string, data: number[], color: string) => ({
    name,
    type: 'bar' as const,
    data,
    itemStyle: { color, borderRadius: [4, 4, 0, 0] as [number, number, number, number] },
    barMaxWidth: 18,
  });

  return {
    legend: {
      data: ['목표', '실적'],
      bottom: 0,
      icon: 'roundRect',
      itemWidth: 10,
      itemHeight: 10,
      textStyle: { color: c.text, fontSize: 12 },
    },
    grid: { left: 8, right: 8, top: 16, bottom: 36, containLabel: true },
    tooltip: {
      trigger: 'axis',
      backgroundColor: c.surface,
      borderColor: c.grid,
      textStyle: { color: c.text, fontSize: 12 },
      axisPointer: { type: 'shadow' },
    },
    xAxis: {
      type: 'category',
      data: totals.dates.map((d) => d.slice(5).replace('-', '/')),
      axisLine: { lineStyle: { color: c.grid } },
      axisTick: { show: false },
      axisLabel: { color: c.muted, fontSize: 11 },
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: c.grid } },
      axisLabel: { color: c.muted, fontSize: 11 },
    },
    series: [bar('목표', totals.targetData, c.target), bar('실적', totals.actualData, c.actual)],
  };
}

/** 목표 대비 실적을 부호 있는 퍼센트로 */
function AchievementMetric({ percent }: { percent: number }) {
  const delta = percent - 100;
  return (
    <Metric
      label="목표 달성"
      value={`${delta >= 0 ? '+' : ''}${delta.toFixed(1)}`}
      unit="%"
      layout="inline"
      tone={delta >= 0 ? 'good' : undefined}
    />
  );
}

export default function ProductionChart() {
  const [productions, setProductions] = useState<Production[]>([]);
  const colors = useThemeColors();

  useEffect(() => {
    getProduction(getISODate(6), getISODate(0)).then(setProductions);
  }, []);

  const totals = useMemo(() => aggregateByDate(productions), [productions]);
  // option 은 메모이즈하지 않는다. notMerge 로 넘길 때 참조가 그대로면
  // echarts-for-react 가 setOption 을 건너뛰어 시리즈가 그려지지 않는다.
  const option = buildChartOption(totals, colors);

  return (
    <Card
      title="생산실적"
      subtitle="최근 7일 · 목표 대비"
      alignBaseline
      action={
        totals.achievedPercent !== null && <AchievementMetric percent={totals.achievedPercent} />
      }
    >
      <EChartsReact option={option} style={{ height: 300 }} notMerge />
    </Card>
  );
}
