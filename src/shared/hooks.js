import { useState, useCallback, useEffect } from 'react';
/**
 * @typedef {(value: unknown) => void} SubscribeFunction
 */
/**
 * @param {(subscribe: SubscribeFunction) => void} [subscribe] 
 * @returns {() => void}
 */
export const useFocusUpdate = (subscribe) => {
  const [, update] = useState({});
  useEffect(() => {
    return subscribe?.(() => update({}))
  }, [subscribe])
  return useCallback(() => update({}), []);
}