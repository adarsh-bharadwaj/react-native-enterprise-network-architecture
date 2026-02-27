/**
 * ------------------------------------------------------------------
 * TRANSPORT LAYER (NETWORK BOUNDARY)
 * ------------------------------------------------------------------
 *
 * Responsibilities:
 * - Base URL configuration
 * - Request/response interceptors
 * - Correlation IDs
 * - Performance timing
 * - Logging
 *
 * 🔒 SSL PINNING INTEGRATION POINT
 * ------------------------------------------------------------------
 * If ENABLE_SSL_PINNING === true (see src/config/env.ts),
 * REPLACE axios transport implementation here with:
 *
 *   import { fetch } from 'react-native-ssl-pinning';
 *
 * Example:
 *
 *   if (config.ENABLE_SSL_PINNING) {
 *     // Use pinned SSL fetch transport
 *   }
 *
 * ⚠ CRITICAL RULE:
 * SSL pinning logic MUST exist only inside this file.
 * Do NOT leak SSL handling into:
 *   - Services
 *   - Hooks
 *   - Orchestrator
 *   - Business logic
 *
 * Transport layer must remain the single source of truth
 * for network implementation details.
 * ------------------------------------------------------------------
 */

import axios from 'axios';
import config from '../../config/env';
import { logger } from '../monitoring/logger';
import { v4 as uuidv4 } from 'uuid';

export const axiosClient = axios.create({
  baseURL: config.BASE_URL,
  timeout: 15000,
});

/**
 * REQUEST INTERCEPTOR
 * Adds:
 * - Correlation ID
 * - Request timing metadata
 */
axiosClient.interceptors.request.use(request => {
  request.headers['x-correlation-id'] = uuidv4();
  (request as any).metadata = { start: Date.now() };
  return request;
});

/**
 * RESPONSE INTERCEPTOR
 * Adds:
 * - Duration logging
 * - Structured error logging
 */
axiosClient.interceptors.response.use(
  response => {
    const duration =
      Date.now() - (response.config as any).metadata.start;

    logger.info('API_SUCCESS', {
      url: response.config.url,
      duration,
    });

    return response;
  },
  error => {
    logger.error('API_ERROR', {
      url: error.config?.url,
      error: error.message,
    });

    return Promise.reject(error);
  }
);