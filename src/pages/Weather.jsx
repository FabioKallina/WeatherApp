import React, { useEffect, useState } from "react";

import SearchBar from "../components/SearchBar";
import WeatherDisplay from "../components/WeatherDisplay";
import Forecast from "../components/Forecast";
import HourlyForecast from "../components/HourlyForecast";

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState([]);
    const [city, setCity] = useState("Sydney"); //Default city
    const [hourlyForecast, setHourlyForecast] = useState([]);
    const APIKey = import.meta.env.VITE_WEATHER_API_KEY;

    const fetchWeatherData = async (city) => {

        try {
            const weatherResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`
            )
            if (!weatherResponse.ok) throw new Error("Location not found");
            const weather = await weatherResponse.json();
            setWeatherData(weather);

            const forecastResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}&units=metric`
            )
            if (!forecastResponse.ok) throw new Error("Location not found");
            const forecast = await forecastResponse.json();

            //Get time zone offset in seconds 
            const timezoneOffset = forecast.city.timezone;

            const nowUTC = new Date();
            const localNow = new Date(nowUTC.getTime() + timezoneOffset * 1000);
            const localTodayStr = localNow.toISOString().split("T")[0];
            const localHourNow = localNow.getHours();

            // Group forecast entries by local date
            const groupedByDate = {};

            forecast.list.forEach(item => {
                const utcDate = new Date(item.dt * 1000);
                const localDate = new Date(utcDate.getTime() + timezoneOffset * 1000);
                const dateStr = localDate.toISOString().split("T")[0];
                const hour = localDate.getHours();

                // Skip today's forecasts only if it's past noon
                if (dateStr === localTodayStr && localHourNow >= 12) return;

                if (!groupedByDate[dateStr]) {
                    groupedByDate[dateStr] = [];
                }

                groupedByDate[dateStr].push({ ...item, hourDiffFromNoon: Math.abs(12 - hour) });
            });

            // Pick the closest to 12:00 PM for each day
            const sortedDates = Object.keys(groupedByDate).sort();
            const dailyForecast = sortedDates.slice(0, 5).map(date => {
                const dayEntries = groupedByDate[date];
                return dayEntries.reduce((closest, current) =>
                    current.hourDiffFromNoon < closest.hourDiffFromNoon ? current : closest
                );
            });

            setForecastData(dailyForecast);

            //Get the next 5 hourly data points
            const hourlyData = forecast.list.slice(0, 5).map(item => {
                const { timezone } = weather;  // Get the timezone offset from weather (in seconds)            
                // Convert timestamp (in seconds) to local time
                const localTime = new Date((item.dt + timezone + 21600) * 1000);  // Adjust for timezone and convert to milliseconds // I had to apply 21600 because I was getting the time for every location 6 hours behind, this is just to offset it

                return {
                    time: localTime.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
                    temp: item.main.temp,
                    wind: (item.wind.speed * 3.6).toFixed(1),  // Convert m/s to km/h
                    precipitation: item.rain ? `${item.rain["3h"]}` : "0" // Check if rain data exists
                };
            });
            setHourlyForecast(hourlyData);

        }
        catch (error) {
            console.error("Failed fetching Weather Data:", error);
            setWeatherData(null);
        }
    }

    //Fetch the data for the default city when the component mounts
    useEffect(() => {
        fetchWeatherData(city);
    }, []); //Empty dependency array for it to only run on initial render

    //function to be called when the user submits a city name via the search bar
    const handleSearch = (newCity) => {
        setCity(newCity); //update the city state with the new city
        fetchWeatherData(newCity); //fetch weather data for the new city
    }


    return (
        <>
            <SearchBar onSearch={handleSearch} />
            {weatherData && <WeatherDisplay weatherData={weatherData} />}
            {hourlyForecast && <HourlyForecast hourlyForecast={hourlyForecast} />}
            {forecastData && <Forecast forecastData={forecastData} />}
        </>
    );
}

export default Weather;