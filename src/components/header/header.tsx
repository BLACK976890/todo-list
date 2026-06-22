import { useState } from 'react';
import type { Dispatch, KeyboardEvent } from 'react';
import type { Action } from '../../types/todo';

type HeaderProps = {
  dispatch: Dispatch<Action>;
};

export const Header = ({ dispatch }: HeaderProps) => {
  const [text, setText] = useState('');

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && text.trim()) {
      dispatch({ type: 'ADD', payload: text });
      setText('');
    }
  };

  return (
    <header className="header">
      <h1>Список дел</h1>
      <input
        className="new-todo"
        placeholder="Что нужно сделать?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyUp={handleKeyUp}
        autoFocus
      />
    </header>
  );
};