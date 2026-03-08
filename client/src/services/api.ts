import axios from "axios";

const API = axios.create({
  baseURL: "https://job-application-tracker-d5zf.onrender.com",
});

export default API;