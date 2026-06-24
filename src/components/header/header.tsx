import { useState } from 'react';
import type { Dispatch, KeyboardEvent } from 'react';
import type { Action, Filter } from '../../types/todo';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle.tsx';
import './Header.css';

type HeaderProps = {
  dispatch: Dispatch<Action>;
  filter: Filter;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
};

export const Header = ({ dispatch, filter, theme, onToggleTheme }: HeaderProps) => {
  const [text, setText] = useState('');

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && text.trim()) {
      dispatch({ type: 'ADD', payload: text });
      setText('');
    }
  };

  const handleFilter = (f: Filter) => {
    dispatch({ type: 'SET_FILTER', payload: f });
  };

  return (
    <header className="header">
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      <h1>Список дел</h1>
      <input
        className="new-todo"
        placeholder="Что нужно сделать?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyUp={handleKeyUp}
        autoFocus
      />
      <ul className="filters">
        <li>
          <a
            href="#/"
            className={filter === 'all' ? 'selected' : ''}
            onClick={(e) => { e.preventDefault(); handleFilter('all'); }}
          >
            Все
          </a>
        </li>
        <li>
          <a
            href="#/active"
            className={filter === 'active' ? 'selected' : ''}
            onClick={(e) => { e.preventDefault(); handleFilter('active'); }}
          >
            Активные
          </a>
        </li>
        <li>
          <a
            href="#/completed"
            className={filter === 'completed' ? 'selected' : ''}
            onClick={(e) => { e.preventDefault(); handleFilter('completed'); }}
          >
            Завершённые
          </a>
        </li>
      </ul>
    </header>
  );
};