import { useState } from 'react';
import './App.css';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';

function App() {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });

  const toDate = () => {
    const months = [
      "January", "February", "March", "April", "May",
      "June", "July", "August", "September", "October",
      "November", "December",
    ];
    const currentDate = new Date();
    const date = `${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
    return date;
  };

  const search = (event) => {
    if (event.key === "Enter") {
      setInput('');
      setWeather({ ...weather, loading: true, error: false });
      axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          q: input,
          units: "metric",
          appid: "7b1db6c830f9a7cfd16c716f7de441d0"
        }
      }).then(res => {
        setWeather({ data: res.data, loading: false, error: false });
      }).catch(err => {
        setWeather({ ...weather, data: {}, error: true });
      });
    }
  };

  return (
    <div className='App'>
      <div className='weather-app'>
        <h1 className='app-title'>Weather Finder</h1>
        <p className='app-subtitle'>Get the current weather for any city in the world</p>
        <div className='city-search'>
          <input 
            type="text" 
            className='city' 
            placeholder='Enter City Name and Press Enter' 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={search} 
          />
        </div>
        {weather.loading && (
          <Oval color='green' height={70} width={70} />
        )}
        {weather.error && (
          <div className='error-message'>
            <span>City Not Found. Please try again.</span>
          </div>
        )}
        {weather.data.name && (
          <div className='weather-info'>
            <div className='city-name'>
              <h2>{weather.data.name},
                <span> {weather.data.sys.country}</span>
              </h2>
            </div>
            <div className='date'>
              <span>{toDate()}</span>
            </div>
            <div className='icon-temp'>
              <img src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`} alt="Weather Icon" />
              {Math.round(weather.data.main.temp)}
              <sup className='deg'>°C</sup>
            </div>
            <div className='des-wind'>
              <p>{weather.data.weather[0].description.toUpperCase()}</p>
              <p>Wind Speed: {weather.data.wind.speed} m/s</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
