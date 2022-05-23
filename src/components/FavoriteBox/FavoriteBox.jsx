import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { apiCurrentWeather } from '../../Redux/middleware/api';
import { Loader } from '../Loader';
import './FavoriteBox.css';

function FavoriteBox({ favorite, onClick })
{
    const loading = !favorite.currentWeather;
    const dispatch = useDispatch();

    // fetch location weather on mount
    useEffect( () => {
            dispatch( apiCurrentWeather( favorite, 'favorite' ) );
    // eslint-disable-next-line
    }, [ favorite ]);


    return (
        <div className="favorite-box" onClick={ () => { !loading && onClick() } }>

            <h3 className="location-name">
                { !!favorite.currentWeather && favorite.LocalizedName }
            </h3>

            { loading ? <Loader /> : !!favorite.currentWeather && <WeatherData location={ favorite }/> }

        </div>
    )
}


// display weather data after loading
function WeatherData({ location })
{
    const {

        WeatherText: text,
        WeatherIcon: icon

    } = location.currentWeather;

    const generateIconBaseUrl= `https://developer.accuweather.com/sites/default/files`

    const generateIconUrl = (weatherIconNumber) => {
      if (weatherIconNumber < 10) {
        return `${generateIconBaseUrl}/0` + weatherIconNumber + "-s.png";
      } else {
        return `${generateIconBaseUrl}/` + weatherIconNumber + "-s.png";
      }
    };
    return (
        <>
            <div className="weekday">
                <img className="weather-icon" alt={ text } src={ generateIconUrl( icon) } />
                <span>{ location.currentWeather.Temperature.Metric.Value }°</span>

            <span className="weather-text">{ text }</span>
            </div>
        </>
    );
}


export default FavoriteBox;