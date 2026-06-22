import { useReducer } from 'react';
import { todoReducer, initialState } from './reducers/todoReducer';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';

const App = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <div>
      <Header dispatch={dispatch} />
      <TodoList state={state} dispatch={dispatch} />
    </div>
  );
};

export default App;
