/**
 * ENTERPRISE RATE LIMITER
 *
 * Prevents request bursts.
 * Ensures controlled concurrency.
 * FIFO queue execution.
 *
 * Protects against:
 * - Infinite scroll flooding
 * - Rapid button taps
 * - Retry storms
 */

type Task<T> = () => Promise<T>;

class RateLimiter {
  private queue: Array<() => void> = [];
  private activeCount = 0;

  // Max parallel requests
  private readonly maxConcurrency = 5;

  async schedule<T>(task: Task<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      const run = async () => {
        this.activeCount++;

        try {
          const result = await task();
          resolve(result);
        } catch (err) {
          reject(err);
        } finally {
          this.activeCount--;
          this.next();
        }
      };

      this.queue.push(run);
      this.next();
    });
  }

  private next() {
    if (
      this.activeCount >= this.maxConcurrency ||
      this.queue.length === 0
    ) {
      return;
    }

    const task = this.queue.shift();
    task?.();
  }

  getQueueSize() {
    return this.queue.length;
  }

  getActiveCount() {
    return this.activeCount;
  }
}

export const rateLimiter = new RateLimiter();