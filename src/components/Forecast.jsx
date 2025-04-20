import React from 'react'
import weatherImages from '../utils/weatherImages';
import "./Forecast.css"

const Forecast = ({ forecastData }) => {

  return (

    <div>

      <div className="forecast-heading">
        5-Day Forecast:
      </div>

      <div className="forecast-container">
        {forecastData.map((item, index) => {
          const condition = item.weather[0].main;
          const weatherImg = weatherImages[condition] || weatherImages["Clear"];

          return (
            <div className="forecast-display" key={index}>
              <h3>{new Date(item.dt_txt).toLocaleDateString("en-US", { weekday: "long" })}</h3>
              <p>{new Date(item.dt_txt).toLocaleDateString("en-US", {month: "short", day: "numeric"})}</p>
              <img src={weatherImg} alt={condition} />
              <p><strong>{item.main.temp_max}°</strong> | {(item.main.temp * 1.8 + 32).toFixed(1)}°F</p>
              <p><strong>Conditions: </strong>{item.weather[0].description}</p>
              <p>{item.main.humidity}% | {item.wind.speed} km/h</p>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Forecast