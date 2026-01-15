'use client'

import Link from 'next/link'

export default function Hero() {
  return (
    <section className="meesl-hero">
      {/* Background Image */}
      <div className="meesl-hero__bg" style={{
        backgroundImage: 'url(/images/hero-worship.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }} />
      
      {/* Overlay */}
      <div className="meesl-hero__overlay" />
      
      {/* Glow Effect */}
      <div className="meesl-hero__glow" />

      {/* Content */}
      <div className="meesl-hero__content">
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
          <Link 
            href="/"
            style={{ 
              textDecoration: 'none',
              display: 'block'
            }}
          >
            <img 
              src="/images/LOGO_MEESL.png" 
              alt="MEESL Logo"
              style={{
                width: '120px',
                height: '120px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
                cursor: 'pointer',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            />
          </Link>
          <div>
            <h1 className="meesl-hero__title">
              Mission Église Évangélique<br/>Sel et Lumière
            </h1>
            
            <p className="meesl-hero__subtitle">
              Une église qui forme, restaure et envoie.
            </p>

            <div className="meesl-hero__cta">
              <Link href="/visite" className="btn btn-primary">
                Nous rejoindre ce dimanche
              </Link>
              
              <Link href="/regarder" className="btn btn-secondary">
                Regarder un message
              </Link>
            </div>
          </div>
        </div>
        
        <div className="meesl-hero__spacer" />
      </div>

      {/* Glass Cards Info Row */}
      <div className="meesl-hero__infoRow">
        <div className="glassCard">
          <div className="glassCard__icon">
            🕐
          </div>
          <div>
            <div className="glassCard__kicker">Dimanche</div>
            <div className="glassCard__value">8h30</div>
            <div className="glassCard__desc">Culte principal</div>
          </div>
        </div>

        <div className="glassCard">
          <div className="glassCard__icon">
            📖
          </div>
          <div>
            <div className="glassCard__kicker">Mercredi</div>
            <div className="glassCard__value">17h</div>
            <div className="glassCard__desc">Étude biblique</div>
          </div>
        </div>

        <div className="glassCard">
          <div className="glassCard__icon">
            📍
          </div>
          <div>
            <div className="glassCard__kicker">Adresse</div>
            <div className="glassCard__value">4, Delmas 48</div>
            <div className="glassCard__desc">Port-au-Prince</div>
          </div>
        </div>
      </div>
    </section>
  )
}