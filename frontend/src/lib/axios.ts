import { API_BASE_URL } from "@/config/env";
import axios from "axios";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const raw = localStorage.getItem("auth-storage");
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as { state?: { token?: string } };
      const token = parsed.state?.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {}
  }
  return config;
});
