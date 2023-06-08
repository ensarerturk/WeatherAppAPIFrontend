import React, { useState, useEffect } from 'react';
import '../style/FormContainer.css';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage('');
      setSuccessMessage('');
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [errorMessage, successMessage]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username === '' || password === '') {
      setErrorMessage('Username and password fields cannot be left blank.');
      return;
    }

    const user = {
      username: username,
      password: password
    };

    fetch('http://localhost:8080/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        if (response.ok) {
          // Registration Successful
          return response.json();
        } else if (response.status === 409) {
          // ThisUserAlreadyExistsException error
          throw new Error('This user already exists');
        } else {
          // Other error
          throw new Error('Registration failed');
        }
      })
      .then(data => {
        console.log('Registration Successful:', data);
        setSuccessMessage('Registration completed successfully.');
        setUsername('');
        setPassword('');
      })
      .catch(error => {
        console.error('Registration error:', error.message);
        setErrorMessage(error.message);
      });
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2>Register</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      <label>
        User Name:
        <input className="input-field" type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input className="input-field" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <br />
      <button className="submit-button" type="submit">Register</button>
    </form>
  );
}

export default RegisterForm;