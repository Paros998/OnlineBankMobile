import axios from "axios";

export const initAxios = () => {
  axios.defaults.baseURL = 'https://pip-backend-server.herokuapp.com'
}