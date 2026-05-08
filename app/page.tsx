'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const NAV_LINKS = ['Features', 'How it works', 'Pricing']

const FEATURES = [
  {
    icon: '⚡',
    title: 'Instant alerts',
    desc: 'Get notified the moment a new listing appears — not hours later like Domain\'s native alerts.'
  },
  {
    icon: '🎯',
    title: 'Smart filtering',
    desc: 'Set precise criteria — suburb, price, bedrooms, property type. No noise, only matches.'
  },
  {
    icon: '🏘️',
    title: 'Multiple searches',
    desc: 'Running searches across 3 suburbs at once? No problem. Pro users get unlimited profiles.'
  },
  {
    icon: '💌',
    title: 'Beautiful emails',
    desc: 'Rich email alerts with photos, full address, price and a direct link to the listing.'
  },
  {
    icon: '📉',
    title: 'Price drop tracking',
    desc: 'Know instantly when a listing drops its price. Negotiate from a position of knowledge.'
  },
  {
    icon: '👥',
    title: 'Share with housemates',
    desc: 'Searching as a couple or group? Share your shortlist and alerts with everyone.'
  },
]

const STEPS = [
  { n: '01', title: 'Create an alert', desc: 'Pick your suburbs, set your budget and bedroom requirements.' },
  { n: '02', title: 'We watch 24/7',   desc: 'RentRadar checks Domain every 10 minutes, day and night.' },
  { n: '03', title: 'You get notified', desc: 'The moment something new appears, it lands in your inbox instantly.' },
  { n: '04', title: 'You apply first', desc: 'Get there before the crowds. In this market, speed wins.' },
]

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    features: ['1 search profile', 'Email alerts', 'Daily digest only', '20 listings per search'],
    cta: 'Get started free',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$9',
    period: 'per month',
    features: ['Unlimited search profiles', 'Instant alerts (10 min)', 'Price drop notifications', 'Shareable shortlists', 'Priority support'],
    cta: 'Start free trial',
    highlight: true,
  },
  {
    name: 'Family',
    price: '$15',
    period: 'per month',
    features: ['Everything in Pro', 'Up to 5 members', 'Shared alert dashboard', 'Group shortlisting', 'Commute filter'],
    cta: 'Coming soon',
    highlight: false,
  },
]

