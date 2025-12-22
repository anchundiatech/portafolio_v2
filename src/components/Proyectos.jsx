import React, { useState, useEffect, useRef } from "react";

import "@/App.css";
import "@/styles/components/proyectos.css";
import skilllinkImage from "@/assets/proyects/722shots_so.webp";
import Eduvoice from "@/assets/proyects/eduvoice.webp";
import Semi from "@/assets/proyects/Semi.webp";
import {
  FaReact,
  FaJs,
  FaCss3Alt,
  FaHtml5,
  FaNodeJs,
  FaGithub,
  SiPostgresql,
  SiTypescript,
  SiGoogleclassroom,
  RiNextjsFill,
  RiTailwindCssFill,
} from "@/icons";

const name_proyects = [
  {
    title: "SkillLink - Plataforma de Aprendizaje ",
    description:
      "Desarrollado en colaboración con el Equipo 3 durante el Hackathon AlumniThon 2025. El proyecto consistió en crear una plataforma de aprendizaje dirigida a estudiantes y profesionales, ofreciendo un espacio interactivo para compartir conocimientos, acceder a recursos educativos y fomentar el crecimiento profesional.",
    image: skilllinkImage,
    link: "https://skilllink-alumnithon-nine.vercel.app/",
    repository: "https://github.com/mandalorians-team/Skilllink-Alumnithon.git",
    tecnologies: ["React", "TailwindCss", "PosgreSql", "JavaScript"],
  },
  {
    title: "SemiEdu - Plataforma Educativa Inteligente",
    description:
      "SemiEdu es una innovadora aplicación web stateless que se conecta directamente con Google Classroom API. Ofrece información en tiempo real, detección automática de roles y comunicación simplificada para estudiantes, docentes y coordinadores sin necesidad de base de datos externa.",
    image: Semi,
    link: "https://semi-edu.vercel.app/",
    repository: "https://github.com/anchundiatech/SemiEdu.git",
    tecnologies: [
      "NestJs",
      "React",
      "TypeScript",
      "TailwindCss",
      "NodeJs",
      "Googleclassroom",
    ],
  },
  {
    title: "EduVoice - Plataforma de Gestion de testimonios",
    description:
      "Proyecto desarrollado como parte del esquipo 52, donde tuve la oportunidad de contribuir como desarrollador frontend. EduVoice es una plataforma diseñada para gestionar testimonios de estudiantes, permitiendo la recopilación, organización y presentación de experiencias educativas de manera efectiva.",
    image: Eduvoice,
    link: "eduvoicecms.vercel.app/",
    repository:
      "https://github.com/No-Country-simulation/s11-25-equipo-52-webapp.git",
    tecnologies: ["React", "CSS", "HTML"],
  },
];

const TechColors = {
  React: { bg: "#61dafb", color: "#000", icon: <FaReact /> },
  JavaScript: { bg: "#f7df1e", color: "#000", icon: <FaJs /> },
  CSS: { bg: "#2965f1", color: "#fff", icon: <FaCss3Alt /> },
  HTML: { bg: "#e34f26", color: "#fff", icon: <FaHtml5 /> },
  GitHub: { bg: "#333", color: "#fff", icon: <FaGithub /> },
  NodeJS: { bg: "#68a063", color: "#fff", icon: <FaNodeJs /> },
  TailwindCss: { bg: "#38bdf8", color: "#000", icon: <RiTailwindCssFill /> },
  PosgreSql: { bg: "#336791", color: "#fff", icon: <SiPostgresql /> },
  NestJs: { bg: "#000", color: "#fff", icon: <RiNextjsFill /> },
  TypeScript: { bg: "#3178c6", color: "#fff", icon: <SiTypescript /> },
  Googleclassroom: {
    bg: "#4285F4",
    color: "#fff",
    icon: <SiGoogleclassroom />,
  },
};
function ProyectoCard({
  title,
  description,
  image,
  link,
  repository,
  tecnologies = [],
  onOpenModal,
}) {
  return (
    <div className="proyecto_card">
      <h3>{title}</h3>

      <img
        src={image}
        onClick={() =>
          onOpenModal({
            title,
            description,
            image,
            link,
            repository,
            tecnologies,
          })
        }
        style={{ cursor: "pointer" }}
        alt={title}
        loading="lazy"
      />
      <div className="technologies">
        {tecnologies.map((tech, index) => {
          const techData = TechColors[tech] || {};
          return (
            <span
              key={index}
              className="technology"
              style={{
                backgroundColor: techData.bg,
                color: techData.color,
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "4px 10px",
                borderRadius: "6px",
              }}>
              {techData.icon} {tech}
            </span>
          );
        })}
      </div>

      <div className="buttons_container">
        <button
          onClick={() => window.open(link, "_blank", "noopener,noreferrer")}
          aria-label={`Ver demo de ${title}`}>
          Ver Demo
        </button>

        {repository && (
          <button
            onClick={() =>
              window.open(repository, "_blank", "noopener,noreferrer")
            }
            aria-label={`Ver repositorio de ${title}`}>
            <FaGithub />
            <span>Ver Repositorio</span>
          </button>
        )}
      </div>
    </div>
  );
}

