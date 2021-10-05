import axios from "axios";
import UserToken from "./tokens";

export const api = axios.create({
    URL: "http://142.93.134.108:1111",
    headers: {
        "Content-Type": "application/json",
      },
})

api.interceptors.request.use(
    (config) => {
      const token = UserToken.getAccessToken();
      if (token) {
        config.headers["x-access-token"] = token; 
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const config = err.config;
  
      if (config.url !== "/login" && err.response) {
        if (err.response.status === 401 && !config._retry) {
          config._retry = true;
  
          try {
            const res = await api.post("/refreshtoken", {
              refreshToken: UserToken.getRefreshedToken(),
            });
  
            const { accessToken } = res.data;
            UserToken.updateAccessToken(accessToken);
  
            return api(config);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }
      return Promise.reject(err);
    }
  );
