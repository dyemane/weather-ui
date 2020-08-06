export * from "./Weather";
export * from "./CurrentWeather";
export * from "./ListWeather";
export * from "./ForcastChart";

export interface IForecastWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}
export interface ICurrentForcast {
  dt: number;
  temp: number;
  weather: IForecastWeather[];
}
export interface IDailyForcast {
  dt: number;
  temp: {
    day: number;
    min: number;
    max: number;
  };
  weather: IForecastWeather;
}
export interface IHourlyForcast {
  dt: number;
  temp: number;
}

export interface IWeatherData {
  lon: number;
  lat: number;
  current: ICurrentForcast;
  daily: IDailyForcast[];
  hourly: IHourlyForcast[];
}
