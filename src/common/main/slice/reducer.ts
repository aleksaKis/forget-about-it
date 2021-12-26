import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchWeatherData } from "../../../services/api";
import { RootState } from "../../../store/types";
import { getSystemTheme } from "./utils/utils";
import { LoadingStatus, TodoTheme, Weather } from "./types";

export interface MainState {
  theme: TodoTheme;
  status?: LoadingStatus;
  weather?: Weather;
}

const initialState: MainState = {
  theme: getSystemTheme(),
  status: "idle",
};

export const weatherDataAsync = createAsyncThunk(
  "todo-dashboard/fetchWeatherData",
  async () => {
    const response = await fetchWeatherData();
    return { ...response };
  }
);

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(weatherDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(weatherDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.weather = { ...action.payload };
      });
  },
});

export const { changeTheme } = mainSlice.actions;

export const selectWeather = (state: RootState) => state.main.weather;
export const selectStatus = (state: RootState) => state.main.status;
export const selectTheme = (state: RootState) => state.main.theme;

export default mainSlice.reducer;
