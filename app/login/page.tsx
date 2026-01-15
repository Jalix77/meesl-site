'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      console.log('Tentative de connexion avec:', email)
      
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      console.log('Résultat de connexion:', result)

      if (result?.error) {
        console.error('Erreur de connexion:', result.error)
        setError('Email ou mot de passe incorrect')
      } else if (result?.ok) {
        console.log('Connexion réussie!')
        // Récupérer la session pour vérifier le rôle
        const response = await fetch('/api/auth/session')
        const session = await response.json()
        
        console.log('Session utilisateur:', session)
        
        if (session?.user?.role === 'admin') {
          console.log('Redirection vers admin')
          router.push('/admin')
        } else {
          console.log('Redirection vers mon-compte')
          router.push('/mon-compte')
        }
        router.refresh()
      } else {
        console.error('Pas de résultat de connexion')
        setError('Une erreur est survenue. Veuillez réessayer.')
      }
    } catch (error) {
      console.error('Erreur de connexion:', error)
      setError('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="container">
          <nav className="nav">
            <div className="logo">
              <h1>MEESL</h1>
            </div>
            <ul className="nav-links">
              <li><Link href="/">Accueil</Link></li>
              <li><Link href="/visite">Planifier une visite</Link></li>
              <li><Link href="/regarder">Regarder</Link></li>
              <li><Link href="/donner">Donner</Link></li>
              <li><Link href="/a-propos">À propos</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/ressources">Ressources</Link></li>
              <li><Link href="/login">Connexion</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <section style={{ padding: '4rem 0', minHeight: '60vh' }}>
        <div className="container">
          <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <div className="card" style={{ padding: '2rem' }}>
              <h1 style={{ textAlign: 'center', color: 'var(--brown)', marginBottom: '2rem' }}>
                Connexion
              </h1>

              {error && <div className="error">{error}</div>}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Mot de passe</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>

                <button type="submit" className="btn" disabled={loading} style={{ marginTop: '1rem' }}>
                  {loading ? 'Connexion...' : 'Se connecter'}
                </button>
              </form>

              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <p>
                  Pas encore de compte?{' '}
                  <Link href="/register" style={{ color: 'var(--orange)' }}>
                    Créer un compte
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div>
              <h3>MEESL</h3>
              <p>Mission Église Évangélique Sel et Lumière</p>
              <p>4, Delmas 48, Haïti</p>
              <p>WhatsApp: +509 37 97 1717</p>
            </div>
            <div>
              <h4>Liens rapides</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li><Link href="/visite">Planifier une visite</Link></li>
                <li><Link href="/donner">Faire un don</Link></li>
                <li><Link href="/contact">Nous contacter</Link></li>
                <li><Link href="/ressources">Ressources</Link></li>
              </ul>
            </div>
            <div>
              <h4>Horaires</h4>
              <p>Dimanche: 7h-10h30 AM</p>
              <p>Lundi: 5h-7h PM (Prière)</p>
              <p>Mercredi: 5h-7h PM (Étude biblique)</p>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
            <p>&copy; 2024 Mission Église Évangélique Sel et Lumière. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
