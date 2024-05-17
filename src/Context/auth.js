'use client'
import React, { createContext, useContext, useState } from 'react';
import { saveToLocalStorage, removeFromLocalStorage } from '../app/utils/storage';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {  
  const [token, setToken] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  
  const login = async (username, password) => {
    const backendUrl = process.env.BACKEND_API_URL;
    const loginUrl = `${backendUrl}/api/auth/login/`;

    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to login');
      }

      const userData = await response.json();
      const receivedToken = userData.key.access;
      setToken(receivedToken);
      saveToLocalStorage('token', receivedToken);

      // Fetch user details
      const userDetails = await fetchUserDetails(receivedToken);
      setUserDetails(userDetails);

    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const fetchUserDetails = async (token) => {
    const backendUrl = process.env.BACKEND_API_URL;
    const userDetailsUrl = `${backendUrl}/user_org`;

    try {
      const response = await fetch(userDetailsUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch user details error:', error);
      return null;
    }
  };

  const logout = async () => {
    const backendUrl = process.env.BACKEND_API_URL;
    const logoutUrl = `${backendUrl}/api/auth/logout/`;

    try {
      const response = await fetch(logoutUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${localStorage.getItem('token').replace(/^"|"$/g, '')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to logout');
      }

      setToken(null);
      setUserDetails(null);
      removeFromLocalStorage('token');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ token, userDetails, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
