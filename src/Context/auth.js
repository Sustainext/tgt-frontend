'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveToLocalStorage, removeFromLocalStorage, loadFromLocalStorage } from '../app/utils/storage';
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../app/utils/axiosMiddleware';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(loadFromLocalStorage('token'));
  const [userDetails, setUserDetails] = useState(loadFromLocalStorage('userData'));
  const router = useRouter();

  useEffect(() => {
    if (token) {
      fetchUserDetails(token).then(data => setUserDetails(data));
    }
  }, [token]);

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
        // Handle specific status codes
        if (response.status === 400) {
          throw new Error('Incorrect username or password');
        } else {
          throw new Error('Failed to login');
        }
      }

      const userData = await response.json();
      const receivedToken = userData.key.access;
      const refreshToken = userData.key.refresh;

      setToken(receivedToken);
      saveToLocalStorage('token', receivedToken);
      saveToLocalStorage('refresh',refreshToken)

      const isFirstLogin = userData.needs_password_reset;
      // const isFirstLogin = 1;
      if (isFirstLogin) {
        router.push('/reset-password');
        return;
      }
      router.push('/dashboard');

      // Fetch user details
      const userDetails = await fetchUserDetails(receivedToken);
      setUserDetails(userDetails);
      saveToLocalStorage('userData', userDetails);
      saveToLocalStorage('user_id', userDetails.user_detail[0].id);

    } catch (error) {
      console.error('Login error:', error);
      toast.error('Failed to login: ' + error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const fetchUserDetails = async (token) => {
    const backendUrl = process.env.BACKEND_API_URL;
    const userDetailsUrl = `${backendUrl}/user_org`;

    try {
      const response = await axiosInstance.get(userDetailsUrl, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Fetch user details error:', error);
      // router.replace('/');
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
      localStorage.clear();

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
