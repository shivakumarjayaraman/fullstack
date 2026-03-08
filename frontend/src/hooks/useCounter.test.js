import { renderHook, act } from '@testing-library/react';
import useCounter from './useCounter';

describe('useCounter', () => {
  test('initializes with default value 0', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  test('initializes with provided value', () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });

  test('increment increases count by 1', () => {
    const { result } = renderHook(() => useCounter());
    act(() => result.current.increment());
    expect(result.current.count).toBe(1);
  });

  test('decrement decreases count by 1', () => {
    const { result } = renderHook(() => useCounter(5));
    act(() => result.current.decrement());
    expect(result.current.count).toBe(4);
  });

  test('reset returns count to initial value', () => {
    const { result } = renderHook(() => useCounter(3));
    act(() => result.current.increment());
    act(() => result.current.reset());
    expect(result.current.count).toBe(3);
  });
});
