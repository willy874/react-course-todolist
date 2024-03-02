/** @typedef {import('./TodoView').TodoViewModel} TodoViewModel */
import PropTypes from "prop-types";
import TodoCard from "./TodoCard";

/**
 * @typedef {Object} TodoListProps
 * @property {TodoViewModel[]} todos
 */
/**
 * @param {TodoListProps} param0
 * @returns {React.ReactNode}
 */
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={todo.id}>
          <TodoCard
            id={todo.id}
            text={todo.text}
            completed={todo.completed}
            loading={todo.loading}
            index={index}
          />
        </li>
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default TodoList;
