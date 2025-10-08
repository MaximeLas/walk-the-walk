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
