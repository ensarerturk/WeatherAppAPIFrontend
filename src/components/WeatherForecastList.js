import React, { useState } from 'react';
import WeatherForecastTable from '../table/WeatherForecastListTable';
import '../style/WeatherForecastList.css';

function WeatherForecastList() {
  const [username, setUsername] = useState('');
  const [forecastData, setForecastData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!username) {
      setErrorMessage('Lütfen kullanıcı adını girin.');
      return;
    }

    // Send request to get weather forecast data from API
    fetch(`http://localhost:8080/api/cities/${username}/query-weather-forecasts`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Weather forecast information could not be retrieved.');
        }
      })
      .then(data => {
        setForecastData(data);
        setErrorMessage('');
      })
      .catch(error => {
        console.error('Error getting weather forecast information:', error);
        setForecastData([]);
        setErrorMessage('Something went wrong. Please try again.');
      });
  };

  const handleClearButtonClick = () => {
    setUsername('');
    setForecastData([]);
    setErrorMessage('');
  };

  return (
    <div className="weather-forecast-list">
      <h2>User's Weather Forecast Information</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          User Name:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <div className="button-container">
          <button type="submit">Get Weather Forecasts</button>
          <button type="button" onClick={handleClearButtonClick}>Clear</button>
        </div>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {forecastData.length > 0 ? (
        <div className="scrollable-container">
          <WeatherForecastTable forecastData={forecastData} />
        </div>
      ) : (
        <p>There is no weather forecast information yet.</p>
      )}
    </div>
  );
}

export default WeatherForecastList;