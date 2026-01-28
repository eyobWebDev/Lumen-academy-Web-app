import axios from "axios"

export const Axios = axios.create({
    baseURL: import.meta.env.MODE == "development" ? "http://localhost:5001" : "https://lumen-academy-web-app.onrender.com",
    withCredentials: true
})