/** @typedef {import('./TodoView').TodoViewProps} TodoViewProps */
import { useEffect, useReducer } from "react";
import { useFetcher } from "../shared/fetcher";
import { queueReducer } from "../shared/utils";
import { useTodoStore } from "./store";
import { todoEmitter } from "./event";
import TodoView from "./TodoView";

export default function TodoContainer() {
  const { state, setTodos, fetchTodo, removeTodo, addTodo, updateTodo } =
    useTodoStore();
  const [loadingQueue, loadingQueueDispatch] = useReducer(
    queueReducer,
    new Set()
  );
  const [refreshQueue, refreshQueueDispatch] = useReducer(
    queueReducer,
    new Set()
  );
  const { mutate, isLoading, error } = useFetcher("", fetchTodo, {
    onLoad: (_req, res) => {
      todoEmitter.emit(todoEmitter.FETCHED, res);
    },
    onError: (error) => {
      todoEmitter.emit(todoEmitter.ERROR, error);
    },
  });
  useEffect(() => {
    return todoEmitter.on(todoEmitter.EFFECT, mutate);
  }, [mutate]);
  useEffect(() => {
    return todoEmitter.on(todoEmitter.FETCHED, (todos) => {
      setTodos(todos);
      refreshQueueDispatch({ type: "clear" });
    });
  }, [setTodos]);
  useEffect(() => {
    return todoEmitter.on(todoEmitter.REQUEST_ADD, (todo) => {
      addTodo(todo).then(() => {
        todoEmitter.emit(todoEmitter.EFFECT);
      });
    });
  }, [addTodo]);
  useEffect(() => {
    return todoEmitter.on(todoEmitter.REQUEST_REMOVE, (id) => {
      loadingQueueDispatch({ type: "add", payload: id });
      removeTodo(id).then(() => {
        loadingQueueDispatch({ type: "delete", payload: id });
        refreshQueueDispatch({ type: "add", payload: id });
        todoEmitter.emit(todoEmitter.EFFECT);
      });
    });
  }, [removeTodo]);
  useEffect(() => {
    return todoEmitter.on(todoEmitter.REQUEST_UPDATE, (todo) => {
      loadingQueueDispatch({ type: "add", payload: todo.id });
      updateTodo(todo).then(() => {
        loadingQueueDispatch({ type: "delete", payload: todo.id });
        refreshQueueDispatch({ type: "add", payload: todo.id });
        todoEmitter.emit(todoEmitter.EFFECT);
      });
    });
  }, [updateTodo]);
  const todos =
    state?.map((todo) => ({
      id: todo.id,
      text: todo.text,
      completed: todo.completed,
      loading: loadingQueue.has(todo.id) || refreshQueue.has(todo.id),
    })) || null;
  /** @type {TodoViewProps} */
  const props = {
    todos,
    isLoading,
    errorInfo: error,
  };
  return <TodoView {...props} />;
}
