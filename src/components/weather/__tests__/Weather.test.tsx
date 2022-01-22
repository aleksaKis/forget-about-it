import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen } from "../../../testing/custom_render";
import Weather from "../Weather";

export const handlers = [
  rest.get("http://localhost/data/weather.json", (req, res, ctx) => {
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
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

it("fetches and receives weather data after component initialization", () => {
  render(<Weather />);
  expect(screen.getByText("Loading")).toBeInTheDocument();
});
