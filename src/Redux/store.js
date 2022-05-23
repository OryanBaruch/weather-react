import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from './rootReducer';
import { applyMiddleware , createStore} from 'redux';
import { apiMiddleware } from './middleware/api';
import storage from 'redux-persist/lib/storage';
// import { composeWithDevTools } from "redux-devtools-extension";
// import thunk from "redux-thunk";

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: [
        'favorites',
    ]
};

const pReducer=persistReducer(persistConfig, rootReducer)

const middleWares=[ apiMiddleware]
const store=createStore(pReducer, applyMiddleware(...middleWares))

export const persistor = persistStore( store );

export default store;

