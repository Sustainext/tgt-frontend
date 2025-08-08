import axios from "axios";
import Cookies from "js-cookie";

const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return Cookies.get("token")?.replace(/"/g, "");
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
        const refreshToken = Cookies.get("refresh")?.replace(/"/g, "");

        if (refreshToken) {
          const refreshTokenResponse = await axios.post(
            `${process.env.BACKEND_API_URL}/refresh_token/`,
            {
              refresh: refreshToken,
            }
          );

          const { access } = refreshTokenResponse?.data;
          localStorage.setItem("token",access)
          Cookies.set("token", access);
          Cookies.set("token", access, { secure: true, sameSite: "strict" });
          originalRequest.headers["Authorization"] = `Bearer ${access}`;
          return axiosInstance(originalRequest);
        } else {
          console.error("No refresh token available");
          // Dispatch the global event here
          if (typeof window !== "undefined") {
            Cookies.remove("token");
            Cookies.remove("permissions");
            Cookies.remove("true");
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
            Cookies.remove("permissions");
            Cookies.remove("true");
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

 const post = async (url, data) => {
  try {
    const response = await axiosInstance.post(url, data);
    return response; // Ensure this returns the full response
  } catch (error) {
    console.error("POST Error:", error);
    throw error;
  }
};

 const patch = async (url, data) => {
  try {
    const response = await axiosInstance.patch(url, data);
    return response; // Return the response
  } catch (error) {
    console.error("PATCH Error:", error);
    throw error;
  }
};

 const del = async (url) => {
  try {
    const response = await axiosInstance.delete(url);
    return response; // Return the response
  } catch (error) {
    console.error("DELETE Error:", error);
    throw error;
  }
};


const get = async (url, config) => {
  return axiosInstance.get(url, config);
};

export { put, patch, post, del, get };
export default axiosInstance;
