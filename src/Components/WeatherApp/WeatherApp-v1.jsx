import React, { useEffect, useState } from 'react';
import './WeatherApp.css'

import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";

export const WeatherApp = () => {
  let api_key = "a47a8af1e0eb25c9c2f5b4469d7c184e";

  const [wicon,setWicon] = useState(cloud_icon);
  const [loading,setLoading] = useState(false);

  const search = async () =>  {
    const element = document.getElementsByClassName('cityInput');
    if(element[0].value === '') return 0;

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

    setLoading(true)

    const response = await fetch(url);
    const data = await response.json();
    

    setLoading(false);

    const humidity = document.getElementsByClassName('humidity-percent');
    const wind = document.getElementsByClassName("wind-rate");
    const temperature = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");

    humidity[0].innerHTML = data.main.humidity;
    wind[0].innerHTML = data.wind.speed + "km/hr";
    temperature[0].innerHTML = data.main.temp + "°C";
    location[0].textContent = data.sys.country;

    

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

    // setLoading(false);
  }

  // useEffect(() => {
  //   search();
  // }, []);
  
  return (
    <div className='container'>
        <div className="top-bar">
            <input type="text" className="cityInput" placeholder='Search' />
            <div className="search-icon" onClick={()=>search()}>
                <img src={search_icon} alt="" />
            </div>
        </div>
        {/* ===============END OF TOP-BAR================== */}
        <div className="weather-image">
          <img src={wicon} alt="" />
        </div>
        {/* ================== OF WEATHER-IMAGE================== */}
        <div className="weather-temp">24 cel</div>
        {/* ================== OF WEATHER-TEMP================== */}
        {loading?<Loading/>:<div className="weather-location">London</div>}
        {/* ================== OF WEATHER LOCATION================== */}
        <div className="data-container">
          <div className="elememt">
            <img src={humidity_icon} alt="" className="icon" />
            <div className="data">
              <div className="humidity-percent">64%</div>
              <div className="text">Humidity</div>
            </div>
          </div>

          {/* ------------------ */}

          <div className="elememt">
            <img src={wind_icon} alt="" className="icon" />
            <div className="data">
              <div className="wind-rate">18 km/hr</div>
              <div className="text">Wind speed</div>
            </div>
          </div>
        </div>
    </div>
  )
}

const Loading = () => {
  return <h1>
    Loading...
  </h1>
}
