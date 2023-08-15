import React from "react";
import { useState } from "react";
import "./index.css";

function App() {
  const api = {
    key: "8988a9114e9cd5f695ac94170bdd9cd6",
    url: "https://api.openweathermap.org/data/2.5/",
  };

  const todayDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});

  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.url}weather?q=${city}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setCity("");
          console.log(result);
        });
    }
  };
  return (
    <div className="container">
      <div
        className={
          typeof weather.main != "undefined"
            ? weather.weather[0].main === "Clear"
              ? "box"
              : "box cloudy"
            : "box"
        }
      >
        <input
          type="text"
          placeholder="Search the city.."
          onChange={(e) => {
            setCity(e.target.value);
          }}
          value={city}
          onKeyDown={search}
        />

        {typeof weather.main != "undefined" ? (
          <div>
            <h2
              className="text-center mt-5 text-light city"
              style={{ fontFamily: "cursive" }}
            >
              {weather.name},{weather.sys.country}
            </h2>
            <p className="text-center text-light">{todayDate}</p>
            <h1
              className="text-center p-5 text-light temp"
              style={{ fontFamily: "cursive", fontSize: "80px" }}
            >
              {weather.main.temp.toFixed(0)}°C
            </h1>
            <h3
              style={{ fontFamily: "cursive" }}
              className="weather text-center text-light"
            >
              {weather.weather[0].main}
            </h3>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
