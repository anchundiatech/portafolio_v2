import React, { useState, useEffect, useCallback } from "react";
//import { Globe, icons } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
//import Select from "react-select";
import "../App.css";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
//import esFlags from "@/assets/flags/icons8-espaÃ±a-48.png";
//import enFlags from "@/assets/flags/icons8-estados-unidos-48.png";

function Header() {
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();

  // Debounced scroll handler para mejor performance
  const handleScroll = useCallback(() => {
    // Cambiar el estado del header cuando se hace scroll
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
        // Mejor detecciÃ³n: centro de la ventana
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
      // Prevenir scroll del body cuando menÃº estÃ¡ abierto
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
    { href: "#inicio", text: t("Inicio") },
    //{ href: "#about-mi", text: t("Sobre Mi") },
    { href: "#proyects", text: t("Proyectos") },
    { href: "#tecnologias", text: t("Tecnologías") },
    { href: "#contact", text: t("Contacto") },
  ];

  //const OptionsLanguage = [
  //  { value: "es", label: "Español", flag: esFlags },
  //  { value: "en", label: "English", flag: enFlags },
  //];

  const handleNavClick = (href) => {
    const sectionId = href.slice(1);
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);

    // Scroll suave programÃ¡tico (fallback si CSS no funciona)
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
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
                <a
                  href={item.href}
                  className={
                    activeSection === item.href.slice(1) ? "active" : ""
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  aria-current={
                    activeSection === item.href.slice(1) ? "page" : undefined
                  }>
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="header_right_info">



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
          <ul>
            {navItems.map((item) => (
              <li key={`mobile-${item.href}`}>
                <a
                  href={item.href}
                  className={
                    activeSection === item.href.slice(1) ? "active" : ""
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  aria-current={
                    activeSection === item.href.slice(1) ? "page" : undefined
                  }>
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;




