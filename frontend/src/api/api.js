import axios from "axios";

const BASE_PATH = "http://localhost:8080";

export const API = axios.create({
    baseURL: BASE_PATH
});

// Automatically attach JWT token to every request
API.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);