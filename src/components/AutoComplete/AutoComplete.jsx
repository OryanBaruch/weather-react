// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentWeatherLoading, setForecastLoading } from '../../Redux/weather/actions';
import {setAutoComplete} from '../../Redux/autocomplete/actions'
import { apiAutoComplete, apiCurrentWeather, apiForecast } from '../../Redux/middleware/api';
import './AutoComplete.css';


function AutoComplete()
{
    const [ value, setValue ] = useState( '' );
    const [ currentItem, setCurrentItem ] = useState( -1 );
    const [ loading, setLoading ] = useState( false );
    const dispatch = useDispatch();
    const suggestions = useSelector( state => state.autocomplete );


    // handle search term changes
    useEffect( () => {

        const timeout = setTimeout( showAutoComplete, 300 );

        return() => { clearTimeout( timeout ); }

    // eslint-disable-next-line
    }, [ value ]);


    // show autocomplete when user finished typing
    const showAutoComplete = () => {

        const term = value.trim();

        if( !term )
        {
            dispatch( setAutoComplete( [] ) );
            return;
        }

        setLoading( true );
        dispatch( apiAutoComplete( term ) );

    };


    // hide loader when suggestions where loaded
    useEffect( () => { setLoading( false ) }, [ suggestions ]);


    // handle suggestion selection
    const selectSuggesstion = ( i ) => {
        const idx = i ?? currentItem;
        const selected = suggestions[idx];
        
        setCurrentItem( -1 );
        dispatch( setAutoComplete( [] ) );
        

        // fetch weather & forecast
        dispatch( setCurrentWeatherLoading( true ) );
        dispatch( setForecastLoading( true ) );
        dispatch( apiCurrentWeather( selected ) );
        dispatch( apiForecast( selected ) );

    };



    return (
        <form className="auto-complete-form" onSubmit={ e => e.preventDefault() }>

            { loading &&
                <span className="auto-complete-loader"></span>
            }

            <input value={ value } 
                type="text"
                placeholder="Type to search..."
                className="auto-complete-input"
                onChange={ e => setValue( e.target.value ) }
            />

            <div className="auto-complete-suggestions">
                <ul>
                    {
                        suggestions.map(( s, i ) => {;
                            return (
                                <li key={ s.Key } 
                                    onClick={ () => selectSuggesstion( i ) }
                                    className={ currentItem === i ? 'active' : '' }>
                                    { s.LocalizedName }, {s.Country.LocalizedName}, {s.Key}
                                </li>
                            )

                        })
                    }
                </ul>
            </div>
        </form>
    )
}

export default AutoComplete;