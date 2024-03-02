/** @typedef {import('./TodoView').TodoViewProps} TodoViewProps */
import { useEffect, useReducer } from "react";
import { useTodos, store } from "./store";
import { todoEmitter } from "./event";
import { useFetcher } from "../shared/fetcher";
import { queueReducer } from "../shared/utils";
import TodoView from "./TodoView";

export default function TodoContainer() {
  const [todos] = useTodos();
  const [loadingQueue, loadingQueueDispatch] = useReducer(
    queueReducer,
    new Set()
  );
  const [refreshQueue, refreshQueueDispatch] = useReducer(
    queueReducer,
    new Set()
  );
  const { mutate, isLoading, error } = useFetcher("", store.fetchTodo, {
    onLoad: (_, data) => {
      todoEmitter.emit(todoEmitter.FETCHED, data);
    },
    onError: (error) => {
      todoEmitter.emit(todoEmitter.ERROR, error);
    },
  });
  useEffect(() => {
    return todoEmitter.on(todoEmitter.FETCHED, (todos) => {
      store.setTodos(todos);
      refreshQueueDispatch({ type: "clear" });
    });
  }, []);
  useEffect(() => {
    return todoEmitter.on(todoEmitter.REQUEST_ADD, (todo) => {
      loadingQueueDispatch({ type: "add", payload: todo.id });
      store.addTodo(todo).then(() => {
        loadingQueueDispatch({ type: "delete", payload: todo.id });
        refreshQueueDispatch({ type: "add", payload: todo.id });
        todoEmitter.emit(todoEmitter.EFFECT);
      });
    });
  }, []);
  useEffect(() => {
    return todoEmitter.on(todoEmitter.REQUEST_REMOVE, (id) => {
      loadingQueueDispatch({ type: "add", payload: id });
      store.removeTodo(id).then(() => {
        loadingQueueDispatch({ type: "delete", payload: id });
        refreshQueueDispatch({ type: "add", payload: id });
        todoEmitter.emit(todoEmitter.EFFECT);
      });
    });
  }, []);
  useEffect(() => {
    return todoEmitter.on(todoEmitter.REQUEST_UPDATE, (todo) => {
      loadingQueueDispatch({ type: "add", payload: todo.id });
      store.updateTodo(todo).then(() => {
        loadingQueueDispatch({ type: "delete", payload: todo.id });
        refreshQueueDispatch({ type: "add", payload: todo.id });
        todoEmitter.emit(todoEmitter.EFFECT);
      });
    });
  }, []);
  useEffect(() => {
    return todoEmitter.on(todoEmitter.EFFECT, mutate);
  }, [mutate]);
  /** @type {TodoViewProps['todos']} */
  const viewTodos =
    todos?.map((todo) => ({
      id: todo.id,
      text: todo.text,
      completed: todo.completed,
      loading: loadingQueue.has(todo.id) || refreshQueue.has(todo.id),
    })) || null;
  /** @type {TodoViewProps} */
  const props = {
    todos: viewTodos,
    isLoading,
    errorInfo: error,
  };
  return <TodoView {...props} />;
}
