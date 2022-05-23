// @ts-nocheck
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { compose } from "redux";
import { withRouter, withStore, withToasts } from "./HoC";
import useGeoLocation from "./hooks/useGeoLocation";
import { apiCurrentWeather, apiForecast } from "./Redux/middleware/api";
import {Home} from './pages/'
import {Favorites} from "./pages"
import {Navigation} from "./components/Navigation"
import {
  setCurrentWeatherLoading,
  setForecastLoading,
} from "./Redux/weather/actions";
import { Routes, Route } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  const [location] = useGeoLocation();

  // fetch default location data on load
  useEffect(() => {
    if (Object.keys(location).length === 0) return;

    dispatch(setCurrentWeatherLoading(true));
    dispatch(setForecastLoading(true));

    dispatch(apiCurrentWeather(location));
    dispatch(apiForecast(location));

    // eslint-disable-next-line
  }, [location]);

  return (
    <div>
      {/* <Header /> */}
      <Navigation/>
      <Routes>
        <>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/favorites" element={<Favorites />} />
        </>
      </Routes>
    </div>
  );
};

export default compose(withStore, withRouter, withToasts)(App);
