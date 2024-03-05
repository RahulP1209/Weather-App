import React, { useState } from 'react'
import '../Components/Weather.css'
import search_icon from '../Assets/search.png'
import wind_icon from '../Assets/wind.png'
import humidity_icon from '../Assets/humidity.png'

export default function Weather() {

  const [weatherData, setWeatherData] = useState(null)
  const [wicon, setWicon] = useState('')
  const [errorMessage, setErrorMessage] = useState("")

  const api_key = "dd94f859a0e52d6e4767fddf735f04a7"

  const search = async () => {
    const cityName = document.getElementsByClassName("cityInput")[0].value
    if (cityName === "") {
      setErrorMessage("Enter a city name!")
      return
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=Metric&appid=${api_key}`

    const response = await fetch(url)
    const data = await response.json()
    console.log("data",data);
    
    if (!response.ok) {
      setErrorMessage("Please check the place name and try again!")
      return
    }

    setWeatherData(data)
    setWicon(data.weather[0].icon)
  }

  const handleEnter = async (e) => {
    if(e.key === 'Enter')
      search();
  }

  const handleInputChange = () => {
    setErrorMessage("")
  }

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="Search for a place" onKeyDown={handleEnter} onChange={handleInputChange}/>
        <div className="search-icon">
          <img src={search_icon} alt="icon" onClick={search}/>
        </div>
      </div>
      {errorMessage && <div className="error"> {errorMessage} </div>}
      {
        wicon && <div className="weather-image">
        <img src={`https://openweathermap.org/img/wn/${wicon}@2x.png` ? `https://openweathermap.org/img/wn/${wicon}@2x.png` : null} alt="Weather Icon" />
      </div>
      }
      
      <div className="weather-temp">{weatherData && weatherData.main.temp}°C</div>
      <div className="weather-location">{weatherData && weatherData.name}</div>
      <div className="data-containers">
        <div className="elements">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent" id="humidity-percent">
              {weatherData && weatherData.main.humidity}%
            </div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="elements">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate" id="wind-rate">
              {weatherData && weatherData.wind.speed} Km/H
            </div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
       
      </div>
    </div>
  )
}