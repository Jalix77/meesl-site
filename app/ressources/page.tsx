import Link from 'next/link'

export default function RessourcesPage() {
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
            Ressources
          </h1>
          
          <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ color: 'var(--orange)', marginBottom: '1.5rem' }}>
              📚 Documents et ressources de l'église
            </h2>
            
            <p style={{ marginBottom: '2rem', lineHeight: '1.6' }}>
              Retrouvez ici nos documents officiels, notre logo et d'autres ressources utiles 
              pour mieux connaître la Mission Église Évangélique Sel et Lumière.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
              <div className="card" style={{ backgroundColor: 'var(--offwhite)', textAlign: 'center', padding: '2rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🖼️</div>
                <h3 style={{ color: 'var(--brown)', marginBottom: '1rem' }}>Logo MEESL</h3>
                <p style={{ marginBottom: '1.5rem' }}>
                  Téléchargez notre logo officiel en haute qualité pour vos communications.
                </p>
                <a 
                  href="/logo-meesl.jpg" 
                  download="logo-meesl.jpg"
                  className="btn"
                  style={{ display: 'inline-block' }}
                >
                  Télécharger le logo
                </a>
              </div>

              <div className="card" style={{ backgroundColor: 'var(--offwhite)', textAlign: 'center', padding: '2rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📄</div>
                <h3 style={{ color: 'var(--brown)', marginBottom: '1rem' }}>Constitution</h3>
                <p style={{ marginBottom: '1.5rem' }}>
                  Consultez notre constitution pour comprendre notre structure et nos principes.
                </p>
                <a 
                  href="/constitution-meesl.pdf" 
                  download="constitution-meesl.pdf"
                  className="btn"
                  style={{ display: 'inline-block' }}
                >
                  Télécharger la constitution
                </a>
              </div>
            </div>

            <h3 style={{ color: 'var(--brown)', marginBottom: '1.5rem' }}>📖 Ressources spirituelles</h3>
            
            <div className="card" style={{ backgroundColor: 'var(--sand)', marginBottom: '2rem' }}>
              <h4 style={{ color: 'var(--orange)', marginBottom: '1rem' }}>Plan de lecture biblique</h4>
              <p style={{ marginBottom: '1rem' }}>
                Nous vous recommandons ce plan de lecture biblique pour approfondir votre relation avec Dieu:
              </p>
              <ul style={{ lineHeight: '1.8', paddingLeft: '1.5rem' }}>
                <li><strong>Psaumes:</strong> Un psaume par jour pour la prière et la méditation</li>
                <li><strong>Proverbes:</strong> Un chapitre par jour pour la sagesse quotidienne</li>
                <li><strong>Évangiles:</strong> Un évangile par mois pour suivre la vie de Jésus</li>
                <li><strong>Épîtres:</strong> Une épître par semaine pour l'enseignement doctrinal</li>
              </ul>
            </div>

            <h3 style={{ color: 'var(--brown)', marginBottom: '1.5rem' }}>🎵 Ressources de louange</h3>
            
            <div className="card" style={{ backgroundColor: 'var(--offwhite)' }}>
              <h4 style={{ color: 'var(--orange)', marginBottom: '1rem' }}>Chants populaires de notre église</h4>
              <p style={{ marginBottom: '1rem' }}>
                Voici quelques-uns des chants que nous aimons chanter ensemble lors de nos cultes:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                <div>
                  <h5 style={{ color: 'var(--brown)', marginBottom: '0.5rem' }}>Cantiques traditionnels</h5>
                  <ul style={{ fontSize: '0.9rem', listStyle: 'none', padding: 0 }}>
                    <li>• Amazing Grace</li>
                    <li>• How Great Thou Art</li>
                    <li>• Blessed Assurance</li>
                    <li>• Great Is Thy Faithfulness</li>
                  </ul>
                </div>
                <div>
                  <h5 style={{ color: 'var(--brown)', marginBottom: '0.5rem' }}>Louanges contemporaines</h5>
                  <ul style={{ fontSize: '0.9rem', listStyle: 'none', padding: 0 }}>
                    <li>• 10,000 Reasons</li>
                    <li>• Good Good Father</li>
                    <li>• This Is Amazing Grace</li>
                    <li>• What A Beautiful Name</li>
                  </ul>
                </div>
                <div>
                  <h5 style={{ color: 'var(--brown)', marginBottom: '0.5rem' }}>Cantiques créoles</h5>
                  <ul style={{ fontSize: '0.9rem', listStyle: 'none', padding: 0 }}>
                    <li>• Gran Mèt la Beni</li>
                    <li>• Mwen Renmen W</li>
                    <li>• Bondye Bon</li>
                    <li>• Mwen Konfiye W</li>
                  </ul>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <h3 style={{ color: 'var(--brown)', marginBottom: '1rem' }}>
                Besoin d'autres ressources?
              </h3>
              <p style={{ marginBottom: '1rem' }}>
                N'hésitez pas à nous contacter si vous avez besoin de documents spécifiques 
                ou si vous avez des questions sur nos ressources.
              </p>
              <Link href="/contact" className="btn">
                Nous contacter
              </Link>
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
