import { PayloadAction } from "@reduxjs/toolkit";
import { select, takeLatest, put } from "redux-saga/effects";
import {
  loadTodosFromLocalStorage,
  removeAllTodosFromLocalStorage,
  saveTodosToLocalStorage,
} from "../../../services/localStorage";
import { addTodos, selectTodos, todoSlice } from "./reducer";
import { Todo } from "../../../store/types";

function* fetchTodos(action: PayloadAction) {
  const todos = loadTodosFromLocalStorage();
  if (todos && todos.length) {
    yield put(addTodos({ todos: todos }));
  }
}

function* saveTodos(action: PayloadAction) {
  const todos: Todo[] = yield select(selectTodos);
  if (todos && todos.length) {
    saveTodosToLocalStorage(todos);
  }
}

function removeAll(action: PayloadAction) {
  removeAllTodosFromLocalStorage();
}

function* todoSaga() {
  yield takeLatest(todoSlice.actions.fetchTodos.type, fetchTodos);
  yield takeLatest(
    [
      todoSlice.actions.addTodo.type,
      todoSlice.actions.updateTodo.type,
      todoSlice.actions.removeTodoById.type,
    ],
    saveTodos
  );
  yield takeLatest(todoSlice.actions.removeAllTodos.type, removeAll);
}

export default todoSaga;
