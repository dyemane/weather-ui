import React from "react";
import { default as $ } from "classnames";
import styles from "./Weather.module.scss";
import { IForecastWeather } from ".";
import { convertKelvinToC, convertKelvinToF } from "../utils";

export const WeatherConditionIcon = ({
  weather,
  size = 1
}: {
  weather: IForecastWeather | IForecastWeather[];
  size?: number;
}) => (
  <img
    src={`http://openweathermap.org/img/wn/${
      (Array.isArray(weather) ? weather[0] : weather).icon
    }@2x.png`}
    alt="condition"
    style={{ width: `${size * 4}rem` }}
  />
);

export const TempretureNumber = ({
  value /* in Kelvin */,
  measurment = "F",
  className,
  size = 1,
  color = "black",
  showLabel = true
}: {
  value: number;
  measurment?: "C" | "F";
  className?: string;
  size?: number;
  color?: string;
  showLabel?: boolean;
}) => {
  const tempConverter =
    measurment === "C" ? convertKelvinToC : convertKelvinToF;
  return (
    <div
      className={
        className ? $(styles.tempreture, className) : styles.tempreture
      }
      style={{ fontSize: `${size * 2.8}rem`, color: color }}
    >
      {Math.round(tempConverter(value))}
      <div style={{ fontSize: `${size * 1.3}rem` }}>
        {showLabel ? (
          measurment === "C" ? (
            <sup>&#8451;</sup>
          ) : (
            <sup>&#8457;</sup>
          )
        ) : (
          <sup>&deg;</sup>
        )}
      </div>
    </div>
  );
};
