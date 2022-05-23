import React from 'react';
import { ForecastView } from '../components/ForecastView';
import { AutoComplete } from '../components/AutoComplete';
import { CurrentWeather } from '../components/CurrentWeather';

function Home()
{
    return (
        <>
			<AutoComplete />
			<CurrentWeather />
			<ForecastView />
        </>
    )
}

export default Home;