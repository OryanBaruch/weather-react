import ACTIONS from './actionTypes'
import {setAutoComplete} from '../../autocomplete/actions'
import {setForecast , setCurrentWeather} from '../../weather/actions'
import {setFavoriteCurrentWeather} from '../../favorites/actions'


export const apiStart = label => {

    return { 
        type: ACTIONS.START, 
        payload: { label } 
    };

};

export const apiSuccess = ( label, data ) => {

    return { 
        type: ACTIONS.SUCCESS, 
        payload: { label, data } 
    };

};

export const apiError = ( label, error ) => {

    return { 
        type: ACTIONS.ERROR, 
        payload: { label, error } 
    };

};

export const apiAction = ( payload ) => {

    return {
        type: ACTIONS.API,
        payload
    };

}

export const apiAutoComplete = ( query ) => {

    return apiAction({
        endpoint: 'locations/v1/cities/autocomplete',
        data: { q: query },
        onSuccess: setAutoComplete
    });

}


export const apiCurrentWeather=( { LocationKey: locationKey, LocalizedName: name }, locationType = 'main' )=>{
    let onSuccess;
    switch( locationType )
    {
        // main weather -> i.e. state.weather.current
        case 'main':
            onSuccess = ( data ) => setCurrentWeather( data, name, locationKey );
            break;

        // favorite location -> i.e. state.favorites[i]
        case 'favorite':
            onSuccess = ( data ) => setFavoriteCurrentWeather( data, locationKey );
            break;

        default:
            break;

    }

    return apiAction({
        endpoint: `currentconditions/v1/${ locationKey }`,
        onSuccess: onSuccess
    });
}

export const apiForecast = ({ LocationKey: locationKey }) => {

    return apiAction({
        endpoint: `forecasts/v1/daily/5day/${ locationKey }`,
        data: {
            metric: true
        },
        onSuccess: setForecast
    });

}

export const apiGeoLocation = ( { latitude: lat, longitude: lon }, callback ) => {
    return apiAction({
        endpoint: '/locations/v1/cities/geoposition/search',
        data: {
            details: true,
            q: `${ lat },${lon}`
        },
        callback: ({ Key: LocationKey, LocalizedName }) =>  {
           return callback({ LocationKey, LocalizedName }) }
        
    });
    
}