import React, { useState } from 'react'
import '../Components/Weather.css'
import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';


export default function Weather() {

    let api_key= "dd94f859a0e52d6e4767fddf735f04a7";

    const [wicon, setWicon] = useState (cloud_icon);

    const search = async () => {
        const element= document.getElementsByClassName("cityInput")
        if(element[0].value === "")
        {
            return 0;
        }
        let url=`https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`

        let response = await fetch(url);
        let data = await response.json();

        const humidity = document.getElementsByClassName("humidity-percent")[0];
        const wind = document.getElementsByClassName("wind-rate")[0];
        const temperature= document.getElementsByClassName("weather-temp")[0];
        const location = document.getElementsByClassName("weather-location")[0];

        console.log(data);

        humidity.innerHTML = data.main.humidity + "%";
        wind.innerHTML = data.wind.speed + "Km/H";
        temperature.innerHTML = data.main.temp + "°C" ;
        location.innerHTML = data.name;

        if(data.weather[0].icon==="o1d" || data.weather[0].icon == "01n")
        {
            setWicon(clear_icon);
        }
        else if(data.weather[0].icon==="02d" || data.weather[0].icon == "02n")
        {
            setWicon(cloud_icon);
        }
        else if(data.weather[0].icon==="03d" || data.weather[0].icon == "03n")
        {
            setWicon(drizzle_icon);
        }
        else if(data.weather[0].icon==="04d" || data.weather[0].icon == "04n")
        {
            setWicon(drizzle_icon);
        }
        else if(data.weather[0].icon==="09d" || data.weather[0].icon == "09n")
        {
            setWicon(rain_icon);
        }
        else if(data.weather[0].icon==="010d" || data.weather[0].icon == "010n")
        {
            setWicon(rain_icon);
        }
        else if(data.weather[0].icon==="013d" || data.weather[0].icon == "013n")
        {
            setWicon(snow_icon);
        }
        else
        {
            setWicon(clear_icon);
        }
    }

  return (
    <div className="container">
        <div className="top-bar">
            <input type="text" className="cityInput" placeholder="Search" />
            <div className="search-icon">
                <img src={search_icon} alt="icon" onClick={() => {search()}} />
            </div>
        </div>
        <div className="weather-image">
            <img src={wicon} alt="" />
        </div>
        <div className="weather-temp">24°C</div>
        <div className="weather-location">London</div>
        <div className="data-containers">
            <div className="elements">
                <img src={humidity_icon} alt="" className="icon" />
                <div className="data">
                    <div className="humidity-percent">64%</div>
                    <div className="text">Humidity</div>
                </div>
            </div>
            <div className="elements">
                <img src={wind_icon} alt="" className="icon" />
                <div className="data">
                    <div className="wind-rate">18 Km/H</div>
                    <div className="text">Wind Speed</div>
                </div>
            </div>
        </div>
    </div>
  );
}
