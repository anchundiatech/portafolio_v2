// src/components/Tecnologias/index.jsx
import React, { useState, useEffect, useRef } from 'react';
import '@/styles/components/tecnologias.css'

const tecnologias = [
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
  
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
];

const Tecnologias = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [offset, setOffset] = useState(0);
  const trackRef = useRef(null);
  const animationRef = useRef(null);

 
  const duplicatedTechs = [...tecnologias, ...tecnologias, ...tecnologias];

  useEffect(() => {
    const animate = () => {
      if (!isPaused) {
        setOffset(prevOffset => {
          const cardWidth = 140 + 24; 
          const totalWidth = tecnologias.length * cardWidth;
          const newOffset = prevOffset - 1;
          
         
          if (Math.abs(newOffset) >= totalWidth) {
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

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isPaused]);

  const animate = () => {
    if (!isPaused) {
      setOffset(prevOffset => {
        const cardWidth = 140 + 24;
        const totalWidth = tecnologias.length * cardWidth;
        const newOffset = prevOffset - 1;
        
        if (Math.abs(newOffset) >= totalWidth) {
          return 0;
        }
        return newOffset;
      });
    }
    animationRef.current = requestAnimationFrame(animate);
  };

  return (
    <section id="tecnologias" className="gaming-tech-galaxy">
      <div className="tecnologias_container">
        <div className="title_tecnologias">
          <h2 className="tech_title">
            <span className="code_bracket">{"<"}</span>
            Tecnologías
            <span className="code_bracket">{"/>"}</span>
          </h2>
        </div>

        <div 
          className="tech-carousel"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div 
            ref={trackRef}
            className={`carousel-track ${isPaused ? 'paused' : ''}`}
            style={{ transform: `translateX(${offset}px)` }}
          >
            {duplicatedTechs.map((tech, index) => (
              <div key={`${tech.name}-${index}`} className="tech-card">
                <div className="tech-icon-wrapper">
                  <img 
                    src={tech.icon} 
                    alt={tech.name} 
                    className="tech-icon" 
                    loading="lazy"
                  />
                </div>
                <span className="tech-name">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pause-indicator">
          {isPaused ? '⏸️ Pausado' : '▶️ Desliza el cursor sobre las tarjetas para pausar'}
        </div>
      </div>
    </section>
  );
};

export default Tecnologias;