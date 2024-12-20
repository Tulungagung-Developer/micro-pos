import Axios from 'axios';

export const http = Axios.create({
  timeout: 20 * 1000,
  baseURL: import.meta.env.VITE_BASE_URL,
});
