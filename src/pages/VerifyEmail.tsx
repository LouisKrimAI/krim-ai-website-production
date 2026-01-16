import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

export default function VerifyEmail() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const [firstName, setFirstName] = useState('')

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token')

      if (!token) {
        setStatus('error')
        setMessage('No verification token provided')
        return
      }

      try {
        // Step 1: Verify the email
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verify-email`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
          }
        )

        const data = await response.json()

        if (data.success) {
          setStatus('success')
          setMessage(data.message)
          setFirstName(data.firstName || '')

          // Step 2: Immediately trigger Email 2
          if (import.meta.env.DEV) {
            console.log('✅ Email verified, now sending Email 2...')
          }

          fetch(
            `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-post-verification-welcome`,
            {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: data.email,
                first_name: data.firstName || 'there',
                last_name: data.lastName || ''
              }),
            }
          )
            .then(res => res.json())
            .then(emailData => {
              if (emailData.success && import.meta.env.DEV) {
                console.log('✅ Email 2 sent successfully!')
              } else if (!emailData.success && import.meta.env.DEV) {
                console.error('❌ Email 2 failed:', emailData)
              }
            })
            .catch(err => {
              if (import.meta.env.DEV) {
                console.error('❌ Error sending Email 2:', err)
              }
            })

          // No redirect - user can close the tab after verification
        } else {
          setStatus('error')
          setMessage(data.error || 'Verification failed')
        }
      } catch (error) {
        setStatus('error')
        setMessage('An error occurred during verification')
        if (import.meta.env.DEV) {
          console.error('Verification error:', error)
        }
      }
    }

    verifyEmail()
  }, [searchParams, navigate])

  return (
    <div className="min-h-screen bg-krim-deep-space flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
        {status === 'loading' && (
          <>
            <div className="w-16 h-16 mx-auto mb-6 border-4 border-krim-mint border-t-transparent rounded-full animate-spin" />
            <h1 className="text-2xl font-bold text-white mb-2 text-white">Verifying Email...</h1>
            <p className="text-white">Please wait while we verify your email address</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-16 h-16 mx-auto mb-6 bg-krim-mint rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-krim-deep-space" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2 text-white">Email Verified! 🎉</h1>
            <p className="text-white mb-4">
              {firstName ? `Thanks ${firstName}! ` : 'Thanks! '}
              Your email has been successfully verified.
            </p>
            <div className="bg-krim-mint/10 border border-krim-mint/30 rounded-lg p-4 mb-6">
              <p className="text-krim-mint font-semibold mb-2">📧 Next Steps Email Sent!</p>
              <p className="text-white text-sm mb-2">
                We've sent a follow-up email to your inbox with instructions to schedule your 30-minute demo with our team.
              </p>
              <p className="text-white text-xs">
                Please check your email and click "Book Demo" to choose a time that works for you.
              </p>
            </div>
            <p className="text-white text-sm">
              You can close this tab now. Check your email to continue!
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-16 h-16 mx-auto mb-6 bg-red-500/20 border-2 border-red-500 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2 text-white">Verification Failed</h1>
            <p className="text-white mb-6">{message}</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-krim-mint text-krim-deep-space font-semibold rounded-lg hover:bg-krim-mint/90 transition-colors"
            >
              Return to Home
            </button>
          </>
        )}
      </div>
    </div>
  )
}
