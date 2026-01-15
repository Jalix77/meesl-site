'use client'

import { useState } from 'react'

interface HoverButtonProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
  href?: string
}

export default function HoverButton({ children, className = '', style, onClick, href }: HoverButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    if (onClick) onClick()
    if (href) {
      window.open(href, '_blank')
    }
  }

  const buttonStyle = {
    ...style,
    background: isHovered ? 'var(--goldHover)' : style?.background || 'var(--gold)',
    transition: 'background 0.3s ease',
    cursor: href ? 'pointer' : undefined
  }

  if (href) {
    return (
      <div 
        className={className}
        style={buttonStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        {children}
      </div>
    )
  }

  return (
    <button 
      className={className}
      style={buttonStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
