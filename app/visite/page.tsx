import Link from 'next/link'

export default function VisitePage() {
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
              <li><Link href="/login">Connexion</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <section style={{ padding: '4rem 0', minHeight: '60vh' }}>
        <div className="container">
          <h1 style={{ textAlign: 'center', color: 'var(--brown)', marginBottom: '2rem' }}>
            Planifier votre visite
          </h1>
          
          <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ color: 'var(--orange)', marginBottom: '1.5rem' }}>
              Bienvenue à la MEESL!
            </h2>
            
            <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
              Nous sommes ravis de vous accueillir parmi nous. Que vous soyez de passage dans la région 
              ou que vous cherchiez une église où vous sentir chez vous, nous serions honorés de votre présence.
            </p>

            <h3 style={{ color: 'var(--brown)', marginBottom: '1rem' }}>Nos horaires de culte</h3>
            <div className="schedule" style={{ marginBottom: '2rem' }}>
              <div className="schedule-item">
                <strong>Dimanche 7h–8h AM:</strong> Leçon dominicale
              </div>
              <div className="schedule-item">
                <strong>Dimanche 8h30–10h30 AM:</strong> Culte dominical
              </div>
              <div className="schedule-item">
                <strong>Mercredi 5h–7h PM:</strong> Étude Biblique
              </div>
              <div className="schedule-item">
                <strong>Lundi 5h–7h PM:</strong> Service de prière à domicile (Groupe Béatitude)
              </div>
            </div>

            <h3 style={{ color: 'var(--brown)', marginBottom: '1rem' }}>Où nous trouver</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              <strong>Adresse:</strong> 4, Delmas 48, Haïti<br/>
              <strong>WhatsApp:</strong> +509 37 97 1717
            </p>

            <h3 style={{ color: 'var(--brown)', marginBottom: '1rem' }}>Informations utiles</h3>
            <ul style={{ marginBottom: '2rem', lineHeight: '1.8' }}>
              <li>Venez tel que vous êtes - pas de code vestimentaire strict</li>
              <li>Le stationnement est disponible sur place</li>
              <li>Des programmes sont disponibles pour les enfants</li>
              <li>Restez pour le café et la fraternisation après le culte</li>
            </ul>

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <h3 style={{ color: 'var(--brown)', marginBottom: '1rem' }}>
                Prévenez-nous de votre visite
              </h3>
              <p style={{ marginBottom: '1rem' }}>
                Pour que nous puissions mieux vous accueillir, n'hésitez pas à nous contacter avant votre visite:
              </p>
              <a 
                href="https://wa.me/50937971717" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn"
                style={{ display: 'inline-block' }}
              >
                Envoyez-nous un message WhatsApp
              </a>
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
