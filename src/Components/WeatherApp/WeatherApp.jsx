import React, { useEffect, useState } from 'react';
import './WeatherApp.css';
import {search_icon,clear_icon,cloud_icon,drizzle_icon,rain_icon,snow_icon,wind_icon,humidity_icon} from '../assets/assetIndex';

export const WeatherApp = () => {
  let api_key = "a47a8af1e0eb25c9c2f5b4469d7c184e";

  const [searchValue,setSearchValue] = useState('Country');
  const [humidity, setHumidity] = useState(0);
  const [wind,setWind] = useState(0);
  const [temperature,setTemperature] = useState('temp');

  const [wicon,setWicon] = useState(cloud_icon);
  const [isLoading,setIsLoading] = useState(false);

  const search = async () =>  {
    if(searchValue === '') return 0;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=Metric&appid=${api_key}`;

    setIsLoading(true)

    const response = await fetch(url);
    const data = await response.json();
    
    setIsLoading(false);

    setHumidity(data.main.humidity + "%");
    setWind(data.wind.speed + "km/hr");
    setTemperature(Number(data.main.temp));

  
    if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n"){
      setWicon(clear_icon)
    }
    else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n"){
      setWicon(cloud_icon)
    }
    else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n"){
      setWicon(drizzle_icon)
    }
    else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n"){
      setWicon(drizzle_icon)
    }
    else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n"){
      setWicon(rain_icon)
    }
    else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n"){
      setWicon(rain_icon)
    }
    else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n"){
      setWicon(snow_icon)
    }
    else{
      setWicon(clear_icon)
    }
    

  }

  
  
  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div className="search-icon" onClick={() => search()}>
          <img src={search_icon} alt="SE" />
        </div>
      </div>
      {/* ===============END OF TOP-BAR================== */}
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      {/* ================== OF WEATHER-IMAGE=======24°C=========== */}
      <div className="weather-temp">{temperature}°C</div>
      {/* ================== OF WEATHER-TEMP================== */}
      {isLoading ? (
        <Loading />
      ) : (
        <div className="weather-location">{searchValue}</div>
      )}
      {/* ================== OF WEATHER LOCATION================== */}
      <div className="data-container">
        <div className="elememt">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">{humidity}</div>
            <div className="text">Humidity</div>
          </div>
        </div>

        {/* ------------------ */}

        <div className="elememt">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate">{wind}</div>
            <div className="text">Wind speed</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Loading = () => {
  return <h1>
    Loading...
  </h1>
}
