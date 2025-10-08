# Test Mode

Test mode allows automated testing tools (like Chrome DevTools MCP) to interact with the app without going through Supabase authentication.

## Usage

### Enable Test Mode

In `.env.local`, set:

```env
NEXT_PUBLIC_TEST_MODE=true
```

### Disable Test Mode

Comment out or remove the line:

```env
# NEXT_PUBLIC_TEST_MODE=true
```

Or set to `false`:

```env
NEXT_PUBLIC_TEST_MODE=false
```

## What Test Mode Does

When enabled:
- **Bypasses Supabase authentication** on the client-side
- Uses a mock test user (`test-user-id` / `test@example.com`)
- Allows direct access to dashboard and protected routes
- Server-side API routes recognize the test user

## Security Warning

⚠️ **NEVER enable test mode in production!**

- Test mode should **only** be used in local development
- Always verify `NEXT_PUBLIC_TEST_MODE` is disabled before deploying
- The test user bypasses all authentication checks

## Recommended Setup for Testing

1. Use **port 3001** for automated testing
2. Keep **port 3000** for normal development with real auth
3. Enable test mode only when running automated tests

Run on port 3001:
```bash
PORT=3001 npm run dev
```

## How It Works

- `src/lib/testAuth.ts` - Defines test mode check and mock user
- `src/pages/index.tsx` - Bypasses auth check in test mode
- `src/pages/dashboard/index.tsx` - Bypasses auth check in test mode
- `src/lib/supabaseClient.ts` - `getCurrentUser()` returns mock user in test mode
- API routes automatically use test user when `NEXT_PUBLIC_TEST_MODE=true`
