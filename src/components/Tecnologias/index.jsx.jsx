import React from "react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

import { tecnologias, categories } from "./data";
import { useGalaxyCarousel } from "./useGalaxyCarousel";
import TechFilters from "./TechFilters";
import GalaxyOrbit from "./GalaxyOrbit";

 function Tecnologias() {
  const { t } = useTranslation();
  const {
    hoveredTech, setHoveredTech,
    selectedCategory, setSelectedCategory,
    isPlaying, setIsPlaying,
    currentFocus, setCurrentFocus,
    rotationSpeed, setRotationSpeed,
    carouselRef
  } = useGalaxyCarousel();

  const filteredTechnologies =
    selectedCategory === "Todas"
      ? tecnologias
      : tecnologias.filter(tech => tech.category === selectedCategory);

  return (
    <section id="tecnologias" className="gaming-section gaming-tech-galaxy">

      {/* Fondo */}
      <div className="galaxy-particles"></div>

      <div className="tecnologias_container">

        {/* TÍTULO */}
        <motion.div
          className="title_tecnologias"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="tech_header_wrapper">
            <div className="tech_icon_container">
              <span className="tech_main_icon">🌌</span>
              <div className="icon_glow"></div>
            </div>

            <h2 className="tech_title glowing-text">
              <span className="code_bracket">{"<"}</span>
              Stack Tecnológico
              <span className="code_bracket">{"/>"}</span>
            </h2>
          </div>


          <div className="arsenal_stats">
            <div className="stat_box">
              <span className="stat_number">{tecnologias.length}</span>
              <span className="stat_label">Tecnologías</span>
            </div>
            <div className="stat_box">
              <span className="stat_number">
                {tecnologias.filter(t => t.level === "Avanzado").length}
              </span>
              <span className="stat_label">Nivel Avanzado</span>
            </div>
            <div className="stat_box">
              <span className="stat_number">
                {tecnologias.filter(t => t.rarity === "Epic").length}
              </span>
              <span className="stat_label">Epic Tier</span>
            </div>
          </div>
        </motion.div>

        {/* CONTROLES
        <TechFilters
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          rotationSpeed={rotationSpeed}
          setRotationSpeed={setRotationSpeed}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
        />

        {/* CARRUSEL*/}
        <GalaxyOrbit
          tecnologias={filteredTechnologies}
          hoveredTech={hoveredTech}
          setHoveredTech={setHoveredTech}
          currentFocus={currentFocus}
          setCurrentFocus={setCurrentFocus}
          isPlaying={isPlaying}
          rotationSpeed={rotationSpeed}
          carouselRef={carouselRef}
        />


      </div>
    </section>
  );
}

export default Tecnologias;
