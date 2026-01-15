import Link from 'next/link'

export default function AProposPage() {
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
            À propos de MEESL
          </h1>
          
          <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ color: 'var(--orange)', marginBottom: '1.5rem' }}>
              Notre histoire
            </h2>
            
            <p style={{ marginBottom: '2rem', lineHeight: '1.6' }}>
              La Mission Église Évangélique Sel et Lumière (MEESL) est une assemblée chrétienne 
              évangélique et apolitique fondée le 14 octobre 2018. Née d'une vision pour servir 
              Dieu et notre communauté, nous nous sommes engagés à être une lumière dans le monde 
              et le sel de la terre, comme nous l'enseigne Jésus dans Matthieu 5:13-16.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
              <div className="card" style={{ backgroundColor: 'var(--offwhite)' }}>
                <h3 style={{ color: 'var(--orange)', marginBottom: '1rem' }}>👁️ Notre Vision</h3>
                <p style={{ fontStyle: 'italic', marginBottom: '1rem' }}>
                  "Une Église qui brille dans le monde et agit comme le sel de la terre"
                </p>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>
                  — Matthieu 5:13-16
                </p>
              </div>

              <div className="card" style={{ backgroundColor: 'var(--offwhite)' }}>
                <h3 style={{ color: 'var(--orange)', marginBottom: '1rem' }}>🎯 Notre Mission</h3>
                <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                  <li>Annoncer la Bonne Nouvelle avec amour</li>
                  <li>Instruire et former les croyants</li>
                  <li>Équiper les membres pour le service</li>
                  <li>Répondre avec compassion aux besoins spirituels et sociaux</li>
                </ul>
              </div>
            </div>

            <div className="card" style={{ backgroundColor: 'var(--sand)', marginBottom: '2rem' }}>
              <h3 style={{ color: 'var(--brown)', marginBottom: '1rem' }}>💎 Nos Valeurs</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <h4 style={{ color: 'var(--orange)', marginBottom: '0.5rem' }}>📖 Fidélité</h4>
                  <p style={{ fontSize: '0.9rem' }}>Fidélité à la Parole de Dieu comme fondement de tout ce que nous faisons.</p>
                </div>
                <div>
                  <h4 style={{ color: 'var(--orange)', marginBottom: '0.5rem' }}>🤝 Intégrité</h4>
                  <p style={{ fontSize: '0.9rem' }}>Intégrité morale et transparence dans nos actions et nos relations.</p>
                </div>
                <div>
                  <h4 style={{ color: 'var(--orange)', marginBottom: '0.5rem' }}>🙏 Service</h4>
                  <p style={{ fontSize: '0.9rem' }}>Esprit de service et humilité en suivant l'exemple de Jésus-Christ.</p>
                </div>
                <div>
                  <h4 style={{ color: 'var(--orange)', marginBottom: '0.5rem' }}>❤️ Amour</h4>
                  <p style={{ fontSize: '0.9rem' }}>Amour fraternel et unité comme témoignage de notre foi.</p>
                </div>
              </div>
            </div>

            <h3 style={{ color: 'var(--brown)', marginBottom: '1.5rem' }}>Notre équipe de direction</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
              <div className="card">
                <h4 style={{ color: 'var(--orange)', marginBottom: '1rem' }}>👔 Pasteurs</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li><strong>Renel Joseph</strong> - Responsable</li>
                  <li><strong>Dieufaite Pierre</strong> - Assistant</li>
                </ul>
              </div>

              <div className="card">
                <h4 style={{ color: 'var(--orange)', marginBottom: '1rem' }}>🤝 Diacres</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li>James Oscar</li>
                  <li>Sidney Pierre-Louis</li>
                  <li>Jean Loulou Renfort</li>
                </ul>
              </div>

              <div className="card">
                <h4 style={{ color: 'var(--orange)', marginBottom: '1rem' }}>📋 Comité</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li><strong>Renel Joseph</strong></li>
                  <li><strong>Dieufaite Pierre</strong></li>
                  <li><strong>Jean Alix Pierre</strong> - Secrétaire général</li>
                  <li><strong>Sidney Pierre-Louis</strong> - Secrétaire général adjoint</li>
                  <li><strong>James Oscar</strong> - Trésorier</li>
                  <li><strong>Jean Loulou Renfort</strong> - Trésorier adjoint</li>
                  <li><strong>Samy Augustin</strong> - Conseiller</li>
                </ul>
              </div>
            </div>

            <div className="card" style={{ backgroundColor: 'var(--offwhite)', textAlign: 'center', padding: '2rem' }}>
              <h3 style={{ color: 'var(--brown)', marginBottom: '1rem' }}>
                🌟 Rejoignez-nous dans notre mission
              </h3>
              <p style={{ marginBottom: '1.5rem' }}>
                Que vous soyez nouveau dans la foi ou que vous cherchiez une communauté où grandir spirituellement, 
                nous vous invitons à nous rejoindre. Ensemble, nous pouvons faire une différence dans nos vies 
                et dans notre communauté.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/visite" className="btn">
                  Planifier une visite
                </Link>
                <Link href="/contact" className="btn btn-secondary">
                  Nous contacter
                </Link>
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
