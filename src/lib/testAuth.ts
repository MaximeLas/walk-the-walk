/**
 * Test authentication bypass for automated testing
 * ONLY use in development with NEXT_PUBLIC_TEST_MODE=true
 */

export const isTestMode = () => {
  return process.env.NEXT_PUBLIC_TEST_MODE === 'true';
};

/**
 * Mock user for test mode
 */
export const TEST_USER = {
  id: '00000000-0000-0000-0000-000000000001',
  email: 'test@example.com',
  created_at: new Date().toISOString(),
  app_metadata: {},
  user_metadata: {},
  aud: 'authenticated',
  role: 'authenticated',
};
