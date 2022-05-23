// @ts-nocheck
import React from 'react';
import { useSelector } from 'react-redux';
import { Loader } from '../Loader';
import './ForecastView.css';
function ForecastView()
{
    const weather = useSelector( state => state.weather );
    const loading = weather.loading.forecast;

    return (
        <div className="forecast-container">

            { loading && <Loader /> }
            
            { !loading &&
                weather.forecast.map( ( f, i ) => {
                    return <ForecastDay forecast={ f } key={ i } />;
                })
            }

        </div>
    )
}


function ForecastDay({ forecast })
{

    const date = new Date( forecast.Date );
    const day = date.toString().split( ' ' )[0];
    const iconAlt = forecast.Day.IconPhrase;
    const icon= forecast.Day.Icon;
    const generateIconBaseUrl = `https://developer.accuweather.com/sites/default/files`;

  const generateIconUrl = (weatherIconNumber) => {
    if (weatherIconNumber < 10) {
      return `${generateIconBaseUrl}/0` + weatherIconNumber + "-s.png";
    } else {
      return `${generateIconBaseUrl}/` + weatherIconNumber + "-s.png";
    }
  };
    
    return (
        <div className="forecast-day">
            <span className="day">{ day }</span>
            <img className="weather-icon" alt={ iconAlt } src={ generateIconUrl(icon) } />
            <span className="temperature">
                { forecast.Temperature.Minimum.Value }° - {forecast.Temperature.Maximum.Value }°
            </span>
        </div>
    );

}

export default ForecastView;