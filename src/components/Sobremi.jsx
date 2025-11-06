import React, { useState, useEffect } from "react";
import "../App.css";
import Reactjs from "@/assets/tecnologias/react-svgrepo-com.svg";
import Javascript from "@/assets/tecnologias/javascript.svg";
import Css3 from "@/assets/tecnologias/css3.svg";
import Html from "@/assets/tecnologias/html5 .svg";
import Me from "@/assets/me.jpg";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

export default function Sobremi() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const { t } = useTranslation();

  const skills = [
    { icon: Reactjs, name: "React", level: "Avanzado", experience: "2+ aÃ±os" },
    { icon: Javascript, name: "JavaScript", level: "Avanzado", experience: "3+ aÃ±os" },
    { icon: Css3, name: "CSS3", level: "Experto", experience: "4+ aÃ±os" },
    { icon: Html, name: "HTML5", level: "Experto", experience: "4+ aÃ±os" }
  ];

  const fullText = "Sobre MÃ­";

  // Efecto de escritura para el tÃ­tulo
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setCurrentText(fullText.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const levelColors = {
    "Principiante": "#fbbf24",
    "Intermedio": "#f97316",
    "Avanzado": "#8b5cf6",
    "Experto": "#ec4899"
  };

  return (
    <section id="about-mi" className="container_sobremi epic-entrance">
      
      <div className="section-bg-effects">
        <div className="floating-particles"></div>
        <div className="grid-overlay"></div>
      </div>

      <motion.div
        className="sobremi_content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        
        <motion.div
          className="image_section"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="Imagen_container">
            <div className="image_wrapper">
              <div className="image_glow"></div>
              <div className="image_frame">
                <img
                  src={Me}
                  alt="Alejandro Anchundia"
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  className={imageLoaded ? "loaded" : ""}
                />
                <div className="image_overlay">
                  <div className="scan_line"></div>
                </div>
              </div>
              <div className="image_stats">
                <div className="stat_item">
                  <span className="stat_number">3+</span>
                  <span className="stat_label">AÃ±os Exp.</span>
                </div>
                <div className="stat_item">
                  <span className="stat_number">50+</span>
                  <span className="stat_label">Proyectos</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        
        <motion.div
          className="description_container"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          
          <div className="title_section">
            <h1 className="text_sobremi glowing-text">
              {currentText}
              {isTyping && <span className="typing-cursor">|</span>}
            </h1>
            <div className="title_subtitle">
              <span className="code_bracket">{"<"}</span>
              <span className="role_text">Frontend Developer</span>
              <span className="code_bracket">{"/>"}</span>
            </div>
          </div>

          
          <motion.div
            className="description_text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p>
              Soy desarrollador frontend enfocado en crear interfaces claras,
              <span className="highlight_text"> Ã©picas y funcionales</span>.
              Especializado en tecnologÃ­as modernas y diseÃ±o responsivo.
            </p>
            <p>
              ðŸŽ¯ Mi objetivo es transformar ideas en
              <span className="highlight_text"> realidades digitales</span> que
              impacten y marquen la diferencia.
            </p>
          </motion.div>

          
          <motion.div
            className="skills_section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="skills_header">
              <h4 className="skills_title">
                <span className="code_bracket">{"{"}</span>
                TecnologÃ­as principales
                <span className="code_bracket">{"}"}</span>
              </h4>
              <div className="skills_bar"></div>
            </div>

            <ul className="skills_list epic-hover" role="list">
              {skills.map((skill, index) => (
                <motion.li
                  key={skill.name}
                  className="skill_item"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 1 + (index * 0.1),
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotateY: 10,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="skill_icon">
                    <img src={skill.icon} alt={skill.name} />
                    <div className="skill_glow"></div>
                  </div>
                  <div className="skill_info">
                    <span className="skill_name">{skill.name}</span>
                    <div className="skill_level">
                      <span
                        className="level_badge"
                        style={{ backgroundColor: levelColors[skill.level] }}
                      >
                        {skill.level}
                      </span>
                    </div>
                  </div>

                  
                  <div className="skill_tooltip">
                    <div className="tooltip_header">
                      <h5>{skill.name}</h5>
                      <span
                        className="tooltip_level"
                        style={{ color: levelColors[skill.level] }}
                      >
                        {skill.level}
                      </span>
                    </div>
                    <p>Experiencia: {skill.experience}</p>
                    <div className="tooltip_progress">
                      <div
                        className="progress_bar"
                        style={{
                          width: skill.level === "Experto" ? "95%" :
                                 skill.level === "Avanzado" ? "80%" : "65%"
                        }}
                      ></div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          
          <motion.div
            className="cta_container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <a
              href="#proyects"
              className="cta_button cta_primary glitch-effect"
              aria-label="Explorar mis proyectos web"
            >
              <span className="button_icon">ðŸš€</span>
              <span className="button_text">Ver Proyectos</span>
              <div className="button_effect"></div>
            </a>
            <a
              href="#contacto"
              className="cta_button cta_secondary glitch-effect"
              aria-label="Contactar para colaboraciones"
            >
              <span className="button_icon">ðŸ“§</span>
              <span className="button_text">Contactar</span>
              <div className="button_effect"></div>
            </a>
          </motion.div>

          
          <motion.div
            className="additional_info"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <div className="status_card">
              <div className="status_header">
                <div className="availability_status">
                  <span className="status_indicator pulsing"></span>
                  <span className="status_text">Disponible para nuevos proyectos</span>
                </div>
                <div className="status_badge">ONLINE</div>
              </div>

              <div className="status_details">
                <div className="detail_item">
                  <span className="detail_icon">âš¡</span>
                  <span className="detail_text">Respuesta rÃ¡pida: &lt; 24h</span>
                </div>
                <div className="detail_item">
                  <span className="detail_icon">ðŸŒ</span>
                  <span className="detail_text">Trabajo remoto disponible</span>
                </div>
                <div className="detail_item">
                  <span className="detail_icon">ðŸ’¼</span>
                  <span className="detail_text">Freelance & Contratos</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

