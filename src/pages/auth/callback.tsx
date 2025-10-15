/**
 * Auth Callback Page
 * Handles OAuth redirects from Google and other providers
 */

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { getSupabaseClient } from '@/lib/supabaseClient'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const supabase = getSupabaseClient()

        // Get the session after OAuth redirect
        const { data: { session }, error } = await supabase.auth.getSession()

        if (error) {
          console.error('Auth callback error:', error.message)
          router.push('/login?error=auth_failed')
          return
        }

        if (session) {
          // Successfully signed in
          console.log('User signed in:', session.user.email)

          // Redirect to dashboard
          router.push('/dashboard')
        } else {
          // No session, redirect to login
          router.push('/login')
        }
      } catch (error) {
        console.error('Unexpected error:', error)
        router.push('/login?error=unexpected')
      }
    }

    handleCallback()
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-700 text-lg font-medium">Completing sign in...</p>
        <p className="text-gray-500 text-sm mt-2">Please wait a moment</p>
      </div>
    </div>
  )
}
