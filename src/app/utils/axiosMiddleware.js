
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.BACKEND_API_URL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')?.replace(/"/g, "");
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle 403 errors
axiosInstance.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshTokenResponse = await axios.post(`${process.env.BACKEND_API_URL}/refresh-token`, {
                    refresh: localStorage.getItem('refresh'),
                });

                const { access } = refreshTokenResponse.data;
                localStorage.setItem('token', access);

                originalRequest.headers['Authorization'] = `Bearer ${access}`;
                return axiosInstance(originalRequest);
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

export { put, patch, post };
export default axiosInstance;


