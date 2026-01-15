'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import './styles/variant-styles.css'

export default function VariantPage() {
  const [variant, setVariant] = useState('minimal-dark')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const variants = [
    { id: 'minimal-dark', name: 'Minimaliste Sombre', preview: '#000000 + #FFD700' },
    { id: 'gradient', name: 'Moderne Gradient', preview: 'Violet + Rose' },
    { id: 'corporate', name: 'Corporate Élégant', preview: 'Bleu + Blanc' },
    { id: 'warm', name: 'Chaleureux', preview: 'Orange + Doré' },
    { id: 'bold', name: 'Audacieux', preview: 'Cyan + Bleu' }
  ]

  const getVariantClass = () => {
    switch(variant) {
      case 'minimal-dark': return 'variant-minimal-dark'
      case 'gradient': return 'variant-gradient'
      case 'corporate': return 'variant-corporate'
      case 'warm': return 'variant-warm'
      case 'bold': return 'variant-bold'
      default: return 'variant-minimal-dark'
    }
  }

  const getHeroClass = () => {
    switch(variant) {
      case 'minimal-dark': return 'hero-minimal'
      case 'gradient': return 'hero-gradient'
      case 'corporate': return 'hero-corporate'
      case 'warm': return 'hero-warm'
      case 'bold': return 'hero-bold'
      default: return 'hero-minimal'
    }
  }

  return (
    <div className={`variant-${variant}`}>
      {/* Variant Selector */}
      <div style={{ 
        position: 'fixed', 
        top: '20px', 
        right: '20px', 
        zIndex: 1000,
        background: 'white',
        padding: '1rem',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem' }}>Style Variants</h4>
        {variants.map(v => (
          <button
            key={v.id}
            onClick={() => setVariant(v.id)}
            style={{
              display: 'block',
              width: '100%',
              padding: '0.5rem',
              margin: '0.25rem 0',
              border: variant === v.id ? '2px solid #007bff' : '1px solid #ddd',
              borderRadius: '6px',
              background: variant === v.id ? '#007bff' : 'white',
              color: variant === v.id ? 'white' : '#333',
              cursor: 'pointer',
              fontSize: '0.8rem'
            }}
          >
            {v.name}
          </button>
        ))}
      </div>

      {/* Navigation */}
      <header style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 999,
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(10px)',
        padding: '1rem 0'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>MEESL</div>
          <nav>
            <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }}>
              <li><Link href="/" style={{ textDecoration: 'none', color: '#333' }}>Accueil</Link></li>
              <li><Link href="/visite" style={{ textDecoration: 'none', color: '#333' }}>Visite</Link></li>
              <li><Link href="/regarder" style={{ textDecoration: 'none', color: '#333' }}>Regarder</Link></li>
              <li><Link href="/donner" style={{ textDecoration: 'none', color: '#333' }}>Donner</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className={`variant-hero ${getHeroClass()}`}>
        <div className="variant-hero-content">
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', margin: '0 0 1rem 0', fontWeight: 'bold' }}>
            Mission Église Évangélique<br/>Sel et Lumière
          </h1>
          <p style={{ fontSize: '1.2rem', margin: '0 0 2rem 0', opacity: 0.9 }}>
            Une église qui forme, restaure et envoie.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/visite" className="variant-button" style={{
              background: variant === 'minimal-dark' ? '#FFD700' : 
                         variant === 'gradient' ? '#fff' :
                         variant === 'corporate' ? '#3182CE' :
                         variant === 'warm' ? '#fff' : '#fff',
              color: variant === 'minimal-dark' ? '#000' : '#fff'
            }}>
              Nous rejoindre
            </Link>
            <Link href="/regarder" className="variant-button" style={{
              background: 'transparent',
              border: '2px solid',
              borderColor: variant === 'minimal-dark' ? '#FFD700' : '#fff',
              color: variant === 'minimal-dark' ? '#FFD700' : '#fff'
            }}>
              Regarder
            </Link>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section style={{ padding: '4rem 2rem', background: 'var(--bg-light, #F8FAFC)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
            <div className="variant-card">
              <h3>Vision</h3>
              <p>Une église qui brille dans le monde et agit comme le sel de la terre.</p>
            </div>
            <div className="variant-card">
              <h3>Mission</h3>
              <p>Annoncer l'Évangile avec amour et former les croyants pour le service.</p>
            </div>
            <div className="variant-card">
              <h3>Valeurs</h3>
              <p>Fidélité, intégrité, service, humilité et amour fraternel.</p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', margin: '0 0 2rem 0' }}>Prochain Culte</h2>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--accent, #3182CE)', margin: '1rem 0' }}>
              Dimanche 8h30
            </div>
            <p style={{ fontSize: '1.2rem', margin: '0 0 2rem 0' }}>
              4, Delmas 48, Haïti
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <Link href="/visite" className="variant-button">
                📍 Itinéraire
              </Link>
              <button className="variant-button">
                📅 Calendrier
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {['Jeunesse', 'Enfants', 'Femmes', 'Hommes', 'Évangélisation', 'Louange'].map((ministry) => (
              <div key={ministry} className="variant-card" style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                  {ministry === 'Jeunesse' && '🎓'}
                  {ministry === 'Enfants' && '👶'}
                  {ministry === 'Femmes' && '👩‍🦰'}
                  {ministry === 'Hommes' && '👨‍🦱'}
                  {ministry === 'Évangélisation' && '📣'}
                  {ministry === 'Louange' && '🎵'}
                </div>
                <h4>{ministry}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
