import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './index.css';
import LoginForm from './Components/LoginForm';
import UserInfo from './Components/UserInfo';
import SignUp from './Components/SignUp';
const API_URL = 'https://dummyjson.com/auth';

const App = () => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') || '');

  useEffect(() => {
    const interval = setInterval(() => {
      if (refreshToken) {
        refreshAccessToken();
      }
    }, 14 * 60 * 1000);

    return () => clearInterval(interval);
  }, [refreshToken]);

  const handleLogin = (token, refreshToken) => {
    setAccessToken(token);
    setRefreshToken(refreshToken);
    localStorage.setItem('accessToken', token);
    localStorage.setItem('refreshToken', refreshToken);
  };

  const refreshAccessToken = async () => {
    try {
      const response = await fetch(`${API_URL}/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          refreshToken,
          expiresInMins: 30
        })
      });
      const data = await response.json();
      setAccessToken(data.token);
      localStorage.setItem('accessToken', data.token);
    } catch (error) {
      console.error('Token refresh failed', error);
    }
  };

  const handleLogout = () => {
    setAccessToken('');
    setRefreshToken('');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  return (
      <Router>
        <Routes>
          <Route
              path="/login"
              element={
                accessToken ? (
                    <Navigate to="/user-info" />
                ) : (
                    <LoginForm onLogin={handleLogin} />
                )
              }
          />
          <Route
              path="/user-info"
              element={
                accessToken ? (
                    <UserInfo onLogout={handleLogout} />
                ) : (
                    <Navigate to="/login" />
                )
              }
          />
          <Route
              path="*"
              element={<Navigate to="/login" />}
          />
          <Route
                path="/sign-up"
                element={ <SignUp/> }
                />
        </Routes>
      </Router>
  );
};

export default App;
