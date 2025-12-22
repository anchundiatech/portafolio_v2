import React, { useState } from "react";
import { FaArrowUp, FaHeart, FaCoffee } from "@/icons";
import "@/styles/components/footer.css";

export default function Footer() {
  const [isScrollingToTop, setIsScrollingToTop] = useState(false);
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    setIsScrollingToTop(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => setIsScrollingToTop(false), 1000);
  };

  const getLastUpdateDate = () => {
    const date = new Date();
    const meses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    return `${meses[date.getMonth()]} ${date.getFullYear()}`;
  };

  return (
    <footer className="footer">
      <button
        className={`back_to_top ${
          isScrollingToTop ? "back_to_top--loading" : ""
        }`}
        onClick={scrollToTop}
        aria-label="Volver al inicio">
        <FaArrowUp />
      </button>

      <div className="footer_bottom">
        <p className="footer_made_with">
          © {currentYear} Hecho con <FaHeart className="heart_icon" />{" "}
          <span>y</span> <FaCoffee className="coffee_icon" /> por Alejandro
          Anchundia
        </p>

        <p className="footer_update">
          <small>Última actualización: {getLastUpdateDate()}</small>
        </p>
      </div>
    </footer>
  );
}
