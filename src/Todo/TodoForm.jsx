/** @typedef {import('./services').Todo} Todo */
import { useState } from "react";
import { todoEmitter } from "./event";

function TodoForm() {
  const [value, setValue] = useState("");
  /** @param {Todo} todo */
  const addTodo = (todo) => {
    todoEmitter.emit(todoEmitter.REQUEST_ADD, todo);
  };
  /** @param {Event} event */
  const onSubmit = (event) => {
    event.preventDefault();
    if (value === "") return;
    addTodo({
      id: String(Date.now()),
      text: value,
      completed: false,
    });
    setValue("");
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}

export default TodoForm;
