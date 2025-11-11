import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import "../App.css";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";

function Header() {
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();

  // Debounced scroll handler para mejor performance
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);

    const sections = [
      "inicio",
      "about-mi",
      "proyects",
      "Tecnologías",
      "contacto",
    ];
    const current = sections.find((section) => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        return (
          rect.top <= window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 2
        );
      }
      return false;
    });

    if (current && current !== activeSection) {
      setActiveSection(current);
    }
  }, [activeSection]);

  useEffect(() => {
    let timeoutId = null;
    const debouncedHandleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 10);
    };

    window.addEventListener("scroll", debouncedHandleScroll);
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
      clearTimeout(timeoutId);
    };
  }, [handleScroll]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { href: "/", text: t("Inicio"), isNavigation: false },
    { href: "/sobremi-detallado", text: t("Sobre Mi"), isNavigation: true },
    { href: "#proyectos", text: t("Proyectos"), isNavigation: false },
    { href: "#tecnologias", text: t("Tecnologías"), isNavigation: false },
    { href: "#contact", text: t("Contacto"), isNavigation: false },
  ];



  const handleLanguageChange = (langCode) => {
    setLanguage(langCode);
    i18n.changeLanguage(langCode);
  };

  const handleNavClick = (item) => {
    setIsMobileMenuOpen(false);

    if (item.isNavigation) {
      // Navegar a otra página
      navigate(item.href);
    } else {
      // Scroll a sección
      const sectionId = item.href.slice(1);
      setActiveSection(sectionId);
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className={`Header ${isScrolled ? "Header--scrolled" : ""}`}>
      <nav
        className="nav bg-grip"
        role="navigation"
        aria-label="Navegación principal">

        <div className="menu_container">
          <ul className="list_nav">
            {navItems.map((item) => (
              <li key={item.href} className="nav_item">
                {item.isNavigation ? (
                  <button
                    onClick={() => handleNavClick(item)}
                    className="nav-link-button"
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "inherit",
                      font: "inherit",
                      padding: "0",
                    }}>
                    {item.text}
                  </button>
                ) : (
                  <a
                    href={item.href}
                    className={
                      activeSection === item.href.slice(1) ? "active" : ""
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item);
                    }}>
                    {item.text}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

       

        <button
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-label={
            isMobileMenuOpen ? "Cerrar menú móvil" : "Abrir menú móvil"
          }
          aria-controls="mobile-navigation">
          <span
            className={`burger_line ${
              isMobileMenuOpen ? "burger_line--1" : ""
            }`}></span>
          <span
            className={`burger_line ${
              isMobileMenuOpen ? "burger_line--2" : ""
            }`}></span>
          <span
            className={`burger_line ${
              isMobileMenuOpen ? "burger_line--3" : ""
            }`}></span>
        </button>

        {isMobileMenuOpen && (
          <div
            className="mobile-menu-overlay"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        <div
          id="mobile-navigation"
          className={`mobile-menu ${
            isMobileMenuOpen ? "mobile-menu--open" : ""
          }`}>
          <button
            className="mobile-menu-close"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Cerrar menú">
            ×
          </button>
          <ul>
            {navItems.map((item) => (
              <li key={`mobile-${item.href}`}>
                {item.isNavigation ? (
                  <button
                    onClick={() => handleNavClick(item)}
                    className="mobile-menu-link"
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "inherit",
                      font: "inherit",
                      padding: "0",
                      width: "100%",
                      textAlign: "center",
                    }}>
                    {item.text}
                  </button>
                ) : (
                  <a
                    href={item.href}
                    className={`mobile-menu-link ${
                      activeSection === item.href.slice(1) ? "active" : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item);
                    }}>
                    {item.text}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;