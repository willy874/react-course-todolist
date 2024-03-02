import { createEventBus } from "../shared/event";

/** @typedef {() => void} OffListener */
/**
 * @template T
 * @typedef {Object} Store<T>
 * @property {() => T} getState
 * @property {(reducer: (state: T) => T) => void} dispatch
 * @property {(listener: (state: T) => void) => OffListener} subscribe
 */
/**
 * @template {object} T
 * @param {T | (() => T)} initialState
 * @returns {Store<T>}
 */
export function createStore(initialState) {
  let state = typeof initialState === 'function' ? initialState() : initialState
  const storeEvent = createEventBus()
  return {
    getState: () => state,
    dispatch: (reducer) => {
      const newState = reducer(state)
      if (!Object.is(newState, state)) {
        state = newState
        storeEvent.emit('updated', state)
      }
    },
    subscribe: (listener) => storeEvent.on('updated', listener)
  }
}
