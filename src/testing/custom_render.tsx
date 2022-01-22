import React, { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { store } from "../store/store";
import { Provider } from "react-redux";
import { darkTheme } from "../styles/theme";
import { ThemeProvider } from "styled-components";

const AllTheProviders: FC = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
    </Provider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
