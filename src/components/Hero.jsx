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
  const mouseThrottleRef = useRef(null);

  useEffect(() => {
    // Mouse tracking deferred and optimized
    const timer = setTimeout(() => {
      const wrapper = document.querySelector(".orbital_wrapper");
      if (!wrapper) return;

      const handleMouseMove = (e) => {
        const now = Date.now();
        if (mouseThrottleRef.current && now - mouseThrottleRef.current < 20) {
          return;
        }
        mouseThrottleRef.current = now;

        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth - 0.5) * 15;
        const y = (e.clientY / innerHeight - 0.5) * -15;

        requestAnimationFrame(() => {
          wrapper.style.setProperty("--m-x", `${x}deg`);
          wrapper.style.setProperty("--m-y", `${y}deg`);
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

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
            visuales, rápidas y centradas en el usuario.
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

        {/* IMAGE + ORBITAL */}
        <aside className="hero_image" aria-label="Visualización de tecnologías">
          <div
            className="orbital_container"
            role="img"
            aria-label="Sistema orbital de tecnologías">
            <div className="orbit orbit-1" aria-hidden="true"></div>
            <div className="orbit orbit-2" aria-hidden="true"></div>
            <div className="orbit orbit-3" aria-hidden="true"></div>

            <div className="orbital_center_glow" aria-hidden="true"></div>

            <figure className="image_decoration">
              <img
                src={Me}
                alt="Alejandro Anchundia, Desarrollador Frontend"
                loading="eager"
                fetchpriority="high"
                width="280"
                height="280"
                itemProp="image"
              />
            </figure>

            {/* Íconos orbitando */}
            <div className="orbital_wrapper orbital_wrapper--animated" aria-hidden="true">
              <div
                className="orbital_tech"
                style={{ transform: "rotate(0deg) translateY(-130px)" }}>
                <div className="tech_orbital_icon" title="React">
                  <img src={react} alt="React" loading="lazy" width="40" height="40" />
                </div>
              </div>

              <div
                className="orbital_tech"
                style={{ transform: "rotate(60deg) translateY(-130px)" }}>
                <div className="tech_orbital_icon" title="HTML5">
                  <img src={html} alt="HTML5" loading="lazy" width="40" height="40" />
                </div>
              </div>

              <div
                className="orbital_tech"
                style={{ transform: "rotate(120deg) translateY(-130px)" }}>
                <div className="tech_orbital_icon" title="JavaScript">
                  <img src={js} alt="JavaScript" loading="lazy" width="40" height="40" />
                </div>
              </div>

              <div
                className="orbital_tech"
                style={{ transform: "rotate(180deg) translateY(-130px)" }}>
                <div className="tech_orbital_icon" title="CSS3">
                  <img src={css} alt="CSS3" loading="lazy" width="40" height="40" />
                </div>
              </div>

              <div
                className="orbital_tech"
                style={{ transform: "rotate(240deg) translateY(-130px)" }}>
                <div className="tech_orbital_icon" title="Tailwind CSS">
                  <img src={tailwind} alt="Tailwind CSS" loading="lazy" width="40" height="40" />
                </div>
              </div>

              <div
                className="orbital_tech"
                style={{ transform: "rotate(300deg) translateY(-130px)" }}>
                <div className="tech_orbital_icon" title="Git">
                  <img src={git} alt="Git" loading="lazy" width="40" height="40" />
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default Hero;
