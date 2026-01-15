'use client'

import Link from 'next/link'

export default function LogoHeader() {
  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Link 
        href="/"
        style={{ 
          textDecoration: 'none',
          display: 'block'
        }}
      >
        <img 
          src="/images/LOGO_MEESL.png" 
          alt="MEESL Logo"
          style={{
            width: '60px',
            height: '60px',
            objectFit: 'contain',
            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
            cursor: 'pointer',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
          }}
        />
      </Link>
    </div>
  )
}
