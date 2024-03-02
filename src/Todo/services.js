import { getLocalStorage, addLocalStorage, removeLocalStorage, updateLocalStorage } from '../shared/utils';

/**
 * @typedef {Object} Todo
 * @property {string} id
 * @property {string} text
 * @property {boolean} completed
 */

const REQUEST_PATH = '/api/todos'

localStorage.setItem(REQUEST_PATH, JSON.stringify([
  {
    id: '1',
    text: 'Buy groceries',
    completed: false,
  },
  {
    id: '2',
    text: 'Do laundry',
    completed: false,
  },
  {
    id: '3',
    text: 'Study',
    completed: false,
  },
]))

/**
 * @returns {Promise<Todo[]>}
 */
export const fetchTodoList = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getLocalStorage(REQUEST_PATH));
    }, 500);
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
    }, 500);
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
    }, 500);
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
    }, 500);
  })
}