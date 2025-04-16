# Weather App 🌤️

This is a simple **Weather App** built with **React** and **Vite**, using the **OpenWeatherMap API** to display current weather, hourly forecasts, and 5-day forecasts for any city.

The app features:
- **Searchable city input**
- **Current weather display**
- **Interactive hourly temperature chart**
- **5-day forecast overview**
- **Temperature unit toggle (°C / °F)**

---

## 📁 File Structure

```
WeatherApp/
│
├── node_modules/
│
├── src/
│   ├── components/
│   │   ├── Forecast.css
│   │   ├── Forecast.jsx
│   │   ├── HourlyForecast.css
│   │   ├── HourlyForecast.jsx
│   │   ├── SearchBar.css
│   │   ├── SearchBar.jsx
│   │   ├── WeatherDisplay.css
│   │   └── WeatherDisplay.jsx
│   ├── images/
│   │   ├── clear.png
│   │   ├── cloud.png
│   │   ├── cloudy.png
│   │   ├── mist.png
│   │   ├── rain.png
│   │   ├── snow.png
│   │   └── storm.png
│   ├── pages/
│   │   └── Weather.jsx
│   ├── utils/
│   │   └── weatherImages.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── .env
├── vite.config.js
├── .gitignore
├── README.md
├── package-lock.json
└── package.json
```

---

## 🚀 Getting Started

### 1. **Clone the Repository**
```bash
git clone https://github.com/FabioKallina/WeatherApp.git
cd WeatherApp
```

### 2. **Install Dependencies**
```bash
npm install
```

### 3. **Run the App**
```bash
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🛠 Built With

- **React + Vite**
- **OpenWeatherMap API**
- **Recharts** (for temperature graphs)
- **CSS Modules**
- **Responsive design**

---



