import axios from 'axios';
import { BASE_URL } from '../config/config';

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
