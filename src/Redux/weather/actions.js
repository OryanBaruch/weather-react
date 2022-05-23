import ACTIONS from './actionTypes';

export const setCurrentWeather = ( [ current ], name = '', locationKey = '' ) => {
    current = current || {};
    current.Name = name;
    current.LocalizedName = name;
    current.LocationKey = locationKey;

    return {
        type: ACTIONS.SET_CURRENT,
        payload: { current }
    };

}

export const setForecast = ({ DailyForecasts: forecast}) => {
    forecast = forecast || [];
    
    return {
        type: ACTIONS.SET_FORECAST,
        payload: { forecast }
    };

}

export const setCurrentWeatherLoading = ( isLoading ) => {
    return {
        type: ACTIONS.SET_CURRENT_LOADING,
        payload: { isLoading }
    };

}

export const setForecastLoading = ( isLoading) => {

    return {
        type: ACTIONS.SET_FORECAST_LOADING,
        payload: { isLoading }
    };

}