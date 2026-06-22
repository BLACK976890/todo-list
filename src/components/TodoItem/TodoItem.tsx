import type { Dispatch } from 'react';
import type { Todo, Action } from '../../types/todo';

type TodoItemProps = {
  todo: Todo;
  editing: number | null;
  dispatch: Dispatch<Action>;
};

export const TodoItem = ({ todo, editing, dispatch }: TodoItemProps) => {
  return (
    <li className={`${todo.done ? 'completed' : ''} ${editing === todo.id ? 'editing' : ''}`}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.done}
          onChange={() => dispatch({ type: 'TOGGLE', payload: todo.id })}
        />
        <label>{todo.title}</label>
        <button
          className="destroy"
          onClick={() => dispatch({ type: 'DELETE', payload: todo.id })}
        />
      </div>
    </li>
  );
};