import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * 최근 변경된 항목의 id 를 일정 시간 동안 들고 있는다.
 * 실시간으로 바뀐 행을 잠깐 강조하는 데 쓴다.
 *
 * @param durationMs 강조를 유지할 시간
 * @returns [현재 강조 중인 id 집합, 강조를 시작하는 함수]
 */
export function useRecentIds(durationMs: number) {
  const [ids, setIds] = useState<ReadonlySet<number>>(new Set());
  const timers = useRef(new Map<number, number>());

  const mark = useCallback(
    (id: number) => {
      setIds((prev) => new Set(prev).add(id));

      // 같은 id 가 다시 오면 타이머를 연장한다
      const existing = timers.current.get(id);
      if (existing !== undefined) window.clearTimeout(existing);

      const timer = window.setTimeout(() => {
        setIds((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
        timers.current.delete(id);
      }, durationMs);

      timers.current.set(id, timer);
    },
    [durationMs],
  );

  useEffect(() => {
    const map = timers.current;
    return () => {
      map.forEach((t) => window.clearTimeout(t));
      map.clear();
    };
  }, []);

  return [ids, mark] as const;
}
