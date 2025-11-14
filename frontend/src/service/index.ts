import { ErrorToast, SuccessToast } from "@/components/common/toast";
import { endPoints } from "@/data/env.data";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const MainApiInstance = (
  headers: AxiosRequestConfig["headers"]
): AxiosInstance => {
  const instance = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
    timeout: 100000,
    headers,
    withCredentials: true,
  });

  // ✅ Success Interceptor
  instance.interceptors.response.use(
    (response) => {
      // Show a toast for success responses (if it's a POST, PUT, DELETE request)
      if (["post", "patch", "delete"].includes(response.config.method || "")) {
        SuccessToast(response.data?.message);
      }
      return response;
    },

    // ❌ Error Interceptor
    (error: any) => {
      if (error.response?.data?.message) {
        ErrorToast(error.response?.data?.message);
      }
      return;
    }
  );

  let cachedCsrfToken: string | null = null;

  instance.interceptors.request.use(async (config) => {
    const method = config.method?.toLowerCase();
  
    // Only fetch CSRF token for unsafe HTTP methods
    const needsCsrf = ["post", "patch", "delete"].includes(method || "");
  
    if (needsCsrf && !cachedCsrfToken) {
      try {
        const csrfTokenRes = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}${endPoints?.csrf}`,
          { withCredentials: true }
        );
        cachedCsrfToken = csrfTokenRes.data.data;
      } catch (err) {
        console.error("Failed to fetch CSRF token:", err);
      }
    }
  
    if (needsCsrf && cachedCsrfToken) {
      config.headers["x-csrf-token"] = cachedCsrfToken;
    }
  
    return config;
  });

  return instance;
};

const main_url = MainApiInstance({
  "Content-Type": "application/json",
});

const photo_url = MainApiInstance({
  "Content-Type": "multipart/form-data",
});

export { main_url, photo_url };
