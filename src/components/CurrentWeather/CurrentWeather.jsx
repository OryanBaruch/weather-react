// @ts-nocheck
import React from "react";
import { useSelector } from "react-redux";
import { FavoriteButton } from "../FavoriteButton";
import { Loader } from "../Loader";
import "./CurrentWeather.css";

function CurrentWeather() {
  const weather = useSelector((state) => state.weather);
  const {
    LocalizedName: name,
    WeatherText: text,
    WeatherIcon: icon,
  } = weather.current;

  const loading = weather.loading.current;


  const generateIconBaseUrl = `https://developer.accuweather.com/sites/default/files`;
  const generateIconUrl = (weatherIconNumber) => {
    if (weatherIconNumber < 10) {
      return `${generateIconBaseUrl}/0` + weatherIconNumber + "-s.png";
    } else {
      return `${generateIconBaseUrl}/` + weatherIconNumber + "-s.png";
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="cardInner">
            <FavoriteButton location={weather.current} />

            <div className="cardInnerInfo">
              {name}
              <span className="weather-text">{text}</span>
              <span>
                    {weather?.current?.Temperature?.Metric?.Value}°
                  </span>
                  <img
                    className="weather-icon-img"
                    alt={text}
                    src={generateIconUrl(icon)}
                  />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default CurrentWeather;
