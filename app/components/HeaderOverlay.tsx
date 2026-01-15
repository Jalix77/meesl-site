'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function HeaderOverlay() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header 
      className={`header-overlay ${isScrolled ? 'scrolled' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: isScrolled ? 'rgba(11, 19, 32, 0.95)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        transition: 'all 0.3s ease'
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem' }}>
        <Link href="/" style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none' }}>
          MEESL
        </Link>

        {/* Desktop Menu */}
        <nav className="desktop-nav" style={{ display: 'none' }}>
          <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }}>
            <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Link href="/visite" style={{ color: 'white', textDecoration: 'none', transition: 'color 0.3s' }}>Planifier une visite</Link>
              <Link href="/donner" style={{ 
                textDecoration: 'none', 
                transition: 'all 0.3s',
                background: 'var(--gold)',
                color: 'var(--navy)',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '0.9rem'
              }}>Faire un don</Link>
            </li>
            <li><Link href="/regarder" style={{ color: 'white', textDecoration: 'none', transition: 'color 0.3s' }}>Regarder</Link></li>
            <li><Link href="/a-propos" style={{ color: 'white', textDecoration: 'none', transition: 'color 0.3s' }}>À propos</Link></li>
            <li><Link href="/contact" style={{ color: 'white', textDecoration: 'none', transition: 'color 0.3s' }}>Contact</Link></li>
            <li><Link href="/ressources" style={{ color: 'white', textDecoration: 'none', transition: 'color 0.3s' }}>Ressources</Link></li>
            <li><Link href="/login" style={{ color: 'white', textDecoration: 'none', transition: 'color 0.3s' }}>Connexion</Link></li>
          </ul>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '1.5rem',
            cursor: 'pointer',
            display: 'block'
          }}
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu" style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(11, 19, 32, 0.98)',
            backdropFilter: 'blur(10px)',
            padding: '2rem'
          }}>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', listStyle: 'none', margin: 0, padding: 0 }}>
              <li><Link href="/visite" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'white', textDecoration: 'none' }}>Planifier une visite</Link></li>
              <li><Link href="/regarder" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'white', textDecoration: 'none' }}>Regarder</Link></li>
              <li><Link href="/donner" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'white', textDecoration: 'none' }}>Donner</Link></li>
              <li><Link href="/a-propos" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'white', textDecoration: 'none' }}>À propos</Link></li>
              <li><Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'white', textDecoration: 'none' }}>Contact</Link></li>
              <li><Link href="/ressources" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'white', textDecoration: 'none' }}>Ressources</Link></li>
              <li><Link href="/login" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'white', textDecoration: 'none' }}>Connexion</Link></li>
            </ul>
          </div>
        )}
      </div>

      <style jsx>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: block !important;
          }
          .mobile-menu-toggle {
            display: none !important;
          }
        }
        
        .desktop-nav a:hover {
          color: var(--gold) !important;
        }
      `}</style>
    </header>
  )
}
