import { useEffect } from 'react';
import type { State } from '../types/todo';

const STORAGE_KEY = 'todo-app-state';

export const useLocalStorage = (state: State) => {
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Не удалось сохранить состояние в localStorage', e);
    }
  }, [state]);
};

export const loadState = (): State | undefined => {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    if (serialized === null) return undefined;
    return JSON.parse(serialized);
  } catch (e) {
    console.error('Не удалось загрузить состояние из localStorage', e);
    return undefined;
  }
};