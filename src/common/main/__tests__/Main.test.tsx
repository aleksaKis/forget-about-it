import { MemoryRouter } from "react-router-dom";
import { render, screen } from "../../../testing/test-utils";
import Main from "../Main";
import React from "react";
import { HelmetProvider } from "react-helmet-async";

describe("Main", () => {
  beforeAll(() => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={["/todo-dashboard"]}>
          <Main />
        </MemoryRouter>
      </HelmetProvider>
    );
  });

  it("should display SideBar component", () => {
    screen.queryByTestId("sidebar");
  });
});
