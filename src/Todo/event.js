/** @typedef {import('./services').Todo} Todo */
/**
 * @template {Record<string, (...args: any[]) => void>} T
 * @typedef {import('../shared/event').DefineEventBus<T>} DefineEventBus
 */
/**
 * @template T
 * @typedef {T extends Record<any, infer R> ? R : never} RecordValue
 */
import { createEventBus } from "../shared/event";

const TodoEventTypes = {
  /** @type {'FETCHED'} */
  FETCHED: 'FETCHED',
  /** @type {'ERROR'} */
  ERROR: 'ERROR',
  /** @type {'REQUEST_ADD'} */
  REQUEST_ADD: 'REQUEST_ADD',
  /** @type {'REQUEST_REMOVE'} */
  REQUEST_REMOVE: 'REQUEST_REMOVE',
  /** @type {'REQUEST_UPDATE'} */
  REQUEST_UPDATE: 'REQUEST_UPDATE',
  /** @type {'EFFECT'} */
  EFFECT: 'EFFECT'
}

/**
 * @enum {RecordValue<typeof TodoEventTypes>}
 */
const EventType = TodoEventTypes

/**
 * @type {DefineEventBus<{
 * [EventType.FETCHED]: (todos: Todo[]) => void,
 * [EventType.ERROR]: (error: unknown) => void,
 * [EventType.REQUEST_ADD]: (todo: Todo) => void,
 * [EventType.REQUEST_REMOVE]: (id: string) => void,
 * [EventType.REQUEST_UPDATE]: (todo: Partial<Todo>) => void,
 * [EventType.EFFECT]: () => void,
 * }> & typeof TodoEventTypes}
 */
export const todoEmitter = createEventBus(EventType);

