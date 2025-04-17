import React, { useState } from 'react'
import "./HourlyForecast.css"

import {
    XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart, RadialBarChart, RadialBar, PolarAngleAxis, BarChart,
    Bar,
} from "recharts";

const HourlyForecast = ({ hourlyForecast }) => {
    const [unit, setUnit] = useState("°C");
    const [selectedGraph, setSelectedGraph] = useState("temp");

    //convert temperatures
    const convertTemp = (tempC) => {
        return unit === "°F" ? (tempC * 9) / 5 + 32 : tempC;
    }

    //apply conversion to the data
    const convertedData = hourlyForecast.map(item => ({
        ...item,
        temp: convertTemp(item.temp)
    }));

    const windData = hourlyForecast.map((item, index) => ({
        name: item.time,
        wind: item.wind,
        fill: "#039c31",
    }))

    return (
        <div className="chart-container">

            {selectedGraph === "temp" && (
                <div className="chart-header">
                    <button onClick={() => setUnit(unit === "°C" ? "°F" : "°C")} className="unit-toggle-button">
                        {unit === "°C" ? "°F" : "°C"}
                    </button>
                </div>
            )}

            <div className="graph-buttons">
                <button
                    onClick={() => setSelectedGraph("temp")}
                    className={selectedGraph === "temp" ? "graph-button selected" : "graph-button"}
                >
                    Temperature
                </button>
                <button
                    onClick={() => setSelectedGraph("wind")}
                    className={selectedGraph === "wind" ? "graph-button selected" : "graph-button"}
                >
                    Wind Speed
                </button>
                <button
                    onClick={() => setSelectedGraph("precipitation")}
                    className={selectedGraph === "precipitation" ? "graph-button selected" : "graph-button"}
                >
                    Precipitation
                </button>
            </div>

            <ResponsiveContainer width="100%" height={300}>
                {selectedGraph === "wind" ? (
                    <RadialBarChart
                        cx="50%"
                        cy="50%"
                        innerRadius="20%"
                        outerRadius="90%"
                        barSize={10}
                        data={windData}
                    >
                        <PolarAngleAxis type="number" domain={[0, 'auto']} />
                        <RadialBar
                            minAngle={15}
                            label={({ payload }) => payload?.name || ""}
                            background
                            clockwise
                            dataKey="wind"
                        />
                        <Tooltip formatter={(value, name, props) => [`${value} km/h`, `${props.payload.name}`]} />
                    </RadialBarChart>
                ) : selectedGraph === "precipitation" ? (
                    <BarChart data={convertedData}>
                        <XAxis dataKey="time" />
                        <YAxis domain={[0, 'auto']} tickFormatter={(value) => `${value} mm`} />
                        <Tooltip formatter={(value) => [`${value} mm`, "Precipitation"]} />
                        <Bar dataKey="precipitation" fill="#00BFFF" radius={[4, 4, 0, 0]} />
                    </BarChart>
                ) : (
                    <AreaChart data={convertedData}>
                        <XAxis dataKey="time" />
                        <YAxis
                            domain={["auto", "auto"]}
                            tickFormatter={(value) => `${value}${unit}`}
                        />
                        <Tooltip
                            formatter={(value) => [`${value.toFixed(1)}`, "Temperature"]} cursor={false}
                        />
                        <Area
                            type="linear"
                            dataKey="temp"
                            unit={unit}
                            stroke="#FFBF00"
                            strokeWidth={3}
                            fill="#FFBF00"
                            fillOpacity={0.3}
                        />
                    </AreaChart>
                )}
            </ResponsiveContainer>


        </div>
    );
}

export default HourlyForecast