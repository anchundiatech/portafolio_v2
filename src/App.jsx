import React, { Suspense, lazy, useEffect } from "react";
import { initGameCursor } from "./styles/effects/GameCursor";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero"; // Keep Hero eager for LCP
import "./App.css";

// Lazy load below-the-fold components and other routes
const Tecnologias = lazy(() => import("./components/Tecnologias"));
const Proyectos = lazy(() => import("./components/Proyectos"));
const CardContacto = lazy(() => import("./components/Contacto"));
const Footer = lazy(() => import("./components/Footer"));
const AboutMeDetailed = lazy(() => import("./pages/AboutMeDetailed"));
const KonamiCode = lazy(() => import("./Game/KonnamiGame"));

// Simple loading fallback
const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
    width: '100%',
    color: 'var(--neon-ice)'
  }}>
    Cargando...
  </div>
);

function App() {
  useEffect(() => {
    // Inicializar el cursor personalizado
    const cleanup = initGameCursor();

    // Limpiar al desmontar
    return () => {
      if (cleanup && typeof cleanup === 'function') {
        cleanup();
      }
    };
  }, []);

  return (
    <>
      <Header />
      <Suspense fallback={<LoadingFallback />}>
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
      </Suspense>
    </>
  );
}

export default App;