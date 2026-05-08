'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '../../utils/supabase'

export default function Dashboard() {
  const [saved,    setSaved]    = useState([])
  const [alerts,   setAlerts]   = useState([])
  const [listings, setListings] = useState([])
  const [loading,  setLoading]  = useState(true)
  const router   = useRouter()

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()

      // Check auth
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      // Load alerts
      const { data: alertData } = await supabase
        .from('alerts')
        .select('*')
        .order('created_at', { ascending: false })

      // Load recent listings across all alerts
      const { data: listingData } = await supabase
        .from('seen_listings')
        .select('*')
        .order('found_at', { ascending: false })
        .limit(20)

      setAlerts(alertData || [])
      setListings(listingData || [])
      setLoading(false)
    }
    load()
  }, [])

  const toggleSave = (id) => {
    setSaved(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id])
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'var(--muted)' }}>Loading...</p>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex' }}>

      {/* Sidebar */}
      <aside style={{
        width: '220px', flexShrink: 0,
        background: '#0f1419', borderRight: '1px solid #1e2d3d',
        display: 'flex', flexDirection: 'column',
        padding: '24px 0', position: 'fixed', top: 0, bottom: 0,
      }}>
        <div style={{ padding: '0 20px 24px', borderBottom: '1px solid #1e2d3d' }}>
          <Link href="/" style={{ fontFamily: 'var(--font-head)', fontSize: '18px', fontWeight: 700, color: 'var(--green)', textDecoration: 'none' }}>
            Rent<span style={{ color: 'var(--text)' }}>Radar</span>
          </Link>
        </div>
        <nav style={{ padding: '16px 12px', flex: 1 }}>
          {[
            { icon: '⊞', label: 'Dashboard', href: '/dashboard', active: true },
            { icon: '◎', label: 'My alerts',  href: '/dashboard', active: false },
            { icon: '♡', label: 'Saved',      href: '/dashboard', active: false },
            { icon: '⚙', label: 'Settings',   href: '/dashboard', active: false },
          ].map(item => (
            <Link key={item.label} href={item.href} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 12px', borderRadius: '8px', marginBottom: '4px',
              background: item.active ? 'rgba(168,240,198,0.1)' : 'transparent',
              color: item.active ? 'var(--green)' : 'var(--muted)',
              fontSize: '14px', textDecoration: 'none',
            }}>
              <span>{item.icon}</span>{item.label}
            </Link>
          ))}
        </nav>
        <div style={{ padding: '16px 12px', borderTop: '1px solid #1e2d3d' }}>
          <Link href="/create-alert" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--green)', color: 'var(--bg)',
            padding: '10px', borderRadius: '8px',
            fontSize: '13px', fontWeight: 700, textDecoration: 'none',
            fontFamily: 'var(--font-head)',
          }}>
            + New alert
          </Link>
          <button onClick={async () => {
            const supabase = createClient()
            await supabase.auth.signOut()
            router.push('/login')
          }} style={{
            width: '100%', marginTop: '8px',
            background: 'transparent', border: '1px solid #1e2d3d',
            borderRadius: '8px', padding: '10px',
            fontSize: '13px', color: 'var(--muted)',
            cursor: 'pointer', fontFamily: 'var(--font-body)',
          }}>
            Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ marginLeft: '220px', flex: 1, padding: '32px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-head)', fontSize: '24px', fontWeight: 800, letterSpacing: '-0.5px' }}>Dashboard</h1>
            <p style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '4px' }}>{listings.length} listings found so far</p>
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
            { label: 'Active alerts', value: alerts.length },
            { label: 'Total listings', value: listings.length },
            { label: 'Total saved',   value: saved.length },
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

        {/* Alerts */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontFamily: 'var(--font-head)', fontSize: '16px', fontWeight: 700 }}>Your alerts</h2>
            <Link href="/create-alert" style={{ color: 'var(--green)', fontSize: '13px', textDecoration: 'none' }}>+ Add new</Link>
          </div>
          {alerts.length === 0 ? (
            <div style={{
              background: 'var(--bg2)', border: '1px dashed var(--border)',
              borderRadius: '14px', padding: '40px', textAlign: 'center',
            }}>
              <p style={{ color: 'var(--muted)', marginBottom: '16px' }}>No alerts yet — create your first one</p>
              <Link href="/create-alert" style={{
                background: 'var(--green)', color: 'var(--bg)',
                padding: '10px 20px', borderRadius: '8px',
                fontSize: '14px', fontWeight: 700, textDecoration: 'none',
              }}>
                Create alert →
              </Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
              {alerts.map(alert => (
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
                    <div style={{ color: 'var(--muted)', fontSize: '13px' }}>{alert.suburbs.join(', ')}</div>
                    <div style={{ color: 'var(--muted)', fontSize: '13px' }}>Up to ${alert.max_price}/wk · {alert.min_bedrooms} bed</div>
                  </div>
                  <div style={{
                    background: 'rgba(168,240,198,0.1)', color: 'var(--green)',
                    borderRadius: '8px', padding: '4px 10px',
                    fontSize: '12px', border: '1px solid rgba(168,240,198,0.2)',
                  }}>
                    Active
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Listings */}
        <div>
          <h2 style={{ fontFamily: 'var(--font-head)', fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Recent matches</h2>
          {listings.length === 0 ? (
            <div style={{
              background: 'var(--bg2)', border: '1px dashed var(--border)',
              borderRadius: '14px', padding: '40px', textAlign: 'center',
            }}>
              <p style={{ color: 'var(--muted)' }}>No listings yet — create an alert and we'll start finding matches</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {listings.map(listing => (
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
                    <div style={{ fontFamily: 'var(--font-head)', fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>{listing.price}</div>
                    <div style={{ color: 'var(--muted)', fontSize: '13px', marginBottom: '8px' }}>📍 {listing.address}</div>
                    <div style={{ display: 'flex', gap: '12px', fontSize: '13px', color: 'var(--muted)' }}>
                      <span>🛏 {listing.beds}</span>
                      <span>🚿 {listing.baths}</span>
                      <span>🚗 {listing.parking}</span>
                      <span>🏠 {listing.property_type}</span>
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
                    <a href={listing.url} target="_blank" rel="noreferrer" style={{
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
          )}
        </div>
      </main>
    </div>
  )
}