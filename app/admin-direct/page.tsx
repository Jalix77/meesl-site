'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface User {
  id: string
  email: string
  name: string
  role: string
}

export default function AdminDirectAccess() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  // Vérifier si déjà authentifié
  useEffect(() => {
    const storedAuth = localStorage.getItem('adminAuth')
    if (storedAuth) {
      const auth = JSON.parse(storedAuth)
      setUser(auth.user)
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Simulation d'authentification directe
      if (email === 'meesl1410@gmail.com' && password === 'admin123') {
        const userData: User = {
          id: '1',
          email: 'meesl1410@gmail.com',
          name: 'Jean Alix Pierre',
          role: 'admin'
        }
        
        setUser(userData)
        setIsAuthenticated(true)
        localStorage.setItem('adminAuth', JSON.stringify({ user: userData, timestamp: Date.now() }))
        
        // Rediriger vers le dashboard admin
        router.push('/admin/dashboard')
      } else {
        setError('Email ou mot de passe incorrect')
      }
    } catch (error) {
      setError('Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    setUser(null)
    setIsAuthenticated(false)
  }

  if (isAuthenticated && user) {
    return (
      <div style={{ minHeight: '100vh', background: '#f5f5f5', fontFamily: 'Arial, sans-serif' }}>
        {/* Header */}
        <div style={{ background: '#fff', padding: '1rem 2rem', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ color: '#333', margin: 0 }}>Dashboard Admin MEESL</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: '#666' }}>{user.name}</span>
            <button 
              onClick={handleLogout}
              style={{ padding: '0.5rem 1rem', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
              Déconnexion
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ padding: '2rem' }}>
          <h2 style={{ color: '#333', marginBottom: '2rem' }}>Panneau d'Administration</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div style={{ background: '#fff', padding: '2rem', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              <h3 style={{ color: '#007bff', marginBottom: '1rem' }}>📝 Gestion du Contenu</h3>
              <p style={{ color: '#666', marginBottom: '1rem' }}>Modifier les pages et sections du site</p>
              <Link href="/admin-content" style={{ 
                display: 'inline-block',
                padding: '0.5rem 1rem', 
                background: '#007bff', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: 'pointer',
                textDecoration: 'none',
                textAlign: 'center'
              }}>
                Accéder
              </Link>
            </div>

            <div style={{ background: '#fff', padding: '2rem', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              <h3 style={{ color: '#28a745', marginBottom: '1rem' }}>📁 Gestion des Fichiers</h3>
              <p style={{ color: '#666', marginBottom: '1rem' }}>Uploader et gérer les fichiers du site</p>
              <Link href="/admin-files" style={{ 
                display: 'inline-block',
                padding: '0.5rem 1rem', 
                background: '#28a745', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: 'pointer',
                textDecoration: 'none',
                textAlign: 'center'
              }}>
                Accéder
              </Link>
            </div>

            <div style={{ background: '#fff', padding: '2rem', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              <h3 style={{ color: '#ffc107', marginBottom: '1rem' }}>⚙️ Paramètres</h3>
              <p style={{ color: '#666', marginBottom: '1rem' }}>Configurer les paramètres du site</p>
              <Link href="/admin-settings" style={{ 
                display: 'inline-block',
                padding: '0.5rem 1rem', 
                background: '#ffc107', 
                color: '#333', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: 'pointer',
                textDecoration: 'none',
                textAlign: 'center'
              }}>
                Accéder
              </Link>
            </div>

            <div style={{ background: '#fff', padding: '2rem', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              <h3 style={{ color: '#dc3545', marginBottom: '1rem' }}>👥 Membres</h3>
              <p style={{ color: '#666', marginBottom: '1rem' }}>Gérer les membres de l'église</p>
              <Link href="/admin-members" style={{ 
                display: 'inline-block',
                padding: '0.5rem 1rem', 
                background: '#dc3545', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: 'pointer',
                textDecoration: 'none',
                textAlign: 'center'
              }}>
                Accéder
              </Link>
            </div>

            <div style={{ background: '#fff', padding: '2rem', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              <h3 style={{ color: '#6f42c1', marginBottom: '1rem' }}>💝 Dons</h3>
              <p style={{ color: '#666', marginBottom: '1rem' }}>Suivre et gérer les dons</p>
              <Link href="/admin-donations" style={{ 
                display: 'inline-block',
                padding: '0.5rem 1rem', 
                background: '#6f42c1', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: 'pointer',
                textDecoration: 'none',
                textAlign: 'center'
              }}>
                Accéder
              </Link>
            </div>

            <div style={{ background: '#fff', padding: '2rem', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              <h3 style={{ color: '#fd7e14', marginBottom: '1rem' }}>📅 Événements</h3>
              <p style={{ color: '#666', marginBottom: '1rem' }}>Organiser et gérer les événements</p>
              <Link href="/admin-events" style={{ 
                display: 'inline-block',
                padding: '0.5rem 1rem', 
                background: '#fd7e14', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: 'pointer',
                textDecoration: 'none',
                textAlign: 'center'
              }}>
                Accéder
              </Link>
            </div>
          </div>

          <div style={{ marginTop: '3rem', textAlign: 'center' }}>
            <a href="/" style={{ color: '#007bff', textDecoration: 'none' }}>
              ← Retour au site public
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ 
        background: 'white', 
        padding: '2rem', 
        borderRadius: '10px', 
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '2rem' }}>
          Connexion Admin MEESL
        </h1>

        <div style={{ 
          background: '#e3f2fd', 
          border: '1px solid #bbdefb', 
          padding: '1rem', 
          borderRadius: '5px', 
          marginBottom: '1rem',
          fontSize: '0.9rem',
          color: '#1565c0'
        }}>
          <strong>Accès Direct Admin</strong><br/>
          Email: meesl1410@gmail.com<br/>
          Mot de passe: admin123
        </div>

        {error && (
          <div style={{ 
            background: '#fee', 
            border: '1px solid #fcc', 
            color: '#c33', 
            padding: '0.75rem', 
            borderRadius: '5px', 
            marginBottom: '1rem' 
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', color: '#555' }}>
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '1rem'
              }}
              placeholder="meesl1410@gmail.com"
            />
          </div>

          <div>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', color: '#555' }}>
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '1rem'
              }}
              placeholder="admin123"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            style={{
              marginTop: '1rem',
              padding: '0.75rem',
              background: loading ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '1rem',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', color: '#666' }}>
          <p>
            <a href="/" style={{ color: '#007bff', textDecoration: 'none' }}>
              ← Retour au site
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
