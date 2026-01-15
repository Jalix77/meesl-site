'use client'

export default function Testimonials() {
  return (
    <section style={{ padding: 'clamp(48px, 8vw, 72px)', background: 'var(--bgLight)' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <blockquote style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '1.5rem',
            lineHeight: '1.7',
            color: 'var(--textDark)',
            fontStyle: 'italic',
            marginBottom: '2rem',
            position: 'relative',
            padding: '0 3rem'
          }}>
            <span style={{
              position: 'absolute',
              top: '-1rem',
              left: '0',
              fontSize: '4rem',
              color: 'var(--gold)',
              opacity: 0.3,
              fontFamily: 'Georgia, serif'
            }}>
              "
            </span>
            
            Dieu a transformé ma vie à travers la MEESL, et j'ai trouvé une famille spirituelle qui m'encourage à chaque instant.
            
            <span style={{
              position: 'absolute',
              bottom: '-2rem',
              right: '0',
              fontSize: '4rem',
              color: 'var(--gold)',
              opacity: 0.3,
              fontFamily: 'Georgia, serif'
            }}>
              "
            </span>
          </blockquote>
          
          <cite style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '1.2rem',
            fontWeight: '600',
            color: 'var(--navy)',
            fontStyle: 'normal',
            marginBottom: '0.5rem'
          }}>
            Sr Jennifer
          </cite>
        </div>
      </div>
    </section>
  )
}
