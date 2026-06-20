export interface Todo {
  id: number;
  title: string;
  done: boolean;
}

export type Filter = 'all' | 'active' | 'completed';

export type Action =
  | { type: 'ADD'; payload: string }
  | { type: 'TOGGLE'; payload: number }
  | { type: 'DELETE'; payload: number }
  | { type: 'EDIT'; payload: number }
  | { type: 'SAVE'; payload: { id: number; title: string } }
  | { type: 'CANCEL' }
  | { type: 'TOGGLE_ALL' }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'SET_FILTER'; payload: Filter };

export interface State {
  todos: Todo[];
  filter: Filter;
  editing: number | null;
}