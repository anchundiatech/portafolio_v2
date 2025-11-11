import React, { useState, useCallback, useMemo, memo } from "react";
import { FaEnvelope, FaWhatsapp, FaLinkedin, FaGithub, FaCopy, FaCheck } from "react-icons/fa";
import { Mailbox, Download, Zap, Clock, Star } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "react-i18next";

const Cv = "cv/CV_Alejandro_Anchundia_frontend.pdf";

// Componente memorizado para la tarjeta de contacto primaria
const PrimaryContactCard = memo(({ method, isCopying, isCopied, onCopy }) => {
  const IconComponent = method.icon;
  return (
    <motion.article
      className="contact_card contact_card--primary"
      whileHover={{ y: -5, scale: 1.02, boxShadow: "0 20px 40px rgba(139, 92, 246, 0.4)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="card_glow" aria-hidden="true" />
      <div className="contact_card_content">
        <a
          href={method.href}
          aria-label={method.ariaLabel}
          rel="noopener noreferrer"
          target={method.name !== "Email" ? "_blank" : undefined}
          className="contact_link"
        >
          <div className="icon_wrapper">
            <IconComponent className="contact_icon" aria-hidden="true" />
            <div className="icon_pulse" aria-hidden="true" />
          </div>
          <div className="contact_info">
            <span className="contact_name">{method.name}</span>
            <span className="contact_value">{method.value}</span>
          </div>
        </a>

        {method.copyable && (
          <motion.button
            className={`copy_button ${isCopying ? 'copy_button--copying' : ''} ${isCopied ? 'copy_button--success' : ''}`}
            onClick={() => onCopy(method.value, method.name)}
            aria-label={`Copiar ${method.name}: ${method.value}`}
            title={`Copiar ${method.value}`}
            disabled={isCopying}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isCopied ? (
              <FaCheck className="copy_icon" aria-hidden="true" />
            ) : (
              <FaCopy className="copy_icon" aria-hidden="true" />
            )}
            <div className="button_glow" aria-hidden="true" />
          </motion.button>
        )}
      </div>
    </motion.article>
  );
});

PrimaryContactCard.displayName = "PrimaryContactCard";

// Componente memorizado para tarjetas secundarias
const SecondaryContactCard = memo(({ method, isCopied, onCopy }) => {
  const IconComponent = method.icon;
  return (
    <motion.article
      className="contact_card contact_card--secondary"
      whileHover={{
        y: -5,
        scale: 1.05,
        rotateY: 5
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="card_border_glow" aria-hidden="true" />
      <a
        href={method.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={method.ariaLabel}
        className="contact_link"
      >
        <div className="icon_wrapper">
          <IconComponent className="contact_icon" aria-hidden="true" />
        </div>
        <span className="contact_name">{method.name}</span>
      </a>

      {method.copyable && (
        <motion.button
          className="copy_button_small"
          onClick={() => onCopy(method.value, method.name)}
          aria-label={`Copiar ${method.name}: ${method.value}`}
          title={`Copiar ${method.value}`}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          {isCopied ? (
            <FaCheck aria-hidden="true" />
          ) : (
            <FaCopy aria-hidden="true" />
          )}
        </motion.button>
      )}
    </motion.article>
  );
});

SecondaryContactCard.displayName = "SecondaryContactCard";

// Componente para estadísticas
const StatsSection = memo(() => {
  const stats = useMemo(
    () => [
      { icon: Clock, label: "Respuesta\n24h" },
      { icon: Star, label: "Proyectos\nExitosos" },
      { icon: Zap, label: "Disponible\nAhora" }
    ],
    []
  );

  return (
    <div className="arsenal_stats" role="list">
      {stats.map((stat, index) => (
        <div key={index} className="stat_box" role="listitem">
          <div className="stat_number" aria-hidden="true">
            <stat.icon size={20} />
          </div>
          <div className="stat_label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
});

StatsSection.displayName = "StatsSection";

export default function Contacto() {
  const [copiedItem, setCopiedItem] = useState(null);
  const [cvDownloading, setCvDownloading] = useState(false);
  const [copyingItem, setCopyingItem] = useState(null);
  const { t } = useTranslation();

  // Memoizar los métodos de contacto
  const contactMethods = useMemo(
    () => [
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
    ],
    []
  );

  // Separar contactos una sola vez
  const primaryContacts = useMemo(
    () => contactMethods.filter(method => method.primary),
    [contactMethods]
  );

  const secondaryContacts = useMemo(
    () => contactMethods.filter(method => !method.primary),
    [contactMethods]
  );

  // Optimizar copyToClipboard con mejor manejo de fallback
  const copyToClipboard = useCallback(async (text, itemName) => {
    setCopyingItem(itemName);

    try {
      // Intentar usar Clipboard API moderna
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        setCopiedItem(itemName);
        setCopyingItem(null);
      } else {
        // Fallback para navegadores antiguos o contextos no seguros
        fallbackCopy(text, itemName);
      }

      // Limpiar estado después de 2 segundos
      const timeoutId = setTimeout(() => {
        setCopiedItem(null);
      }, 2000);

      return () => clearTimeout(timeoutId);
    } catch (err) {
      console.warn("Clipboard error:", err);
      fallbackCopy(text, itemName);
    }
  }, []);

  // Función fallback mejorada
  const fallbackCopy = useCallback((text, itemName) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '-9999px';
    document.body.appendChild(textArea);

    try {
      textArea.select();
      const success = document.execCommand('copy');
      if (success) {
        setCopiedItem(itemName);
        setCopyingItem(null);
        setTimeout(() => setCopiedItem(null), 2000);
      }
    } catch (err) {
      console.error("Fallback copy error:", err);
      setCopyingItem(null);
    } finally {
      document.body.removeChild(textArea);
    }
  }, []);

  const handleCvDownload = useCallback(() => {
    setCvDownloading(true);
    const timeoutId = setTimeout(() => setCvDownloading(false), 1500);
    return () => clearTimeout(timeoutId);
  }, []);

  // Animaciones memorizadas
  const fadeInUp = useMemo(
    () => ({
      initial: { opacity: 0, y: 30 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0.8 },
      viewport: { once: true, margin: "-100px" }
    }),
    []
  );

  return (
    <section id="contact" className="contact-section">
      {/* Efectos de fondo */}
      <div className="tech-bg-effects" aria-hidden="true">
        <div className="digital-rain" />
        <div className="circuit-pattern" />
        <div className="energy-field" />
      </div>

      <div className="container_contacto">
        <div className="contact-wrapper">
          {/* Cabecera */}
          <motion.header
            className="contact_header"
            {...fadeInUp}
          >
            <div className="tech_header_wrapper">
              <div className="tech_icon_container">
                <Mailbox className="tech_main_icon" aria-hidden="true" />
                <div className="icon_glow" aria-hidden="true" />
              </div>
              <h2 className="tech_title">
                {t("contact.title", "¡Trabajemos juntos!")}
              </h2>
            </div>

            <p className="contact_description">
              {t("contact.description", "¿Tienes un proyecto web en mente? Me especializo en crear experiencias frontend modernas y funcionales. ¡Estaré encantado de responderte!")}
            </p>

            <StatsSection />
          </motion.header>

          {/* Grid de contactos */}
          <motion.div
            className="contact-methods-grid"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* Contacto principal */}
            <div className="primary_contact_section">
              <div className="section_header">
                <h3>
                  <span className="section_icon" aria-hidden="true">⚡</span>
                  {t("contact.preferred", "Contacto Preferido")}
                </h3>
              </div>

              {primaryContacts.map(method => (
                <PrimaryContactCard
                  key={method.name}
                  method={method}
                  isCopying={copyingItem === method.name}
                  isCopied={copiedItem === method.name}
                  onCopy={copyToClipboard}
                />
              ))}
            </div>

            {/* Contactos secundarios */}
            <div className="secondary_contacts_section">
              <div className="section_header">
                <h3>
                  <span className="section_icon" aria-hidden="true">🌐</span>
                  {t("contact.other_methods", "Otras Formas de Contacto")}
                </h3>
              </div>

              <div className="contact_grid">
                {secondaryContacts.map(method => (
                  <SecondaryContactCard
                    key={method.name}
                    method={method}
                    isCopied={copiedItem === method.name}
                    onCopy={copyToClipboard}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sección CV */}
          <motion.div
            className="cv_section"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="cv_container">
              <div className="cv_header">
                <h3>
                  <span className="cv_icon" aria-hidden="true">📄</span>
                  {t("contact.cv_title", "Curriculum Vitae")}
                </h3>
                <p className="cv_subtitle">
                  {t("contact.cv_subtitle", "Descarga mi CV completo con toda la información detallada")}
                </p>
              </div>

              <motion.a
                className={`cv-button ${cvDownloading ? 'cv-button--downloading' : ''}`}
                href={Cv}
                download="CV_Alejandro_Anchundia_Frontend.pdf"
                onClick={handleCvDownload}
                aria-label="Descargar CV de Alejandro Anchundia en formato PDF"
                whileHover={{
                  y: -3,
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
                        aria-label="Descargando"
                      >
                        ⏳
                      </motion.div>
                    ) : (
                      <Download className="cv_download_icon" aria-hidden="true" />
                    )}
                  </div>
                  <span className="cv_button_text">
                    {cvDownloading ?
                      t("contact.downloading", "Descargando...") :
                      t("contact.download_cv", "Descargar CV")
                    }
                  </span>
                </div>
                <div className="cv_button_glow" aria-hidden="true" />
              </motion.a>

              <div className="cv_info">
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
                    <span className="detail_value">Nov 2025</span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Notificación de copia */}
          <AnimatePresence>
            {copiedItem && (
              <motion.div
                className="copy_notification"
                role="status"
                aria-live="polite"
                initial={{ opacity: 0, x: 100, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 100, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <div className="notification_content">
                  <FaCheck className="notification_icon" aria-hidden="true" />
                  <span className="notification_text">
                    ¡{copiedItem} copiado al portapapeles!
                  </span>
                </div>
                <div className="notification_glow" aria-hidden="true" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}