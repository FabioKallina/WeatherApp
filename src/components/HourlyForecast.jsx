import React, { useState } from 'react'
import "./HourlyForecast.css"

import { XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart, LabelList, Legend, Label } from "recharts";

const HourlyForecast = ({ hourlyForecast }) => {
    const [unit, setUnit] = useState("°C");

    //convert temperatures
    const convertTemp = (tempC) => {
        return unit === "°F" ? (tempC * 9) / 5 + 32 : tempC;
    }

    //apply conversion to the data
    const convertedData = hourlyForecast.map(item => ({
        ...item,
        temp: convertTemp(item.temp)
    }));

    return (
        <div className="chart-container">

            <div className="chart-header">
                <button onClick={() => setUnit(unit === "°C" ? "°F" : "°C")} className="unit-toggle-button">
                    {unit === "°C" ? "°F" : "°C"}
                </button>
            </div>

            <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={convertedData} cursor="pointer">
                    <XAxis dataKey="time" />
                    <YAxis domain={["auto", "auto"]} unit={`${unit}`} />
                    <Tooltip cursor={false} formatter={(value) => [`${value.toFixed(1)}`, 'Temp']} />
                    <Area type="linear" dataKey="temp" unit={`${unit}`} stroke="#FFBF00" strokeWidth={3} fill="#FFBF00" fillOpacity={0.3} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export default HourlyForecast