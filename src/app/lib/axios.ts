import axios from "axios";

import { env } from "@/env";

export const httpClient = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
});

if (env.VITE_ENABLE_API_DELAY) {
  httpClient.interceptors.response.use(async (config) => {
    await new Promise((resolve) =>
      setTimeout(() => resolve(resolve), Math.round(Math.random() * 3000)),
    );

    return config;
  });
}
