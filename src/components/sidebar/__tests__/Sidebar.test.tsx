import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Sidebar from "../Sidebar";

function fakeHandlePageChange(page: string) {}

function renderSideBar() {
  return render(
    <MemoryRouter>
      <Sidebar pageChange={fakeHandlePageChange} />
    </MemoryRouter>
  );
}

it("should display available pages", () => {
  renderSideBar();
  expect(screen.getByText(/home/i)).toBeInTheDocument();
  expect(screen.getByText(/todo/i)).toBeInTheDocument();
});

it("should navigate to pages", () => {
  renderSideBar();
  expect(screen.getByTitle(/home/i).getAttribute("href")).toEqual("/home");
  expect(screen.getByTitle(/dashboard/i).getAttribute("href")).toEqual(
    "/dashboard"
  );
});
