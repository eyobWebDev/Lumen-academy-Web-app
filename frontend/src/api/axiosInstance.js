import axios from "axios"

export const Axios = axios.create({
    baseURL: import.meta.env.MODE == "development" ? "http://localhost:5001" : "" /*TODO: add the deployed backend url*/,
    withCredentials: true
})