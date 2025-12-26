// src/components/Tecnologias.jsx
import React from 'react';
import '@/styles/components/tecnologias.css';

const tecnologias = [
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
];

const Tecnologias = () => {
  // Duplicamos el array para el efecto de scroll infinito suave
  const duplicatedTechs = [...tecnologias, ...tecnologias];

  return (
    <section id="tecnologias" className="gaming-tech-galaxy" aria-label="Tecnologías que utilizo">
      <div className="tecnologias_container">
        <div className="title_tecnologias">
          <h2 className="tech_title">
            <span className="code_bracket">{"<"}</span>
            Tecnologías
            <span className="code_bracket">{"/>"}</span>
          </h2>
        </div>

        <div className="tech-carousel">
          <div className="carousel-track">
            {duplicatedTechs.map((tech, index) => (
              <div key={`${tech.name}-${index}`} className="tech-card" role="listitem">
                <div className="tech-icon-wrapper">
                  <img
                    src={tech.icon}
                    alt={`Logo de ${tech.name}`}
                    className="tech-icon"
                    loading="lazy"
                    width="48"
                    height="48"
                  />
                </div>
                <span className="tech-name">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pause-indicator" aria-hidden="true">
          ▶️ El scroll se pausa al pasar el cursor
        </div>
      </div>
    </section>
  );
};

export default Tecnologias;