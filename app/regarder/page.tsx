import Link from 'next/link'

export default function RegarderPage() {
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
            Regarder nos cultes
          </h1>
          
          <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ color: 'var(--orange)', marginBottom: '1.5rem' }}>
              Cultes en direct et en replay
            </h2>
            
            <p style={{ marginBottom: '2rem', lineHeight: '1.6' }}>
              Rejoignez-nous pour nos cultes en direct ou retrouvez nos précédents messages. 
              Que vous soyez loin géographiquement ou que vous ayez manqué un culte, 
              nous sommes heureux de partager ces moments de louange et d'enseignement avec vous.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
              <div className="card" style={{ backgroundColor: 'var(--sand)' }}>
                <h3 style={{ color: 'var(--brown)', marginBottom: '1rem' }}>
                  📹 Culte du Dimanche
                </h3>
                <p style={{ marginBottom: '1rem' }}>
                  <strong>Horaire:</strong> Dimanche 8h30 AM (Heure d'Haïti)<br/>
                  <strong>Direct:</strong> YouTube et Facebook
                </p>
                <div style={{ backgroundColor: '#000', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', marginBottom: '1rem' }}>
                  <p style={{ color: 'white' }}>[YouTube Live Embed Placeholder]</p>
                </div>
                <button className="btn" style={{ width: '100%' }}>
                  Regarder en direct
                </button>
              </div>

              <div className="card" style={{ backgroundColor: 'var(--sand)' }}>
                <h3 style={{ color: 'var(--brown)', marginBottom: '1rem' }}>
                  📚 Étude Biblique
                </h3>
                <p style={{ marginBottom: '1rem' }}>
                  <strong>Horaire:</strong> Mercredi 5h PM (Heure d'Haïti)<br/>
                  <strong>Direct:</strong> YouTube
                </p>
                <div style={{ backgroundColor: '#000', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', marginBottom: '1rem' }}>
                  <p style={{ color: 'white' }}>[YouTube Live Embed Placeholder]</p>
                </div>
                <button className="btn" style={{ width: '100%' }}>
                  Regarder en direct
                </button>
              </div>
            </div>

            <h3 style={{ color: 'var(--brown)', marginBottom: '1rem' }}>Cultes précédents</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              {[
                { title: "La puissance de la prière", date: "8 Décembre 2024", duration: "1h 45min" },
                { title: "Marcher par la foi", date: "1 Décembre 2024", duration: "1h 38min" },
                { title: "L'amour de Dieu", date: "24 Novembre 2024", duration: "1h 52min" },
                { title: "La joie du Seigneur", date: "17 Novembre 2024", duration: "1h 41min" }
              ].map((video, index) => (
                <div key={index} className="card" style={{ padding: '1rem' }}>
                  <div style={{ backgroundColor: '#000', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', marginBottom: '0.5rem' }}>
                    <p style={{ color: 'white', fontSize: '0.9rem' }}>[Video Thumbnail]</p>
                  </div>
                  <h4 style={{ color: 'var(--brown)', fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                    {video.title}
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.25rem' }}>
                    {video.date}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: '#666' }}>
                    {video.duration}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <h3 style={{ color: 'var(--brown)', marginBottom: '1rem' }}>
                Rejoignez nos platforms
              </h3>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn"
                  style={{ display: 'inline-block' }}
                >
                  YouTube
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ display: 'inline-block' }}
                >
                  Facebook
                </a>
              </div>
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
