import logo from './logo.svg';
import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/currWeather/curr-weather';
import Forecast from "./components/forecast/forecast";
import { weather_key, weather_url } from './api';
import { useState } from 'react';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${weather_url}/weather?lat=${lat}&lon=${lon}&appid=${weather_key}&units=metric`);
    const forecastFetch = fetch(`${weather_url}/forecast?lat=${lat}&lon=${lon}&appid=${weather_key}&units=metric`);

    Promise.all([currentWeatherFetch, forecastFetch]).then(async (response) => {
      const weatherResponse = await response[0].json();
      const forecastResponse = await response[1].json();

      setCurrentWeather({ city: searchData.label, ...weatherResponse });
      setForecast({ city: searchData.label, ...forecastResponse });
    })
      .catch((err) => console.log(err));
  }
  
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather}/>}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
