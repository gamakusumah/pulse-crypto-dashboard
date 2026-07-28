import { isAxiosError } from 'axios';

/**
 * Normalized error shape every API module and hook can rely on,
 * regardless of whether the failure came from the network, the
 * server, or an unexpected runtime error. Extends `Error` so it can
 * be used as a rejection reason directly (stack traces, `instanceof
 * Error` checks, etc. all keep working).
 */
export class ApiError extends Error {
  status: number | null;
  code: string | null;

  constructor(message: string, status: number | null = null, code: string | null = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

export function toApiError(error: unknown): ApiError {
  if (isAxiosError(error)) {
    if (error.response) {
      return new ApiError(
        extractServerMessage(error.response.data) ?? error.message,
        error.response.status,
        error.code ?? null,
      );
    }

    if (error.request) {
      return new ApiError(
        'Tidak dapat menghubungi server. Periksa koneksi internet Anda.',
        null,
        error.code ?? 'NETWORK_ERROR',
      );
    }

    return new ApiError(error.message, null, error.code ?? null);
  }

  if (error instanceof Error) {
    return new ApiError(error.message, null, null);
  }

  return new ApiError('Terjadi kesalahan yang tidak diketahui.', null, null);
}

function extractServerMessage(data: unknown): string | null {
  if (data && typeof data === 'object' && 'error' in data) {
    const value = (data as Record<string, unknown>).error;
    if (typeof value === 'string') return value;
    if (value && typeof value === 'object' && 'status' in value) {
      const status = (value as Record<string, unknown>).status;
      if (status && typeof status === 'object' && 'error_message' in status) {
        const message = (status as Record<string, unknown>).error_message;
        if (typeof message === 'string') return message;
      }
    }
  }
  return null;
}
