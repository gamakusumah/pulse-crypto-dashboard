import axios from 'axios';
import { API_CONFIG } from '@/constants/api';

/**
 * Single Axios instance shared by every API module. Keep this file
 * limited to instance creation only — interceptors and error mapping
 * live in their own modules so each concern stays testable in
 * isolation.
 */
export const axiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT_MS,
  headers: {
    Accept: 'application/json',
  },
});
