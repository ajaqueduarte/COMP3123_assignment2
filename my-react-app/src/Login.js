// src/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8089/api/v1/user/login', {
        username,
        password,
      });
      console.log(response.data);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-form">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default Login;
