'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const PROPERTY_TYPES = ['Any', 'Apartment', 'House', 'Townhouse', 'Studio']
const BEDROOM_OPTIONS = ['Any', '1', '2', '3', '4+']
const NOTIFY_OPTIONS  = [
  { id: 'instant', label: 'Instantly',    sub: 'Every 10 minutes',   icon: '⚡' },
  { id: 'hourly',  label: 'Hourly',       sub: 'Once per hour',      icon: '🕐' },
  { id: 'daily',   label: 'Daily digest', sub: 'Once per day 8am',   icon: '📅' },
]

export default function CreateAlert() {
  const router = useRouter()
  const [form, setForm] = useState({
    name:       '',
    suburb:     '',
    maxPrice:   600,
    beds:       'Any',
    propType:   'Any',
    notify:     'instant',
  })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => router.push('/dashboard'), 1500)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex' }}>

      {/* Sidebar */}
      <aside style={{
        width: '220px', flexShrink: 0,
        background: 'var(--bg2)', borderRight: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column',
        padding: '24px 0', position: 'fixed', top: 0, bottom: 0,
      }}>
        <div style={{ padding: '0 20px 24px', borderBottom: '1px solid var(--border)' }}>
          <Link href="/" style={{ fontFamily: 'var(--font-head)', fontSize: '18px', fontWeight: 700, color: 'var(--green)', textDecoration: 'none' }}>
            Rent<span style={{ color: 'var(--text)' }}>Radar</span>
          </Link>
        </div>
        <nav style={{ padding: '16px 12px', flex: 1 }}>
          {[
            { icon: '⊞', label: 'Dashboard', href: '/dashboard' },
            { icon: '◎', label: 'My alerts',  href: '/dashboard' },
            { icon: '♡', label: 'Saved',      href: '/dashboard' },
            { icon: '⚙', label: 'Settings',   href: '/dashboard' },
          ].map(item => (
            <Link key={item.label} href={item.href} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 12px', borderRadius: '8px', marginBottom: '4px',
              color: 'var(--muted)', fontSize: '14px', textDecoration: 'none',
              transition: 'all 0.15s',
            }}>
              <span>{item.icon}</span>{item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main style={{ marginLeft: '220px', flex: 1, padding: '32px', maxWidth: '680px' }}>
        <div style={{ marginBottom: '32px' }}>
          <Link href="/dashboard" style={{ color: 'var(--muted)', fontSize: '13px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
            ← Back to dashboard
          </Link>
          <h1 style={{ fontFamily: 'var(--font-head)', fontSize: '28px', fontWeight: 800, letterSpacing: '-0.5px' }}>New alert</h1>
          <p style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '6px' }}>Set your search criteria and we'll watch 24/7.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Alert name */}
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--muted)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Alert name</label>
            <input
              value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Inner West search"
              style={{
                width: '100%', background: 'var(--bg)', border: '1px solid var(--border)',
                borderRadius: '10px', padding: '12px 16px', color: 'var(--text)',
                fontSize: '15px', fontFamily: 'var(--font-body)', outline: 'none', boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Suburb */}
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--muted)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Suburb</label>
            <input
              value={form.suburb} onChange={e => setForm({ ...form, suburb: e.target.value })}
              placeholder="e.g. Newtown, Surry Hills, Leichhardt"
              style={{
                width: '100%', background: 'var(--bg)', border: '1px solid var(--border)',
                borderRadius: '10px', padding: '12px 16px', color: 'var(--text)',
                fontSize: '15px', fontFamily: 'var(--font-body)', outline: 'none', boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Max price */}
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <label style={{ fontSize: '13px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Max rent per week</label>
              <span style={{ fontFamily: 'var(--font-head)', fontWeight: 700, color: 'var(--green)' }}>${form.maxPrice}/wk</span>
            </div>
            <input type="range" min="300" max="1500" step="50"
              value={form.maxPrice} onChange={e => setForm({ ...form, maxPrice: Number(e.target.value) })}
              style={{ width: '100%', accentColor: 'var(--green)' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--muted)', marginTop: '6px' }}>
              <span>$300</span><span>$1,500</span>
            </div>
          </div>

          {/* Bedrooms */}
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--muted)', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Bedrooms</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {BEDROOM_OPTIONS.map(opt => (
                <button key={opt} onClick={() => setForm({ ...form, beds: opt })} style={{
                  padding: '8px 18px', borderRadius: '20px', cursor: 'pointer',
                  border: form.beds === opt ? '1px solid var(--green)' : '1px solid var(--border)',
                  background: form.beds === opt ? 'rgba(168,240,198,0.1)' : 'var(--bg)',
                  color: form.beds === opt ? 'var(--green)' : 'var(--muted)',
                  fontSize: '14px', fontFamily: 'var(--font-body)',
                  transition: 'all 0.15s',
                }}>
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Property type */}
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--muted)', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Property type</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {PROPERTY_TYPES.map(opt => (
                <button key={opt} onClick={() => setForm({ ...form, propType: opt })} style={{
                  padding: '8px 18px', borderRadius: '20px', cursor: 'pointer',
                  border: form.propType === opt ? '1px solid var(--green)' : '1px solid var(--border)',
                  background: form.propType === opt ? 'rgba(168,240,198,0.1)' : 'var(--bg)',
                  color: form.propType === opt ? 'var(--green)' : 'var(--muted)',
                  fontSize: '14px', fontFamily: 'var(--font-body)',
                  transition: 'all 0.15s',
                }}>
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Notify */}
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--muted)', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Notify me</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {NOTIFY_OPTIONS.map(opt => (
                <button key={opt.id} onClick={() => setForm({ ...form, notify: opt.id })} style={{
                  padding: '14px', borderRadius: '12px', cursor: 'pointer', textAlign: 'center',
                  border: form.notify === opt.id ? '1px solid rgba(168,240,198,0.4)' : '1px solid var(--border)',
                  background: form.notify === opt.id ? 'rgba(168,240,198,0.08)' : 'var(--bg)',
                  fontFamily: 'var(--font-body)', transition: 'all 0.15s',
                }}>
                  <div style={{ fontSize: '22px', marginBottom: '6px' }}>{opt.icon}</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: form.notify === opt.id ? 'var(--green)' : 'var(--text)', marginBottom: '2px' }}>{opt.label}</div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)' }}>{opt.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Save button */}
          <button onClick={handleSave} style={{
            width: '100%', background: saved ? 'rgba(168,240,198,0.2)' : 'var(--green)',
            color: saved ? 'var(--green)' : 'var(--bg)',
            border: saved ? '1px solid var(--green)' : 'none',
            borderRadius: '14px', padding: '16px',
            fontSize: '16px', fontWeight: 700, cursor: 'pointer',
            fontFamily: 'var(--font-head)', transition: 'all 0.3s',
          }}>
            {saved ? '✓ Alert saved! Redirecting...' : 'Save alert'}
          </button>

        </div>
      </main>
    </div>
  )
}