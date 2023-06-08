import React, { useState } from 'react';
import WeatherTable from '../table/WeatherTable';
import '../style/CityWeatherList.css';

function CityWeatherList() {
  const [username, setUsername] = useState('');
  const [weatherDataList, setWeatherDataList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Username and password verification before sending request
    if (!username) {
      setErrorMessage('Please enter the username.');
      return;
    }

    // Request to get weather data from API
    fetch(`http://localhost:8080/api/cities/${username}/query-weathers`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then(data => {
            if (data.status === 200) {
              throw new Error(data.data); 
            } else {
              throw new Error(data.message); 
            }
          });
        }
      })
      .then(data => {
        setWeatherDataList(data);
        setErrorMessage('');
      })
      .catch(error => {
        console.error('Error getting weather info:', error);
        setWeatherDataList([]);
        setErrorMessage(error.message);
      });
  };

  const handleClear = () => {
    setWeatherDataList([]);
    setErrorMessage('');
  };

  return (
    <div className="city-weather-list">
      <h2>User's City Weather Information</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="button-group">
          <label>
            User Name:
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
          </label>
          <div className="button-container">
            <button type="submit">Bring Weather</button>
            <button type="button" onClick={handleClear}>Clear</button>
          </div>
        </div>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {weatherDataList.length > 0 ? (
        <div className="scrollable-container">
          <WeatherTable weatherDataList={weatherDataList} />
        </div>
      ) : (
        <p>There is no weather information yet.</p>
      )}
    </div>
  );
}

export default CityWeatherList;