import { Dashboard } from "../dashboard/Dashboard";
import { render } from "../../testing/custom_render";
import { HelmetProvider } from "react-helmet-async";

it("should display Dashboard", () => {
  render(
    <HelmetProvider>
      <Dashboard />
    </HelmetProvider>
  );
});
