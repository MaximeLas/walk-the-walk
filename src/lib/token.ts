/**
 * Token generation and hashing utilities for magic links
 *
 * Security model:
 * - Generate high-entropy random tokens (32 bytes = 256 bits)
 * - Store only SHA-256 hash in database
 * - Compare hashes for verification (constant-time comparison)
 * - Never store or log plaintext tokens
 */

import { createHash, randomBytes, timingSafeEqual } from 'crypto';

/**
 * Generate a cryptographically secure random token
 * Returns URL-safe base64 string (43 characters for 32 bytes)
 *
 * @param byteLength - Number of random bytes (default: 32)
 * @returns URL-safe base64-encoded token
 */
export function generateToken(byteLength: number = 32): string {
  const buffer = randomBytes(byteLength);
  // Convert to URL-safe base64 (replace +/= with -_~ for URLs)
  return buffer
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '~');
}

/**
 * Hash a token using SHA-256
 * Returns hex-encoded hash for database storage
 *
 * @param token - Plaintext token to hash
 * @returns Hex-encoded SHA-256 hash
 */
export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

/**
 * Verify a token against a stored hash using constant-time comparison
 * Prevents timing attacks
 *
 * @param token - Plaintext token to verify
 * @param storedHash - Hex-encoded hash from database
 * @returns true if token matches hash
 */
export function verifyToken(token: string, storedHash: string): boolean {
  const computedHash = hashToken(token);

  // Ensure both strings are same length for timing-safe comparison
  if (computedHash.length !== storedHash.length) {
    return false;
  }

  try {
    return timingSafeEqual(
      Buffer.from(computedHash, 'hex'),
      Buffer.from(storedHash, 'hex')
    );
  } catch {
    // If buffers are invalid, return false
    return false;
  }
}

/**
 * Generate a token and return both the plaintext and hash
 * Convenience function for creating magic links
 *
 * @returns Object with plaintext token and its hash
 */
export function generateTokenPair(): { token: string; hash: string } {
  const token = generateToken();
  const hash = hashToken(token);
  return { token, hash };
}
