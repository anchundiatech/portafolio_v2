

import Proyectos from './components/Proyectos.jsx'
import ProjectsTimeline from './pages/ProjectsTimeline.jsx'
import './App.css'
import Header from './components/Header'
//import Sobremi from './components/Sobremi'
import Tecnologias from './components/Tecnologias/index.jsx.jsx'
import Contacto from './components/CardContacto'
import Footer from './components/Footer'
import Hero from './components/Hero'
import KonnamiGame from './Game/KonnamiGame'

import { useEffect, useState } from 'react'

function App() {
  const [route, setRoute] = useState(window.location.hash)

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const isProjectsPage = route.startsWith('#/proyectos')

  return (
    <div>
      <Header />
      {isProjectsPage ? (
        <ProjectsTimeline />
      ) : (
        <>
          <Hero />
          <main className='main'>

            <section id="proyects" className="section">
              <Proyectos />
            </section>
            <section id="tecnologias" className="section">
              <Tecnologias />
            </section>
            <section id="contacto" className="section_contacto">
              <Contacto />
            </section>
          </main>
        </>
      )}
      <Footer  />
      <KonnamiGame />
    </div>
  )
}

export default App
