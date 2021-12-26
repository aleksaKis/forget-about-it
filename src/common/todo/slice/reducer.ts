import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchTodoData } from "../../../services/api";
import { RootState, Todo, TodoState } from "../../../store/types";

const initialState: TodoState = {
  todos: [],
};

function generateTodoId(state: TodoState): number {
  return state.todos.length > 0
    ? state.todos[state.todos.length - 1].id + 1
    : 1;
}

export const todoDataAsync = createAsyncThunk(
  "todo-dashboard/fetchTodoData",
  async () => {
    const response = await fetchTodoData();
    return { todos: response };
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    // placeholder for saga
    fetchTodos: (state, action: PayloadAction) => {},

    addTodos: (state, action: PayloadAction<{ todos: Todo[] }>) => {
      if (action.payload.todos && action.payload.todos.length) {
        state.todos = action.payload.todos;
      }
    },

    addTodo: (
      state,
      action: PayloadAction<{ description: string; isProtected: boolean }>
    ) => {
      state.todos.push({
        id: generateTodoId(state),
        description: action.payload.description,
        createdAt: new Date(Date.now()).toISOString(),
        protected: action.payload.isProtected,
      });
    },

    removeTodoById: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((item) => item.id !== action.payload);
    },

    updateTodo: (
      state,
      action: PayloadAction<{ index: number; description: string }>
    ) => {
      state.todos[action.payload.index].description =
        action.payload.description;
    },

    removeAllTodos: (state) => {
      state.todos = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(todoDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        todoDataAsync.fulfilled,
        (state, action: PayloadAction<{ todos: Todo[] }>) => {
          state.status = "idle";
          state.todos = [...state.todos, ...action.payload.todos];
        }
      );
  },
});

export const {
  fetchTodos,
  addTodos,
  addTodo,
  removeTodoById,
  updateTodo,
  removeAllTodos,
} = todoSlice.actions;

export const selectTodos = (state: RootState): Todo[] => state.todo.todos;

export default todoSlice.reducer;
