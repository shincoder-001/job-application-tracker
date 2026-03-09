import axios from "axios";

const API = axios.create({
  baseURL: "https://job-application-tracker-d5zf.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default API;