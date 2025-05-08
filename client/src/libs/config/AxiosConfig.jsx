import axios from 'axios';
import { refreshToken } from '../../services/api/TokenService';

const BASE_URL = "http://localhost:5000/api";
export const authAxios = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
});

authAxios.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("token");
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)
authAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
        if(error.response && error.response?.status === 401){
            try{
                const refresh = await refreshToken();
                if(!refresh.token){
                    return Promise.reject(error);
                }
                localStorage.setItem('token', refresh?.token);
                const config = error.config;
                config.headers.Authorization = `Bearer ${refresh.token}`;
                return authAxios.request(config);
            }catch(error){
                return Promise.reject(error);
            }
        }
    }
);

export const publicAxios = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
});

publicAxios.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
)