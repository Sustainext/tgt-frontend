import axios from 'axios';

const getAuthToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('token')?.replace(/"/g, "");
    }
    return '';
};

const axiosInstance = axios.create({
    baseURL: process.env.BACKEND_API_URL,
});

// Add a request interceptor to include the token in the headers
axiosInstance.interceptors.request.use(
    async (config) => {
        const token = getAuthToken();

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor to handle 403 errors
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refresh')?.replace(/"/g, "");

                if (refreshToken) {
                    const refreshTokenResponse = await axios.post(`${process.env.BACKEND_API_URL}/refresh_token/`, {
                        refresh: refreshToken,
                    });

                    const { access } = refreshTokenResponse.key;
                    localStorage.setItem('token', access);

                    originalRequest.headers['Authorization'] = `Bearer ${access}`;
                    return axiosInstance(originalRequest);
                } else {
                    // Handle the case where the refresh token is missing
                    console.error('No refresh token available');
                    // Optionally handle missing refresh token (e.g., redirect to login)
                    // router.push('/')
                }
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                // Optionally handle token refresh failure (e.g., redirect to login)
                // router.push('/')
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

const put = async (url, data, config) => {
    return axiosInstance.put(url, data, config);
};

const patch = async (url, data, config) => {
    return axiosInstance.patch(url, data, config);
};

const post = async (url, data, config) => {
    return axiosInstance.post(url, data, config);
};

const del = async (url, data, config) => {
    return axiosInstance.delete(url, data, config);
};

export { put, patch, post, del };
export default axiosInstance;




