import React, { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { MotionConfig } from "motion/react";
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

// Lazy load GameCursor to avoid blocking initial render
const initGameCursorAsync = () =>
  import("./styles/effects/GameCursor").then((m) => m.initGameCursor());

// Simple loading fallback
const LoadingFallback = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "200px",
      width: "100%",
      color: "var(--neon-ice)",
    }}>
    Cargando...
  </div>
);

function App() {
  const [gameCursorReady, setGameCursorReady] = useState(false);

  useEffect(() => {
    // Defer non-critical game cursor initialization
    const timer = requestIdleCallback(
      () => {
        initGameCursorAsync()
          .then(() => setGameCursorReady(true))
          .catch((err) => console.error("Error loading game cursor:", err));
      },
      { timeout: 2000 }
    );

    return () => {
      if (timer) cancelIdleCallback(timer);
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
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
    </MotionConfig>
  );
}

export default App;
