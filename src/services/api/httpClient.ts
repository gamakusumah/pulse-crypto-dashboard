import { axiosInstance } from '@/services/axios';

/**
 * Feature `*.api.ts` files import `httpClient` from here instead of
 * reaching into `services/axios` directly. This indirection means the
 * underlying HTTP library could be swapped without touching feature
 * code.
 */
export const httpClient = axiosInstance;
