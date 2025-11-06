import { useState, useEffect } from "react";
import i18n from "@/i18n"

export function useLanguage() {
  const [language, setLanguage] = useState( i18n.lenguage || "es");

  // Cargar idioma guardado en localStorage al iniciar
  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang) {
      i18n.changeLanguage(savedLang);
      setLanguage(savedLang);
    }
  }, []);

  // Guardar idioma en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("lang", language);
    i18n.changeLanguage(language);
  }, [language]);

  return { language, setLanguage };
}
