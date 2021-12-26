import axios from "axios";

export async function fetchWeatherData() {
  const weatherParams = {
    q: "Belgrade",
  };

  const { data } = await axios.get("data/weather.json", {
    params: weatherParams,
  });
  return data;
}

export const fetchTodoData = async () => {
  const { data } = await axios.get("data/todo.json");
  return data;
};
