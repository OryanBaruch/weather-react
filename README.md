Weather app architecture:
Redux:
State is  managed globaly with Redux
Contains the following:
Store => contains all the state in the project
reducers
MiddleWare=> one midddleware that goes through all the http request of the app
(middle could have made with axios library)
apiAction=> hold endpoint data (holds query) and onSuccsess
each folder holds action and reducers for the specific part of the app
autoComplete, setCurrentWeather and favorites
favorites: save – remove (combined for a toggle function )
autoComplete- search by locationKey 
weather- set the current and the 5 days’ forecast

custom hooks for geolocation and favorite
geolocation check position and if no location gets you to tel aviv
useFavorite check if the location if a favorite, and let you toggle favorite location

HOC- take a component as props and get back a new comp.
For store, toast, and router
Components:
Compoents for autoComplete, favorites, currentWeather and forecast, loaded when there is no state, 
And navigation Bar.
Pages:
2 pages in app.
Home:
Holds the autoComplete CurrentWeather and Forecast
Favorites: hold the favorites location’s
