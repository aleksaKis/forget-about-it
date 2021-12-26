import { combineReducers, Reducer } from "redux";
import todoReducer from "../common/todo/slice/reducer";
import mainReducer from "../common/main/slice/reducer";
import { RootState } from "./types";

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  todo: todoReducer,
  main: mainReducer,
});

export default rootReducer;
