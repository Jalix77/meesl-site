'use client'

import { useState } from 'react'
import Link from 'next/link'

interface HoverLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export default function HoverLink({ href, children, className = '', style }: HoverLinkProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link 
      href={href}
      className={className}
      style={{
        ...style,
        color: isHovered ? 'var(--gold)' : 'inherit',
        transition: 'color 0.3s ease'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </Link>
  )
}
