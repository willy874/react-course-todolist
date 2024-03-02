
/**
 * @typedef {Object} EventBus
 * @property {(type: string, handler: (detail: unknown) => void) => () => void} on
 * @property {(type: string, detail: unknown) => void} emit
 */

/**
 * @template {Record<string, (...args: any[]) => void>} T
 * @typedef {Object} DefineEventBus
 * @property {<K extends keyof T>(type: K, handler: T[K]) => () => void} on
 * @property {<K extends keyof T>(type: K, ...details: Parameters<T[K]>) => void} emit
 */

/**
 * @template {Record<string, string>} T
 * @param {T} [types]
 * @returns {EventBus & T}
 */
export const createEventBus = (types = {}) => {
  const emitter = new EventTarget();
  return {
    ...types,
    on: (type, handler) => {
      const callback = (event) => handler(...event.detail)
      emitter.addEventListener(type, callback);
      return () => emitter.removeEventListener(type, callback);
    },
    emit: (type, ...details) => emitter.dispatchEvent(new CustomEvent(type, { detail: details })),
  };
}