export default function LandingPage() {
  const [email, setEmail]       = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [scrolled, setScrolled]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSignup = (e) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <div style={{ minHeight: '100vh' }}>

      {/* ── NAV ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 32px',
        height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(8,11,15,0.95)' : 'transparent',
        borderBottom: scrolled ? '1px solid #1e2d3d' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'all 0.3s ease',
      }}>
        <div style={{ fontFamily: 'var(--font-head)', fontSize: '20px', fontWeight: 700, color: 'var(--green)', letterSpacing: '-0.5px' }}>
          Rent<span style={{ color: 'var(--text)' }}>Radar</span>
        </div>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          {NAV_LINKS.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g, '-')}`}
               style={{ color: 'var(--muted)', fontSize: '14px', textDecoration: 'none', transition: 'color 0.2s' }}
               onMouseEnter={e => e.target.style.color = 'var(--text)'}
               onMouseLeave={e => e.target.style.color = 'var(--muted)'}>
              {l}
            </a>
          ))}
          <Link href="/login" style={{
            background: 'var(--green)', color: 'var(--bg)',
            padding: '8px 18px', borderRadius: '8px',
            fontSize: '14px', fontWeight: 600, textDecoration: 'none',
            fontFamily: 'var(--font-head)',
          }}>
            Get started
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
        padding: '120px 24px 80px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Radar glow */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168,240,198,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        {/* Radar rings */}
        {[200, 300, 400, 500].map(size => (
          <div key={size} style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: `${size}px`, height: `${size}px`, borderRadius: '50%',
            border: '1px solid rgba(168,240,198,0.06)',
            pointerEvents: 'none',
          }} />
        ))}

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(168,240,198,0.08)', border: '1px solid rgba(168,240,198,0.2)',
          borderRadius: '20px', padding: '6px 14px', marginBottom: '32px',
          fontSize: '13px', color: 'var(--green)',
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green)', display: 'inline-block', animation: 'pulse 2s infinite' }} />
          Now tracking Sydney rentals in real-time
        </div>

        <h1 style={{
          fontFamily: 'var(--font-head)', fontSize: 'clamp(40px, 7vw, 84px)',
          fontWeight: 800, lineHeight: 1.05, letterSpacing: '-2px',
          maxWidth: '800px', marginBottom: '24px',
        }}>
          Never miss a<br />
          <span style={{ color: 'var(--green)' }}>rental again.</span>
        </h1>

        <p style={{
          fontSize: 'clamp(16px, 2vw, 20px)', color: 'var(--muted)',
          maxWidth: '520px', marginBottom: '48px', lineHeight: 1.7,
          fontWeight: 300,
        }}>
          Sydney's rental vacancy is under 1%. The best listings go in hours.
          RentRadar alerts you the moment something new appears — before anyone else.
        </p>

        <form onSubmit={handleSignup} style={{
          display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center',
          marginBottom: '48px',
        }}>
          {!submitted ? (
            <>
              <input
                type="email" placeholder="your@email.com" value={email}
                onChange={e => setEmail(e.target.value)} required
                style={{
                  background: 'var(--bg2)', border: '1px solid var(--border)',
                  borderRadius: '10px', padding: '14px 20px',
                  color: 'var(--text)', fontSize: '15px', width: '280px',
                  outline: 'none', fontFamily: 'var(--font-body)',
                }}
              />
              <button type="submit" style={{
                background: 'var(--green)', color: 'var(--bg)',
                border: 'none', borderRadius: '10px', padding: '14px 28px',
                fontSize: '15px', fontWeight: 700, cursor: 'pointer',
                fontFamily: 'var(--font-head)',
              }}>
                Start for free →
              </button>
            </>
          ) : (
            <div style={{
              background: 'rgba(168,240,198,0.1)', border: '1px solid rgba(168,240,198,0.3)',
              borderRadius: '10px', padding: '14px 28px', color: 'var(--green)', fontSize: '15px',
            }}>
              ✓ You're on the list — we'll be in touch soon!
            </div>
          )}
        </form>

        <p style={{ fontSize: '13px', color: 'var(--muted)' }}>
          Free forever · No credit card · Cancel anytime
        </p>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ padding: '100px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p style={{ color: 'var(--green)', fontSize: '13px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>Features</p>
          <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-1px' }}>
            Built for Sydney's brutal<br />rental market
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {FEATURES.map(f => (
            <div key={f.title} style={{
              background: 'var(--bg2)', border: '1px solid var(--border)',
              borderRadius: '16px', padding: '28px',
              transition: 'border-color 0.2s, transform 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(168,240,198,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <div style={{ fontSize: '28px', marginBottom: '16px' }}>{f.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '18px', fontWeight: 700, marginBottom: '10px' }}>{f.title}</h3>
              <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={{ padding: '100px 24px', background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{ color: 'var(--green)', fontSize: '13px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>How it works</p>
            <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-1px' }}>
              Up and running in 2 minutes
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px' }}>
            {STEPS.map((s, i) => (
              <div key={s.n} style={{ position: 'relative' }}>
                {i < STEPS.length - 1 && (
                  <div style={{
                    position: 'absolute', top: '20px', left: 'calc(50% + 24px)',
                    right: '-50%', height: '1px',
                    background: 'linear-gradient(90deg, var(--border), transparent)',
                  }} />
                )}
                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  background: 'rgba(168,240,198,0.1)', border: '1px solid rgba(168,240,198,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-head)', fontSize: '13px', fontWeight: 700,
                  color: 'var(--green)', marginBottom: '20px',
                }}>
                  {s.n}
                </div>
                <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '17px', fontWeight: 700, marginBottom: '10px' }}>{s.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ padding: '100px 24px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p style={{ color: 'var(--green)', fontSize: '13px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>Pricing</p>
          <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-1px' }}>
            Simple, honest pricing
          </h2>
          <p style={{ color: 'var(--muted)', marginTop: '16px', fontSize: '16px' }}>
            If RentRadar saves you one week of searching, it pays for itself 10x over.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', alignItems: 'start' }}>
          {PLANS.map(plan => (
            <div key={plan.name} style={{
              background: plan.highlight ? 'rgba(168,240,198,0.05)' : 'var(--bg2)',
              border: plan.highlight ? '1px solid rgba(168,240,198,0.4)' : '1px solid var(--border)',
              borderRadius: '20px', padding: '32px',
              position: 'relative',
            }}>
              {plan.highlight && (
                <div style={{
                  position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
                  background: 'var(--green)', color: 'var(--bg)',
                  fontSize: '12px', fontWeight: 700, padding: '4px 14px', borderRadius: '20px',
                  fontFamily: 'var(--font-head)',
                }}>
                  Most popular
                </div>
              )}
              <div style={{ fontFamily: 'var(--font-head)', fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>{plan.name}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '4px' }}>
                <span style={{ fontFamily: 'var(--font-head)', fontSize: '40px', fontWeight: 800, color: plan.highlight ? 'var(--green)' : 'var(--text)' }}>{plan.price}</span>
                <span style={{ color: 'var(--muted)', fontSize: '14px' }}>{plan.period}</span>
              </div>
              <div style={{ borderTop: '1px solid var(--border)', margin: '24px 0' }} />
              <ul style={{ listStyle: 'none', marginBottom: '28px' }}>
                {plan.features.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '12px', fontSize: '14px', color: 'var(--muted)' }}>
                    <span style={{ color: 'var(--green)', flexShrink: 0, marginTop: '2px' }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/dashboard" style={{
                display: 'block', textAlign: 'center',
                background: plan.highlight ? 'var(--green)' : 'transparent',
                color: plan.highlight ? 'var(--bg)' : 'var(--text)',
                border: plan.highlight ? 'none' : '1px solid var(--border)',
                padding: '12px', borderRadius: '10px',
                fontSize: '14px', fontWeight: 700, textDecoration: 'none',
                fontFamily: 'var(--font-head)',
                opacity: plan.cta === 'Coming soon' ? 0.5 : 1,
                pointerEvents: plan.cta === 'Coming soon' ? 'none' : 'auto',
              }}>
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        padding: '100px 24px', textAlign: 'center',
        borderTop: '1px solid var(--border)',
        background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg2) 100%)',
      }}>
        <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(28px, 4vw, 56px)', fontWeight: 800, letterSpacing: '-1.5px', marginBottom: '24px' }}>
          Sydney's next rental<br />
          <span style={{ color: 'var(--green)' }}>is yours to find.</span>
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: '18px', marginBottom: '40px', fontWeight: 300 }}>
          Join hundreds of Sydneysiders who refuse to miss out.
        </p>
        <Link href="/dashboard" style={{
          display: 'inline-block',
          background: 'var(--green)', color: 'var(--bg)',
          padding: '16px 40px', borderRadius: '12px',
          fontSize: '16px', fontWeight: 700, textDecoration: 'none',
          fontFamily: 'var(--font-head)',
        }}>
          Create your first alert →
        </Link>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: '1px solid var(--border)', padding: '32px 24px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '16px',
      }}>
        <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, color: 'var(--green)' }}>
          Rent<span style={{ color: 'var(--muted)' }}>Radar</span>
        </div>
        <p style={{ color: 'var(--muted)', fontSize: '13px' }}>
          © 2025 RentRadar · Built for Sydney renters
        </p>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        input::placeholder { color: #3a5a4a; }
        input:focus { border-color: rgba(168,240,198,0.4) !important; }
      `}</style>
    </div>
  )
}