import Link from 'next/link'

export default function ContactPage() {
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
            Contactez-nous
          </h1>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
            <div className="card">
              <h2 style={{ color: 'var(--orange)', marginBottom: '1.5rem' }}>
                📍 Informations de contact
              </h2>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ color: 'var(--brown)', marginBottom: '0.5rem' }}>Adresse</h3>
                <p>
                  Mission Église Évangélique Sel et Lumière<br/>
                  4, Delmas 48<br/>
                  Haïti
                </p>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ color: 'var(--brown)', marginBottom: '0.5rem' }}>WhatsApp</h3>
                <p>
                  <a href="https://wa.me/50937971717" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--orange)' }}>
                    +509 37 97 1717
                  </a>
                </p>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>
                  Cliquez pour nous envoyer un message directement
                </p>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ color: 'var(--brown)', marginBottom: '0.5rem' }}>Email</h3>
                <p>
                  contact@meesl.org<br/>
                  <span style={{ fontSize: '0.9rem', color: '#666' }}>
                    Réponse sous 24-48 heures
                  </span>
                </p>
              </div>

              <div>
                <h3 style={{ color: 'var(--brown)', marginBottom: '0.5rem' }}>Horaires de bureau</h3>
                <p>
                  Lundi - Vendredi: 9h AM - 5h PM<br/>
                  Samedi: 9h AM - 12h PM<br/>
                  Dimanche: Ouvert pendant les heures de culte
                </p>
              </div>
            </div>

            <div className="card">
              <h2 style={{ color: 'var(--orange)', marginBottom: '1.5rem' }}>
                📧 Envoyez-nous un message
              </h2>
              
              <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="form-group">
                  <label htmlFor="name">Nom complet *</label>
                  <input type="text" id="name" name="name" required />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input type="email" id="email" name="email" required />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Téléphone</label>
                  <input type="tel" id="phone" name="phone" />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Sujet *</label>
                  <select id="subject" name="subject" required>
                    <option value="">Sélectionnez un sujet</option>
                    <option value="visite">Planifier une visite</option>
                    <option value="information">Demande d'information</option>
                    <option value="don">Question sur les dons</option>
                    <option value="priere">Demande de prière</option>
                    <option value="partenariat">Partenariat</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea id="message" name="message" rows={5} required></textarea>
                </div>

                <button type="submit" className="btn">
                  Envoyer le message
                </button>
              </form>
            </div>
          </div>

          <div className="card" style={{ maxWidth: '800px', margin: '2rem auto', backgroundColor: 'var(--sand)', textAlign: 'center' }}>
            <h3 style={{ color: 'var(--brown)', marginBottom: '1rem' }}>
              🙏 Nous aimerions avoir de vos nouvelles
            </h3>
            <p style={{ marginBottom: '1.5rem' }}>
              Que vous ayez des questions sur notre église, que vous souhaitiez planifier une visite, 
              ou que vous ayez besoin de soutien spirituel, nous sommes là pour vous. 
              Votre message est important pour nous et nous y répondrons avec soin.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a 
                href="https://wa.me/50937971717" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn"
                style={{ display: 'inline-block' }}
              >
                Message WhatsApp
              </a>
              <Link href="/visite" className="btn btn-secondary">
                Planifier une visite
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
