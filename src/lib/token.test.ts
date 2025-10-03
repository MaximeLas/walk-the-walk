/**
 * Tests for token generation and hashing utilities
 * Tests security-critical functions per PROJECT_SPEC.md requirements
 */

import {
  generateToken,
  hashToken,
  verifyToken,
  generateTokenPair,
} from './token';

describe('Token Utilities', () => {
  describe('generateToken', () => {
    it('should generate a token of expected length', () => {
      const token = generateToken();
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      // 32 bytes in URL-safe base64 ≈ 43 characters
      expect(token.length).toBeGreaterThan(40);
    });

    it('should generate unique tokens on each call', () => {
      const token1 = generateToken();
      const token2 = generateToken();
      expect(token1).not.toBe(token2);
    });

    it('should generate URL-safe tokens (no + / =)', () => {
      const token = generateToken();
      expect(token).not.toMatch(/[+/=]/);
    });

    it('should respect custom byte length', () => {
      const token16 = generateToken(16);
      const token64 = generateToken(64);
      expect(token64.length).toBeGreaterThan(token16.length);
    });
  });

  describe('hashToken', () => {
    it('should produce a SHA-256 hash (64 hex characters)', () => {
      const token = 'test-token-12345';
      const hash = hashToken(token);
      expect(hash).toBeDefined();
      expect(hash.length).toBe(64); // SHA-256 = 256 bits = 64 hex chars
      expect(hash).toMatch(/^[0-9a-f]{64}$/);
    });

    it('should produce deterministic hashes', () => {
      const token = 'test-token-12345';
      const hash1 = hashToken(token);
      const hash2 = hashToken(token);
      expect(hash1).toBe(hash2);
    });

    it('should produce different hashes for different tokens', () => {
      const token1 = 'test-token-1';
      const token2 = 'test-token-2';
      const hash1 = hashToken(token1);
      const hash2 = hashToken(token2);
      expect(hash1).not.toBe(hash2);
    });

    it('should be case-sensitive', () => {
      const hash1 = hashToken('Token');
      const hash2 = hashToken('token');
      expect(hash1).not.toBe(hash2);
    });
  });

  describe('verifyToken', () => {
    it('should verify a valid token against its hash', () => {
      const token = generateToken();
      const hash = hashToken(token);
      expect(verifyToken(token, hash)).toBe(true);
    });

    it('should reject an invalid token', () => {
      const token = generateToken();
      const hash = hashToken(token);
      const wrongToken = generateToken();
      expect(verifyToken(wrongToken, hash)).toBe(false);
    });

    it('should reject a slightly modified token', () => {
      const token = 'test-token-12345';
      const hash = hashToken(token);
      expect(verifyToken('test-token-12346', hash)).toBe(false);
    });

    it('should handle empty strings safely', () => {
      const hash = hashToken('test');
      expect(verifyToken('', hash)).toBe(false);
    });

    it('should handle malformed hashes safely', () => {
      const token = 'test-token';
      expect(verifyToken(token, 'not-a-valid-hash')).toBe(false);
      expect(verifyToken(token, '')).toBe(false);
    });
  });

  describe('generateTokenPair', () => {
    it('should generate both token and hash', () => {
      const { token, hash } = generateTokenPair();
      expect(token).toBeDefined();
      expect(hash).toBeDefined();
      expect(typeof token).toBe('string');
      expect(typeof hash).toBe('string');
    });

    it('should generate a valid token-hash pair', () => {
      const { token, hash } = generateTokenPair();
      expect(verifyToken(token, hash)).toBe(true);
    });

    it('should generate unique pairs on each call', () => {
      const pair1 = generateTokenPair();
      const pair2 = generateTokenPair();
      expect(pair1.token).not.toBe(pair2.token);
      expect(pair1.hash).not.toBe(pair2.hash);
    });
  });

  describe('Security properties', () => {
    it('should be computationally infeasible to reverse hash', () => {
      // This test verifies hash produces different outputs for similar inputs
      const base = 'a'.repeat(32);
      const modified = 'a'.repeat(31) + 'b';
      const hash1 = hashToken(base);
      const hash2 = hashToken(modified);

      // Hashes should be completely different (avalanche effect)
      let diffCount = 0;
      for (let i = 0; i < hash1.length; i++) {
        if (hash1[i] !== hash2[i]) diffCount++;
      }
      // Expect significant difference (> 25% of characters)
      expect(diffCount).toBeGreaterThan(16);
    });

    it('should have sufficient entropy', () => {
      // Generate multiple tokens and ensure no obvious patterns
      const tokens = Array.from({ length: 100 }, () => generateToken());
      const uniqueTokens = new Set(tokens);
      expect(uniqueTokens.size).toBe(100); // All should be unique
    });
  });
});
