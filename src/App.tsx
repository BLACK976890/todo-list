import { useReducer } from 'react';
import { todoReducer, initialState } from './reducers/todoReducer';
import { loadState, useLocalStorage } from './hooks/UseLocalStorage';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';

const App = () => {
  const saved = loadState();
  const [state, dispatch] = useReducer(todoReducer, saved || initialState);

  useLocalStorage(state);

  return (
    <div>
      <Header dispatch={dispatch} />
      <TodoList state={state} dispatch={dispatch} />
      <Footer state={state} dispatch={dispatch} />
    </div>
  );
};

export default App;