// import clsx from "clsx";
import Loading from "./Loading";
// import style from "./Main.module.scss"
import "./Main.scss";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const Main = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  const monthNames = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const dateNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thurday",
    "Friday",
    "Saturday",
  ];

  const d = new Date();

  const handleDate = (day) => {
    if (day < 7) {
      return dateNames[day].toUpperCase().slice(0, 3);
    } else {
      return dateNames[day - 7].toUpperCase().slice(0, 3);
    }
  };

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos) {
      const crd = pos.coords;

      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "86a4243eccmsha76c2ea9aa0ff84p1a8f50jsn2aa8bf3532e4",
          "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
        },
      };

      setIsLoading(true);
      const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${crd.latitude}%2C${crd.longitude}&days=3`;

      fetch(url, options)
        .then((response) => response.json())
        .then((response) => {
          setIsLoading(false);
          setData(response);
        })
        .catch((err) => console.error(err));
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <div className="container">
          <div className="weather-side">
            <div className="weather-gradient">
              <div className="date-container">
                <h2 className="date-dayname">{dateNames[d.getDay()]}</h2>
                <span className="date-day">
                  {d.getDate()} {monthNames[d.getMonth()]} {d.getFullYear()}
                </span>
                <FontAwesomeIcon
                  className="location-icon"
                  icon={faLocationDot}
                />
                <span className="location">
                  {data.location.name}, {data.location.country}
                </span>
              </div>

              <div className="weather-container">
                <i className="weather-icon" data-feather="sun"></i>
                <h1 className="weather-temp">{data.current.temp_c}°C</h1>
                <h3 className="weather-desc">{data.current.condition.text}</h3>
              </div>
            </div>
          </div>

          <div className="info-side">
            <div className="today-info-container">
              <div className="today-info">
                <div className="precipitation">
                  <span className="title">GUST</span>
                  <span className="value">{data.current.gust_kph} km/h</span>
                  <div className="clear"></div>
                </div>

                <div className="humidity">
                  <span className="title">HUMIDITY</span>
                  <span className="value">{data.current.humidity} %</span>
                  <div className="clear"></div>
                </div>

                <div className="wind">
                  <span className="title">WIND</span>
                  <span className="value">{data.current.wind_kph} km/h</span>
                  <div className="clear"></div>
                </div>
              </div>
            </div>
            <div className="week-container">
              <ul className="week-list">
                {data.forecast.forecastday.map((item, index) => {
                  return (
                    <li className={index === 0 ? "active" : ""} key={index}>
                      <img
                        className="day-icon"
                        src={item.day.condition.icon}
                        alt="Icon Forest"
                      />
                      <span className="day-name">
                        {handleDate(d.getDay() + index)}
                      </span>
                      <span className="day-temp">{item.day.avgtemp_c}°C</span>
                    </li>
                  );
                })}
              </ul>
              <div className="clear"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Main;
