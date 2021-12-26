import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import rootReducer from "../store/rootReducer";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "../styles/theme";

function render(
  ui: React.ReactElement,
  {
    // @ts-ignore
    preloadedState,
    store = configureStore({ reducer: rootReducer, preloadedState }),
    ...renderOptions
  } = {}
) {
  // @ts-ignore
  function Wrapper({ children }): JSX.Element {
    return (
      <Provider store={store}>
        <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
