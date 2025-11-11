import React from "react";
import { Routes, Route } from "react-router-dom";
// import SEO from "./components/SEO";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Tecnologias from "./components/Tecnologias/index.jsx";
import Proyectos from "./components/Proyectos";
import CardContacto from "./components/Contacto";
import Footer from "./components/Footer";
import AboutMeDetailed from "./pages/AboutMeDetailed";
import KonamiCode from "./Game/KonnamiGame";
import "./App.css";

function App() {
  return (
    <>
      {/* <SEO /> */}

        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <main id="main-content">
                  <Hero />
                   <Proyectos />
                  <Tecnologias />

                  <CardContacto />
                </main>
              </>
            }
          />
          <Route
            path="/sobremi-detallado"
            element={
              <>
                {/* <SEO
                  title="Sobre Mí - Alejandro Anchundia"
                  description="Conoce mi viaje profesional, fortalezas y valores como desarrollador frontend."
                  url="https://portafolio-v2-peach.vercel.app/sobremi-detallado"
                /> */}
                <main id="main-content">
                  <AboutMeDetailed />
                </main>
              </>
            }
          />
        </Routes>
        <KonamiCode />
        <Footer />

    </>
  );
}

export default App;