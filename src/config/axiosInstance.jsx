import axios from "axios";

export let axiosInstance = axios.create({
  baseURL: "https://api.team-sync.space/api",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    let originalReq = error.config;

    if (error.response.status === 401 && !originalReq.retry) {
      originalReq.retry = true;

      try {
        await axiosInstance.get("/auth/get-accessToken");
        return axiosInstance(originalReq);
      } catch (error) {
        window.location.href = "/";
        return Promise.reject(error);
      }
    }
  }
);
