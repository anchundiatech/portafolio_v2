import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import imagenDecoration from "@/assets/me.jpg"

export default function Hero() {
  const { t } = useTranslation();

  return(
    <section id="inicio" className="hero_Container">
            <div className="floating-particle"></div>
      <div className="floating-particle"></div>
      <div className="floating-particle"></div>

       <div className="hero_content" >
        <motion.div
          className="hero_text"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>{t("hero.title", "Hola soy Alejandro" )}
            <span className="wave">ðŸ‘‹</span>
          </h1>

          <h2 className="hero_subtitle">{t("hero.subtitle", "Desarrollador Frontend")}</h2>

          <p className="hero_description">
            {t("hero.description", "Especializado en React, JavaScript y tecnologías de desarrollo web."
            )}
          </p>
          <div className="hero_cta">
            <a href="#proyects" className="btn_primary">
              {t("hero.cta_projects", "Ver Proyectos")}
            </a>
            <a href="#contact" className="btn_secondary">
              {t("hero.cta_contact", "Contactar")}
            </a>
          </div>
        </motion.div>

        <motion.div
          className="hero_image"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1}}
          transition={{ duration: 0.8, delay: 0.2}}
          >
            <div className="image_decoration">
              <img src={imagenDecoration} alt="Alejandro Anchundia" />
            </div>
          </motion.div>
       </div>
    </section>
  )
}


