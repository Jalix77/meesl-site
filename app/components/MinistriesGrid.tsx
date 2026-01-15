'use client'

import Link from 'next/link'

const ministries = [
  {
    name: 'Jeunesse',
    image: '/images/Jeunesse.jpg',
    icon: '🎓',
    href: '/ministere/jeunesse'
  },
  {
    name: 'Enfants',
    image: '/images/Ministry-3.jpeg',
    icon: '👶',
    href: '/ministere/enfants'
  },
  {
    name: 'Femmes',
    image: '/images/Dame2.jpg',
    icon: '👩‍🦰',
    href: '/ministere/femmes'
  },
  {
    name: 'Hommes',
    image: '/images/ministries/men.jpg',
    icon: '👨‍🦱',
    href: '/ministere/hommes'
  },
  {
    name: 'Évangélisation',
    image: '/images/ministries/evangelism.jpg',
    icon: '📣',
    href: '/ministere/evangelisation'
  },
  {
    name: 'Louange',
    image: '/images/ministries/worship.jpg',
    icon: '🎵',
    href: '/ministere/louange'
  }
]

export default function MinistriesGrid() {
  return (
    <section style={{ padding: 'clamp(48px, 8vw, 72px)', background: 'var(--bgLight)' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <h2 style={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: 'clamp(26px, 4vw, 34px)',
          color: 'var(--navy)',
          marginBottom: '3rem',
          fontWeight: '600',
          textAlign: 'center'
        }}>
          Nos Ministères
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {ministries.map((ministry, index) => (
            <Link
              key={ministry.name}
              href={ministry.href}
              style={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'block'
              }}
            >
              <div
                style={{
                  position: 'relative',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  background: 'white',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  aspectRatio: '4/3'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)'
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.12)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)'
                }}
              >
                {/* Background Image */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url(${ministry.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'brightness(0.7)',
                  transition: 'filter 0.3s ease'
                }} />
                
                {/* Overlay */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(to bottom, transparent 0%, rgba(11, 19, 32, 0.7) 100%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '2rem'
                }}>
                  <div style={{
                    textAlign: 'center',
                    color: 'white',
                    width: '100%'
                  }}>
                    <div style={{
                      fontSize: '2.5rem',
                      marginBottom: '0.5rem',
                      lineHeight: '1'
                    }}>
                      {ministry.icon}
                    </div>
                    <h3 style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '1.3rem',
                      fontWeight: '600',
                      margin: 0,
                      textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                    }}>
                      {ministry.name}
                    </h3>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
