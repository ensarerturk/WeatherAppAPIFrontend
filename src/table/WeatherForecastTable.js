import React from 'react';

function WeatherForecastTable({ forecastData }) {
  return (
    <div className="forecast-table-container">
      <table>
        <thead>
          <tr>
            <th>History</th>
            <th>Temperature</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {forecastData.map((forecast, index) => (
            <tr key={index}>
              <td>{forecast.forecastTime}</td>
              <td>{forecast.temperature}</td>
              <td>{forecast.cityName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WeatherForecastTable;