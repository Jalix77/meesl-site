'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface SiteSetting {
  id: string
  key: string
  value: string
  type: 'text' | 'longtext' | 'json' | 'url'
  updatedAt: string
}

interface FormData {
  address: string
  whatsapp: string
  phone: string
  email: string
  schedule: {
    dimanche: { culte: string; ecole_dominicale: string }
    mercredi: { etude_biblique: string }
    samedi: { jeunesse: string; femmes: string }
  }
  donations: {
    unibank: { name: string; account: string; currency: string }
    moncash: { phone: string; name: string }
    natcash: { phone: string; name: string }
  }
  leadership: Array<{ name: string; role: string; email: string }>
  logoUrl: string
  constitutionPdfUrl: string
}

export default function AdminSettings() {
  const [settings, setSettings] = useState<SiteSetting[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showFileSelector, setShowFileSelector] = useState<'logo' | 'pdf' | null>(null)
  const [files, setFiles] = useState<any[]>([])

  const [formData, setFormData] = useState<FormData>({
    address: '',
    whatsapp: '',
    phone: '',
    email: '',
    schedule: {
      dimanche: { culte: '', ecole_dominicale: '' },
      mercredi: { etude_biblique: '' },
      samedi: { jeunesse: '', femmes: '' }
    },
    donations: {
      unibank: { name: '', account: '', currency: 'HTG' },
      moncash: { phone: '', name: '' },
      natcash: { phone: '', name: '' }
    },
    leadership: [],
    logoUrl: '',
    constitutionPdfUrl: ''
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings')
      if (response.ok) {
        const data = await response.json()
        setSettings(data)
        
        // Populate form data
        const formatedData: FormData = {
          address: '',
          whatsapp: '',
          phone: '',
          email: '',
          schedule: {
            dimanche: { culte: '', ecole_dominicale: '' },
            mercredi: { etude_biblique: '' },
            samedi: { jeunesse: '', femmes: '' }
          },
          donations: {
            unibank: { name: '', account: '', currency: 'HTG' },
            moncash: { phone: '', name: '' },
            natcash: { phone: '', name: '' }
          },
          leadership: [],
          logoUrl: '',
          constitutionPdfUrl: ''
        }

        data.forEach((setting: SiteSetting) => {
          if (setting.type === 'json') {
            try {
              formatedData[setting.key as keyof FormData] = JSON.parse(setting.value)
            } catch (e) {
              console.error('Error parsing JSON setting:', setting.key)
            }
          } else {
            formatedData[setting.key as keyof FormData] = setting.value as any
          }
        })

        setFormData(formatedData)
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveSettings = async () => {
    setSaving(true)
    try {
      const updates = Object.entries(formData).map(([key, value]) => ({
        key,
        value: typeof value === 'object' ? JSON.stringify(value) : value
      }))

      const response = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      })

      if (response.ok) {
        alert('Paramètres sauvegardés avec succès')
      } else {
        alert('Erreur lors de la sauvegarde')
      }
    } catch (error) {
      console.error('Error saving settings:', error)
      alert('Erreur lors de la sauvegarde')
    } finally {
      setSaving(false)
    }
  }

  const updateFormData = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  const updateNestedData = (parent: string, child: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...(prev[parent as keyof FormData] as any),
        [child]: value
      }
    }))
  }

  const addLeadershipMember = () => {
    setFormData(prev => ({
      ...prev,
      leadership: [...prev.leadership, { name: '', role: '', email: '' }]
    }))
  }

  const updateLeadershipMember = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      leadership: prev.leadership.map((member, i) =>
        i === index ? { ...member, [field]: value } : member
      )
    }))
  }

  const removeLeadershipMember = (index: number) => {
    setFormData(prev => ({
      ...prev,
      leadership: prev.leadership.filter((_, i) => i !== index)
    }))
  }

  const fetchFiles = async () => {
    try {
      const response = await fetch('/api/admin/files')
      if (response.ok) {
        const data = await response.json()
        setFiles(data)
      }
    } catch (error) {
      console.error('Error fetching files:', error)
    }
  }

  useEffect(() => {
    if (showFileSelector) {
      fetchFiles()
    }
  }, [showFileSelector])

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="text-gray-600 hover:text-gray-900">
                ← Retour
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Paramètres du Site</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={saveSettings}
                disabled={saving}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50"
              >
                {saving ? 'Sauvegarde...' : 'Sauvegarder'}
              </button>
              <Link
                href="/admin"
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Tableau de bord
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-6">Informations de Contact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => updateFormData('address', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  WhatsApp
                </label>
                <input
                  type="text"
                  value={formData.whatsapp}
                  onChange={(e) => updateFormData('whatsapp', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-6">Horaires</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-md font-medium text-gray-800 mb-3">Dimanche</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Culte
                    </label>
                    <input
                      type="text"
                      value={formData.schedule.dimanche.culte}
                      onChange={(e) => updateNestedData('schedule', 'culte', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      École Dominicale
                    </label>
                    <input
                      type="text"
                      value={formData.schedule.dimanche.ecole_dominicale}
                      onChange={(e) => updateNestedData('schedule', 'ecole_dominicale', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-md font-medium text-gray-800 mb-3">Mercredi</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Étude Biblique
                  </label>
                  <input
                    type="text"
                    value={formData.schedule.mercredi.etude_biblique}
                    onChange={(e) => updateNestedData('schedule', 'etude_biblique', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-md font-medium text-gray-800 mb-3">Samedi</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Jeunesse
                    </label>
                    <input
                      type="text"
                      value={formData.schedule.samedi.jeunesse}
                      onChange={(e) => updateNestedData('schedule', 'jeunesse', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Femmes
                    </label>
                    <input
                      type="text"
                      value={formData.schedule.samedi.femmes}
                      onChange={(e) => updateNestedData('schedule', 'femmes', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Donation Methods */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-6">Méthodes de Don</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-md font-medium text-gray-800 mb-3">Unibank</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom
                    </label>
                    <input
                      type="text"
                      value={formData.donations.unibank.name}
                      onChange={(e) => updateNestedData('donations', 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Compte
                    </label>
                    <input
                      type="text"
                      value={formData.donations.unibank.account}
                      onChange={(e) => updateNestedData('donations', 'account', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Devise
                    </label>
                    <select
                      value={formData.donations.unibank.currency}
                      onChange={(e) => updateNestedData('donations', 'currency', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="HTG">HTG</option>
                      <option value="USD">USD</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-md font-medium text-gray-800 mb-3">MonCash</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Téléphone
                    </label>
                    <input
                      type="text"
                      value={formData.donations.moncash.phone}
                      onChange={(e) => updateNestedData('donations', 'phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom
                    </label>
                    <input
                      type="text"
                      value={formData.donations.moncash.name}
                      onChange={(e) => updateNestedData('donations', 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-md font-medium text-gray-800 mb-3">Natcash</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Téléphone
                    </label>
                    <input
                      type="text"
                      value={formData.donations.natcash.phone}
                      onChange={(e) => updateNestedData('donations', 'phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom
                    </label>
                    <input
                      type="text"
                      value={formData.donations.natcash.name}
                      onChange={(e) => updateNestedData('donations', 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Leadership */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Équipe de Direction</h2>
              <button
                onClick={addLeadershipMember}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
              >
                Ajouter un membre
              </button>
            </div>
            <div className="space-y-4">
              {formData.leadership.map((member, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nom
                      </label>
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => updateLeadershipMember(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Rôle
                      </label>
                      <input
                        type="text"
                        value={member.role}
                        onChange={(e) => updateLeadershipMember(index, 'role', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={member.email}
                        onChange={(e) => updateLeadershipMember(index, 'email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        onClick={() => removeLeadershipMember(index)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Files */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-6">Fichiers du Site</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo de l'Église
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="text"
                    value={formData.logoUrl}
                    onChange={(e) => updateFormData('logoUrl', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => setShowFileSelector('logo')}
                    className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    Choisir
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Constitution PDF
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="text"
                    value={formData.constitutionPdfUrl}
                    onChange={(e) => updateFormData('constitutionPdfUrl', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => setShowFileSelector('pdf')}
                    className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    Choisir
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* File Selector Modal */}
      {showFileSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Sélectionner un fichier</h3>
              <button
                onClick={() => setShowFileSelector(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    if (showFileSelector === 'logo') {
                      updateFormData('logoUrl', file.url)
                    } else if (showFileSelector === 'pdf') {
                      updateFormData('constitutionPdfUrl', file.url)
                    }
                    setShowFileSelector(null)
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">
                      {file.mimeType.startsWith('image/') ? '🖼️' : '📄'}
                    </span>
                    <div>
                      <div className="font-medium">{file.name}</div>
                      <div className="text-sm text-gray-500">{file.mimeType}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
