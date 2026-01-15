'use client'

import { useState } from 'react'

export default function TestRegister() {
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const testRegister = async () => {
    setLoading(true)
    setResult('')

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Test User',
          email: `test${Date.now()}@example.com`,
          password: 'password123',
          phone: '+509 12345678'
        }),
      })

      const data = await response.json()
      
      if (response.ok) {
        setResult(`✅ Succès: ${data.message}`)
      } else {
        setResult(`❌ Erreur: ${data.error}`)
      }
    } catch (error) {
      setResult(`❌ Erreur réseau: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: '#f5f5f5',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ 
        background: 'white', 
        padding: '2rem', 
        borderRadius: '10px', 
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '500px'
      }}>
        <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '2rem' }}>
          Test d'Inscription
        </h1>

        <button
          onClick={testRegister}
          disabled={loading}
          style={{
            width: '100%',
            padding: '1rem',
            background: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '1rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginBottom: '1rem'
          }}
        >
          {loading ? 'Test en cours...' : 'Tester l\'inscription'}
        </button>

        {result && (
          <div style={{
            padding: '1rem',
            borderRadius: '5px',
            background: result.includes('✅') ? '#d4edda' : '#f8d7da',
            color: result.includes('✅') ? '#155724' : '#721c24',
            border: `1px solid ${result.includes('✅') ? '#c3e6cb' : '#f5c6cb'}`,
            whiteSpace: 'pre-wrap',
            fontSize: '0.9rem'
          }}>
            {result}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <a href="/register" style={{ color: '#007bff', textDecoration: 'none' }}>
            ← Aller à la page d'inscription
          </a>
        </div>
      </div>
    </div>
  )
}
