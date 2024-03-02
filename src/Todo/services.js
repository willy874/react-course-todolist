import { getLocalStorage, addLocalStorage, removeLocalStorage, updateLocalStorage } from '../shared/utils';

/**
 * @typedef {Object} Todo
 * @property {string} id
 * @property {string} text
 * @property {boolean} completed
 */

const REQUEST_PATH = '/apis/todos'
const DELAY_TIME = 500

/**
 * @returns {Promise<Todo[]>}
 */
export const fetchTodoList = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getLocalStorage(REQUEST_PATH));
    }, DELAY_TIME);
  })
}

/**
 * @param {Todo} todo
 * @returns {Promise<Todo>}
 */
export const fetchCreateTodo = (todo) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(addLocalStorage(REQUEST_PATH, todo));
    }, DELAY_TIME);
  })
}

/**
 * @param {string} id
 * @returns {Promise<Todo>}
 */
export const fetchDeleteTodo = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(removeLocalStorage(REQUEST_PATH, id));
    }, DELAY_TIME);
  })
}

/**
 * @param {Todo} todo
 * @returns {Promise<Todo>}
 */
export const fetchUpdateTodo = (todo) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(updateLocalStorage(REQUEST_PATH, todo.id, todo));
    }, DELAY_TIME);
  })
}