// @ts-nocheck
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate  } from 'react-router-dom';
import { setCurrentWeatherLoading, setForecastLoading } from '../../Redux/weather/actions';
import { apiCurrentWeather, apiForecast } from '../../Redux/middleware/api';
import { FavoriteBox } from '../FavoriteBox/';
import './FavoritesView.css';

function FavoriteView()
{
    const favorites = useSelector( state => state.favorites );
    const navigate = useNavigate ();
    const dispatch = useDispatch();


    // redirect the user to full forecast view of the selected location
    const fullForecast = ( location ) => {

        // fetch weather & forecast
        dispatch( setCurrentWeatherLoading( true ) );
        dispatch( setForecastLoading( true ) );
        
        dispatch( apiCurrentWeather( location ) );
        dispatch( apiForecast( location ) );

        navigate( "/" );

    };

    return (
        <div className="favorites-view">

            <h1>
                Your Favorite Locations:
            </h1>

            { favorites.length === 0 &&
                <p className="no-favorites">
                    You don't have any favorite locations yet.
                </p>
            }

            <div className="favorites-container">

                {
                    favorites.map( ( f ) => {

                        return <FavoriteBox favorite={ f } key={ f.LocationKey } onClick={ () => fullForecast( f ) } />

                    })
                }
            </div>
        </div>
    )
}

export default FavoriteView ;
