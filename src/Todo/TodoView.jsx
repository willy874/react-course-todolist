/** @typedef {import('./services').Todo} Todo */
import PropTypes from "prop-types";
import { cond } from "lodash";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";

/**
 * @typedef {Object} TodoViewModel
 * @property {Todo['id']} id
 * @property {Todo['text']} text
 * @property {Todo['completed']} completed
 * @property {boolean} loading
 */

/**
 * @typedef {Object} TodoViewProps
 * @property {TodoViewModel[] | null} todos
 * @property {boolean} isLoading
 * @property {unknown} errorInfo
 */
/**
 * @param {TodoViewProps} param0
 * @returns {React.ReactNode}
 */
function TodoView({ todos, isLoading, errorInfo }) {
  const render = cond([
    [() => !todos && isLoading, () => <div>Loading...</div>],
    [() => errorInfo instanceof Error, (error) => <div>Error: {error}</div>],
    [() => Boolean(todos?.length), () => <TodoList todos={todos} />],
    [() => todos?.length === 0, () => <div>Empty</div>],
    [() => true, () => null],
  ]);
  return (
    <div>
      <h1>Todo</h1>
      <div>
        <TodoForm />
      </div>
      <div>{render()}</div>
    </div>
  );
}

TodoView.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ),
  isLoading: PropTypes.bool.isRequired,
  errorInfo: PropTypes.any,
};

export default TodoView;
