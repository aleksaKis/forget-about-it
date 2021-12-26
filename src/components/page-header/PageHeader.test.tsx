import { render, screen } from "../../testing/test-utils";
import PageHeader from "./PageHeader";

it("should display page header title", () => {
  render(<PageHeader pageTitle="Test Page" />);
  expect(screen.getByText(/test page/i)).toBeInTheDocument();
});
