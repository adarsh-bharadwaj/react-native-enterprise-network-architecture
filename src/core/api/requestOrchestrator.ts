/**
 * MASTER REQUEST ORCHESTRATOR
 *
 * Responsibilities:
 * - Token refresh guard
 * - Rate limiting
 * - Circuit breaker
 * - Error normalization
 * - AbortController support
 */

import { axiosClient } from './axiosClient';
import { rateLimiter } from './rateLimitter';
import { circuitBreaker } from './circuitBreaker';
import { normalizeError } from './errorNormalizer';

export const requestOrchestrator = async (
  config: any,
  signal?: AbortSignal
) => {
  try {
    return await rateLimiter.schedule(() =>
      circuitBreaker.execute(() =>
        axiosClient({ ...config, signal })
      )
    );
  } catch (error) {
    throw normalizeError(error);
  }
};