import React from 'react'
import "./WeatherDisplay.css"
import weatherImages from '../utils/weatherImages';

const WeatherDisplay = ({ weatherData }) => {

    //Update the image based on the condition
    const condition = weatherData.weather[0].main;
    const weatherImg = weatherImages[condition] || weatherImages["Clear"];

    //Get local time from each location
    //Get UTC time
    const utcTime = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
    const { timezone } = weatherData;
    //Adjust for the city's timezone (timezone is in seconds so multiply by 1000)
    const localTime = new Date(utcTime + timezone * 1000).toLocaleString("en-US", {
        hour: "numeric",
        minute: "2-digit",
    });

    const localDate = new Date(utcTime + timezone * 1000).toLocaleDateString("en-US", {weekday: "long"})

  return (
    <div className="weather-container">
        <div className="weather-display">

            <div className="image">
                <img src={weatherImg} alt={condition}/>
                <h1>{weatherData.main.temp} °C</h1>
                <p className="fahrenheit">{(weatherData.main.temp * 1.8 + 32).toFixed(1)}°F</p>
            </div>

        <div className="weather-info">
            <p><strong>Feels like: </strong>{weatherData.main.feels_like} C° | {(weatherData.main.temp * 1.8 + 32).toFixed(1)}°F</p>
            <p><strong>Humidity: </strong> {weatherData.main.humidity}%</p>
            <p><strong>Wind Speed: </strong>{weatherData.wind.speed} km/h</p>
            <p><strong>Conditions: </strong>{weatherData.weather[0].description}</p>
            <p><strong>H: </strong> {weatherData.main.temp_max} C° | <strong>L: </strong>{weatherData.main.temp_min} C°</p>
        </div>

        <div className="weather-loc">
            <h2>{weatherData.name}, {weatherData.sys.country}</h2>
            <p>{ localDate }, {localTime}</p>
            <p>{weatherData.weather[0].main}</p>
        </div>
        </div>
    </div>
  )
}

export default WeatherDisplay