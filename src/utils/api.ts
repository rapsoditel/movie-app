import axios from "axios";

const API_KEY = import.meta.env.VITE_URL_API_KEY;
const BASE_URL = import.meta.env.VITE_URL_BASE_URL;

export const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
});
