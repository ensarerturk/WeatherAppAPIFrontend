import React from 'react';

function WeatherTable({ weatherDataList }) {
  return (
    <div className="weather-table-container">
      <table>
        <thead>
          <tr>
            <th>City Name</th>
            <th>Weather Time</th>
            <th>Temperature</th>
          </tr>
        </thead>
        <tbody>
          {weatherDataList.map((weatherData, index) => (
            <tr key={index}>
              <td>{weatherData.cityName}</td>
              <td>{weatherData.weatherTime || 'Bilinmiyor'}</td>
              <td>{weatherData.temperature}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WeatherTable;