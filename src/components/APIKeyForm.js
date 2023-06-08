import React, { useState, useEffect } from 'react';
import '../style/FormContainer.css';

function APIKeyForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage('');
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [errorMessage]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!username || !password) {
      setErrorMessage("Username and password fields cannot be left blank!");
      return
    }

    const user = {
      username: username,
      password: password
    };

    // Send HTTP POST request
    fetch('http://localhost:8080/api/users/api-key', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          setApiKey(data.data); // Get and update API Key
          setErrorMessage(''); // Clear error message
        } else {
          setApiKey(''); // Clear API key
          setErrorMessage(data.message); // update error message
        }
      })
      .catch(error => {
        console.error('Error getting API Key:', error);
        setApiKey('');
        setErrorMessage('Something went wrong. Please try again.'); // Show a generic error message
      });
  };

  return (
    <div className="api-key-form">
      <h2>Get API Key</h2>
      <form onSubmit={handleSubmit}>
        <label>
          User Name:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <br />
        <div className="button-group">
          <div className="button-container">
            <button type="submit">Get API Key</button>
            <button type="button" onClick={() => { setUsername(''); setPassword(''); }}>Clear</button>
          </div>
        </div>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message on screen */}
      {apiKey && <p className="api-key">API Key: {apiKey}</p>}
    </div>
  );
}

export default APIKeyForm;