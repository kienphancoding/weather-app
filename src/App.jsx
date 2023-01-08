import { useEffect, useState } from "react";
import "./App.scss";
import ErrorLocation from "./components/ErrorLocation";
import Main from "./components/Main";

function App() {
  const [isLocation, setIsLocation] = useState(false);
  
  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success() {
      setIsLocation(true);
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  return (
    <div className="App">
      {isLocation && <Main />}
      {!isLocation && <ErrorLocation />}
    </div>
  );
}

export default App;
