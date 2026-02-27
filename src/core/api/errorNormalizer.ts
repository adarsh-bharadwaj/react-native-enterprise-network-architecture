/**
 * ERROR NORMALIZATION
 *
 * Ensures UI receives consistent error format
 * regardless of backend response structure.
 */

export interface NormalizedError {
  message: string;
  status?: number;
  code?: string;
}

export const normalizeError = (error: any): NormalizedError => {
  return {
    message:
      error?.response?.data?.message ||
      error?.message ||
      'Unexpected error occurred',
    status: error?.response?.status,
    code: error?.code,
  };
};