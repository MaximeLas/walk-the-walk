/**
 * Test Mode Utilities
 *
 * Provides utilities for detecting test mode and adding timeouts to prevent
 * infinite hangs during automated testing with Chrome DevTools MCP.
 *
 * Usage:
 * - Add `?test=true` to URL to enable test mode
 * - Use `withTimeout()` to wrap async operations that may hang
 */

/**
 * Check if the application is running in test mode
 * Test mode is enabled by adding ?test=true to the URL
 */
export const isTestMode = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }
  return new URLSearchParams(window.location.search).get('test') === 'true';
};

/**
 * Default timeout values for different operations in test mode (in milliseconds)
 */
export const TEST_TIMEOUTS = {
  auth: 5000,      // Auth operations (session checks, sign in)
  api: 3000,       // API calls
  navigation: 2000 // Page navigation
} as const;

/**
 * Wraps a promise with a timeout in test mode
 * In production mode, returns the original promise unchanged
 *
 * @param promise - The promise to wrap
 * @param timeoutMs - Timeout in milliseconds
 * @param errorMessage - Optional custom error message
 * @returns Promise that rejects if timeout is exceeded in test mode
 */
export async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  errorMessage?: string
): Promise<T> {
  // In production mode, return promise unchanged
  if (!isTestMode()) {
    return promise;
  }

  // In test mode, add timeout
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(
        () => reject(new Error(errorMessage || `Operation timed out after ${timeoutMs}ms`)),
        timeoutMs
      )
    )
  ]);
}

/**
 * Logs a message only in test mode
 * Useful for debugging test runs without cluttering production logs
 *
 * @param message - Message to log
 * @param data - Optional data to log
 */
export function testLog(message: string, data?: any): void {
  if (isTestMode()) {
    console.log(`[TEST MODE] ${message}`, data || '');
  }
}

/**
 * Performance timer for measuring operation duration in test mode
 */
class TestTimer {
  private startTime: number;
  private label: string;

  constructor(label: string) {
    this.label = label;
    this.startTime = performance.now();
    if (isTestMode()) {
      console.log(`[TEST TIMER] 🚀 Started: ${label}`);
    }
  }

  /**
   * Stops the timer and logs the duration
   * @returns Duration in milliseconds
   */
  stop(): number {
    const duration = performance.now() - this.startTime;
    if (isTestMode()) {
      console.log(`[TEST TIMER] ✅ Completed: ${this.label} (${duration.toFixed(2)}ms)`);
    }
    return duration;
  }

  /**
   * Logs a checkpoint without stopping the timer
   * @param checkpoint - Checkpoint label
   */
  checkpoint(checkpoint: string): void {
    const elapsed = performance.now() - this.startTime;
    if (isTestMode()) {
      console.log(`[TEST TIMER] 📍 Checkpoint: ${this.label} - ${checkpoint} (${elapsed.toFixed(2)}ms elapsed)`);
    }
  }
}

/**
 * Creates a performance timer for measuring operation duration
 * Only logs in test mode, minimal overhead in production
 *
 * @param label - Label for this timer
 * @returns TestTimer instance
 *
 * @example
 * const timer = startTimer('Load Dashboard');
 * await fetchData();
 * timer.checkpoint('Data loaded');
 * await renderUI();
 * timer.stop(); // Logs total duration
 */
export function startTimer(label: string): TestTimer {
  return new TestTimer(label);
}

/**
 * Measures and logs the duration of an async operation
 *
 * @param label - Label for this operation
 * @param operation - Async function to measure
 * @returns Result of the operation
 *
 * @example
 * const data = await measureAsync('Fetch users', () => fetchUsers());
 */
export async function measureAsync<T>(
  label: string,
  operation: () => Promise<T>
): Promise<T> {
  const timer = startTimer(label);
  try {
    const result = await operation();
    timer.stop();
    return result;
  } catch (error) {
    const duration = timer.stop();
    if (isTestMode()) {
      console.error(`[TEST TIMER] ❌ Failed: ${label} (${duration.toFixed(2)}ms)`, error);
    }
    throw error;
  }
}

/**
 * Test metrics aggregator for collecting performance statistics
 */
class TestMetrics {
  private metrics: Map<string, number[]> = new Map();

  /**
   * Records a metric value
   */
  record(metric: string, value: number): void {
    if (!isTestMode()) return;

    if (!this.metrics.has(metric)) {
      this.metrics.set(metric, []);
    }
    this.metrics.get(metric)!.push(value);
  }

  /**
   * Gets statistics for a metric
   */
  getStats(metric: string): { count: number; avg: number; min: number; max: number; total: number } | null {
    const values = this.metrics.get(metric);
    if (!values || values.length === 0) return null;

    const total = values.reduce((sum, val) => sum + val, 0);
    const avg = total / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);

    return { count: values.length, avg, min, max, total };
  }

  /**
   * Prints all collected metrics
   */
  printSummary(): void {
    if (!isTestMode()) return;

    console.log('\n📊 [TEST METRICS SUMMARY]');
    console.log('========================');

    this.metrics.forEach((values, metric) => {
      const stats = this.getStats(metric);
      if (stats) {
        console.log(`\n${metric}:`);
        console.log(`  Count: ${stats.count}`);
        console.log(`  Avg: ${stats.avg.toFixed(2)}ms`);
        console.log(`  Min: ${stats.min.toFixed(2)}ms`);
        console.log(`  Max: ${stats.max.toFixed(2)}ms`);
        console.log(`  Total: ${stats.total.toFixed(2)}ms`);
      }
    });

    console.log('\n========================\n');
  }

  /**
   * Clears all metrics
   */
  clear(): void {
    this.metrics.clear();
  }
}

/**
 * Global test metrics instance
 * Use this to track performance across the application
 */
export const testMetrics = new TestMetrics();
