'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

export default function AdminDashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated' && session.user.role !== 'admin') {
      router.push('/mon-compte')
    }
  }, [status, session, router])

  if (status === 'loading') {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Chargement...</div>
  }

  if (!session || session.user.role !== 'admin') {
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
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="card" style={{ padding: '2rem' }}>
              <h1 style={{ color: 'var(--brown)', marginBottom: '1rem' }}>
                Panneau d'administration
              </h1>
              <p style={{ color: '#666', marginBottom: '2rem' }}>
                Gérez les membres, les dons, les groupes et les événements de l'église
              </p>

              <div className="admin-nav">
                <ul>
                  <li><Link href="/admin/contenu">📝 Contenu</Link></li>
                  <li><Link href="/admin/fichiers">📁 Fichiers</Link></li>
                  <li><Link href="/admin/parametres">⚙️ Paramètres</Link></li>
                  <li><Link href="/admin/membres">👥 Membres</Link></li>
                  <li><Link href="/admin/dons">💝 Dons</Link></li>
                  <li><Link href="/admin/groupes">👥 Groupes</Link></li>
                  <li><Link href="/admin/evenements">📅 Événements</Link></li>
                </ul>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
                <Link href="/admin/contenu" className="card" style={{ textDecoration: 'none', color: 'inherit', display: 'block', padding: '2rem', backgroundColor: 'var(--offwhite)', textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
                  <h3 style={{ color: 'var(--orange)', marginBottom: '0.5rem' }}>Gestion du Contenu</h3>
                  <p style={{ fontSize: '0.9rem' }}>Modifier les pages et sections du site</p>
                </Link>

                <Link href="/admin/fichiers" className="card" style={{ textDecoration: 'none', color: 'inherit', display: 'block', padding: '2rem', backgroundColor: 'var(--offwhite)', textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📁</div>
                  <h3 style={{ color: 'var(--orange)', marginBottom: '0.5rem' }}>Gestion des Fichiers</h3>
                  <p style={{ fontSize: '0.9rem' }}>Uploader et gérer les fichiers du site</p>
                </Link>

                <Link href="/admin/parametres" className="card" style={{ textDecoration: 'none', color: 'inherit', display: 'block', padding: '2rem', backgroundColor: 'var(--offwhite)', textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚙️</div>
                  <h3 style={{ color: 'var(--orange)', marginBottom: '0.5rem' }}>Paramètres</h3>
                  <p style={{ fontSize: '0.9rem' }}>Configurer les paramètres du site</p>
                </Link>

                <Link href="/admin/membres" className="card" style={{ textDecoration: 'none', color: 'inherit', display: 'block', padding: '2rem', backgroundColor: 'var(--offwhite)', textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👥</div>
                  <h3 style={{ color: 'var(--orange)', marginBottom: '0.5rem' }}>Gestion des membres</h3>
                  <p style={{ fontSize: '0.9rem' }}>Ajouter, modifier et gérer les membres de l'église</p>
                </Link>

                <Link href="/admin/dons" className="card" style={{ textDecoration: 'none', color: 'inherit', display: 'block', padding: '2rem', backgroundColor: 'var(--offwhite)', textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💝</div>
                  <h3 style={{ color: 'var(--orange)', marginBottom: '0.5rem' }}>Gestion des dons</h3>
                  <p style={{ fontSize: '0.9rem' }}>Suivre et gérer les dons et contributions</p>
                </Link>

                <Link href="/admin/groupes" className="card" style={{ textDecoration: 'none', color: 'inherit', display: 'block', padding: '2rem', backgroundColor: 'var(--offwhite)', textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
                  <h3 style={{ color: 'var(--orange)', marginBottom: '0.5rem' }}>Gestion des groupes</h3>
                  <p style={{ fontSize: '0.9rem' }}>Créer et gérer les groupes de l'église</p>
                </Link>

                <Link href="/admin/evenements" className="card" style={{ textDecoration: 'none', color: 'inherit', display: 'block', padding: '2rem', backgroundColor: 'var(--offwhite)', textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📅</div>
                  <h3 style={{ color: 'var(--orange)', marginBottom: '0.5rem' }}>Gestion des événements</h3>
                  <p style={{ fontSize: '0.9rem' }}>Organiser et gérer les événements de l'église</p>
                </Link>
              </div>

              <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                <Link href="/mon-compte" className="btn btn-secondary">
                  Retour au tableau de bord membre
                </Link>
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
