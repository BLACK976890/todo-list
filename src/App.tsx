import { useReducer, useState, useEffect } from 'react';
import { todoReducer, initialState } from './reducers/todoReducer';
import { loadState, useLocalStorage } from './hooks/UseLocalStorage';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import './App.css';

const App = () => {
  const saved = loadState();
  const [state, dispatch] = useReducer(todoReducer, saved || initialState);
  
  // Тема
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('todo-theme');
    return savedTheme === 'dark' ? 'dark' : 'light';
  });

  // Сохраняем задачи
  useLocalStorage(state);

  // Применяем тему
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('todo-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="todoapp">
      <Header
        dispatch={dispatch}
        filter={state.filter}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <TodoList state={state} dispatch={dispatch} />
      <Footer state={state} dispatch={dispatch} />
    </div>
  );
};

export default App;