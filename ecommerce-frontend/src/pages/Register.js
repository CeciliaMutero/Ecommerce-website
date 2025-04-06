import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send registration request to your Django backend
    axios
      .post('http://127.0.0.1:8000/api/register/', {
        username,
        email,
        password,
      })
      .then((response) => {
        // If registration is successful, save the token (for example, to localStorage)
        localStorage.setItem('accessToken', response.data.access);
        // Navigate to the home page (or any other page)
        navigate('/');
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          const data = error.response.data;
          // Convert {username: [...], email: [...]} into a readable message
          const messages = Object.values(data).flat().join(' ');
          setError(messages || 'Registration failed. Please try again.');
        } else {
          setError('Registration failed. Please try again.');
        }
      });
  };

  return (
    <div className='register-container'>
      <h2>Register</h2>
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
          <label>Email:</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <button type='submit'>Register</button>
      </form>
    </div>
  );
}

export default Register;
