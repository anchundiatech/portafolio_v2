import React, { useEffect, useState, useRef } from "react";
import Me from "@/assets/me.webp";
import js from "@/assets/tecnologias/javascript.svg";
import react from "@/assets/tecnologias/react-svgrepo-com.svg";
import css from "@/assets/tecnologias/css3.svg";
import tailwind from "@/assets/tecnologias/tailwind-svgrepo-com.svg";
import html from "@/assets/tecnologias/html5 .svg";
import git from "@/assets/tecnologias/git.svg";
import "../App.css";

function Hero() {
  const [rotation, setRotation] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const mouseThrottleRef = useRef(null);

  // Defer rotation updates - use CSS animations instead for critical render path
  useEffect(() => {
    // Don't start animation until after first paint
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setRotation((prev) => (prev + 7.2) % 360);
      }, 200);
      return () => clearInterval(interval);
    }, 100); // Small delay after mount

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Defer mouse tracking until after LCP
    const timer = setTimeout(() => {
      const wrapper = document.querySelector(".orbital_wrapper");
      if (!wrapper) return;

      const handleMouseMove = (e) => {
        const now = Date.now();
        if (mouseThrottleRef.current && now - mouseThrottleRef.current < 16) {
          return;
        }
        mouseThrottleRef.current = now;

        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth - 0.5) * 20;
        const y = (e.clientY / innerHeight - 0.5) * -20;

        requestAnimationFrame(() => {
          wrapper.style.transform = `rotateZ(${rotation}deg) rotateX(${y}deg) rotateY(${x}deg)`;
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, 200); // Defer after LCP

    return () => clearTimeout(timer);
  }, [rotation]);

  return (
    <section
      className="hero_Container"
      id="hero"
      aria-label="Sección de presentación"
      role="region">
      <div className="hero_content">
        {/* TEXT */}
        <article className="hero_text">
          <h1 itemProp="name">Hola, soy Alejandro</h1>

          <h2 className="hero_subtitle" itemProp="jobTitle">
            Frontend Developer
          </h2>

          <p className="hero_description" itemProp="description">
            Llevo <strong>2+ años</strong> creando interfaces modernas y
            fluidas. Me especializo en transformar ideas en experiencias web
            visuales, rápidas y centradas en el usuario. El código es mi forma
            de construir cosas que importan.
          </p>

          <nav className="hero_cta" aria-label="Acciones principales">
            <a
              href="#proyectos"
              className="btn_primary"
              aria-label="Ver mis proyectos destacados">
              Ver Proyectos
            </a>
            <a
              href="#contact"
              className="btn_secondary"
              aria-label="Contactar conmigo">
              Hablemos
            </a>
          </nav>
        </article>

        {/* IMAGE + ORBITAL DECORATION */}
        <aside className="hero_image" aria-label="Visualización de tecnologías">
          <div
            className="orbital_container"
            role="img"
            aria-label="Sistema orbital de tecnologías">
            <div className="orbit orbit-1" aria-hidden="true"></div>
            <div className="orbit orbit-2" aria-hidden="true"></div>
            <div className="orbit orbit-3" aria-hidden="true"></div>
            <div className="orbit orbit-4" aria-hidden="true"></div>
            <div className="orbit orbit-5" aria-hidden="true"></div>

            <div className="orbital_center_glow" aria-hidden="true"></div>

            <figure className="image_decoration">
              <img
                src={Me}
                alt="Fotografía profesional de Alejandro Anchundia, Desarrollador Frontend"
                loading="eager"
                width="280"
                height="280"
                itemProp="image"
              />
            </figure>

            {/* Íconos orbitando */}
            <div
              className="orbital_wrapper"
              style={{ transform: `rotateZ(${rotation}deg)` }}
              aria-hidden="true">
              <div
                className="orbital_tech"
                style={{ transform: "rotate(0deg) translateY(-130px)" }}>
                <div
                  className="tech_orbital_icon"
                  title="React - Librería JavaScript">
                  <img
                    src={react}
                    alt="Logo de React"
                    loading="lazy"
                    width="40"
                    height="40"
                  />
                </div>
                <div className="tech_orbital_glow"></div>
              </div>

              <div
                className="orbital_tech"
                style={{ transform: "rotate(120deg) translateY(-130px)" }}>
                <div
                  className="tech_orbital_icon"
                  title="JavaScript - Lenguaje de programación">
                  <img
                    src={js}
                    alt="Logo de JavaScript"
                    loading="lazy"
                    width="40"
                    height="40"
                  />
                </div>
                <div className="tech_orbital_glow"></div>
              </div>

              <div
                className="orbital_tech"
                style={{ transform: "rotate(240deg) translateY(-130px)" }}>
                <div
                  className="tech_orbital_icon"
                  title="Tailwind CSS - Framework de CSS">
                  <img
                    src={tailwind}
                    alt="Logo de Tailwind CSS"
                    loading="lazy"
                    width="40"
                    height="40"
                  />
                </div>
                <div className="tech_orbital_glow"></div>
              </div>

              <div
                className="orbital_tech"
                style={{ transform: "rotate(60deg) translateY(-130px)" }}>
                <div
                  className="tech_orbital_icon"
                  title="HTML5 - Lenguaje de marcado">
                  <img
                    src={html}
                    alt="Logo de HTML5"
                    loading="lazy"
                    width="40"
                    height="40"
                  />
                </div>
                <div className="tech_orbital_glow"></div>
              </div>

              <div
                className="orbital_tech"
                style={{ transform: "rotate(180deg) translateY(-130px)" }}>
                <div
                  className="tech_orbital_icon"
                  title="CSS3 - Hojas de estilo">
                  <img
                    src={css}
                    alt="Logo de CSS3"
                    loading="lazy"
                    width="40"
                    height="40"
                  />
                </div>
                <div className="tech_orbital_glow"></div>
              </div>

              <div
                className="orbital_tech"
                style={{ transform: "rotate(300deg) translateY(-130px)" }}>
                <div
                  className="tech_orbital_icon"
                  title="Git - Control de versiones">
                  <img
                    src={git}
                    alt="Logo de Git"
                    loading="lazy"
                    width="40"
                    height="40"
                  />
                </div>
                <div className="tech_orbital_glow"></div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default Hero;
