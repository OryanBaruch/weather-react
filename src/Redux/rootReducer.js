import { combineReducers } from 'redux';
import autoCompleteReducer from './autocomplete/reducer';
import weatherReducer from './weather/reducer';
import favoritesReducer from './favorites/reducer';


const rootReducer = combineReducers({
    autocomplete: autoCompleteReducer,
    weather: weatherReducer,
    favorites: favoritesReducer,
});

export default rootReducer;