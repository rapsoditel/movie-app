import axios from "axios";

const API_KEY = "1f61534a2a8512a6b785d9d4da975366";
const BASE_URL = "https://api.themoviedb.org/3";

export const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
});