// Constantes fuera del componente para evitar recalculos
const CARD_WIDTH = 380; // min-height del card
const CARD_GAP = 24; // gap en el carousel
const CARD_TOTAL_WIDTH = CARD_WIDTH + CARD_GAP;
const TOTAL_CAROUSEL_WIDTH = name_proyects.length * CARD_TOTAL_WIDTH;

export default function Proyectos() {
  const [isPaused, setIsPaused] = useState(false);
  const [offset, setOffset] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const trackRef = useRef(null);
  const animationRef = useRef(null);

  // Duplicar proyectos para efecto infinito
  const duplicatedProjects = [
    ...name_proyects,
    ...name_proyects,
    ...name_proyects,
  ];

  // Cerrar modal con ESC y controlar overflow del body
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };

    if (selectedProject) {
      // Ocultar overflow cuando el modal está abierto
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      // Restaurar overflow cuando se cierra el modal
      document.body.style.overflow = "unset";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  useEffect(() => {
    const animate = () => {
      if (!isPaused) {
        setOffset((prevOffset) => {
          const newOffset = prevOffset - 1;

          if (Math.abs(newOffset) >= TOTAL_CAROUSEL_WIDTH) {
            return 0;
          }
          return newOffset;
        });
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      } else {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isPaused]);

  const animate = () => {
    if (!isPaused) {
      setOffset((prevOffset) => {
        const newOffset = prevOffset - 1;

        if (Math.abs(newOffset) >= TOTAL_CAROUSEL_WIDTH) {
          return 0;
        }
        return newOffset;
      });
    }
    animationRef.current = requestAnimationFrame(animate);
  };

  return (
    <section className="proyectos_section" id="proyectos">
      <div className="proyectos_content">
        <div className="proyectos_text">
          <h2 className="title_proyectos">Mis Proyectos</h2>
        </div>

        <div
          className="proyectos-carousel"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}>
          <div
            ref={trackRef}
            className={`carousel-track-proyectos ${isPaused ? "paused" : ""}`}
            style={{ transform: `translateX(${offset}px)` }}>
            {duplicatedProjects.map((proyect, index) => (
              <ProyectoCard
                key={`${proyect.title}-${index}`}
                {...proyect}
                onOpenModal={setSelectedProject}
              />
            ))}
          </div>
        </div>

        <div className="pause-indicator-proyectos">
          {isPaused
            ? "⏸️ Pausado"
            : "▶️ Desliza el cursor sobre las tarjetas para pausar"}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1.25rem",
          }}>
          <a
            href="https://github.com/anchundiatech"
            className="btn_secondary"
            aria-label="Ver todos los proyectos">
            Ver todos los proyectos →
          </a>
        </div>
      </div>

      {/* Modal del Proyecto */}
      {selectedProject && (
        <div
          className="project-modal-overlay"
          onClick={() => setSelectedProject(null)}>
          <div className="project-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedProject(null)}
              aria-label="Cerrar modal">
              ✕
            </button>

            <div className="modal-content">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="modal-image"
              />

              <div className="modal-info">
                <h2>{selectedProject.title}</h2>
                <p className="modal-description">
                  {selectedProject.description}
                </p>

                <div className="modal-technologies">
                  <h3>Tecnologías</h3>
                  <div className="tech-list">
                    {selectedProject.tecnologies.map((tech, index) => {
                      const techData = TechColors[tech] || {};
                      return (
                        <span
                          key={index}
                          className="tech-badge"
                          style={{
                            backgroundColor: techData.bg,
                            color: techData.color,
                          }}>
                          {techData.icon && (
                            <span style={{ marginRight: "4px" }}>
                              {techData.icon}
                            </span>
                          )}
                          {tech}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="modal-buttons">
                  {selectedProject.link && (
                    <button
                      className="modal-btn btn-demo"
                      onClick={() =>
                        window.open(
                          selectedProject.link,
                          "_blank",
                          "noopener,noreferrer"
                        )
                      }>
                      Ver Demo
                    </button>
                  )}

                  {selectedProject.repository && (
                    <button
                      className="modal-btn btn-repo"
                      onClick={() =>
                        window.open(
                          selectedProject.repository,
                          "_blank",
                          "noopener,noreferrer"
                        )
                      }>
                      <FaGithub /> Ver Repositorio
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
