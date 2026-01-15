import HeaderOverlay from './components/HeaderOverlay'
import Hero from './components/Hero'
import AboutSplit from './components/AboutSplit'
import NextServiceAndValues from './components/NextServiceAndValues'
import MinistriesGrid from './components/MinistriesGrid'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import LogoHeader from './components/LogoHeader'

export default function HomePage() {
  return (
    <div>
      <LogoHeader />
      <HeaderOverlay />
      <Hero />
      <AboutSplit />
      <NextServiceAndValues />
      <MinistriesGrid />
      <Testimonials />
      <Footer />
    </div>
  )
}
