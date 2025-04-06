import React from 'react'
import "./HourlyForecast.css"

import { XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart, LabelList, Legend, Label } from "recharts";

const HourlyForecast = ({ hourlyForecast }) => {
    return (
        <div className="chart-container">
            <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={hourlyForecast} cursor="pointer">
                    <XAxis dataKey="time" />
                    <YAxis domain={["auto", "auto"]} unit="°C"/>
                    <Tooltip cursor={false} />
                    <Area type="natural" dataKey="temp" unit="°C" stroke="#FFBF00" strokeWidth={3} fill="#FFBF00" fillOpacity={0.3} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export default HourlyForecast