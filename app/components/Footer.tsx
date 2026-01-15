'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--navy)',
      color: 'white',
      padding: '4rem 0 2rem'
    }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px), 1fr))',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          {/* Logo and Description */}
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <img 
                src="/images/LOGO_MEESL.png" 
                alt="MEESL Logo"
                style={{
                  width: '80px',
                  height: '80px',
                  objectFit: 'contain',
                  marginBottom: '1rem'
                }}
              />
            </div>
            <h3 style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '1.2rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: 'white'
            }}>
              Mission Église Évangélique<br/>Sel et Lumière
            </h3>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1rem',
              lineHeight: '1.6',
              margin: '0 0 1.5rem 0',
              color: 'var(--white90)'
            }}>
              Une église qui forme, restaure et envoie.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              <Link 
                href="https://facebook.com" 
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--white70)',
                  textDecoration: 'none',
                  fontSize: '1.2rem',
                  transition: 'color 0.3s ease'
                }}
              >
                📘
              </Link>
              <Link 
                href="https://instagram.com" 
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--white70)',
                  textDecoration: 'none',
                  fontSize: '1.2rem',
                  transition: 'color 0.3s ease'
                }}
              >
                📷
              </Link>
              <Link 
                href="https://youtube.com" 
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--white70)',
                  textDecoration: 'none',
                  fontSize: '1.2rem',
                  transition: 'color 0.3s ease'
                }}
              >
                📹
              </Link>
              <Link 
                href="https://twitter.com" 
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--white70)',
                  textDecoration: 'none',
                  fontSize: '1.2rem',
                  transition: 'color 0.3s ease'
                }}
              >
                🐦
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '1.2rem',
              fontWeight: '600',
              marginBottom: '1.5rem',
              color: 'white'
            }}>
              Liens Rapides
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li style={{ marginBottom: '0.8rem' }}>
                <Link 
                  href="/visite" 
                  style={{
                    color: 'var(--white70)',
                    textDecoration: 'none',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '1rem',
                    transition: 'color 0.3s ease'
                  }}
                >
                  Planifier une visite
                </Link>
              </li>
              <li style={{ marginBottom: '0.8rem' }}>
                <Link 
                  href="/regarder" 
                  style={{
                    color: 'var(--white70)',
                    textDecoration: 'none',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '1rem',
                    transition: 'color 0.3s ease'
                  }}
                >
                  Regarder les cultes
                </Link>
              </li>
              <li style={{ marginBottom: '0.8rem' }}>
                <Link 
                  href="/a-propos" 
                  style={{
                    color: 'var(--white70)',
                    textDecoration: 'none',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '1rem',
                    transition: 'color 0.3s ease'
                  }}
                >
                  À propos
                </Link>
              </li>
              <li style={{ marginBottom: '0.8rem' }}>
                <Link 
                  href="/contact" 
                  style={{
                    color: 'var(--white70)',
                    textDecoration: 'none',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '1rem',
                    transition: 'color 0.3s ease'
                  }}
                >
                  Contact
                </Link>
              </li>
              <li style={{ marginBottom: '0.8rem' }}>
                <Link 
                  href="/ressources" 
                  style={{
                    color: 'var(--white70)',
                    textDecoration: 'none',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '1rem',
                    transition: 'color 0.3s ease'
                  }}
                >
                  Ressources
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Hours */}
          <div>
            <h3 style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '1.2rem',
              fontWeight: '600',
              marginBottom: '1.5rem',
              color: 'white'
            }}>
              Horaires
            </h3>
            <div style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1rem',
              lineHeight: '1.6',
              color: 'var(--white90)'
            }}>
              <p style={{ margin: '0 0 0.5rem 0' }}>
                <strong>Dimanche:</strong> 8h30 - 10h30
              </p>
              <p style={{ margin: '0 0 0.5rem 0' }}>
                <strong>Mercredi:</strong> 17h - 19h
              </p>
              <p style={{ margin: '0 0 0.5rem 0' }}>
                <strong>Étude biblique:</strong> En ligne
              </p>
              <p style={{ margin: '0 0 1.5rem 0' }}>
                <strong>Jeunesse:</strong> Samedi 15h
              </p>
              <p style={{ margin: '0 0 1.5rem 0' }}>
                <strong>Femmes:</strong> 2e et 4e samedis
              </p>
            </div>
          </div>

          {/* Contact and Donate */}
          <div>
            <h3 style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '1.2rem',
              fontWeight: '600',
              marginBottom: '1.5rem',
              color: 'white'
            }}>
              Contact
            </h3>
            <div style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1rem',
              lineHeight: '1.6',
              color: 'var(--white90)',
              marginBottom: '1.5rem'
            }}>
              <p style={{ margin: '0 0 0.5rem 0' }}>
                📍 4, Delmas 48<br />
                Port-au-Prince, Haïti
              </p>
              <p style={{ margin: '0 0 0.5rem 0' }}>
                📱 +509 37 97 1717
              </p>
              <p style={{ margin: '0 0 1.5rem 0' }}>
                📧 contact@meesl.org
              </p>
            </div>
            <Link 
              href="/donner"
              style={{
                background: 'var(--gold)',
                color: 'var(--navy)',
                padding: '1rem 2rem',
                borderRadius: '12px',
                textDecoration: 'none',
                fontFamily: 'Inter, sans-serif',
                fontWeight: '600',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                display: 'inline-block',
                textAlign: 'center',
                boxShadow: '0 4px 12px rgba(245, 179, 1, 0.3)'
              }}
            >
              💝 Faire un don
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div style={{
          textAlign: 'center',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          color: 'var(--white70)',
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.9rem'
        }}>
          <p>&copy; 2024 Mission Église Évangélique Sel et Lumière. Tous droits réservés.</p>
          <p style={{ margin: '0.5rem 0 0 0' }}>
            <Link 
              href="/privacy" 
              style={{
                color: 'var(--white70)',
                textDecoration: 'none',
                margin: '0 1rem',
                transition: 'color 0.3s ease'
              }}
            >
              Politique de confidentialité
            </Link>
            <Link 
              href="/terms" 
              style={{
                color: 'var(--white70)',
                textDecoration: 'none',
                margin: '0 1rem',
                transition: 'color 0.3s ease'
              }}
            >
              Conditions d'utilisation
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
