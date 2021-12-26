import classes from "./Weather.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Fragment, useEffect } from "react";
import {
  selectStatus,
  selectWeather,
  weatherDataAsync,
} from "../../common/main/slice/reducer";

function Weather() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    //@ts-ignore
    dispatch(weatherDataAsync());
  }, [dispatch]);

  const weather = useAppSelector(selectWeather);
  const status = useAppSelector(selectStatus);

  if (status === "idle" && weather) {
    const temperature = Math.round(weather.main.temp - 273.15);
    const wind = weather.wind.speed;
    const humidity = weather.main.humidity;
    const description = weather.weather[0].description;

    return (
      <Fragment>
        <div className={classes.header}>
          <img
            alt="weather icon"
            src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
          />
          <span role="dialog" className="celsius">
            {temperature}°C
          </span>
        </div>
        <div className={classes.temp_details}>
          <span style={{ textTransform: "capitalize" }}>{description}</span>
          <span>Wind: {wind} mps</span>
          <span>Humidity {humidity}%</span>
        </div>
      </Fragment>
    );
  } else {
    return <p>Loading</p>;
  }
}

export default Weather;
