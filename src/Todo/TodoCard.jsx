import PropTypes from "prop-types";
import { todoEmitter } from "./event";

/**
 * @typedef {Object} TodoCardProps
 * @property {string} id
 * @property {string} text
 * @property {boolean} completed
 * @property {boolean} loading
 * @property {number} index
 */
/**
 * @param {TodoCardProps} param0
 * @returns {React.ReactNode}
 */
export default function TodoCard({ id, text, completed, index, loading }) {
  const onToggle = () => {
    todoEmitter.emit(todoEmitter.REQUEST_UPDATE, { id, completed: !completed });
  };
  const onRemove = () => {
    todoEmitter.emit(todoEmitter.REQUEST_REMOVE, id);
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <input type="checkbox" checked={completed} onChange={onToggle} />
      <span>{index + 1}.</span>
      <span>{text}</span>
      <button onClick={onToggle}>Toggle</button>
      <button onClick={onRemove}>Remove</button>
    </div>
  );
}

TodoCard.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
};
