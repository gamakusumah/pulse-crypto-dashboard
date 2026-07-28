import { axiosInstance } from '@/services/axios/axiosInstance';
import { toApiError } from '@/services/axios/errorHandler';

/**
 * Registers request/response interceptors on the shared instance.
 * Called once from the app bootstrap (see `main.tsx`).
 */
export function setupInterceptors(): void {
  axiosInstance.interceptors.request.use(
    (config) => config,
    (error: unknown) => Promise.reject(toApiError(error)),
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error: unknown) => Promise.reject(toApiError(error)),
  );
}
