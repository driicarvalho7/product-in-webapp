import axios from "axios";
import { API_MAIN_URL } from "../utils/envConfigs";

const url = API_MAIN_URL;

const apiClient = axios.create({
  baseURL: `${url}/api/v0`,
  timeout: 1000000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
