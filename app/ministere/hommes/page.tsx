'use client'

import Link from 'next/link'
import LogoHeader from '../../components/LogoHeader'

export default function HommesPage() {
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
            src="/images/ministries/men.jpg" 
            alt="Ministère Hommes"
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
              Ministère Hommes
            </h1>
            <p style={{ 
              fontFamily: 'Inter, sans-serif',
              fontSize: '1.1rem',
              opacity: '0.9',
              margin: 0
            }}>
              👨‍🦱 Former des hommes de caractère et d'intégrité
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
              Le ministère hommes de MEESL vise à développer des hommes forts dans la foi, 
              responsables dans leurs familles et influents dans leur communauté. Nous croyons au 
              pouvoir de la fraternité pour transformer des vies et bâtir des foyers solides.
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
                Petits déjeuners d'hommes
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
                Groupes de responsabilité
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
                Ateliers de leadership
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
                Retraites spirituelles annuelles
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
                  1er samedi du mois
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
                  Salle conférence, Église MEESL
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
                  Hommes 18 ans et plus
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
                  Pasteur Jean
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
            Nous rejoindre
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
