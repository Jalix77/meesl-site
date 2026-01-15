'use client'

import HoverButton from './HoverButton'

export default function AboutSplit() {
  return (
    <section style={{ padding: 'clamp(48px, 8vw, 72px)', background: 'var(--bgLight)' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          alignItems: 'flex-start'
        }}>
          {/* Left Column - PROCHAIN RENDEZ-VOUS Card */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            padding: '2rem'
          }}>
            <h3 style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '1.2rem',
              color: 'var(--navy)',
              marginBottom: '1rem',
              fontWeight: '600'
            }}>
              PROCHAIN RENDEZ-VOUS
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--textDark)', marginBottom: '0.5rem' }}>Dimanche</p>
            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.5rem', color: 'var(--navy)', fontWeight: 'bold', marginBottom: '0.5rem' }}>Culte principal</p>
            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.8rem', color: 'var(--gold)', fontWeight: 'bold', marginBottom: '1.5rem' }}>Chaque dimanche à 8h30</p>
            <p style={{ fontSize: '0.9rem', color: 'var(--textDark)', marginBottom: '2rem' }}>4, Delmas 48, Port-au-Prince</p>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <HoverButton
                href="#"
                style={{
                  background: 'var(--gold)',
                  color: 'var(--navy)',
                  padding: '0.8rem 1.5rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  transition: 'background 0.3s ease',
                  display: 'inline-block'
                }}
              >
                Itinéraire
              </HoverButton>
              
              <HoverButton
                href="#"
                style={{
                  background: 'white',
                  color: 'var(--navy)',
                  padding: '0.8rem 1.5rem',
                  borderRadius: '8px',
                  border: '2px solid var(--navy)',
                  textDecoration: 'none',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  display: 'inline-block'
                }}
              >
                Ouvrir dans Google Maps
              </HoverButton>
            </div>
          </div>
          
          {/* Right Column - Vision, Mission, Valeurs Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Vision Card */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              padding: '1.5rem'
            }}>
              <h4 style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.1rem',
                color: 'var(--navy)',
                marginBottom: '0.8rem',
                fontWeight: '600'
              }}>
                Vision
              </h4>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.95rem',
                color: 'var(--textDark)',
                lineHeight: '1.5',
                margin: 0
              }}>
                Une Église qui brille dans le monde et agit comme le sel de la terre (Matthieu 5.13-16).
              </p>
            </div>

            {/* Mission Card */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              padding: '1.5rem'
            }}>
              <h4 style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.1rem',
                color: 'var(--navy)',
                marginBottom: '0.8rem',
                fontWeight: '600'
              }}>
                Mission
              </h4>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.95rem',
                color: 'var(--textDark)',
                lineHeight: '1.5',
                margin: 0
              }}>
                Former des disciples, annoncer la Bonne Nouvelle et répondre avec compassion aux besoins spirituels et sociaux de la communauté.
              </p>
            </div>

            {/* Valeurs Card */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              padding: '1.5rem'
            }}>
              <h4 style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.1rem',
                color: 'var(--navy)',
                marginBottom: '0.8rem',
                fontWeight: '600'
              }}>
                Valeurs
              </h4>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.95rem',
                color: 'var(--textDark)',
                lineHeight: '1.5',
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
