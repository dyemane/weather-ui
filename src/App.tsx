import React, { useState, useEffect } from "react";
import styles from "./App.module.scss";
import { CurrentWeather, ListWeather, ForcastChart } from "./Weather";
import { OPEN_WEATHER_API_KEY, OPEN_CAGE_API_KEY } from "./utils";

//  For DEV
import testOneCall from "./test_one_call.json";
import testLocationResponse from "./test_location.json";
import LOCATION_OPTIONS from "./location_list.json";

const DEBUG_MODE = false; // true in DEV
type FIXME = any; //  Do NOT use me!

interface ILocationInfo {
  name?: string;
  lng: number;
  lat: number;
}

//  TODO: I would break this up to a React.Component and cleanup the clutter
function App() {
  const [locationSelection, setLocationSelection] = useState<string>();
  const [myLocation, setMyLocation] = useState<ILocationInfo>();
  const [locationData, setLocationData] = useState<ILocationInfo>();
  const [weatherData, setWeatherData] = useState<FIXME>();

  const update = ({ results }: FIXME) => {
    const {
        components,
        geometry: { lng, lat }
      } = results[0],
      {
        state_code,
        town,
        [components._type]: town_type,
        city,
        // state,
        country
      } = components;
    setLocationData({
      name: `${city || town || town_type}, ${state_code ||
        /*state ||*/ country}`,
      lng,
      lat
    });
  };

  const fetchForcast = (data: ILocationInfo) => {
    if (DEBUG_MODE) {
      setWeatherData(testOneCall);
      return;
    }
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lng}73&exclude=minutely&appid=${OPEN_WEATHER_API_KEY}`
    )
      .then(resp => resp.json())
      .then(setWeatherData);
  };

  const getNavLocation = () => {
    const success = (position: Position) => {
        const { latitude: lat, longitude: lng } = position.coords;
        setMyLocation({ lat, lng });
      },
      error = (err: PositionError) => {
        console.log(err);
      };
    navigator.geolocation.getCurrentPosition(success, error);
  };

  useEffect(() => {
    getNavLocation();
  }, []);

  useEffect(() => {
    if (locationSelection) {
      if (DEBUG_MODE) {
        update(testLocationResponse);
      } else {
        fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${locationSelection}&key=${OPEN_CAGE_API_KEY}&language=en&pretty=1`
        )
          .then(resp => resp.json())
          .then(update);
      }
    }
  }, [locationSelection]);

  useEffect(() => {
    if (myLocation) {
      if (DEBUG_MODE) {
        update(testLocationResponse);
      } else {
        myLocation &&
          fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${myLocation.lat},${myLocation.lng}&key=${OPEN_CAGE_API_KEY}&language=en&pretty=1`
          )
            .then(resp => resp.json())
            .then(update);
      }
    }
  }, [myLocation]);

  useEffect(() => {
    locationData && fetchForcast(locationData);
  }, [locationData]);

  useEffect(() => {
    myLocation && fetchForcast(myLocation);
  }, [myLocation]);

  return (
    <div className={styles.app}>
      {locationData && weatherData && (
        <>
          {locationData.name && (
            <CurrentWeather
              location_name={locationData.name!}
              weatherData={weatherData.current}
            />
          )}
          <ForcastChart hourly={weatherData.hourly} />
          <ListWeather daily={weatherData.daily} />
          <select
            className={styles.formElement}
            value={locationSelection}
            onChange={({ target: { value } }) => setLocationSelection(value)}
          >
            {LOCATION_OPTIONS.map(l => (
              <option key={l} label={l} value={l} />
            ))}
          </select>
          {myLocation && (
            <button onClick={getNavLocation} className={styles.formElement}>
              Current Location
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default App;
