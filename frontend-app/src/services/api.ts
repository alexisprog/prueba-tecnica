/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import store from "store/index";

console.log(import.meta.env.VITE_API_BASE_URL);
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export const serverURL =
  import.meta.env.VITE_SERVER_BASE_URL || "http://localhost:4000";

class Api {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {},
    });

    // Agregar interceptores
    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.axiosInstance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const { user } = store.getState().user;
        if (user?.token && config?.headers) {
          config.headers["Authorization"] = `Bearer ${user.token}`;
        }
        return config;
      },
      (error) => {
        // Aquí puedes manejar errores relacionados con las solicitudes.
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        // Aquí puedes modificar las respuestas antes de que sean entregadas a tu código.
        // Por ejemplo, puedes realizar manipulaciones o validaciones adicionales.
        return response;
      },
      (error) => {
        // Aquí puedes manejar errores relacionados con las respuestas.
        return Promise.reject(error);
      }
    );
  }

  public get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance
      .get<T>(url, config)
      .then((response) => response.data);
  }

  public post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.axiosInstance
      .post<T>(url, data, config)
      .then((response) => response.data);
  }

  public put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.axiosInstance
      .put<T>(url, data, config)
      .then((response) => response.data);
  }

  public remove<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance
      .delete<T>(url, config)
      .then((response) => response.data);
  }
}

export default new Api(baseURL);
