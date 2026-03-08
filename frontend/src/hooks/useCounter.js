import { useState } from 'react';

/**
 * Session 15/23: Simple counter custom hook.
 * Exposes count, increment, decrement, reset.
 */
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}

export default useCounter;
