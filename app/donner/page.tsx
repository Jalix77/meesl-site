import Link from 'next/link'

export default function DonnerPage() {
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
            Soutenir notre ministère
          </h1>
          
          <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ color: 'var(--orange)', marginBottom: '1.5rem' }}>
              Votre générosité fait la différence
            </h2>
            
            <p style={{ marginBottom: '2rem', lineHeight: '1.6' }}>
              Merci de considérer un don à la Mission Église Évangélique Sel et Lumière. 
              Votre soutien nous permet de continuer notre mission de glorifier Dieu, 
              d'annoncer l'Évangile et de servir notre communauté avec compassion.
            </p>

            <div className="card" style={{ backgroundColor: 'var(--offwhite)', marginBottom: '2rem' }}>
              <h3 style={{ color: 'var(--brown)', marginBottom: '1rem' }}>
                🙏 Comment vos dons sont utilisés
              </h3>
              <ul style={{ lineHeight: '1.8', paddingLeft: '1.5rem' }}>
                <li>Soutien des pasteurs et leaders de l'église</li>
                <li>Frais de fonctionnement et entretien des locaux</li>
                <li>Programmes pour les enfants et les jeunes</li>
                <li>Aide aux familles dans le besoin</li>
                <li>Missions et projets communautaires</li>
                <li>Ressources éducatives et matériel biblique</li>
              </ul>
            </div>

            <h3 style={{ color: 'var(--brown)', marginBottom: '1.5rem' }}>Méthodes de don</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              <div className="card">
                <h4 style={{ color: 'var(--orange)', marginBottom: '1rem' }}>💰 Espèces</h4>
                <p>Dons en espèces acceptés lors de nos cultes et réunions.</p>
              </div>

              <div className="card">
                <h4 style={{ color: 'var(--orange)', marginBottom: '1rem' }}>🏦 Unibank HTG</h4>
                <p><strong>Compte:</strong> 180-1021-1794381<br/>
                <strong>Bénéficiaire:</strong> Mission Eglise Evangélique Sel et Lumière</p>
              </div>

              <div className="card">
                <h4 style={{ color: 'var(--orange)', marginBottom: '1rem' }}>🏦 Unibank USD</h4>
                <p><strong>Compte:</strong> 180-1022-1794390<br/>
                <strong>Bénéficiaire:</strong> Mission Eglise Evangélique Sel et Lumière</p>
              </div>

              <div className="card">
                <h4 style={{ color: 'var(--orange)', marginBottom: '1rem' }}>📱 MonCash</h4>
                <p><strong>Numéro:</strong> 47 94 5556<br/>
                Transferts MonCash acceptés</p>
              </div>

              <div className="card">
                <h4 style={{ color: 'var(--orange)', marginBottom: '1rem' }}>💳 Natcash</h4>
                <p>Transferts Natcash disponibles sur demande</p>
              </div>

              <div className="card">
                <h4 style={{ color: 'var(--orange)', marginBottom: '1rem' }}>📋 Chèque</h4>
                <p>Chèques à l'ordre de:<br/>
                <strong>"Mission Eglise Evangélique Sel et Lumière"</strong></p>
              </div>
            </div>

            <div className="card" style={{ backgroundColor: 'var(--sand)', textAlign: 'center', padding: '2rem' }}>
              <h3 style={{ color: 'var(--brown)', marginBottom: '1rem' }}>
                🙏 Merci pour votre générosité
              </h3>
              <p style={{ marginBottom: '1rem', fontStyle: 'italic' }}>
                "Celui qui sème peu moissonnera peu, et celui qui sème abondamment moissonnera abondamment." 
                <br/>— 2 Corinthiens 9:6
              </p>
              <p>
                Chaque don, grand ou petit, est apprécié et utilisé pour la gloire de Dieu 
                et l'avancement de Son royaume.
              </p>
            </div>

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <h3 style={{ color: 'var(--brown)', marginBottom: '1rem' }}>
                Questions sur les dons?
              </h3>
              <p style={{ marginBottom: '1rem' }}>
                N'hésitez pas à nous contacter pour toute question concernant vos dons:
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a 
                  href="https://wa.me/50937971717" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn"
                  style={{ display: 'inline-block' }}
                >
                  WhatsApp
                </a>
                <Link href="/contact" className="btn btn-secondary">
                  Page de contact
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
