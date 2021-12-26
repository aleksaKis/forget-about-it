import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import todoSaga from "../common/todo/slice/saga";
import rootReducer from "./rootReducer";

const reduxSagaMonitorOptions = {};
const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
const middlewares = [sagaMiddleware];

// Create the store with saga middleware

export const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), ...middlewares],
});

sagaMiddleware.run(todoSaga);
export type AppDispatch = typeof store.dispatch;
