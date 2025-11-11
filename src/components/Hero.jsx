import { useEffect, useState } from "react";
import Me from "@/assets/me.jpg";
import js from "@/assets/tecnologias/javascript.svg";
import react from "@/assets/tecnologias/react-svgrepo-com.svg";
import css from "@/assets/tecnologias/css3.svg";
import tailwind from "@/assets/tecnologias/tailwind-svgrepo-com.svg";
import html from "@/assets/tecnologias/html5 .svg";
import git from "@/assets/tecnologias/git.svg";
import "../App.css";

function Hero() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    // Rotación continua de los iconos
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 1) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const wrapper = document.querySelector(".orbital_wrapper");

    const handleMouseMove = (e) => {
      if (!wrapper) return;

      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * -20;

      wrapper.style.transform = `rotateZ(${rotation}deg) rotateX(${y}deg) rotateY(${x}deg)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [rotation]);

  return (
    <section className="hero_Container" id="hero">
      <div className="hero_content">
        {/* TEXT */}
        <div className="hero_text">
          <h1>
            Hola, soy Alejandro
          </h1>

          <h2 className="hero_subtitle">
            Frontend Developer
          </h2>

          <p className="hero_description">
            Llevo <strong>2+ años</strong> creando interfaces modernas y fluidas.
            Me especializo en transformar ideas en experiencias web visuales,
            rápidas y centradas en el usuario.
            El código es mi forma de construir cosas que importan.
          </p>

          <div className="hero_cta">
            <a href="#projects" className="btn_primary">
              Ver Proyectos
            </a>
            <a href="#contact" className="btn_secondary">
              Hablemos
            </a>
          </div>
        </div>

        {/* IMAGE + ORBITAL DECORATION */}
        <div className="hero_image">
          <div className="orbital_container">
            <div className="orbit orbit-1"></div>
            <div className="orbit orbit-2"></div>
            <div className="orbit orbit-3"></div>
            <div className="orbit orbit-4"></div>
            <div className="orbit orbit-5"></div>

            <div className="orbital_center_glow"></div>

            <div className="image_decoration">
              <img src={Me} alt="Alejandro Anchundia" />
            </div>

            {/* Íconos orbitando */}
            <div className="orbital_wrapper" style={{ transform: `rotateZ(${rotation}deg)` }}>
              <div className="orbital_tech" style={{ transform: "rotate(0deg) translateY(-130px)" }}>
                <div className="tech_orbital_icon">
                  <img src={react} alt="React" />
                </div>
                <div className="tech_orbital_glow"></div>
              </div>

              <div className="orbital_tech" style={{ transform: "rotate(120deg) translateY(-130px)" }}>
                <div className="tech_orbital_icon">
                  <img src={js} alt="JavaScript" />
                </div>
                <div className="tech_orbital_glow"></div>
              </div>

              <div className="orbital_tech" style={{ transform: "rotate(240deg) translateY(-130px)" }}>
                <div className="tech_orbital_icon">
                  <img src={tailwind} alt="Tailwind" />
                </div>
                <div className="tech_orbital_glow"></div>
              </div>

              <div className="orbital_tech" style={{ transform: "rotate(60deg) translateY(-130px)" }}>
                <div className="tech_orbital_icon">
                  <img src={html} alt="HTML5" />
                </div>
                <div className="tech_orbital_glow"></div>
              </div>

              <div className="orbital_tech" style={{ transform: "rotate(180deg) translateY(-130px)" }}>
                <div className="tech_orbital_icon">
                  <img src={css} alt="CSS3" />
                </div>
                <div className="tech_orbital_glow"></div>
              </div>

              <div className="orbital_tech" style={{ transform: "rotate(300deg) translateY(-130px)" }}>
                <div className="tech_orbital_icon">
                  <img src={git} alt="Git" />
                </div>
                <div className="tech_orbital_glow"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;