import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { URL_HOST, URL_HOSTING } from "../config";
import { getRepository } from "typeorm";
import { User } from "../entitys/User";
import { Debug } from "./Debug";
import { win } from "..";

/**
 * @description valores por defecto que tendra axios
 * @param baseURL
 * @param Authorization
 */
export const setValues = async (
  baseURL: string = URL_HOST || URL_HOSTING,
  timeout: number = 10000,
  Authorization?: string
) => {
  axios.defaults.baseURL = baseURL.trim();
  axios.defaults.timeout = timeout;
  axios.defaults.headers.post["Content-Type"] = "application/json";

  const user: any = await User.getToken();
  axios.defaults.headers.common["Authorization"] = user ? user.token : null;

  axios.interceptors.request.use(
    async function(config: AxiosRequestConfig) {
      const user: any = await User.getToken();

      if (user) {
        config.headers.Authorization = user.token;
      }

      return config;
    },
    function(err) {
      //Debug("axiosDefaultValues", "setValues", err, null, "ERROR");
      return Promise.reject(err);
    }
  );

  axios.interceptors.response.use(
    async function(response: AxiosResponse) {
      const { headers } = response;

      if (headers.token) {
        await getRepository(User).update(
          { authenticated: true },
          { token: headers.token }
        );
      }

      return response;
    },
    async function(err) {
      const { data, status } = err.response;
      
      if (status === 401) {
        await getRepository(User).update(
          { authenticated: true },
          { authenticated: false }
        );
        
        if (!await getRepository(User).findOne({ authenticated: true }))
          win.webContents.send("Authorization", status);
      }
      return Promise.reject(err);
    }
  );
};
