import React, { useState } from 'react';
import RegisterForm from './components/RegisterForm';
import APIKeyForm from './components/APIKeyForm';
import CityWeatherForm from './components/CityWeatherForm';
import WeatherForecastForm from './components/WeatherForecastForm';
import CityWeatherList from './components/CityWeatherList';
import WeatherForecastList from './components/WeatherForecastList';
import AdminLoginForm from './components/AdminLoginForm';
import './style/FormContainer.css';

const App = () => {
  const [activePage, setActivePage] = useState(null);

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const renderForm = () => {
    switch (activePage) {
      case 'register':
        return <RegisterForm onNext={() => handlePageChange('apiKey')} />;
      case 'apiKey':
        return <APIKeyForm onNext={() => handlePageChange('cityWeather')} />;
      case 'cityWeather':
        return <CityWeatherForm onNext={() => handlePageChange('weatherForecast')} />;
      case 'weatherForecast':
        return <WeatherForecastForm onNext={() => handlePageChange('cityWeatherList')} />;
      case 'cityWeatherList':
        return <CityWeatherList onNext={() => handlePageChange('weatherForecastList')} />;
      case 'weatherForecastList':
        return <WeatherForecastList onNext={() => handlePageChange('register')} />;
      case 'adminLogin':
        return <AdminLoginForm onLogin={() => handlePageChange('adminDashboard')} />;
      case 'adminDashboard':
        // Render the admin dashboard component
        break;
      default:
        return null;
    }
  };

  return (
    <div className="form-container">
      <div className="sidebar">
        <ul className="menu">
          <li className={activePage === 'register' ? 'active' : ''}>
            <button onClick={() => handlePageChange('register')}>Register</button>
          </li>
          <li className={activePage === 'apiKey' ? 'active' : ''}>
            <button onClick={() => handlePageChange('apiKey')}>API Key</button>
          </li>
          <li className={activePage === 'cityWeather' ? 'active' : ''}>
            <button onClick={() => handlePageChange('cityWeather')}>City Weather</button>
          </li>
          <li className={activePage === 'weatherForecast' ? 'active' : ''}>
            <button onClick={() => handlePageChange('weatherForecast')}>Weather Forecast</button>
          </li>
          <li className={activePage === 'cityWeatherList' ? 'active' : ''}>
            <button onClick={() => handlePageChange('cityWeatherList')}>City Weather List</button>
          </li>
          <li className={activePage === 'weatherForecastList' ? 'active' : ''}>
            <button onClick={() => handlePageChange('weatherForecastList')}>Weather Forecast List</button>
          </li>
          <li className={activePage === 'adminLogin' ? 'active' : ''}>
            <button onClick={() => handlePageChange('adminLogin')}>Admin Girişi</button>
          </li>
        </ul>
      </div>
      <div className="form-wrapper">
        {renderForm()}
      </div>
    </div>
  );
};

export default App;