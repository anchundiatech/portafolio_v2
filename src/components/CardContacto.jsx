import React, { useState, useRef } from "react";
import { FaEnvelope, FaWhatsapp, FaLinkedin, FaGithub, FaCopy, FaCheck } from "react-icons/fa";
import { Mailbox, Download, Zap, Clock, Star } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "react-i18next";
import Cv from '@/assets/cv/CV_Alejandro_Anchundia_frontend.pdf';

export default function Contacto() {
  const [copiedItem, setCopiedItem] = useState(null);
  const [cvDownloading, setCvDownloading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copyingItem, setCopyingItem] = useState(null);
  const { t } = useTranslation();
  const copyButtonRef = useRef(null);

  const contactMethods = [
    {
      name: "Email",
      value: "armandoanchundiayela@gmail.com",
      href: "mailto:armandoanchundiayela@gmail.com?subject=Consulta%20sobre%20proyecto%20web&body=Hola%20Alejandro,%0D%0A%0D%0ATengo%20interés%20en%20discutir%20un%20proyecto%20contigo.",
      icon: FaEnvelope,
      primary: true,
      copyable: true,
      ariaLabel: "Enviar email a Alejandro Anchundia",
      category: "primary"
    },
    {
      name: "WhatsApp",
      value: "+593 99 175 3022",
      href: "https://wa.me/593991753022?text=Hola%20Alejandro,%20me%20interesa%20hablar%20sobre%20un%20proyecto%20web",
      icon: FaWhatsapp,
      copyable: true,
      ariaLabel: "Contactar por WhatsApp a Alejandro Anchundia",
      category: "instant"
    },
    {
      name: "LinkedIn",
      value: "alejandro-anchundia",
      href: "https://linkedin.com/in/alejandro-anchundia",
      icon: FaLinkedin,
      ariaLabel: "Ver perfil de LinkedIn de Alejandro Anchundia",
      category: "professional"
    },
    {
      name: "GitHub",
      value: "anchundiatech",
      href: "https://github.com/anchundiatech",
      icon: FaGithub,
      ariaLabel: "Ver repositorios de GitHub de Alejandro Anchundia",
      category: "code"
    }
  ];

  const copyToClipboard = async (text, itemName) => {
    setCopyingItem(itemName);

    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(itemName);
      setIsSuccess(true);
      setCopyingItem(null);

      setTimeout(() => {
        setCopiedItem(null);
        setIsSuccess(false);
      }, 2000);
    } catch (err) {
      console.warn("Clipboard API no disponible:", err);
      setCopyingItem(null);

      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.readOnly = true;
      textArea.style.position = 'absolute';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);

      textArea.select();
      alert("Presiona Ctrl+C (o ⌘+C en Mac) para copiar el texto.");

      document.body.removeChild(textArea);
      setCopiedItem(itemName);
      setTimeout(() => setCopiedItem(null), 2000);
    }
  };

  const handleCvDownload = () => {
    setCvDownloading(true);
    setTimeout(() => setCvDownloading(false), 1500);
  };

  return (
    <section id="contact" className=" -section">
      <div className="tech-bg-effects">
        <div className="digital-rain"></div>
        <div className="circuit-pattern"></div>
        <div className="energy-field"></div>
      </div>

      <div className="container_contacto">
        <div className="contact-wrapper">


          <motion.div
            className="contact_header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="tech_header_wrapper">
              <div className="tech_icon_container">
                <Mailbox className="tech_main_icon" />
                <div className="icon_glow"></div>
              </div>
              <h2 className="tech_title">
                {t("contact.title", "¡Trabajemos juntos!")}
              </h2>
            </div>

            <p className="contact_description">
              {t("contact.description", "¿Tienes un proyecto web en mente? Me especializo en crear experiencias frontend modernas y funcionales. ¡Estaré encantado de responderte!")}
            </p>


            <div className="arsenal_stats">
              <div className="stat_box">
                <div className="stat_number">
                  <Clock size={20} />
                </div>
                <div className="stat_label">Respuesta<br/>24h</div>
              </div>
              <div className="stat_box">
                <div className="stat_number">
                  <Star size={20} />
                </div>
                <div className="stat_label">Proyectos<br/>Exitosos</div>
              </div>
              <div className="stat_box">
                <div className="stat_number">
                  <Zap size={20} />
                </div>
                <div className="stat_label">Disponible<br/>Ahora</div>
              </div>
            </div>
          </motion.div>


          <motion.div
            className="contact-methods-grid"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Contacto principal */}
            <div className="primary_contact_section">
              <div className="section_header">
                <h3>
                  <span className="section_icon">⚡</span>
                  {t("contact.preferred", "Contacto Preferido")}
                </h3>
              </div>

              {contactMethods
                .filter(method => method.primary)
                .map(method => {
                  const IconComponent = method.icon;
                  return (
                    <motion.div
                      key={method.name}
                      className="contact_card contact_card--primary"
                      whileHover={{
                        y: -5,
                        scale: 1.02,
                        boxShadow: "0 20px 40px rgba(139, 92, 246, 0.4)"
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="card_glow"></div>
                      <div className="contact_card_content">
                        <a
                          href={method.href}
                          aria-label={method.ariaLabel}
                          rel="noopener noreferrer"
                          target={method.name !== "Email" ? "_blank" : undefined}
                          className="contact_link"
                        >
                          <div className="icon_wrapper">
                            <IconComponent className="contact_icon" />
                            <div className="icon_pulse"></div>
                          </div>
                          <div className="contact_info">
                            <span className="contact_name">{method.name}</span>
                            <span className="contact_value">{method.value}</span>
                          </div>
                        </a>

                        {method.copyable && (
                          <button
                            className={`copy_button_  ${
                              copyingItem === method.name ? 'copy_button_ --copying' : ''
                            } ${
                              copiedItem === method.name ? 'copy_button_ --success' : ''
                            }`}
                            onClick={() => copyToClipboard(method.value, method.name)}
                            aria-label={`Copiar ${method.name}: ${method.value}`}
                            title={`Copiar ${method.value}`}
                          >
                            {copiedItem === method.name ? (
                              <FaCheck className="copy_icon" />
                            ) : (
                              <FaCopy className="copy_icon" />
                            )}
                            <div className="button_glow"></div>
                          </button>
                        )}
                      </div>
                    </motion.div>
                  );
                })
              }
            </div>

            {/* Otros contactos */}
            <div className="secondary_contacts_section">
              <div className="section_header">
                <h3>
                  <span className="section_icon">🌐</span>
                  {t("contact.other_methods", "Otras Formas de Contacto")}
                </h3>
              </div>

              <div className="contact_grid">
                {contactMethods
                  .filter(method => !method.primary)
                  .map(method => {
                    const IconComponent = method.icon;
                    return (
                      <motion.div
                        key={method.name}
                        className="contact_card contact_card--secondary"
                        whileHover={{
                          y: -5,
                          scale: 1.05,
                          rotateY: 5
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="card_border_glow"></div>
                        <a
                          href={method.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={method.ariaLabel}
                          className="contact_link"
                        >
                          <div className="icon_wrapper">
                            <IconComponent className="contact_icon" />
                          </div>
                          <span className="contact_name">{method.name}</span>
                        </a>

                        {method.copyable && (
                          <button
                            className="copy_button_small"
                            onClick={() => copyToClipboard(method.value, method.name)}
                            aria-label={`Copiar ${method.name}: ${method.value}`}
                            title={`Copiar ${method.value}`}
                          >
                            {copiedItem === method.name ? (
                              <FaCheck />
                            ) : (
                              <FaCopy />
                            )}
                          </button>
                        )}
                      </motion.div>
                    );
                  })
                }
              </div>
            </div>
          </motion.div>

          {/* Sección CV */}
          <motion.div
            className="  cv_section_ "
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="cv_container">
              <div className="cv_header">
                <h3>
                  <span className="cv_icon">📄</span>
                  {t("contact.cv_title", "Curriculum Vitae")}
                </h3>
                <p className="cv_subtitle">
                  {t("contact.cv_subtitle", "Descarga mi CV completo con toda la información detallada")}
                </p>
              </div>

              <motion.a
                className={`cv-button-  ${cvDownloading ? 'cv-button--downloading' : ''}`}
                href={Cv}
                download="CV_Alejandro_Anchundia_Frontend.pdf"
                onClick={handleCvDownload}
                aria-label="Descargar CV de Alejandro Anchundia en formato PDF"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(139, 92, 246, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="cv_button_content">
                  <div className="cv_icon_container">
                    {cvDownloading ? (
                      <motion.div
                        className="loading_spinner"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        ⏳
                      </motion.div>
                    ) : (
                      <Download className="cv_download_icon" />
                    )}
                  </div>
                  <span className="cv_button_text">
                    {cvDownloading ?
                      t("contact.downloading", "Descargando...") :
                      t("contact.download_cv", "Descargar CV")
                    }
                  </span>
                </div>
                <div className="cv_button_glow"></div>
              </motion.a>

              <div className="cv_info_ ">
                <div className="cv_details">
                  <span className="cv_detail">
                    <span className="detail_label">Formato:</span>
                    <span className="detail_value">PDF</span>
                  </span>
                  <span className="cv_detail">
                    <span className="detail_label">Tamaño:</span>
                    <span className="detail_value">250KB</span>
                  </span>
                  <span className="cv_detail">
                    <span className="detail_label">Actualizado:</span>
                    <span className="detail_value">Agosto 2025</span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Notificación de copia con estilo   */}
          <AnimatePresence>
            {copiedItem && (
              <motion.div
                className="copy_notification_ "
                role="status"
                aria-live="polite"
                initial={{ opacity: 0, x: 100, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 100, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <div className="notification_content">
                  <FaCheck className="notification_icon" />
                  <span className="notification_text">
                    ¡{copiedItem} copiado al portapapeles!
                  </span>
                </div>
                <div className="notification_glow"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}