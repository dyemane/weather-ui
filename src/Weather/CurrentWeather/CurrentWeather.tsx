import React from "react";
import moment from "moment";
import styles from "./CurrentWeather.module.scss";

import { WeatherConditionIcon, TempretureNumber, ICurrentForcast } from "..";

export function CurrentWeather({
  location_name,
  weatherData
}: {
  location_name: string;
  weatherData?: ICurrentForcast;
}) {
  return (
    <div className={styles.container}>
      {weatherData && (
        <>
          <div className={styles.location}>{location_name}</div>
          <div>{moment.unix(1000).format("dddd h:mm A")}</div>
          <div>{weatherData.weather.map(w => w.main).join(", ")}</div>
          <div className={styles.temp_container}>
            <div className={styles.temp_item}>
              {weatherData && (
                <WeatherConditionIcon weather={weatherData.weather} />
              )}
            </div>
            <TempretureNumber
              value={weatherData.temp}
              className={styles.temp_item}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default CurrentWeather;
