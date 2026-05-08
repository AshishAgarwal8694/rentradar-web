'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../utils/supabase'
import Link from 'next/link'

export default function LoginPage() {
  const router   = useRouter()
  const supabase = createClient()

  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const [mode,     setMode]     = useState('login') // 'login' or 'signup'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) { setError(error.message); setLoading(false); return }
      router.push('/dashboard')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) { setError(error.message); setLoading(false); return }
      router.push('/dashboard')
    }
  }

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px',
    }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{ fontFamily: 'var(--font-head)', fontSize: '28px', fontWeight: 800, color: 'var(--green)' }}>
              Rent<span style={{ color: 'var(--text)' }}>Radar</span>
            </div>
          </Link>
          <p style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '8px' }}>
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: 'var(--bg2)', border: '1px solid var(--border)',
          borderRadius: '20px', padding: '32px',
        }}>

          {/* Toggle */}
          <div style={{
            display: 'flex', background: 'var(--bg)',
            borderRadius: '10px', padding: '4px', marginBottom: '28px',
          }}>
            {['login', 'signup'].map(m => (
              <button key={m} onClick={() => setMode(m)} style={{
                flex: 1, padding: '8px',
                borderRadius: '8px', border: 'none', cursor: 'pointer',
                background: mode === m ? 'var(--bg2)' : 'transparent',
                color: mode === m ? 'var(--text)' : 'var(--muted)',
                fontSize: '14px', fontWeight: mode === m ? 600 : 400,
                fontFamily: 'var(--font-body)',
                boxShadow: mode === m ? '0 1px 3px rgba(0,0,0,0.3)' : 'none',
                transition: 'all 0.2s',
              }}>
                {m === 'login' ? 'Log in' : 'Sign up'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', color: 'var(--muted)', marginBottom: '8px' }}>
                Email
              </label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com" required
                style={{
                  width: '100%', background: 'var(--bg)', border: '1px solid var(--border)',
                  borderRadius: '10px', padding: '12px 16px', color: 'var(--text)',
                  fontSize: '15px', fontFamily: 'var(--font-body)', outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', color: 'var(--muted)', marginBottom: '8px' }}>
                Password
              </label>
              <input
                type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" required
                style={{
                  width: '100%', background: 'var(--bg)', border: '1px solid var(--border)',
                  borderRadius: '10px', padding: '12px 16px', color: 'var(--text)',
                  fontSize: '15px', fontFamily: 'var(--font-body)', outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Error */}
            {error && (
              <div style={{
                background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.3)',
                borderRadius: '8px', padding: '10px 14px',
                color: '#ff8080', fontSize: '13px', marginBottom: '16px',
              }}>
                {error}
              </div>
            )}

            {/* Submit */}
            <button type="submit" disabled={loading} style={{
              width: '100%', background: 'var(--green)', color: 'var(--bg)',
              border: 'none', borderRadius: '10px', padding: '14px',
              fontSize: '15px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'var(--font-head)', opacity: loading ? 0.7 : 1,
              transition: 'opacity 0.2s',
            }}>
              {loading ? 'Please wait...' : mode === 'login' ? 'Log in →' : 'Create account →'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '13px', marginTop: '24px' }}>
          <Link href="/" style={{ color: 'var(--green)', textDecoration: 'none' }}>
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  )
}