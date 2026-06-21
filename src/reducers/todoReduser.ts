import type { State, Action, Todo } from '../types/todo';

export const initialState: State = {
  todos: [],
  filter: 'all',
  editing: null,
};

export const todoReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD': {
      const newTodo: Todo = {
        id: Date.now(),
        title: action.payload.trim(),
        done: false,
      };
      return { ...state, todos: [...state.todos, newTodo] };
    }
    case 'TOGGLE':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload ? { ...todo, done: !todo.done } : todo
        ),
      };
    case 'DELETE':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case 'EDIT':
      return { ...state, editing: action.payload };
    case 'SAVE':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, title: action.payload.title.trim() || todo.title }
            : todo
        ),
        editing: null,
      };
    case 'CANCEL':
      return { ...state, editing: null };
    case 'TOGGLE_ALL': {
      const allDone = state.todos.every((todo) => todo.done);
      return {
        ...state,
        todos: state.todos.map((todo) => ({ ...todo, done: !allDone })),
      };
    }
    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.done),
      };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    default:
      return state;
  }
};