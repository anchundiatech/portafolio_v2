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
  // Usar Intersection Observer en lugar de getBoundingClientRect para evitar forced reflows
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  // Usar Intersection Observer API para detectar sección activa - Deferred after hydration
  useEffect(() => {
    // Defer observer setup to avoid reflows during hydration
    const timer = setTimeout(() => {
      const sections = [
        "inicio",
        "about-mi",
        "proyects",
        "Tecnologías",
        "contacto",
      ];

      const observerOptions = {
        root: null,
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            setActiveSection(sectionId);
          }
        });
      }, observerOptions);

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          observer.observe(element);
        }
      });

      return () => observer.disconnect();
    }, 100); // Small delay after React hydration completes

    return () => clearTimeout(timer);
  }, []);

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
    { href: "#hero", text: t("Inicio"), isNavigation: false },
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
        <div className="logo_container" onClick={() => navigate("/")}>
          <img src="/logo.svg" alt="Logo Alejandro Anchundia" className="logo_image" />
        </div>
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
          <svg
            className="burger-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              className={`burger-line burger-line-top ${isMobileMenuOpen ? "open" : ""
                }`}
              d="M4 6H20"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              className={`burger-line burger-line-middle ${isMobileMenuOpen ? "open" : ""
                }`}
              d="M4 12H20"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              className={`burger-line burger-line-bottom ${isMobileMenuOpen ? "open" : ""
                }`}
              d="M4 18H20"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
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
          className={`mobile-menu ${isMobileMenuOpen ? "mobile-menu--open" : ""
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
                    className={`mobile-menu-link ${activeSection === item.href.slice(1) ? "active" : ""
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
