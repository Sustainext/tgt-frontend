

import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.BACKEND_API_URL,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')?.replace(/"/g, "")}`,
    }
});

// Add a response interceptor to handle 403 errors
axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshTokenResponse = await axios.post(`${process.env.BACKEND_API_URL}/refresh-token`, {
                    refresh: localStorage.getItem('refreshToken'),
                });

                const { accessToken } = refreshTokenResponse.data;
                localStorage.setItem('accessToken', accessToken);

                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
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
    return axiosInstance.put(url, data, { ...config, headers: { ...config?.headers, 'Authorization': `Bearer ${localStorage.getItem('token')?.replace(/"/g, "")}` } });
};

const patch = async (url, data, config) => {
    return axiosInstance.patch(url, data, { ...config, headers: { ...config?.headers, 'Authorization': `Bearer ${localStorage.getItem('token')?.replace(/"/g, "")}` } });
};

const post = async (url, data, config) => {
    return axiosInstance.post(url, data, { ...config, headers: { ...config?.headers, 'Authorization': `Bearer ${localStorage.getItem('token')?.replace(/"/g, "")}` } });
};

export { put, patch, post };
export default axiosInstance;

