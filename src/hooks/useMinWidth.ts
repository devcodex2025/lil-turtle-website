import { useEffect, useState } from 'react';

export default function useMinWidth(minWidth: number) {
  const [matches, setMatches] = useState<boolean>(() => {
    try {
      if (typeof window === 'undefined') return false;
      return window.matchMedia(`(min-width: ${minWidth}px)`).matches;
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    try {
      const mq = window.matchMedia(`(min-width: ${minWidth}px)`);
      const handler = (ev: MediaQueryListEvent) => setMatches(ev.matches);
      // Support both modern and legacy APIs
      if (typeof mq.addEventListener === 'function') mq.addEventListener('change', handler);
      else mq.addListener(handler as any);
      // set initial in case it changed
      setMatches(mq.matches);
      return () => {
        if (typeof mq.removeEventListener === 'function') mq.removeEventListener('change', handler);
        else mq.removeListener(handler as any);
      };
    } catch (e) {
      // ignore
    }
  }, [minWidth]);

  return matches;
}
