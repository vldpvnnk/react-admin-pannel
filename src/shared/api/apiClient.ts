import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'https://rest-test.machineheads.ru/',
});

api.interceptors.request.use(config => {
  const token = Cookies.get('access_token');
  if (token) config.headers!['Authorization'] = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    const status = error.response?.status;
    if (status === 401) {
      return handleRefresh(error);
    }
    return Promise.reject(error);
  }
);

async function handleRefresh(originalError: AxiosError): Promise<AxiosResponse> {
  try {
    const refresh = Cookies.get('refresh_token');
    if (!refresh) throw new Error('No refresh token');

    const resp = await api.post<{ access_token: string; refresh_token: string }>(
      '/auth/token-refresh',
      { refresh_token: refresh }
    );

    const data = resp.data;

    Cookies.set('access_token', data.access_token);
    Cookies.set('refresh_token', data.refresh_token);

    await fetch(`/api/set-token?access_token=${data.access_token}&refresh_token=${data.refresh_token}`);

    const config = originalError.config as AxiosRequestConfig;
    if (!config.headers) config.headers = {};
    config.headers['Authorization'] = `Bearer ${data.access_token}`;

    return api(config);
  } catch (e) {
    window.location.href = '/login';
    return Promise.reject(e);
  }
}

export default api;
