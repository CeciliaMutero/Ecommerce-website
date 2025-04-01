import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send login request to your Django backend
    axios
      .post('http://127.0.0.1:8000/api/login/', { username, password })
      .then((response) => {
        // If login is successful, save the token (e.g., to localStorage)
        localStorage.setItem('accessToken', response.data.access);
        // Navigate to the home page (or another protected route)
        navigate('/');
      })
      .catch((error) => {
        setError('Invalid credentials. Please try again.');
        console.error('Error during login:', error);
      });
  };

  return (
    <div className='login-container'>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}

export default Login;
