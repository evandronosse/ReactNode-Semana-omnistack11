
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.19.101:3333'
});
export default api;