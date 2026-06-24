import { useState, useRef, useEffect } from 'react';
import type { Dispatch, KeyboardEvent, MouseEvent } from 'react';
import type { Todo, Action } from '../../types/todo';
import './TodoItem.css';

type TodoItemProps = {
  todo: Todo;
  editing: number | null;
  dispatch: Dispatch<Action>;
};

export const TodoItem = ({ todo, editing, dispatch }: TodoItemProps) => {
  const [editText, setEditText] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);
  const savingRef = useRef(true);

  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
  }>({ visible: false, x: 0, y: 0 });

  const isEditing = editing === todo.id;

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      savingRef.current = true;
    }
  }, [isEditing]);

  useEffect(() => {
    setEditText(todo.title);
  }, [todo.title]);

  useEffect(() => {
    const handleClick = () => {
      setContextMenu({ visible: false, x: 0, y: 0 });
    };
    if (contextMenu.visible) {
      document.addEventListener('click', handleClick);
    }
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [contextMenu.visible]);

  const handleEdit = () => {
    dispatch({ type: 'EDIT', payload: todo.id });
  };

  const handleSave = () => {
    if (savingRef.current) {
      dispatch({ type: 'SAVE', payload: { id: todo.id, title: editText } });
    } else {
      dispatch({ type: 'CANCEL' });
      savingRef.current = true;
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      savingRef.current = true;
      handleSave();
    } else if (e.key === 'Escape') {
      savingRef.current = false;
      setEditText(todo.title);
      dispatch({ type: 'CANCEL' });
    }
  };

  const handleContextMenu = (e: MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleMenuEdit = () => {
    setContextMenu({ visible: false, x: 0, y: 0 });
    handleEdit();
  };

  const handleMenuToggle = () => {
    setContextMenu({ visible: false, x: 0, y: 0 });
    dispatch({ type: 'TOGGLE', payload: todo.id });
  };

  const handleMenuDelete = () => {
    setContextMenu({ visible: false, x: 0, y: 0 });
    dispatch({ type: 'DELETE', payload: todo.id });
  };

  return (
    <>
      <li
        className={`${todo.done ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}
        onContextMenu={handleContextMenu}
      >
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.done}
            onChange={() => dispatch({ type: 'TOGGLE', payload: todo.id })}
          />
          <label onDoubleClick={handleEdit}>{todo.title}</label>
          <button
            className="destroy"
            onClick={() => dispatch({ type: 'DELETE', payload: todo.id })}
          />
        </div>
        {isEditing && (
          <input
            ref={inputRef}
            className="edit"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
          />
        )}
      </li>

      {}
      {contextMenu.visible && (
        <ul
          className="context-menu"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <li onClick={handleMenuEdit}>Редактировать</li>
          <li onClick={handleMenuToggle}>
            {todo.done ? 'Снять отметку' : 'Отметить выполненным'}
          </li>
          <li onClick={handleMenuDelete}>Удалить</li>
        </ul>
      )}
    </>
  );
};