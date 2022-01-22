import { MemoryRouter } from "react-router-dom";
import { render, screen } from "../../../testing/custom_render";
import Main from "../Main";
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
