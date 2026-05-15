import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({
    baseURL: API,
    timeout: 30000,
});

export const fetchWeather = () => api.get("/weather").then((r) => r.data);
export const fetchRooms = () => api.get("/rooms").then((r) => r.data);
export const fetchReviews = () => api.get("/reviews").then((r) => r.data);
export const createLead = (payload) =>
    api.post("/leads", payload).then((r) => r.data);
export const sendChat = (message, session_id) =>
    api.post("/chat", { message, session_id }).then((r) => r.data);
