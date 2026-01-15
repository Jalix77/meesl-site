'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Page {
  id: string
  slug: string
  title: string
  sections: Array<{
    id: string
    key: string
    title: string | null
    body: string
    order: number
    isEnabled: boolean
  }>
  createdAt: string
  updatedAt: string
}

export default function AdminContentPage() {
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    try {
      const response = await fetch('/api/admin/pages')
      if (response.ok) {
        const data = await response.json()
        setPages(data)
      } else {
        console.error('Erreur lors de la récupération des pages')
      }
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '4px solid #f3f3f3', 
            borderTop: '4px solid #007bff', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p style={{ color: '#666' }}>Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <div style={{ background: '#fff', padding: '1rem 2rem', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/admin-direct" style={{ color: '#007bff', textDecoration: 'none' }}>
            ← Retour
          </Link>
          <h1 style={{ color: '#333', margin: 0 }}>Gestion du Contenu</h1>
        </div>
        <Link href="/admin-direct" style={{ 
          background: '#007bff', 
          color: '#fff', 
          padding: '0.5rem 1rem', 
          borderRadius: '5px', 
          textDecoration: 'none' 
        }}>
          Dashboard
        </Link>
      </div>

      {/* Search */}
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ background: '#fff', padding: '1rem', borderRadius: '10px', marginBottom: '2rem' }}>
          <input
            type="text"
            placeholder="Rechercher une page..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '5px',
              fontSize: '1rem'
            }}
          />
        </div>

        {/* Pages Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {filteredPages.map((page) => (
            <div key={page.id} style={{ 
              background: '#fff', 
              borderRadius: '10px', 
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              overflow: 'hidden'
            }}>
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ color: '#333', margin: '0 0 0.5rem 0' }}>{page.title}</h3>
                    <p style={{ color: '#666', margin: 0, fontSize: '0.9rem' }}>/{page.slug}</p>
                  </div>
                  <span style={{ 
                    background: '#007bff', 
                    color: '#fff', 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '20px', 
                    fontSize: '0.8rem' 
                  }}>
                    {page.sections.length} sections
                  </span>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  {page.sections.slice(0, 3).map((section) => (
                    <div key={section.id} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      padding: '0.5rem 0',
                      borderBottom: '1px solid #eee'
                    }}>
                      <span style={{ color: '#666', fontSize: '0.9rem', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {section.title || section.key}
                      </span>
                      <span style={{ 
                        background: section.isEnabled ? '#28a745' : '#6c757d', 
                        color: '#fff', 
                        padding: '0.2rem 0.5rem', 
                        borderRadius: '10px', 
                        fontSize: '0.7rem' 
                      }}>
                        {section.isEnabled ? 'Actif' : 'Inactif'}
                      </span>
                    </div>
                  ))}
                  {page.sections.length > 3 && (
                    <p style={{ color: '#666', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                      +{page.sections.length - 3} autres sections
                    </p>
                  )}
                </div>

                <div style={{ fontSize: '0.8rem', color: '#999', marginBottom: '1rem' }}>
                  Mis à jour: {new Date(page.updatedAt).toLocaleDateString('fr-FR')}
                </div>

                <Link 
                  href={`/admin-content/${page.slug}`}
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    background: '#007bff',
                    color: '#fff',
                    padding: '0.75rem',
                    borderRadius: '5px',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    transition: 'background 0.3s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = '#0056b3'}
                  onMouseOut={(e) => e.currentTarget.style.background = '#007bff'}
                >
                  Modifier
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredPages.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
            <p>Aucune page trouvée</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
