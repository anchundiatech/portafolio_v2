import React, { useState } from "react";
import { FaArrowUp,  FaHeart } from "react-icons/fa";


export default function Footer() {
  const [isScrollingToTop, setIsScrollingToTop] = useState(false);

  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    setIsScrollingToTop(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    // Reset loading state after animation
    setTimeout(() => setIsScrollingToTop(false), 1000);
  };

  const handleChangeDate = () =>{
    const date = new Date();
    const year = date.getFullYear();
    return year;

  }

  return (
    <footer className="footer">
       {/* Botó volver arriba */}
       <button
          className={`back_to_top ${isScrollingToTop ? 'back_to_top--loading' : ''}`}
          onClick={scrollToTop}
          aria-label="Volver al inicio de la página"
          title="Volver arriba"
        >

          <FaArrowUp aria-hidden="true" />  {isScrollingToTop && <span className="scroll_indicator"></span>}
       </button>

       {/* Copyright y información legal */}
       <div className="footer_bottom">
         <div className="footer_copyright">
           <p>

           </p>
           <p className="footer_made_with">
             © {currentYear} Alejandro Anchundia. Todos los derechos reservados.  Hecho con <FaHeart className="heart_icon" aria-label="amor" />
           </p>
         </div>

         <div className="footer_meta">
           <p className="footer_update">
             <small>Última actualización: Agosto 2025</small>
           </p>
         </div>
       </div>

    </footer>
  );
}