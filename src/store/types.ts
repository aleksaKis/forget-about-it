import { MainState } from "../common/main/slice/reducer";

export interface Todo {
  id: number;
  description: string;
  createdAt: Date | string;
  isProtected?: boolean;
}

export interface TodoState {
  todos: Todo[];
  status?: string;
}

export interface RootState {
  todo: TodoState;
  main: MainState;
}
