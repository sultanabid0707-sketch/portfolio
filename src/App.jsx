import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import ParticleBackground from './components/ParticleBackground'
import ClickSparks from './components/ClickSparks'
import BackToTop from './components/BackToTop'
import LoadingScreen from './components/LoadingScreen'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <LoadingScreen onComplete={() => setLoaded(true)} />

      {loaded && (
        <div className="relative bg-dark text-white min-h-screen noise">
          <CustomCursor />
          <ClickSparks />
          <ScrollProgress />
          <ParticleBackground />
          <BackToTop />

          <Navbar />

          <main className="relative z-10">
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Testimonials />
            <Contact />
          </main>

          <Footer />
        </div>
      )}
    </>
  )
}
