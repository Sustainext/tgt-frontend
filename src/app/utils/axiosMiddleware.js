import axios from "axios";
import Cookies from "js-cookie";

const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token")?.replace(/"/g, "");
  }
  return "";
};

const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_API_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = getAuthToken();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 403 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh")?.replace(/"/g, "");

        if (refreshToken) {
          const refreshTokenResponse = await axios.post(
            `${process.env.BACKEND_API_URL}/refresh_token/`,
            {
              refresh: refreshToken,
            }
          );

          const { access } = refreshTokenResponse?.data;

          localStorage.setItem("token", access);

          originalRequest.headers["Authorization"] = `Bearer ${access}`;
          return axiosInstance(originalRequest);
        } else {
          console.error("No refresh token available");
          // Dispatch the global event here
          if (typeof window !== "undefined") {
            Cookies.remove("token");
            const event = new CustomEvent("api-error", {
              detail: {
                redirectToLogin: true,
                message: "No refresh token available",
              },
            });
            window.dispatchEvent(event);
          }
          return Promise.reject(error);
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        // Dispatch the global event here
        if (typeof window !== "undefined") {
          Cookies.remove("token");
          const event = new CustomEvent("api-error", {
            detail: {
              redirectToLogin: true,
              message: "Token refresh failed",
            },
          });
          window.dispatchEvent(event);
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// HTTP methods
const put = async (url, data, config) => {
  return axiosInstance.put(url, data, config);
};

const patch = async (url, data, config) => {
  return axiosInstance.patch(url, data, config);
};

const post = async (url, data, config) => {
  return axiosInstance.post(url, data, config);
};

const del = async (url, config) => {
  return axiosInstance.delete(url, config);
};

const get = async (url, config) => {
  return axiosInstance.get(url, config);
};

export { put, patch, post, del, get };
export default axiosInstance;
