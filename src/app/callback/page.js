"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { saveToLocalStorage } from "../utils/storage";
import axios from "axios";
import { BsArrowLeft } from "react-icons/bs";
import Cookies from "js-cookie";

/**
 * Background Keycloak Logout (by hidden iframe)
 */

export default function Callback() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const [newtoken, setNewtoken] = useState();
  const router = useRouter();
  const validationComplete = useRef(false);

  const fetchUserOrg = async (token) => {
    try {
      const response = await axios.get(
        `${process.env.BACKEND_API_URL}/user_org`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Remove the logout/redirect from here!
      // (Your logic pushed here was not needed. Only handle on error or explicit logout, not here.)
      return response.data;
    } catch (error) {
      console.error("Error fetching user_org:", error);
      throw error;
    }
  };

  useEffect(() => {
    const processBackendLogin = async (idToken) => {
      try {
        const formData = new FormData();
        formData.append("id_token", idToken);

        // First get the token from auth0-login
        const response = await axios({
          method: "post",
          url: `${process.env.BACKEND_API_URL}/api/auth/auth0-login/`,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        });

        const userData = response.data;
        const accessToken = userData.key.access;

        // Store authentication data
        saveToLocalStorage("token", accessToken);
        saveToLocalStorage("refresh", userData.key.refresh);
        saveToLocalStorage("client_key", userData.client_key);
        saveToLocalStorage("permissions", userData.permissions);
        saveToLocalStorage("custom_role", userData.admin);

        // Set Cookies
        Cookies.set("token", JSON.stringify(accessToken), {
          secure: true,
          sameSite: "strict",
        });
        Cookies.set("permissions", JSON.stringify(userData.permissions), {
          secure: true,
          sameSite: "strict",
        });
        Cookies.set("isAdmin", JSON.stringify(userData.admin), {
          secure: true,
          sameSite: "strict",
        });
   
        try {
          const userOrgData = await fetchUserOrg(accessToken);
          saveToLocalStorage("userData", userOrgData);

          if (userOrgData.user_detail && userOrgData.user_detail.length > 0) {
            const userDetail = userOrgData.user_detail[0];
            saveToLocalStorage("user_id", userDetail.id);
            saveToLocalStorage(
              "userName",
              `${userDetail.first_name} ${userDetail.last_name}`
            );
            saveToLocalStorage("userEmail", userDetail.email);
          }
        } catch (userOrgError) {
          console.error("Error in user_org fetch:", userOrgError);
          setError("Failed to fetch user details. Please try again.");
          setLoading(false);
          return;
        }

        // Handle password reset if needed
        if (userData.needs_password_reset) {
          router.push("/reset-password");
          return;
        }

        router.push("/dashboard");
      } catch (err) {
        console.error("Backend login error:", err);
        setError("Failed to complete login. Please try again.");
        setLoading(false);
      }
    };

    const validateAndLogin = async () => {
      // Check if validation has already been completed
      if (validationComplete.current) {
        return;
      }

      const code = searchParams.get("code");
      if (!code) {
        setError("No authentication code found");
        setLoading(false);
        return;
      }

      try {
        // Mark validation as complete before making the request
        validationComplete.current = true;

        const response = await fetch(
          `/api/auth/validate-callback?code=${code}`
        );
        const data = await response.json();
        // console.log("Authentication response:", data);

        if (!data || !data.tokens.id_token) {
          throw new Error("Invalid authentication response");
        }
        setNewtoken(data.tokens.id_token);
        localStorage.setItem("sso_token", data.tokens.id_token);
        await processBackendLogin(data.tokens.id_token);
      } catch (err) {
        console.error("Authentication error:", err);
        setError("Authentication failed. Please try again.");
        setLoading(false);
      }
    };

    validateAndLogin();
  }, [searchParams, router]);

  // When user manually wants to logout and return to login (e.g. error screen)
  const handleBackToLogin = () => {
 const ssoToken = typeof window !== 'undefined' ? localStorage.getItem("sso_token") : '';
  
    const postLogoutRedirect = encodeURIComponent(
      `${process.env.KEYCLOAK_BASE_URL}`
    );
    const logoutUrl = `${
      process.env.KEYCLOAK_LOGOUT_URl
    }?post_logout_redirect_uri=${postLogoutRedirect}${
      ssoToken ? `&id_token_hint=${ssoToken}` : ""
    }`;

  Cookies.remove("token");
  Cookies.remove("permissions");
  Cookies.remove("isAdmin");
  Cookies.remove("selected_framework_id");
  Cookies.remove("selected_brsr_framework_id");
  Cookies.remove("selected_disclosures");
  Cookies.remove("tcfd_sector");
  Cookies.remove("tcfd_sector_type");
  localStorage.clear();
    // Redirect outside the app to Keycloak
    window.location.href = logoutUrl;
  };
  if (loading) {
    return (
      <div
        className="min-h-[125vh] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://sustainextstorage1.blob.core.windows.net/sustainext-frontend-assets/Home/authbg.webp')",
        }}
      >
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">
              Processing your login...
            </h2>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="min-h-[125vh] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://sustainextstorage1.blob.core.windows.net/sustainext-frontend-assets/Home/authbg.webp')",
        }}
      >
        <div className="min-h-screen flex items-center justify-center">
          <div className="max-w-md w-full mx-4 bg-white rounded-lg shadow-md p-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-red-500">
                Authentication Failed
              </h2>
              <p className="mt-2 text-gray-600">{error}</p>
              <div className="flex justify-center">
                <button
                  onClick={handleBackToLogin}
                  className="mt-4 px-4 py-2 text-gray-700 rounded hover:text-black flex items-center justify-between"
                >
                  <BsArrowLeft className="mr-2" />
                  Back to Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-[125vh] bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://sustainextstorage1.blob.core.windows.net/sustainext-frontend-assets/Home/authbg.webp')",
      }}
    >
      <div className="min-h-[125vh] flex items-center justify-center">
        <div className="max-w-2xl w-full mx-4 bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold mb-6">Completing Login...</h1>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
