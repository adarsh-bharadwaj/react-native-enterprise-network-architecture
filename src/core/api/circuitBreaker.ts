/**
 * ENTERPRISE CIRCUIT BREAKER
 *
 * States:
 * - CLOSED (normal operation)
 * - OPEN (block traffic)
 * - HALF_OPEN (test request)
 */

enum State {
  CLOSED = 'CLOSED',
  OPEN = 'OPEN',
  HALF_OPEN = 'HALF_OPEN',
}

class CircuitBreaker {
  private state: State = State.CLOSED;
  private failures = 0;
  private threshold = 5;
  private timeout = 10000;

  async execute(task: () => Promise<any>) {
    if (this.state === State.OPEN) {
      throw new Error('Circuit OPEN');
    }

    if (this.state === State.HALF_OPEN) {
      return this.testRequest(task);
    }

    return this.run(task);
  }

  private async run(task: () => Promise<any>) {
    try {
      const result = await task();
      this.failures = 0;
      return result;
    } catch (error) {
      this.failures++;
      if (this.failures >= this.threshold) {
        this.trip();
      }
      throw error;
    }
  }

  private async testRequest(task: () => Promise<any>) {
    try {
      const result = await task();
      this.reset();
      return result;
    } catch {
      this.trip();
      throw new Error('Circuit failed in HALF_OPEN');
    }
  }

  private trip() {
    this.state = State.OPEN;

    setTimeout(() => {
      this.state = State.HALF_OPEN;
    }, this.timeout);
  }

  private reset() {
    this.state = State.CLOSED;
    this.failures = 0;
  }

  getState() {
    return this.state;
  }
}

export const circuitBreaker = new CircuitBreaker();