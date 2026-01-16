'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

interface PageSection {
  id: string
  key: string
  title: string | null
  body: string
  order: number
  isEnabled: boolean
}

interface Page {
  id: string
  slug: string
  title: string
  sections: PageSection[]
  createdAt: string
  updatedAt: string
}

export default function AdminContentEditor() {
  const params = useParams()
  const router = useRouter()
  const [page, setPage] = useState<Partial<Page> | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [editingSection, setEditingSection] = useState<string | null>(null)
  const [newSectionModal, setNewSectionModal] = useState(false)

  useEffect(() => {
    if (params.slug) {
      fetchPage(params.slug as string)
    }
  }, [params.slug])

  const fetchPage = async (slug: string) => {
    try {
      const response = await fetch(`/api/admin/pages/${slug}`)
      if (response.ok) {
        const data = await response.json()
        setPage(data)
      }
    } catch (error) {
      console.error('Error fetching page:', error)
    } finally {
      setLoading(false)
    }
  }

  const updatePageTitle = async (newTitle: string) => {
    if (!page) return

    try {
      const response = await fetch(`/api/admin/pages/${page.slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle })
      })

      if (response.ok) {
        setPage({ ...page, title: newTitle })
      }
    } catch (error) {
      console.error('Error updating page title:', error)
    }
  }

  const updateSection = async (sectionId: string, updates: Partial<PageSection>) => {
    if (!page) return

    try {
      const response = await fetch(`/api/admin/sections/${sectionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      })

      if (response.ok) {
        setPage(prev => {
          if (!prev) return prev
          return {
            ...prev,
          sections: (prev.sections ?? []).filter(s => s.id !== sectionId),
          }
        })
      }
    } catch (error) {
      console.error('Error updating section:', error)
    }
  }

  const deleteSection = async (sectionId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette section ?')) return

    try {
      const response = await fetch(`/api/admin/sections/${sectionId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setPage(prev => {
          if (!prev) return prev
          return {
            ...prev,
          sections: (prev.sections ?? []).filter(s => s.id !== sectionId),
          }
        })
      }
    } catch (error) {
      console.error('Error deleting section:', error)
    }
  }

  const createSection = async (sectionData: Omit<PageSection, 'id'>) => {
    if (!page) return

    try {
      const response = await fetch(`/api/admin/pages/${page.slug}/sections`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sectionData)
      })

      if (response.ok) {
        const newSection = await response.json()
        setPage({
          ...page,
          sections: [...(page.sections ?? []), newSection].sort((a, b) => a.order - b.order)
        })
        setNewSectionModal(false)
      }
    } catch (error) {
      console.error('Error creating section:', error)
    }
  }

  const reorderSections = async (sectionId: string, direction: 'up' | 'down') => {
    if (!page) return

    const sections = [...(page.sections ?? [])]
    const index = sections.findIndex(s => s.id === sectionId)
    
    if (index === -1) return

    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= sections.length) return

    // Swap sections
    const temp = sections[index].order
    sections[index].order = sections[newIndex].order
    sections[newIndex].order = temp

    // Update local state
    const reorderedSections = sections.sort((a, b) => a.order - b.order)
    setPage({ ...page, sections: reorderedSections })

    // Update server
    try {
      await fetch('/api/admin/sections/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sections: reorderedSections.map(s => ({ id: s.id, order: s.order }))
        })
      })
    } catch (error) {
      console.error('Error reordering sections:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!page) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Page non trouvée</p>
          <Link href="/admin/contenu" className="text-orange-600 hover:text-orange-700">
            Retour à la liste
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/admin/contenu" className="text-gray-600 hover:text-gray-900">
                ← Retour
              </Link>
              <div>
                <input
                  type="text"
                  value={page.title}
                  onChange={(e) => updatePageTitle(e.target.value)}
                  className="text-2xl font-bold text-gray-900 bg-transparent border-b-2 border-transparent hover:border-gray-300 focus:border-orange-500 focus:outline-none"
                />
                <p className="text-sm text-gray-500">/{page.slug}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  showPreview 
                    ? 'bg-orange-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {showPreview ? 'Édition' : 'Aperçu'}
              </button>
              <button
                onClick={() => setNewSectionModal(true)}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
              >
                Ajouter une section
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showPreview ? (
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="prose prose-lg max-w-none">
              {(page.sections ?? [])
                .filter(s => s.isEnabled)
                .sort((a, b) => a.order - b.order)
                .map((section) => (
                  <div key={section.id} className="mb-8">
                    {section.title && (
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        {section.title}
                      </h2>
                    )}
                    <ReactMarkdown>{section.body}</ReactMarkdown>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {(page.sections ?? [])
              .sort((a, b) => a.order - b.order)
              .map((section, index) => (
                <div key={section.id} className="bg-white rounded-lg shadow-sm">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-4">
                          <input
                            type="text"
                            value={section.title || ''}
                            onChange={(e) => updateSection(section.id, { title: e.target.value })}
                            placeholder="Titre de la section"
                            className="text-lg font-semibold bg-transparent border-b-2 border-transparent hover:border-gray-300 focus:border-orange-500 focus:outline-none"
                          />
                          <span className="text-sm text-gray-500">#{section.order}</span>
                        </div>
                        
                        <div className="flex items-center space-x-4 mb-4">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={section.isEnabled}
                              onChange={(e) => updateSection(section.id, { isEnabled: e.target.checked })}
                              className="mr-2"
                            />
                            <span className="text-sm text-gray-600">
                              {section.isEnabled ? 'Actif' : 'Inactif'}
                            </span>
                          </label>
                          <span className="text-sm text-gray-500">Key: {section.key}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => reorderSections(section.id, 'up')}
                          disabled={index === 0}
                          className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                        >
                          ↑
                        </button>
                        <button
                          onClick={() => reorderSections(section.id, 'down')}
                          disabled={index === (page.sections ?? []).length - 1}
                          className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                        >
                          ↓
                        </button>
                        <button
                          onClick={() => deleteSection(section.id)}
                          className="p-1 text-red-400 hover:text-red-600"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>

                    <textarea
                      value={section.body}
                      onChange={(e) => updateSection(section.id, { body: e.target.value })}
                      placeholder="Contenu de la section (Markdown supporté)"
                      className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* New Section Modal */}
      {newSectionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Nouvelle Section</h3>
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              createSection({
                key: formData.get('key') as string,
                title: formData.get('title') as string,
                body: formData.get('body') as string,
                order: (page.sections ?? []).length + 1,
                isEnabled: true
              })
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Key (identifiant unique)
                  </label>
                  <input
                    type="text"
                    name="key"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Titre
                  </label>
                  <input
                    type="text"
                    name="title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contenu
                  </label>
                  <textarea
                    name="body"
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setNewSectionModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                >
                  Créer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
