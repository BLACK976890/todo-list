import type { Dispatch } from 'react';
import type { State, Action } from '../../types/todo';
import { TodoItem } from '../TodoItem/TodoItem';

type TodoListProps = {
  state: State;
  dispatch: Dispatch<Action>;
};

export const TodoList = ({ state, dispatch }: TodoListProps) => {
  const filtered = state.todos.filter((todo) => {
    if (state.filter === 'active') return !todo.done;
    if (state.filter === 'completed') return todo.done;
    return true;
  });

  if (state.todos.length === 0) return null;

  return (
    <section className="main">
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        checked={state.todos.every((todo) => todo.done)}
        onChange={() => dispatch({ type: 'TOGGLE_ALL' })}
      />
      <label htmlFor="toggle-all">Отметить все как выполненные</label>
      <ul className="todo-list">
        {filtered.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            editing={state.editing}
            dispatch={dispatch}
          />
        ))}
      </ul>
    </section>
  );
};