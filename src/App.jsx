import React from "react";
import { Routes, Route } from "react-router-dom";
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