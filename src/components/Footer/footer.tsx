import type { Dispatch } from 'react';
import type { State, Action } from '../../types/todo';
import './Footer.css';

type FooterProps = {
  state: State;
  dispatch: Dispatch<Action>;
};

export const Footer = ({ state, dispatch }: FooterProps) => {
  const { todos } = state;
  const activeCount = todos.filter((t) => !t.done).length;
  const completedCount = todos.length - activeCount;

  if (todos.length === 0) return null;

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeCount}</strong> {activeCount === 1 ? 'задача' : 'задач'} осталось
      </span>
      {completedCount > 0 && (
        <button className="clear-completed"
          onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}>
          Очистить выполненные
        </button>
      )}
    </footer>
  );
};