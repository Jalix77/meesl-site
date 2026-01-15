'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

export default function MemberDashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Chargement...</div>
  }

  if (!session) {
    return null
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
              <li><Link href="/mon-compte">Mon compte</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <section style={{ padding: '4rem 0', minHeight: '60vh' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="card" style={{ padding: '2rem' }}>
              <h1 style={{ color: 'var(--brown)', marginBottom: '1rem' }}>
                Bienvenue, {session.user.name}!
              </h1>
              <p style={{ color: '#666', marginBottom: '2rem' }}>
                Tableau de bord de votre compte membre
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <Link href="/mon-compte/profil" className="card" style={{ textDecoration: 'none', color: 'inherit', display: 'block', padding: '1.5rem', backgroundColor: 'var(--offwhite)' }}>
                  <h3 style={{ color: 'var(--orange)', marginBottom: '0.5rem' }}>👤 Mon profil</h3>
                  <p style={{ fontSize: '0.9rem' }}>Gérer mes informations personnelles</p>
                </Link>

                <Link href="/mon-compte/evenements" className="card" style={{ textDecoration: 'none', color: 'inherit', display: 'block', padding: '1.5rem', backgroundColor: 'var(--offwhite)' }}>
                  <h3 style={{ color: 'var(--orange)', marginBottom: '0.5rem' }}>📅 Mes événements</h3>
                  <p style={{ fontSize: '0.9rem' }}>Voir mes inscriptions aux événements</p>
                </Link>

                <Link href="/mon-compte/groupes" className="card" style={{ textDecoration: 'none', color: 'inherit', display: 'block', padding: '1.5rem', backgroundColor: 'var(--offwhite)' }}>
                  <h3 style={{ color: 'var(--orange)', marginBottom: '0.5rem' }}>🎯 Mes groupes</h3>
                  <p style={{ fontSize: '0.9rem' }}>Voir mes groupes de participation</p>
                </Link>

                <Link href="/mon-compte/dons" className="card" style={{ textDecoration: 'none', color: 'inherit', display: 'block', padding: '1.5rem', backgroundColor: 'var(--offwhite)' }}>
                  <h3 style={{ color: 'var(--orange)', marginBottom: '0.5rem' }}>💝 Mes dons</h3>
                  <p style={{ fontSize: '0.9rem' }}>Consulter l'historique de mes dons</p>
                </Link>

                <Link href="/mon-compte/contributions" className="card" style={{ textDecoration: 'none', color: 'inherit', display: 'block', padding: '1.5rem', backgroundColor: 'var(--offwhite)' }}>
                  <h3 style={{ color: 'var(--orange)', marginBottom: '0.5rem' }}>📊 Relevés de contribution</h3>
                  <p style={{ fontSize: '0.9rem' }}>Télécharger mes relevés fiscaux</p>
                </Link>

                <Link href="/mon-compte/annuaire" className="card" style={{ textDecoration: 'none', color: 'inherit', display: 'block', padding: '1.5rem', backgroundColor: 'var(--offwhite)' }}>
                  <h3 style={{ color: 'var(--orange)', marginBottom: '0.5rem' }}>📖 Annuaire des membres</h3>
                  <p style={{ fontSize: '0.9rem' }}>Consulter l'annuaire des membres</p>
                </Link>

                {session.user.role === 'admin' && (
                  <Link href="/admin" className="card" style={{ textDecoration: 'none', color: 'inherit', display: 'block', padding: '1.5rem', backgroundColor: 'var(--orange)' }}>
                    <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>⚙️ Administration</h3>
                    <p style={{ fontSize: '0.9rem', color: 'white' }}>Accéder au panneau d'administration</p>
                  </Link>
                )}
              </div>

              <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'var(--sand)', borderRadius: '4px' }}>
                <p style={{ marginBottom: '1rem' }}>
                  Connecté en tant que: <strong>{session.user.email}</strong><br/>
                  Rôle: <strong>{session.user.role === 'admin' ? 'Administrateur' : session.user.role === 'leader' ? 'Leader' : 'Membre'}</strong>
                </p>
                <button 
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="btn btn-secondary"
                >
                  Se déconnecter
                </button>
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
