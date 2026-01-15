'use client'

import { useState, useEffect } from 'react'

interface Testimonial {
  id: number
  text: string
  author: string
  role: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "MEESL m'a transformé spirituellement. J'y ai trouvé une famille qui m'a soutenu dans les moments difficiles et célébré les victoires avec moi.",
    author: "Marie Dupont",
    role: "Membre depuis 2020"
  },
  {
    id: 2,
    text: "Les enseignements sont bibliques et pratiques. J'ai appris à appliquer la Parole de Dieu dans ma vie quotidienne.",
    author: "Jean Pierre",
    role: "Membre depuis 2019"
  },
  {
    id: 3,
    text: "L'accueil était chaleureux dès le premier jour. MEESL est vraiment une famille où l'amour de Dieu se ressent.",
    author: "Sophie Laurent",
    role: "Membre depuis 2021"
  },
  {
    id: 4,
    text: "Les ministères pour jeunes ont aidé mes enfants à grandir dans la foi et à développer leur potentiel.",
    author: "Michel Thomas",
    role: "Membre depuis 2018"
  }
]

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)
  }

  const goToNext = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)
  }

  return (
    <div className="testimonial-carousel">
      <div className="testimonial-container">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className={`testimonial-slide ${index === currentIndex ? 'active' : ''}`}
          >
            <div className="testimonial-card">
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-author">{testimonial.author}</div>
              <div className="testimonial-role">{testimonial.role}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button className="testimonial-nav prev" onClick={goToPrevious}>
        ‹
      </button>
      <button className="testimonial-nav next" onClick={goToNext}>
        ›
      </button>

      {/* Dots Indicator */}
      <div className="testimonial-dots">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToTestimonial(index)}
          />
        ))}
      </div>
    </div>
  )
}
