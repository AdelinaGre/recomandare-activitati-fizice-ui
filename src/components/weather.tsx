import React, { useEffect, useState } from 'react';
import '../styles/weather.css';
import axios from 'axios';

import { default as MoonSvg } from '../assets/dark_mode_24dp_FILL1_wght400_GRAD0_opsz24.svg';
import { default as CloudSvg } from '../assets/cloud_24dp_FILL1_wght400_GRAD0_opsz24.svg';

interface WeatherData {
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        humidity: number;
    };
    weather: {
        description: string;
    }[];
    clouds: {
        all: number;
    };
    sys: {
        sunrise: number;
        sunset: number;
    };
    timezone: number;
}

interface WeatherWidgetProps {
    location: string;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ location }) => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

    useEffect(() => {
        if (location.length) {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=bc4a26b4c1a537210263aa99b9c863e2&units=metric`)
                .then(response => {
                    setWeatherData(response.data);
                }).catch(error => {
                    console.log("error:", error);
                });
        }
    }, [location]);

    if (!weatherData) return <div>Loading...</div>;

    const currentTimeUTC = new Date().getTime() / 1000;
    const localTime = currentTimeUTC + weatherData.timezone;
    const isDayTime = localTime > weatherData.sys.sunrise && localTime < weatherData.sys.sunset;
    const cloudSize = weatherData.clouds.all;

    return (
        <div className='weather-widget'>
           { isDayTime ? <div className='sun' ></div>:<img className='moon' src={MoonSvg} />}
            
            <div className='cloud-container'>
                {cloudSize > 50 && <img className='cloud' src={CloudSvg} />}
            </div>
            <div className='temperature'>{Math.round(weatherData.main.temp)}°C</div>
            <div className='weather'>{weatherData.weather[0].description}</div>
            <div className='low-high'>
                {Math.round(weatherData.main.temp_min)}°C / {Math.round(weatherData.main.temp_max)}°C
            </div>
            <div className='feels-like'>{Math.round(weatherData.main.feels_like)}°C</div>
            <div className='location'>{location}</div>
            <div className='humidity'>{weatherData.main.humidity}%</div>
        </div>
    );
};

export default WeatherWidget;
