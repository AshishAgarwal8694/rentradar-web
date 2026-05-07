'use client'
import { useState } from 'react'
import Link from 'next/link'

const MOCK_ALERTS = [
  { id: 1, name: 'Inner West', suburbs: 'Newtown, Leichhardt', price: '$750/wk', beds: 2, newCount: 4 },
  { id: 2, name: 'North Sydney', suburbs: 'Crows Nest, St Leonards', price: '$650/wk', beds: 1, newCount: 2 },
]

const MOCK_LISTINGS = [
  { id: 1, address: '14/22 Norton St, Leichhardt NSW 2040', price: '$680/week', beds: 2, baths: 1, parking: 1, type: 'Apartment', ago: '8 min ago', url: '#' },
  { id: 2, address: '8 Enmore Rd, Newtown NSW 2042',        price: '$720/week', beds: 2, baths: 2, parking: 0, type: 'House',     ago: '1 hr ago',  url: '#' },
  { id: 3, address: '3/15 Miller St, Crows Nest NSW 2065',  price: '$620/week', beds: 1, baths: 1, parking: 1, type: 'Apartment', ago: '2 hrs ago',  url: '#' },
]

export default function Dashboard() {
  const [saved, setSaved] = useState([])

  const toggleSave = (id) => {
    setSaved(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id])
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex' }}>

      {/* ── SIDEBAR ── */}
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
            { icon: '⊞', label: 'Dashboard',    href: '/dashboard',      active: true  },
            { icon: '◎', label: 'My alerts',     href: '/dashboard',      active: false },
            { icon: '♡', label: 'Saved',         href: '/dashboard',      active: false },
            { icon: '⚙', label: 'Settings',      href: '/dashboard',      active: false },
          ].map(item => (
            <Link key={item.label} href={item.href} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 12px', borderRadius: '8px', marginBottom: '4px',
              background: item.active ? 'rgba(168,240,198,0.1)' : 'transparent',
              color: item.active ? 'var(--green)' : 'var(--muted)',
              fontSize: '14px', textDecoration: 'none', fontWeight: item.active ? 500 : 400,
              transition: 'all 0.15s',
            }}>
              <span style={{ fontSize: '16px' }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div style={{ padding: '16px 12px', borderTop: '1px solid var(--border)' }}>
          <Link href="/create-alert" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            background: 'var(--green)', color: 'var(--bg)',
            padding: '10px', borderRadius: '8px',
            fontSize: '13px', fontWeight: 700, textDecoration: 'none',
            fontFamily: 'var(--font-head)',
          }}>
            + New alert
          </Link>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main style={{ marginLeft: '220px', flex: 1, padding: '32px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-head)', fontSize: '24px', fontWeight: 800, letterSpacing: '-0.5px' }}>Dashboard</h1>
            <p style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '4px' }}>6 new listings found today</p>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'rgba(168,240,198,0.08)', border: '1px solid rgba(168,240,198,0.2)',
            borderRadius: '20px', padding: '6px 14px', fontSize: '13px', color: 'var(--green)',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} />
            Radar active
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
          {[
            { label: 'Active alerts', value: '2' },
            { label: 'New today',     value: '6' },
            { label: 'Total saved',   value: '3' },
          ].map(stat => (
            <div key={stat.label} style={{
              background: 'var(--bg2)', border: '1px solid var(--border)',
              borderRadius: '14px', padding: '20px 24px',
            }}>
              <div style={{ color: 'var(--muted)', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</div>
              <div style={{ fontFamily: 'var(--font-head)', fontSize: '32px', fontWeight: 800 }}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Active Alerts */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontFamily: 'var(--font-head)', fontSize: '16px', fontWeight: 700 }}>Your alerts</h2>
            <Link href="/create-alert" style={{ color: 'var(--green)', fontSize: '13px', textDecoration: 'none' }}>+ Add new</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
            {MOCK_ALERTS.map(alert => (
              <div key={alert.id} style={{
                background: 'var(--bg2)', border: '1px solid var(--border)',
                borderRadius: '14px', padding: '18px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} />
                    <span style={{ fontFamily: 'var(--font-head)', fontSize: '15px', fontWeight: 600 }}>{alert.name}</span>
                  </div>
                  <div style={{ color: 'var(--muted)', fontSize: '13px' }}>{alert.suburbs}</div>
                  <div style={{ color: 'var(--muted)', fontSize: '13px' }}>Up to {alert.price} · {alert.beds} bed</div>
                </div>
                <div style={{
                  background: 'var(--green)', color: 'var(--bg)',
                  borderRadius: '8px', padding: '4px 10px',
                  fontSize: '13px', fontWeight: 700, fontFamily: 'var(--font-head)',
                }}>
                  {alert.newCount} new
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Listings */}
        <div>
          <h2 style={{ fontFamily: 'var(--font-head)', fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Recent matches</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {MOCK_LISTINGS.map(listing => (
              <div key={listing.id} style={{
                background: 'var(--bg2)', border: '1px solid var(--border)',
                borderRadius: '14px', padding: '20px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                transition: 'border-color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(168,240,198,0.25)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <span style={{
                      background: 'rgba(168,240,198,0.1)', border: '1px solid rgba(168,240,198,0.2)',
                      color: 'var(--green)', fontSize: '11px', padding: '2px 8px', borderRadius: '6px',
                    }}>New</span>
                    <span style={{ color: 'var(--muted)', fontSize: '12px' }}>{listing.ago}</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-head)', fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>{listing.price}</div>
                  <div style={{ color: 'var(--muted)', fontSize: '13px', marginBottom: '8px' }}>📍 {listing.address}</div>
                  <div style={{ display: 'flex', gap: '12px', fontSize: '13px', color: 'var(--muted)' }}>
                    <span>🛏 {listing.beds}</span>
                    <span>🚿 {listing.baths}</span>
                    <span>🚗 {listing.parking}</span>
                    <span>🏠 {listing.type}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', marginLeft: '20px' }}>
                  <button onClick={() => toggleSave(listing.id)} style={{
                    background: saved.includes(listing.id) ? 'rgba(168,240,198,0.1)' : 'transparent',
                    border: '1px solid var(--border)', borderRadius: '8px',
                    padding: '8px 14px', cursor: 'pointer',
                    color: saved.includes(listing.id) ? 'var(--green)' : 'var(--muted)',
                    fontSize: '13px', transition: 'all 0.15s',
                  }}>
                    {saved.includes(listing.id) ? '♥ Saved' : '♡ Save'}
                  </button>
                  <a href={listing.url} style={{
                    background: 'var(--bg3)', border: '1px solid var(--border)',
                    borderRadius: '8px', padding: '8px 14px',
                    color: 'var(--text)', fontSize: '13px', textDecoration: 'none',
                  }}>
                    View →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}