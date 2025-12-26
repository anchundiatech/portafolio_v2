import React, { useState, useEffect } from "react";
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
} from "react-icons/fa";
import { SiPostgresql, SiTypescript, SiGoogleclassroom } from "react-icons/si";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";

const name_proyects = [
  {
    title: "SkillLink - Aprendizaje ",
    description: "Plataforma de aprendizaje creada en el Hackathon AlumniThon 2025. Espacio interactivo para compartir conocimientos y fomentar el crecimiento profesional.",
    image: skilllinkImage,
    link: "https://skilllink-alumnithon-nine.vercel.app/",
    repository: "https://github.com/mandalorians-team/Skilllink-Alumnithon.git",
    tecnologies: ["React", "TailwindCss", "PosgreSql", "JavaScript"],
  },
  {
    title: "SemiEdu - Educación Inteligente",
    description: "Aplicación web conectada a Google Classroom API para gestión educativa en tiempo real, detección de roles y comunicación simplificada.",
    image: Semi,
    link: "https://semi-edu.vercel.app/",
    repository: "https://github.com/anchundiatech/SemiEdu.git",
    tecnologies: ["NestJs", "React", "TypeScript", "TailwindCss", "NodeJs", "Googleclassroom"],
  },
  {
    title: "EduVoice - Gestión de Testimonios",
    description: "Plataforma diseñada para la recopilación y organización de experiencias educativas efectivas, desarrollada en equipo multidisciplinario.",
    image: Eduvoice,
    link: "https://eduvoicecms.vercel.app/",
    repository: "https://github.com/No-Country-simulation/s11-25-equipo-52-webapp.git",
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
  Googleclassroom: { bg: "#4285F4", color: "#fff", icon: <SiGoogleclassroom /> },
};

function ProyectoCard({ title, description, image, link, repository, tecnologies = [], onOpenModal }) {
  return (
    <article className="proyecto_card">
      <h3>{title}</h3>
      <img
        src={image}
        onClick={() => onOpenModal({ title, description, image, link, repository, tecnologies })}
        alt={`Miniatura del proyecto ${title}`}
        loading="lazy"
        width="380"
        height="200"
      />
      <div className="technologies" role="list">
        {tecnologies.map((tech, index) => {
          const techData = TechColors[tech] || {};
          return (
            <span key={index} className="technology" style={{ backgroundColor: techData.bg, color: techData.color }}>
              {techData.icon} {tech}
            </span>
          );
        })}
      </div>
      <div className="buttons_container">
        <button onClick={() => window.open(link, "_blank", "noopener,noreferrer")} aria-label={`Ver demo de ${title}`}>
          Demo
        </button>
        {repository && (
          <button onClick={() => window.open(repository, "_blank", "noopener,noreferrer")} aria-label={`Ver repositorio de ${title}`}>
            <FaGithub /> Repo
          </button>
        )}
      </div>
    </article>
  );
}

export default function Proyectos() {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedProject]);

  const duplicatedProjects = [...name_proyects, ...name_proyects];

  return (
    <section className="proyectos_section" id="proyectos" aria-labelledby="proyectos-title">
      <div className="proyectos_content">
        <div className="proyectos_text">
          <h2 id="proyectos-title" className="title_proyectos">Mis Proyectos</h2>
        </div>

        <div className="proyectos-carousel">
          <div className="carousel-track-proyectos">
            {duplicatedProjects.map((proyect, index) => (
              <ProyectoCard key={`${proyect.title}-${index}`} {...proyect} onOpenModal={setSelectedProject} />
            ))}
          </div>
        </div>

        <div className="pause-indicator-proyectos" aria-hidden="true">
          ▶️ El scroll se pausa al pasar el cursor
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <div className="project-modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="project-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Cerrar modal">✕</button>
            <div className="modal-content">
              <img src={selectedProject.image} alt={selectedProject.title} className="modal-image" />
              <div className="modal-info">
                <h2 id="modal-title">{selectedProject.title}</h2>
                <p className="modal-description">{selectedProject.description}</p>
                <div className="modal-buttons">
                  <button className="modal-btn btn-demo" onClick={() => window.open(selectedProject.link, "_blank")}>Ver Demo</button>
                  <button className="modal-btn btn-repo" onClick={() => window.open(selectedProject.repository, "_blank")}><FaGithub /> Ver Repo</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
