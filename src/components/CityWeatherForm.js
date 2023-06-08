import React, { useState } from 'react';
import '../style/CityWeatherForm.css';

function CityWeatherForm() {
  const [cityName, setCityName] = useState('');
  const [username, setUsername] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // You can do the necessary verifications before sending the request
    if (!cityName || !username || !apiKey) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    // Send request to get weather info from API
    fetch(`http://localhost:8080/api/cities/${cityName}/weather?username=${username}&apiKey=${apiKey}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Weather information could not be retrieved.');
        }
      })
      .then(data => {
        setWeatherData(data);
        setErrorMessage('');
        setCityName(''); // Clear city name input
        setUsername(''); // Clear username input
        setApiKey(''); // Clear API Key entry
      })
      .catch(error => {
        console.error('Hava durumu bilgisi alma hatası:', error);
        setWeatherData(null);
        setErrorMessage('Bir hata oluştu. Lütfen tekrar deneyin.');
      });
  };

  const handleClear = () => {
    setWeatherData(null);
  };

  return (
    <div className="form-wrapper city-weather-form">
      <h2>Get Weather Info</h2>
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
          <button type="submit">Get Weather Info</button>
          <button type="button" onClick={handleClear}>Clear</button>
        </div>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {weatherData && (
        <div className="weather-data">
          <p>City Name: {weatherData.cityName}</p>
          <p>Weather Time: {weatherData.weatherTime}</p>
          <p>Temperature: {weatherData.temperature}</p>
        </div>
      )}
    </div>
  );
}

export default CityWeatherForm;