import { Todo } from "../store/types";

export const loadTodosFromLocalStorage = (): Todo[] => {
  try {
    const todos = localStorage.getItem("todos");
    if (todos === null) {
      return [];
    }
    return JSON.parse(todos);
  } catch (err) {
    return [];
  }
};

export const saveTodosToLocalStorage = (state: Todo[]): void => {
  try {
    const todos = JSON.stringify(state);
    localStorage.setItem("todos", todos);
  } catch {}
};

export const removeAllTodosFromLocalStorage = () => {
  try {
    localStorage.removeItem("todos");
  } catch {}
};
