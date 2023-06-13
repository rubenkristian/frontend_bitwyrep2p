/**
 * this file used to interceptor http request using axios library
 */
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export const apiRequestInstance = axios.create({
  baseURL: '',// base url
  paramsSerializer: {
    encode: (param: any) => {
      try {
        if (param) {
          const rgx = /\[[0-9]*\]/gi;
          return String(param).replace(rgx, '[]');
        }
        return '';
      } catch (err) {
        console.log(err);
      }
    },
  },
  validateStatus: (status: number) => status >= 200 && status < 300,
});

apiRequestInstance.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
  const token = localStorage.getItem('JWT');

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiRequestInstance.interceptors.response.use(
  (res: AxiosResponse<any, any>) => res,
  (err: any) => {
    if (err.response.status === 401) {
      localStorage.removeItem('JWT');
      window.location.href = '/';
    }

    return Promise.reject(err);
  }
)