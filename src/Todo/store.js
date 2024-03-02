/** @typedef {import('./services').Todo} Todo */
import { createStore } from "../shared/store";
import { useFocusUpdate } from "../shared/hooks";
import { fetchTodoList, fetchCreateTodo, fetchDeleteTodo, fetchUpdateTodo } from "./services";

/** @type {() => (Todo[] | null)} */
const initialState = () => null;

const TodoStore = createStore(initialState);
const { getState, dispatch, subscribe } = TodoStore

/**
 * @param {Todo[]} todos 
 */
const setTodos = (todos) => {
  dispatch(() => todos);
}

/**
 * @param {''} params
 * @returns {Promise<Todo[]>}
 */
const fetchTodo = (params) => {
  return fetchTodoList(params);
}

/**
 * @param {string} id 
 * @returns {Promise<void>}
 */
const removeTodo = (id) => {
  return fetchDeleteTodo(id);
}

/**
 * @param {Todo} todo
 * @returns {Promise<void>}
 */
const addTodo = (todo) => {
  return fetchCreateTodo(todo)
}

/**
 * @param {Partial<Todo>} todo
 * @returns {Promise<void>}
 */
const updateTodo = (todo) => {
  return fetchUpdateTodo(todo);
}

export const store = {
  setTodos,
  fetchTodo,
  removeTodo,
  addTodo,
  updateTodo
}

/**
 * @returns {[
 * Todo[] | null,
 * (value: ((state: Todo[] | null) => (Todo[] | null))) => void,
 * (listener: (state: Todo[] | null) => void) => void
 * ]}
 */
export const useTodos = () => {
  useFocusUpdate(subscribe)
  return [getState(), dispatch, subscribe]
}
