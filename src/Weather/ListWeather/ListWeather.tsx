import React from "react";
import moment from "moment";
import styles from "./ListWeather.module.scss";
import { TempretureNumber, IDailyForcast } from "..";
import { WeatherConditionIcon } from "../Weather";
import { default as $ } from "classnames";

export function ListWeather({ daily }: { daily?: IDailyForcast[] }) {
  return (
    <div
      className={styles.listItem}
      // style={{ display: "flex", flexDirection: "row" }}
    >
      {daily &&
        daily.map((wd, i) => (
          <WeatherItem key={i /*wd.id*/} data={wd} active={i === 0} />
        ))}
    </div>
  );
}

export default ListWeather;

function WeatherItem({
  data,
  active = false
}: {
  data?: IDailyForcast;
  active?: boolean;
}) {
  return (
    <div
      className={$(styles.container, ...(active ? [styles.activeItem] : []))}
    >
      {data && (
        <>
          <div className={styles.weekDate}>
            {moment.unix(data.dt).format("ddd")}
          </div>
          <WeatherConditionIcon weather={data.weather} size={1.5} />
          <div className={styles.temp_container}>
            <TempretureNumber
              value={data.temp.max}
              className={styles.temp_item}
              size={0.4}
              showLabel={false}
            />
            <TempretureNumber
              value={data.temp.min}
              className={styles.temp_item}
              size={0.4}
              color={"grey"}
              showLabel={false}
            />
          </div>
        </>
      )}
    </div>
  );
}
