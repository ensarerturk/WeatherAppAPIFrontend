import React, { useState } from 'react';
import '../style/FormContainer.css';
import '../style/WeatherForecastForm.css';
import WeatherForecastTable from '../table/WeatherForecastTable';

function WeatherForecastForm() {
  const [cityName, setCityName] = useState('');
  const [username, setUsername] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [forecastData, setForecastData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // CityName, username, password validations before sending requests
    if (!cityName || !username || !apiKey) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    // Send request to get weather forecast information from API
    fetch(`http://localhost:8080/api/cities/${cityName}/weather-forecast?username=${username}&apiKey=${apiKey}`)
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

  const handleClear = () => {
    setCityName('');
    setUsername('');
    setApiKey('');
    setForecastData([]);
    setErrorMessage('');
  };

  return (
    <div className="weather-forecast-form">
      <h2>Get Weather Forecast Information</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          City Name:
          <input type="text" value={cityName} onChange={e => setCityName(e.target.value)} />
        </label>
        <br />
        <label>
          User Name:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          API Key:
          <input type="text" value={apiKey} onChange={e => setApiKey(e.target.value)} />
        </label>
        <br />
        <div className="button-container">
          <button type="submit">Get Weather Forecast</button> 
          <button type="button" onClick={handleClear}>Clear</button>
        </div>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {forecastData.length > 0 ? (
        <WeatherForecastTable forecastData={forecastData} />
      ) : null}
    </div>
  );
}

export default WeatherForecastForm;