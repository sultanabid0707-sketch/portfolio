import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import ParticleBackground from './components/ParticleBackground'

export default function App() {
  return (
    <div className="relative bg-dark text-white min-h-screen noise">
      {/* Global overlays */}
      <CustomCursor />
      <ScrollProgress />
      <ParticleBackground />

      {/* Layout */}
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
