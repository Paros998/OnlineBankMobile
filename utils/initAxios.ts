import axios from "axios";
import { getRawToken } from "./getRawToken";

export const initAxios = async () => {
  const token = await getRawToken();
  if (token) axios.defaults.headers.common['Authorization'] = token;
  axios.defaults.baseURL = 'https://pip-backend-server.herokuapp.com'
}
