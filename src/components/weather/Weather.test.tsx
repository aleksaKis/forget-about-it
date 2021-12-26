import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen } from "../../testing/test-utils";
import Weather from "./Weather";

export const handles = [
  rest.get(
    "https://api.openweathermap.org/data/2.5/weather/",
    (req, res, ctx) => {
      const query = req.url.searchParams;
      const q = query.get("q");
      const appid = query.get("appid");
      return res(
        ctx.json({
          main: { temp: 303.15 },
          weather: [{ description: "Clear Sky" }],
        }),
        ctx.delay(150)
      );
    }
  ),
];

const server = setupServer(...handles);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

it("fetches and receives weather data after component initialization", () => {
  render(<Weather />);
  expect(screen.getByText("Loading")).toBeInTheDocument();
});
