import { Routes, Route } from "react-router-dom";
import SEO from "./components/SEO";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Tecnologias from "./components/Tecnologias/index.jsx";
import Proyectos from "./components/Proyectos";
import CardContacto from "./components/Contacto.jsx";
import Footer from "./components/Footer";
import AboutMeDetailed from "./pages/AboutMeDetailed";
import KonamiCode from "./Game/KonnamiGame";
import "./App.css";

function App() {
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

export default App;