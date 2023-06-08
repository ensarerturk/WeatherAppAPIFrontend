import React, { useState } from 'react';

const AdminLoginForm = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showDashboardButton, setShowDashboardButton] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const { message } = await response.json();

      if (response.ok) {
        // Admin login successful
        setErrorMessage('');
        setShowDashboardButton(true);
        onLoginSuccess();
      } else {
        // Admin login failed
        setErrorMessage(message);
        setShowDashboardButton(false);
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
      setShowDashboardButton(false);
    }
  };

  return (
    <div className="admin-login-form">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {showDashboardButton && <button onClick={() => setShowDashboardButton(false)}>Go to Admin Dashboard</button>}
    </div>
  );
};

export default AdminLoginForm;