"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  saveToLocalStorage,
  removeFromLocalStorage,
  loadFromLocalStorage,
} from "../app/utils/storage";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../app/utils/axiosMiddleware";
import Cookies from "js-cookie";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(loadFromLocalStorage("token"));
  const [userDetails, setUserDetails] = useState(
    loadFromLocalStorage("userData")
  );
  const router = useRouter();

  // Environment-aware cookie configuration
  const getCookieOptions = () => {
    const isLocalhost = typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    
    return {
      secure: !isLocalhost, // false for localhost, true for production
      sameSite: isLocalhost ? "lax" : "strict" // lax for localhost, strict for production
    };
  };

  const setToken = (token) => {
    setTokenState(token);
    if (token) {
      Cookies.set("token", token, getCookieOptions()); // Set token in cookies
    } else {
      Cookies.remove("token"); // Remove token from cookies
    }
  };

  useEffect(() => {
    const cookieToken = Cookies.get("token");
    if (cookieToken && !token) {
      setToken(cookieToken); // Sync state with cookie if token is missing in state
    }

    if (token) {
      fetchUserDetails(token).then((data) => {
        setUserDetails(data);
        saveToLocalStorage("userData", data);
      });
    }
  }, [token]);
  useEffect(() => {
    if (token) {
      fetchUserDetails(token).then((data) => {
        setUserDetails(data);
        saveToLocalStorage(data);
      });
    }
  }, [token]);

  const login = async (username, password, remember_me) => {
    const backendUrl = process.env.BACKEND_API_URL;
    const loginUrl = `${backendUrl}/api/auth/login/`;

    try {
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, remember_me }),
      });

      const userData = await response.json();

      if (!response.ok) {
        throw new Error(userData.message);
      }

      const receivedToken = userData.key.access;
      const refreshToken = userData.key.refresh;
      const client_key = userData.client_key;
      const newrole = userData.admin;
      const customrole = userData.custom_role;
      const permissions = userData.permissions;
      setToken(receivedToken);
      saveToLocalStorage("token", receivedToken);
      saveToLocalStorage("refresh", refreshToken);
      saveToLocalStorage("client_key", client_key);
      saveToLocalStorage("permissions", permissions);
      saveToLocalStorage("custom_role", newrole);
      saveToLocalStorage("isAdmin", Boolean(newrole));
      saveToLocalStorage("textcustomrole", customrole);
      const cookieOptions = getCookieOptions();
      Cookies.set("permissions", JSON.stringify(permissions), cookieOptions);
      Cookies.set("refresh", JSON.stringify(refreshToken), cookieOptions);
      Cookies.set("isAdmin", JSON.stringify(newrole), cookieOptions);
      const isFirstLogin = userData.needs_password_reset;
      // const isFirstLogin = 1;
      if (isFirstLogin) {
        router.push("/reset-password");
        return;
      }
      router.push("/dashboard");

      // Fetch user details
      const userDetails = await fetchUserDetails(receivedToken);
      setUserDetails(userDetails);
      saveToLocalStorage("userData", userDetails);
      saveToLocalStorage("user_id", userDetails.user_detail[0].id);
      localStorage.setItem(
        "userName",
        userDetails.user_detail[0].first_name +
          " " +
          userDetails.user_detail[0].last_name
      );
      localStorage.setItem("userEmail", userDetails.user_detail[0].email);
      LoginlogDetails(
        userDetails.user_detail[0].email,
        userData.custom_role,
        "Success",
        receivedToken
      );
    } catch (error) {
      console.log(error, "error");
      console.error("Login error:", error);
      toast.error(error.message, {
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
  const getIPAddress = async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error("Error fetching IP address:", error);
      return null;
    }
  };

  const getDeviceDetails = () => {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    return `Device: ${platform}, Browser: ${userAgent}`;
  };
  const getLocation = async () => {
    try {
      // Fetch the IP-based location data
      const response = await fetch("https://ipwhois.app/json/");
      const data = await response.json();
      // Extract city, region (state), and country
      return `${data.city}, ${data.region}, ${data.country}`;
    } catch (error) {
      console.error("Error fetching location data:", error);
      return null;
    }
  };
  const LoginlogDetails = async (useremail, roles, loginstatus, token) => {
    const backendUrl = process.env.BACKEND_API_URL;
    const userDetailsUrl = `${backendUrl}/sustainapp/post_logs/`;

    try {
      const ipAddress = await getIPAddress();
      const deviceDetails = getDeviceDetails();
      const location = await getLocation();

      const data = {
        event_type: "Authentication",
        event_details: "Access",
        action_type: "Login",
        status: loginstatus,
        user_email: useremail,
        user_role: roles,
        ip_address: ipAddress,
        logs: `Device: ${deviceDetails}, Location: ${location}`,
      };
      saveToLocalStorage("ip_address", ipAddress);
      const response = await axiosInstance.post(userDetailsUrl, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error logging login details:", error);
      if (error.redirectToLogin) {
        router.push("/");
        localStorage.clear();
      }
      return null;
    }
  };
  const fetchUserDetails = async (token) => {
    const backendUrl = process.env.BACKEND_API_URL;
    const userDetailsUrl = `${backendUrl}/user_org`;

    try {
      const response = await axiosInstance.get(userDetailsUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Fetch user details error:", error);
      if (error.redirectToLogin) {
        router.push("/");
        localStorage.clear();
      }
      return null;
    }
  };
const logout = async () => {
  const backendUrl = process.env.BACKEND_API_URL;
  const logoutUrl = `${backendUrl}/api/auth/logout/`;

  try {
    // Get the SSO token *BEFORE* clearing storage
    const ssoToken = typeof window !== 'undefined' ? localStorage.getItem("sso_token") : '';

    // Optional: Log/logout event. You may want to POST to your logs API here!
    // await logLogoutDetails(someArg, ssoToken); // <-- Implement if needed

    // Invalidate backend session
    const response = await axiosInstance.post(logoutUrl);
    if (response.status !== 200) {
      throw new Error("Failed to logout");
    }
     const elfsightScript = document.querySelector(`script[src="https://static.elfsight.com/platform/platform.js"]`);
      if (elfsightScript) elfsightScript.parentNode.removeChild(elfsightScript);
      document.querySelectorAll('[class*="EmbedRoot__Root"]').forEach(node => node.remove());
    // Remove all cookies set by your application
    Cookies.remove("token");
    Cookies.remove("permissions");
    Cookies.remove("refresh");
    Cookies.remove("isAdmin");
    Cookies.remove("selected_framework_id");
    Cookies.remove("selected_brsr_framework_id");
    Cookies.remove("selected_disclosures");
    Cookies.remove("tcfd_sector");
    Cookies.remove("tcfd_sector_type");

    // Remove all localStorage items related to authentication
    localStorage.clear();

    setToken(null);
    setUserDetails(null);

   if (ssoToken && ssoToken.trim() !== '') {
   const postLogoutRedirect = encodeURIComponent(process.env.KEYCLOAK_BASE_URL);
    const keycloakLogoutURL = `${process.env.KEYCLOAK_LOGOUT_URl}?post_logout_redirect_uri=${postLogoutRedirect}${
      ssoToken ? `&id_token_hint=${ssoToken}` : ""
    }`;

    // Final redirect (end session)
    window.location.href = keycloakLogoutURL;
}
  

  } catch (error) {
    console.error("Logout error:", error);
  }
};

  return (
    <AuthContext.Provider value={{ token, userDetails, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
