import { get, curry } from 'lodash'

/**
 * @typedef {{
 * <T extend object>(item: T, property: keyof T, list: T[]) => void
 * <T extend object>(item: T, property: keyof T, ) => (list: T[]) => void
 * <T extend object>(item: T) => ({
 *   (property: keyof T, list: T[]) => void
 *   (property: keyof T) => (list: T[]) => void
 * })
 * }} ListReducerCurry
 */

/**
 * @template {object} T
 * @param {T} newItem
 * @param {keyof T} property
 * @param {T[]} list
 * @returns {T[]}
 */
const updateReducer = (newItem, property, list) => {
  return list.map((item) => {
    if (get(item, property) === get(newItem, property)) {
      return {
        ...item,
        ...newItem,
      };
    }
    return item;
  });
};

/** @type {ListReducerCurry} */
export const updateReducerCurry = curry(updateReducer); 

/**
 * @template {object} T
 * @param {T} newItem
 * @param {string} property
 * @param {T[]} list
 * @returns {T[]}
 */
export function removeReducer(newItem, property, list) {
  return list.filter((item) => get(item, property) !== get(newItem, property));
}


/** @type {ListReducerCurry} */
export const removeReducerCurry = curry(removeReducer);

/**
 * @template T
 * @param {T} newItem
 * @param {T[]} list
 * @returns {T[]}
 */
export function addTodoReducer(newItem, list) {
  return [...list, newItem];
}

export const getLocalStorage = (key) => {
  return Promise.resolve(JSON.parse(localStorage.getItem(key)));
}

export const setLocalStorage = (key, value) => {
  return Promise.resolve(localStorage.setItem(key, JSON.stringify(value)));
}

export const addLocalStorage = (key, value) => {
  const data = JSON.parse(localStorage.getItem(key))
  const newData = [...data, value]
  return Promise.resolve(setLocalStorage(key, newData))
}

export const updateLocalStorage = (key, id, value) => {
  const data = JSON.parse(localStorage.getItem(key))
  const newData = data.map((item) => item.id === id ? { ...item, ...value } : item)
  return Promise.resolve(setLocalStorage(key, newData))
}

export const removeLocalStorage = (key, id) => {
  const data = JSON.parse(localStorage.getItem(key))
  const newData = data.filter((item) => item.id !== id)
  return Promise.resolve(setLocalStorage(key, newData))
}

/**
 *
 * @param {Set<string>} state
 * @param {{ type: 'add', payload: string } |
* { type: 'delete', payload: string } |
* { type: 'clear' }} action
*/
export const queueReducer = (state, action) => {
 switch (action.type) {
   case "add":
     return new Set([...state, action.payload]);
   case "delete":
     state.delete(action.payload);
     return new Set([...state]);
   case "clear":
     return new Set();
   default:
     return state;
 }
};