// src/pages/AboutMeDetailed.jsx
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import "../styles/pages/aboutme-detailed.css";
import Me from "@/assets/me.jpg";

function AboutMeDetailed() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const miViaje = [
    { year: "2020", title: "El comienzo", description: "Inicié mi camino en el desarrollo de software en el Instituto Superior Tecnológico Limón, aprendiendo los fundamentos.", icon: "🌱" },
    { year: "2023", title: "Graduación y Pasión", description: "Me gradué como Tecnólogo Superior en Desarrollo de Software y descubrí el desarrollo frontend con ONE.", icon: "🎓" },
    { year: "2024", title: "Especialización en React", description: "Especialización en Alura Latam, profundizando en JavaScript moderno y React.", icon: "🚀" },
    { year: "2025", title: "Proyectos Reales", description: "Participación en hackathons y certificaciones de Oracle Cloud Infrastructure (OCI).", icon: "💎" },
    { year: "Actualidad", title: "Futuro", description: "Crecimiento constante y búsqueda de soluciones innovadoras con impacto real.", icon: "🌍" }
  ];

  const fortalezas = [
    { titulo: "Frontend Development", icon: "💻", descripcion: "Experto en React, JavaScript moderno y CSS avanzado." },
    { titulo: "Optimización", icon: "⚡", descripcion: "Aplicaciones rápidas, eficientes y centradas en el rendimiento." },
    { titulo: "Innovación", icon: "🔥", descripcion: "Investigación constante de nuevas tecnologías y paradigmas." }
  ];

  return (
    <div className="aboutme-detailed-container">
      {/* Header */}
      <header className="aboutme-detailed-header">
        <button
          className="back-button-detailed"
          onClick={() => navigate("/")}
          aria-label="Volver a la página principal">
          <span>←</span>
          <span>Volver</span>
        </button>
        <h1 className="page-title">Sobre Mí</h1>
      </header>

      {/* Hero */}
      <section className="hero-aboutme-detailed" aria-labelledby="hero-title">
        <div className="hero-content">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 id="hero-title">Hola, soy Alejandro Anchundia</h2>
            <p className="subtitle">Frontend Developer | Innovador Digital</p>
            <p className="description">
              Desarrollador enfocado en crear experiencias interactivas y rápidas.
              Mi meta es transformar problemas complejos en interfaces sencillas y elegantes.
            </p>
          </motion.div>
          <motion.div
            className="hero-image"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img src={Me} alt="Fotografía de Alejandro Anchundia" loading="eager" />
          </motion.div>
        </div>
      </section>

      {/* Mi Viaje */}
      <section className="journey-section" aria-labelledby="journey-title">
        <div className="section-header-detailed">
          <h2 id="journey-title">Mi Viaje Profesional</h2>
          <p>Evolución y hitos clave en mi carrera</p>
        </div>

        <div className="timeline-detailed" role="list">
          {miViaje.map((item, index) => (
            <motion.article
              key={index}
              className="timeline-item-detailed"
              role="listitem"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="timeline-marker-detailed">
                <span className="marker-icon" role="img" aria-label="Icono etapa">{item.icon}</span>
                <span className="marker-year">{item.year}</span>
              </div>
              <div className="timeline-content-detailed">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Fortalezas */}
      <section className="strengths-section-detailed" aria-labelledby="strengths-title">
        <div className="section-header-detailed">
          <h2 id="strengths-title">Mis Fortalezas</h2>
          <p>Habilidades que definen mi trabajo</p>
        </div>

        <div className="strengths-grid-detailed">
          {fortalezas.map((item, index) => (
            <motion.article
              key={index}
              className="strength-card-detailed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="strength-icon-detailed" role="img" aria-label="Icono fortaleza">{item.icon}</div>
              <h3>{item.titulo}</h3>
              <p>{item.descripcion}</p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section-detailed">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>¿Listo para innovar?</h2>
          <p>Trabajemos juntos para llevar tu idea al siguiente nivel.</p>
          <button
            className="cta-button-detailed"
            onClick={() => navigate("/")}
            aria-label="Ir a la sección de contacto"
          >
            Contactar
          </button>
        </motion.div>
      </section>
    </div>
  );
}

export default AboutMeDetailed;