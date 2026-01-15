'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface User {
  id: string
  name: string
  email: string
  phone?: string | null
  role: 'member' | 'leader' | 'admin'
  isActive: boolean
  createdAt: string
  profile?: any
  _count?: {
    donations: number
    groupLinks: number
    eventLinks: number
  }
}

export default function AdminMembersPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated' && session.user.role !== 'admin') {
      router.push('/mon-compte')
    }
  }, [status, session, router])

  useEffect(() => {
    if (status === 'authenticated' && session.user.role === 'admin') {
      fetchUsers()
    }
  }, [status, session, search, page])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(search && { search })
      })
      
      const response = await fetch(`/api/admin/users?${params}`)
      if (!response.ok) throw new Error('Erreur lors du chargement')
      
      const data = await response.json()
      setUsers(data.users)
      setTotalPages(data.pagination.pages)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
    } finally {
      setLoading(false)
    }
  }

  const handleDeactivate = async (userId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir désactiver cet utilisateur?')) return
    
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) throw new Error('Erreur lors de la désactivation')
      
      fetchUsers()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erreur inconnue')
    }
  }

  const handleDelete = async (userId: string, userName: string) => {
    if (!confirm(`ATTENTION: Êtes-vous sûr de vouloir SUPPRIMER DÉFINITIVEMENT le membre "${userName}"?\n\nCette action est irréversible et supprimera toutes les données associées (dons, participations aux groupes, inscriptions aux événements).`)) return
    
    try {
      const response = await fetch(`/api/admin/users/${userId}/delete`, {
        method: 'DELETE'
      })
      
      if (!response.ok) throw new Error('Erreur lors de la suppression')
      
      fetchUsers()
      alert('Membre supprimé avec succès')
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erreur inconnue')
    }
  }

  if (status === 'loading' || loading) {
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
      <section style={{ padding: '2rem 0', minHeight: '60vh' }}>
        <div className="container">
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ color: 'var(--brown)' }}>Gestion des membres</h1>
                <Link href="/admin/membres/nouveau" className="btn">
                  + Ajouter un membre
                </Link>
              </div>

              {error && <div className="error">{error}</div>}

              {/* Search */}
              <div style={{ marginBottom: '2rem' }}>
                <input
                  type="text"
                  placeholder="Rechercher par nom, email ou téléphone..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value)
                    setPage(1)
                  }}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>

              {/* Users Table */}
              {users.length > 0 ? (
                <>
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid var(--orange)' }}>
                        <th style={{ padding: '1rem', textAlign: 'left' }}>Nom</th>
                        <th style={{ padding: '1rem', textAlign: 'left' }}>Email</th>
                        <th style={{ padding: '1rem', textAlign: 'left' }}>Téléphone</th>
                        <th style={{ padding: '1rem', textAlign: 'left' }}>Rôle</th>
                        <th style={{ padding: '1rem', textAlign: 'left' }}>Statut</th>
                        <th style={{ padding: '1rem', textAlign: 'left' }}>Dons</th>
                        <th style={{ padding: '1rem', textAlign: 'left' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} style={{ borderBottom: '1px solid #eee' }}>
                          <td style={{ padding: '1rem' }}>{user.name}</td>
                          <td style={{ padding: '1rem' }}>{user.email}</td>
                          <td style={{ padding: '1rem' }}>{user.phone || '-'}</td>
                          <td style={{ padding: '1rem' }}>
                            <span style={{
                              padding: '0.25rem 0.5rem',
                              borderRadius: '4px',
                              fontSize: '0.85rem',
                              backgroundColor: user.role === 'admin' ? 'var(--orange)' : user.role === 'leader' ? '#f59e0b' : '#10b981',
                              color: 'white'
                            }}>
                              {user.role === 'admin' ? 'Admin' : user.role === 'leader' ? 'Leader' : 'Membre'}
                            </span>
                          </td>
                          <td style={{ padding: '1rem' }}>
                            <span style={{
                              padding: '0.25rem 0.5rem',
                              borderRadius: '4px',
                              fontSize: '0.85rem',
                              backgroundColor: user.isActive ? '#10b981' : '#ef4444',
                              color: 'white'
                            }}>
                              {user.isActive ? 'Actif' : 'Inactif'}
                            </span>
                          </td>
                          <td style={{ padding: '1rem' }}>{user._count?.donations || 0}</td>
                          <td style={{ padding: '1rem' }}>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                              <Link
                                href={`/admin/membres/${user.id}`}
                                style={{ padding: '0.25rem 0.5rem', backgroundColor: 'var(--orange)', color: 'white', textDecoration: 'none', borderRadius: '4px', fontSize: '0.85rem' }}
                              >
                                Modifier
                              </Link>
                              <button
                                onClick={() => handleDeactivate(user.id)}
                                style={{ padding: '0.25rem 0.5rem', backgroundColor: user.isActive ? '#f59e0b' : '#10b981', color: 'white', border: 'none', borderRadius: '4px', fontSize: '0.85rem', cursor: 'pointer' }}
                              >
                                {user.isActive ? 'Désactiver' : 'Activer'}
                              </button>
                              <button
                                onClick={() => handleDelete(user.id, user.name)}
                                style={{ padding: '0.25rem 0.5rem', backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '4px', fontSize: '0.85rem', cursor: 'pointer' }}
                              >
                                Supprimer
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                      <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        style={{ padding: '0.5rem 1rem', border: '1px solid #ddd', backgroundColor: 'white', cursor: 'pointer' }}
                      >
                        Précédent
                      </button>
                      <span style={{ padding: '0.5rem 1rem' }}>
                        Page {page} sur {totalPages}
                      </span>
                      <button
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        style={{ padding: '0.5rem 1rem', border: '1px solid #ddd', backgroundColor: 'white', cursor: 'pointer' }}
                      >
                        Suivant
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                  Aucun membre trouvé
                </div>
              )}
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
