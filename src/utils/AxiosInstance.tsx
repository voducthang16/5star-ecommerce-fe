import axios, { AxiosRequestConfig } from 'axios';
import Config from '~/config';

const baseURL = Config.apiUrl;

const AxiosInstance = axios.create({
    baseURL: baseURL,
});

// Add a request interceptor
AxiosInstance.interceptors.request.use(
    function (request: AxiosRequestConfig<any> | any) {
        // Do something before request is sent
        request.headers['Authorization'] = `Bearer ${getLocalAccessToken()}`;
        return request;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);

// Add a response interceptor
AxiosInstance.interceptors.response.use(
    async function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data

        return response && response.data ? response.data : response;
    },
    async function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        const urlRefreshToken = error.config.url.split('/')[4];
        const { statusCode, message } = error.response.data;
        // GET API CALL REFRESHTOKEN

        if (statusCode === 401 && message === 'Unauthorized') {
            if (urlRefreshToken === 'resettoken') {
                return;
            } else {
                const accessToken = await refreshToken();
                //TOKEN EXPIRED
                if (accessToken) {
                    const config: AxiosRequestConfig<any> | any = error.config;
                    //SET HEADERS ACCESS TOKEN NEW
                    config.headers['Authorization'] = `Bearer ${accessToken}`;
                    // SET CLIENT ACCESS TOKEN NEW
                    localStorage.setItem('access_token', accessToken);
                    return AxiosInstance(config);
                }
            }
        }
        return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
    },
);

const refreshToken = async () => {
    const resAccess: any = await AxiosInstance.post(Config.apiUrl + 'auth/resettoken');
    let accessToken = null;
    if (resAccess.statusCode === 200) {
        accessToken = resAccess.data.accessToken;
    }
    return accessToken;
};

const getLocalAccessToken = () => {
    return localStorage.getItem('access_token') ? localStorage.getItem('access_token') : null;
};

export default AxiosInstance;
