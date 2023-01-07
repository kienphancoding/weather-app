import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [isLocation, setIsLocation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos) {
      setIsLocation(true);
      const crd = pos.coords;

      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "86a4243eccmsha76c2ea9aa0ff84p1a8f50jsn2aa8bf3532e4",
          "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
        },
      };

      setIsLoading(true)
      const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${crd.latitude}%2C${crd.longitude}`;

      fetch(url, options)
        .then((response) => response.json())
        .then((response) => {
          setIsLoading(false)
          setData(response)
        })
        .catch((err) => console.error(err));
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);
  return (<div className="App">{!isLocation && <div>Error</div>}
  {isLocation && <div>Catch</div>}
  </div>);
}

export default App;
