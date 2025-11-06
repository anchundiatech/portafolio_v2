import React, { useMemo, useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

function getLevelConfig(level) {
  switch (level) {
    case "Avanzado":
      return { color: "#8b5cf6", glow: "0 0 20px rgba(139,92,246,.6)", badge: "ADV" };
    case "Intermedio":
      return { color: "#ec4899", glow: "0 0 20px rgba(236,72,153,.6)", badge: "INT" };
    case "Principiante":
      return { color: "#3b82f6", glow: "0 0 20px rgba(59,130,246,.6)", badge: "BEG" };
    default:
      return { color: "#6b7280", glow: "0 0 10px rgba(107,114,128,.4)", badge: "N/A" };
  }
}

function getRarityConfig(rarity) {
  const safe = rarity || "Common";
  switch (safe) {
    case "Epic":
      return {
        border: "2px solid #8b5cf6",
        shadow: "0 0 30px rgba(139,92,246,.5)",
        background:
          "linear-gradient(135deg, rgba(139,92,246,.1) 0%, rgba(168,139,250,.05) 100%)",
      };
    case "Rare":
      return {
        border: "2px solid #ec4899",
        shadow: "0 0 25px rgba(236,72,153,.4)",
        background:
          "linear-gradient(135deg, rgba(236,72,153,.1) 0%, rgba(244,114,182,.05) 100%)",
      };
    default:
      return {
        border: "2px solid #3b82f6",
        shadow: "0 0 20px rgba(59,130,246,.3)",
        background:
          "linear-gradient(135deg, rgba(59,130,246,.1) 0%, rgba(96,165,250,.05) 100%)",
      };
  }
}

export default function GalaxyOrbit({
  tecnologias,
  hoveredTech,
  setHoveredTech,
  currentFocus,
  setCurrentFocus,
  isPlaying,
  rotationSpeed,
  carouselRef,
}) {
  // ----- 3D Mouse Parallax -----
  const containerRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 8, ry: -8 }); // valores suaves iniciales

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left; // pos dentro del contenedor
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      // Mapear a rotaciones
      const maxTilt = 12; // más alto = más dramático
      const ry = ((x - cx) / cx) * maxTilt; // rotateY
      const rx = -((y - cy) / cy) * maxTilt; // rotateX
      setTilt({ rx, ry });
    };

    const reset = () => setTilt({ rx: 8, ry: -8 });

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", reset);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", reset);
    };
  }, []);

  // ----- Capas Z para profundidad -----
  const depthLayers = useMemo(() => {
    // alterna capas Z para profundidad cinematográfica
    // valores en px: más positivo = más “cerca”
    const base = [120, 60, 0, -60, -120];
    // expandimos según cantidad
    return tecnologias.map((_, i) => base[i % base.length]);
  }, [tecnologias]);

  return (
    <motion.div
      ref={containerRef}
      className="galaxy-carousel-container"
      style={{
        // ya tienes perspective en CSS, pero reforzamos por si acaso:
        perspective: "1000px",
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Núcleo */}
      <div className="galaxy-center">
        <div className="center-core">
          <span className="core-icon">💻</span>
          <div className="core-pulse" />
        </div>
      </div>

      {/* Carrusel con rotación global + parallax */}
      <div
        ref={carouselRef}
        className={`galaxy-carousel${!isPlaying ? " paused" : ""}`}
        style={{
          animationPlayState: isPlaying ? "running" : "paused",
          animationDuration: `${20 / rotationSpeed}s`,
          transformStyle: "preserve-3d",
          // Parallax 3D: rotamos el sistema solar completo
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: "transform 180ms ease-out",
        }}
      >
        {tecnologias.map((tech, index) => {
          const angle = (360 / tecnologias.length) * index;
          const orbitRadius = 200 + (index % 3) * 60; // distinta órbita
          const z = depthLayers[index]; // profundidad
          const levelConfig = getLevelConfig(tech.level);
          const rarityConfig = getRarityConfig(tech.rarity);

          return (
            <motion.div
              key={tech.name}
              className={`tech-planet ${currentFocus === index ? "focused" : ""}`}
              data-rarity={tech.rarity || "Common"}
              style={{
                // Variables usadas por tu CSS orbital
                "--orbit-radius": `${orbitRadius}px`,
                "--start-angle": `${angle}deg`,
                "--tech-color": tech.color,
                // Añadimos profundidad real
                transform:
                  `translate(-50%,-50%) rotate(${angle}deg) translateX(${orbitRadius}px) translateZ(${z}px) rotate(${-angle}deg)`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { delay: index * 0.08, type: "spring", stiffness: 220, damping: 18 },
              }}
              whileHover={{ scale: 1.15, zIndex: 100 }}
              onMouseEnter={() => setHoveredTech(tech.name)}
              onMouseLeave={() => setHoveredTech(null)}
              onClick={() => setCurrentFocus(index)}
            >
              <div className="planet-container" style={{ transformStyle: "preserve-3d" }}>
                <div
                  className="planet-core"
                  style={{
                    background: rarityConfig.background,
                    border: rarityConfig.border,
                    boxShadow: hoveredTech === tech.name ? rarityConfig.shadow : "none",
                  }}
                >
                  <img
                    src={tech.icon}
                    alt={`${tech.name} icon`}
                    className="tech-icon-orbit"
                    draggable={false}
                  />

                  <div className="orbital-ring" />

                  <div className="tech-info-orbit">
                    <span className="tech-name-orbit">{tech.name}</span>
                    <div
                      className="tech-level-badge-orbit"
                      style={{ backgroundColor: levelConfig.color, boxShadow: levelConfig.glow }}
                    >
                      {levelConfig.badge}
                    </div>
                  </div>

                  <div className="orbital-particles">
                    <div className="particle" />
                    <div className="particle" />
                    <div className="particle" />
                  </div>
                </div>
              </div>

              {/* Tooltip */}
              <AnimatePresence>
                {hoveredTech === tech.name && (
                  <motion.div
                    className="tech-tooltip-galaxy"
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.96 }}
                    transition={{ duration: 0.22 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="tooltip-header-galaxy">
                      <h4>{tech.name}</h4>
                      <div
                        className={`rarity-gem rarity_${(tech.rarity || "common").toLowerCase()}`}
                      />
                    </div>

                    <div className="tooltip-stats-galaxy">
                      <div className="stat-row">
                        <span>Nivel:</span>
                        <span style={{ color: levelConfig.color }}>{tech.level}</span>
                      </div>
                      <div className="stat-row">
                        <span>Experiencia:</span>
                        <span>{tech.experience}</span>
                      </div>
                      <div className="stat-row">
                        <span>Power:</span>
                        <span style={{ color: levelConfig.color }}>{tech.power}%</span>
                      </div>
                    </div>

                    <p className="tooltip-description-galaxy">{tech.description}</p>

                    <div className="power-bar-galaxy">
                      <div
                        className="power-fill-galaxy"
                        style={{ width: `${tech.power}%`, backgroundColor: levelConfig.color }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Panel enfocado (idéntico a tu UX, controlado desde index) */}
      <AnimatePresence>
        {currentFocus !== null && tecnologias[currentFocus] && (
          <motion.div
            className="focused-tech-panel"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.45 }}
          >
            <div className="focused-tech-content">
              <div className="focused-tech-header">
                <img
                  src={tecnologias[currentFocus].icon}
                  alt={tecnologias[currentFocus].name}
                  className="focused-tech-icon"
                />
                <div className="focused-tech-info">
                  <h3>{tecnologias[currentFocus].name}</h3>
                  <p>{tecnologias[currentFocus].description}</p>
                </div>
              </div>

              <div className="focused-tech-stats">
                <div className="stat-item">
                  <span className="stat-label">Nivel</span>
                  <span className="stat-value">{tecnologias[currentFocus].level}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Experiencia</span>
                  <span className="stat-value">{tecnologias[currentFocus].experience}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Rareza</span>
                  <span className="stat-value">{tecnologias[currentFocus].rarity}</span>
                </div>
              </div>

              <button
                className="close-focus-btn"
                onClick={() => setCurrentFocus(null)}
                aria-label="Cerrar panel enfocado"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
