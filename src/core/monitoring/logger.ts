/**
 * ENTERPRISE LOGGER
 *
 * Replace console logs with structured logging.
 * Can be connected to:
 * - Sentry
 * - Datadog
 * - NewRelic
 */

type LogLevel = 'info' | 'warn' | 'error';

class Logger {
  private log(level: LogLevel, message: string, meta?: any) {
    const payload = {
      timestamp: new Date().toISOString(),
      level,
      message,
      meta,
    };

    if (typeof console !== 'undefined' && typeof console[level] === 'function') {
      console[level](JSON.stringify(payload));
    }

    // 🔹 Integration point:
    // sendToSentry(payload);
    // sendToDatadog(payload);
  }

  info(message: string, meta?: any) {
    this.log('info', message, meta);
  }

  warn(message: string, meta?: any) {
    this.log('warn', message, meta);
  }

  error(message: string, meta?: any) {
    this.log('error', message, meta);
  }
}

export const logger = new Logger();