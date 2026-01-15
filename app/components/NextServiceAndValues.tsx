'use client'

import Link from 'next/link'

export default function NextServiceAndValues() {
  return (
    <section style={{ padding: 'clamp(48px, 8vw, 72px)', background: 'var(--bgLight)' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          alignItems: 'start'
        }}>
          {/* Left Card - Next Service */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '3rem',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(26px, 4vw, 34px)',
              color: 'var(--navy)',
              marginBottom: '1.5rem',
              fontWeight: '600'
            }}>
              PROCHAIN RENDEZ-VOUS
            </h2>
            
            <div style={{ marginBottom: '2rem' }}>
              <div style={{
                color: 'var(--textDark)',
                fontSize: '1.1rem',
                marginBottom: '0.5rem'
              }}>
                Dimanche
              </div>
              <div style={{
                color: 'var(--navy)',
                fontSize: '2rem',
                fontWeight: 'bold',
                marginBottom: '0.5rem'
              }}>
                Culte principal
              </div>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: 'var(--gold)',
                marginBottom: '1rem'
              }}>
                Chaque dimanche à 8h30
              </div>
              <div style={{
                color: 'var(--textDark)',
                fontSize: '1.1rem'
              }}>
                4, Delmas 48, Port-au-Prince
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <Link 
                href="/visite"
                style={{
                  background: 'var(--gold)',
                  color: 'var(--navy)',
                  padding: '1rem 2rem',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '600',
                  fontSize: '1rem',
                  transition: 'background 0.3s ease',
                  display: 'inline-block'
                }}
              >
                Itinéraire
              </Link>
              
              <button
                style={{
                  background: 'transparent',
                  color: 'var(--navy)',
                  padding: '1rem 2rem',
                  borderRadius: '12px',
                  border: '2px solid var(--navy)',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '600',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  // Google Maps integration
                  window.open('https://maps.google.com/?q=4+Delmas+48,+Port-au-Prince,+Haïti', '_blank')
                }}
              >
                Ouvrir dans Google Maps
              </button>
            </div>
          </div>

          {/* Right - 3 Value Cards */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            {/* Vision Card */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
            }}>
              <h3 style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.3rem',
                color: 'var(--navy)',
                marginBottom: '1rem',
                fontWeight: '600'
              }}>
                Vision
              </h3>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '1rem',
                color: 'var(--textDark)',
                lineHeight: '1.6',
                margin: 0
              }}>
                Une Église qui brille dans le monde et agit comme le sel de la terre (Matthieu 5.13-16).
              </p>
            </div>

            {/* Mission Card */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
            }}>
              <h3 style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.3rem',
                color: 'var(--navy)',
                marginBottom: '1rem',
                fontWeight: '600'
              }}>
                Mission
              </h3>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '1rem',
                color: 'var(--textDark)',
                lineHeight: '1.6',
                margin: 0
              }}>
                Former des disciples, annoncer la Bonne Nouvelle et répondre avec compassion aux besoins spirituels et sociaux de la communauté.
              </p>
            </div>

            {/* Values Card */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
            }}>
              <h3 style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.3rem',
                color: 'var(--navy)',
                marginBottom: '1rem',
                fontWeight: '600'
              }}>
                Valeurs
              </h3>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '1rem',
                color: 'var(--textDark)',
                lineHeight: '1.6',
                margin: 0
              }}>
                Fidélité, Foi, intégrité, amour, service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
