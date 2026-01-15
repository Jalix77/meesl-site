'use client'

import Link from 'next/link'
import LogoHeader from '../../components/LogoHeader'

export default function EvangelisationPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bgLight)', padding: '2rem 0' }}>
      <LogoHeader />
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem' }}>
        <Link href="/" style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          color: 'var(--navy)', 
          textDecoration: 'none', 
          fontFamily: 'Inter, sans-serif',
          fontWeight: '500',
          marginBottom: '2rem'
        }}>
          ← Retour aux ministères
        </Link>
        
        <div style={{ 
          position: 'relative', 
          overflow: 'hidden', 
          borderRadius: '16px', 
          marginBottom: '3rem',
          boxShadow: '0 15px 40px rgba(0, 0, 0, 0.1)'
        }}>
          <img 
            src="/images/ministries/evangelism.jpg" 
            alt="Ministère Évangélisation"
            style={{
              width: '100%',
              height: '400px',
              objectFit: 'cover'
            }}
          />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(to bottom, rgba(11, 19, 32, 0.2) 0%, rgba(11, 19, 32, 0.95) 100%)',
            padding: '3rem 2rem',
            color: 'white'
          }}>
            <h1 style={{ 
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2.5rem',
              fontWeight: '800',
              margin: '0 0 0.5rem 0',
              textShadow: '0 3px 6px rgba(0, 0, 0, 0.4)'
            }}>
              Ministère Évangélisation
            </h1>
            <p style={{ 
              fontFamily: 'Inter, sans-serif',
              fontSize: '1.1rem',
              opacity: '0.9',
              margin: 0
            }}>
              📣 Proclamer l'Évangile à notre génération
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem', marginBottom: '3rem' }}>
          <div>
            <h2 style={{ 
              fontFamily: 'Poppins, sans-serif',
              color: 'var(--navy)',
              fontSize: '1.8rem',
              fontWeight: '700',
              marginBottom: '1rem'
            }}>
              À propos du ministère
            </h2>
            <p style={{ 
              fontFamily: 'Inter, sans-serif',
              fontSize: '1.1rem',
              lineHeight: '1.7',
              color: 'var(--textDark)',
              marginBottom: '2rem'
            }}>
              Le ministère évangélisation de MEESL est le cœur battant de notre mission. 
              Nous sommes appelés à aller faire des disciples, à partager l'amour de Christ 
              et à transformer nos communautés par la puissance de l'Évangile.
            </p>
            
            <h3 style={{ 
              fontFamily: 'Poppins, sans-serif',
              color: 'var(--navy)',
              fontSize: '1.3rem',
              fontWeight: '600',
              marginBottom: '1rem'
            }}>
              Nos activités
            </h3>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              marginBottom: '2rem'
            }}>
              <li style={{ 
                fontFamily: 'Inter, sans-serif',
                fontSize: '1rem',
                color: 'var(--textDark)',
                padding: '0.8rem 0',
                paddingLeft: '2rem',
                position: 'relative',
                lineHeight: '1.6'
              }}>
                <span style={{ 
                  position: 'absolute',
                  left: 0,
                  color: 'var(--gold)',
                  fontWeight: 'bold',
                  fontSize: '1.2rem'
                }}>•</span>
                Évangélisation de rue
              </li>
              <li style={{ 
                fontFamily: 'Inter, sans-serif',
                fontSize: '1rem',
                color: 'var(--textDark)',
                padding: '0.8rem 0',
                paddingLeft: '2rem',
                position: 'relative',
                lineHeight: '1.6'
              }}>
                <span style={{ 
                  position: 'absolute',
                  left: 0,
                  color: 'var(--gold)',
                  fontWeight: 'bold',
                  fontSize: '1.2rem'
                }}>•</span>
                Distribution de tracts
              </li>
              <li style={{ 
                fontFamily: 'Inter, sans-serif',
                fontSize: '1rem',
                color: 'var(--textDark)',
                padding: '0.8rem 0',
                paddingLeft: '2rem',
                position: 'relative',
                lineHeight: '1.6'
              }}>
                <span style={{ 
                  position: 'absolute',
                  left: 0,
                  color: 'var(--gold)',
                  fontWeight: 'bold',
                  fontSize: '1.2rem'
                }}>•</span>
                Campagnes d'outreach
              </li>
              <li style={{ 
                fontFamily: 'Inter, sans-serif',
                fontSize: '1rem',
                color: 'var(--textDark)',
                padding: '0.8rem 0',
                paddingLeft: '2rem',
                position: 'relative',
                lineHeight: '1.6'
              }}>
                <span style={{ 
                  position: 'absolute',
                  left: 0,
                  color: 'var(--gold)',
                  fontWeight: 'bold',
                  fontSize: '1.2rem'
                }}>•</span>
                Formation d'évangélistes
              </li>
            </ul>
          </div>

          <div>
            <h3 style={{ 
              fontFamily: 'Poppins, sans-serif',
              color: 'var(--navy)',
              fontSize: '1.3rem',
              fontWeight: '600',
              marginBottom: '1rem'
            }}>
              Informations pratiques
            </h3>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span style={{ 
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.9rem',
                  color: 'var(--white70)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontWeight: '600'
                }}>
                  RENDEZ-VOUS
                </span>
                <span style={{ 
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.1rem',
                  color: 'var(--navy)',
                  fontWeight: '600'
                }}>
                  Samedis 14h
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span style={{ 
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.9rem',
                  color: 'var(--white70)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontWeight: '600'
                }}>
                  LIEU
                </span>
                <span style={{ 
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.1rem',
                  color: 'var(--navy)',
                  fontWeight: '600'
                }}>
                  Point de rencontre, Église MEESL
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span style={{ 
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.9rem',
                  color: 'var(--white70)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontWeight: '600'
                }}>
                  PUBLIC
                </span>
                <span style={{ 
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.1rem',
                  color: 'var(--navy)',
                  fontWeight: '600'
                }}>
                  Ouvert à tous
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span style={{ 
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.9rem',
                  color: 'var(--white70)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontWeight: '600'
                }}>
                  RESPONSABLE
                </span>
                <span style={{ 
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.1rem',
                  color: 'var(--navy)',
                  fontWeight: '600'
                }}>
                  Équipe Évangélisation
                </span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link 
            href="/contact" 
            style={{
              display: 'inline-block',
              padding: '1rem 2rem',
              textDecoration: 'none',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '600',
              fontSize: '1rem',
              background: 'var(--gold)',
              color: 'var(--navy)',
              boxShadow: '0 8px 25px rgba(245, 179, 1, 0.3)',
              transition: 'all 0.3s ease',
              textAlign: 'center'
            }}
          >
            Participer
          </Link>
          
          <Link 
            href="/" 
            style={{
              display: 'inline-block',
              padding: '1rem 2rem',
              textDecoration: 'none',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '600',
              fontSize: '1rem',
              background: 'transparent',
              color: 'var(--navy)',
              border: '2px solid var(--navy)',
              transition: 'all 0.3s ease',
              textAlign: 'center'
            }}
          >
            Voir d'autres ministères
          </Link>
        </div>
      </div>
    </div>
  )
}
