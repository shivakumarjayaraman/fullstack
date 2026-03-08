import { useEffect, useRef } from 'react';

/**
 * Session 22: Debounced auto-save hook.
 * Calls saveFn(data) after the specified delay whenever data changes.
 *
 * Usage:
 *   useAutoSave(formData, async (data) => await api.put('/draft', data), 1000);
 */
function useAutoSave(data, saveFn, delay = 1000) {
  const timerRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      saveFn(data);
    }, delay);

    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [data, delay]);
}

export default useAutoSave;
