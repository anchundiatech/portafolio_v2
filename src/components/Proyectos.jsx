import React from "react";

import "@/App.css";
import skilllinkImage from "@/assets/proyects/722shots_so.png";

import AluraGeek from "@/assets/proyects/aluraGeek.png";
import Org from "@/assets/proyects/org.png";
import Profilecard from "@/assets/proyects/profilecard.png";
import {
  FaReact,
  FaJs,
  FaCss3Alt,
  FaHtml5,
  FaNodeJs,
  FaGithub,
} from "react-icons/fa";
import { SiTailwindcss, SiPostgresql } from "react-icons/si";

const name_proyects = [
  {
    title: "SkillLink - Plataforma de Aprendizaje ",
    description:
      "Desarrollado en colaboraciÃ³n con el Equipo 3 durante el Hackathon AlumniThon 2025. El proyecto consistiÃ³ en crear una plataforma de aprendizaje dirigida a estudiantes y profesionales, ofreciendo un espacio interactivo para compartir conocimientos, acceder a recursos educativos y fomentar el crecimiento profesional.",
    image: skilllinkImage,
    link: "https://skilllink-alumnithon-nine.vercel.app/",
    repository: "https://github.com/mandalorians-team/Skilllink-Alumnithon.git",
    tecnologies: ["React", "TailwingCss", "PosgreSql"],
  },
  {
    title: "AluraGeek",
    description: "AluraGeek es una aplicaciÃ³n web enfocada en la gestiÃ³n de productos, diseÃ±ada para mejorar la organizaciÃ³n y productividad. Desarrollada con React, JavaScript, CSS y consumo de una API REST, permite agregar, editar y eliminar tareas o Ã­tems de forma intuitiva. Su interfaz responsiva y moderna ofrece una experiencia fluida tanto en escritorio como en dispositivos mÃ³viles.",
    image: AluraGeek,
    link: "https://challenge-alura-geek-pi.vercel.app/",
    repository: "https://github.com/anchundiatech/challenge-AluraGeek.git",
    tecnologies: ["React", "JavaScript", "CSS", "Api Rest"],
  },
  {
    title: "Org",
    description:
      "DiseÃ±o de interfaz moderna y minimalista para una plataforma de gestiÃ³n de personas y equipos. Incluye elementos grÃ¡ficos limpios y tipografÃ­a clara para transmitir organizaciÃ³n, colaboraciÃ³n y productividad en un solo lugar.",
    image: Org,
    link: "https://org-kappa-hazel.vercel.app/",
    repository: "https://github.com/anchundiatech/org.git",
    tecnologies: ["React", "CSS", "HTML"],
  },
  {
    title: "ProfileCard",
    description:
      'Tarjeta de perfil interactiva con datos de usuario, diseÃ±ada con un estilo fresco y profesional. Presenta informaciÃ³n clave como seguidores, "likes" y fotos, destacando la identidad visual con colores vibrantes y un diseÃ±o responsivo.',
    image: Profilecard,
    link: "https://anchundiatech.github.io/profile-card/",
    repository: "https://github.com/anchundiatech/profile-card.git",
    tecnologies: ["HTML", "CSS"],
  },
];

const TechColors = {
  React: { bg: "#61dafb", color: "#000", icon: <FaReact /> },
  JavaScript: { bg: "#f7df1e", color: "#000", icon: <FaJs /> },
  CSS: { bg: "#2965f1", color: "#fff", icon: <FaCss3Alt /> },
  HTML: { bg: "#e34f26", color: "#fff", icon: <FaHtml5 /> },
  GitHub: { bg: "#333", color: "#fff", icon: <FaGithub /> },
  NodeJS: { bg: "#68a063", color: "#fff", icon: <FaNodeJs /> },
  Tailwind: { bg: "#38bdf8", color: "#000", icon: <SiTailwindcss /> },
  PosgreSql: { bg: "#336791", color: "#fff", icon: <SiPostgresql /> },
};
function ProyectoCard({title, description,  image,  link,  repository,  tecnologies = [],}) {
  const detailsRef = React.useRef(null)

  const toggleDetails = () => {

    if (detailsRef.current) {
      detailsRef.current.open = !detailsRef.current.open;

    }
  }
  return (
    <div className="proyecto_card">
      <h3>{title}</h3>
      <details ref={detailsRef}>
        <summary style={{ display: "none" }}></summary> 
        <p>{description}</p>
      </details>

      <img
      src={image}
      onClick={toggleDetails}
      style={{ cursor: "pointer"  }}
      alt={title}
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

export default function Proyectos() {
  return (
    <section className="proyectos_section" id="#proyects">
      <div className="proyectos_content">
        <div className="proyectos_text">
          <h2 className="title_proyectos">Mis Proyectos</h2>
        </div>

        <div className="projects-grid">
          {name_proyects.slice(0, 3).map((proyect, i) => (
            <ProyectoCard key={i} {...proyect} />
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.25rem' }}>
          <a
            href="#/proyectos"
            className="btn_secondary"
            aria-label="Ver todos los proyectos"
          >
            Ver todos los proyectos â†’
          </a>
        </div>
      </div>
    </section>
  );
}

