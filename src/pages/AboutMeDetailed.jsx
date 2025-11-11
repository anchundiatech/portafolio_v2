import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import "../styles/pages/aboutme-detailed.css";
import Me from "@/assets/me.jpg";

function AboutMeDetailed() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const miViaje = [
  {
    year: "2020",
    title: "El comienzo",
    description:
      "Inicié mi camino en el desarrollo de software en el Instituto Superior Tecnológico Limón, donde aprendí los fundamentos de la programación y el análisis de sistemas. Fue la etapa que encendió mi curiosidad por el mundo tecnológico.",
    icon: "🌱"
  },
  {
    year: "2023",
    title: "Graduación y una nueva visión",
    description:
      "Me gradué como Tecnólogo Superior en Desarrollo de Software, marcando un antes y un después en mi vida profesional. Ese mismo año conocí el programa Oracle Next Education (ONE), donde descubrí mi verdadera pasión: el desarrollo frontend.",
    icon: "🎓"
  },
  {
    year: "2024",
    title: "Formación avanzada en Alura Latam",
    description:
      "Fui aceptado en Alura Latam para especializarme en desarrollo frontend. Durante esta etapa conocí el mundo de JavaScript moderno y React, trabajé en proyectos reales y aprendí la importancia del diseño, la accesibilidad y la experiencia de usuario.",
    icon: "🚀"
  },
  {
    year: "2024",
    title: "Pausa para reflexionar",
    description:
      "Después de finalizar la especialización, decidí tomarme un tiempo para pensar hacia dónde quería dirigir mi carrera. Aunque estuve un periodo sin programar, ese descanso renovó mi motivación y enfoque.",
    icon: "💡"
  },
  {
    year: "Enero - Junio 2025",
    title: "Freelance Comercial",
    description:
      "Trabajé como asesor comercial freelance, donde mejoré mis habilidades de comunicación, negociación, gestión del tiempo y disciplina. Estas habilidades fortalecieron mi perfil como profesional integral.",
    icon: "🤝"
  },
  {
    year: "Abril - Julio 2025",
    title: "Rumbo a la certificación Oracle",
    description:
      "Tras participar en un hackathon, fui seleccionado para el programa Beta Tech Advanced de Alura Latam, orientado a la certificación Oracle Cloud Infrastructure (OCI). Este proceso reforzó mi capacidad para aprender tecnologías complejas y trabajar con entornos cloud.",
    icon: "🏅"
  },
  {
    year: "Junio 2025",
    title: "Hackathon AlumniThon 2025",
    description:
      "Participé en mi primer gran hackathon: tres semanas intensas construyendo SkillLink, una plataforma de aprendizaje colaborativo. Aunque no ganamos, esta experiencia me enseñó a trabajar en equipo, liderar ideas y entregar soluciones reales bajo presión.",
    icon: "🌟"
  },
  {
    year: "Agosto - Septiembre 2025",
    title: "Hackathon One + No Country",
    description:
      "Tras obtener la certificación OCI, participé en un proyecto real con un equipo multidisciplinario durante un mes. La comunicación, la organización y la colaboración fueron claves para finalmente ganar el primer lugar en el hackathon.",
    icon: "📚"
  },
  {
    year: "Octubre 2025",
    title: "Simulaciones laborales",
    description:
      "Actualmente continúo en las simulaciones laborales de No Country, enfrentándome a dinámicas reales de desarrollo, aprendiendo a trabajar con metodologías ágiles y preparándome para los retos del entorno profesional.",
    icon: "🚀"
  },
  {
    year: "2025 y más allá",
    title: "Mirando hacia el futuro",
    description:
      "Mi objetivo es seguir creciendo como desarrollador frontend, crear experiencias digitales significativas y contribuir a proyectos que tengan impacto real. El viaje continúa.",
    icon: "🌍"
  }
];

  const fortalezas = [
    { titulo: "Frontend Development", icon: "💻", descripcion: "Experto en React, JavaScript moderno, CSS avanzado y diseño responsivo." },
    { titulo: "UI/UX Design", icon: "🎨", descripcion: "Creo experiencias visuales atractivas con animaciones suaves y accesibilidad." },
    { titulo: "Optimización", icon: "⚡", descripcion: "Enfocado en rendimiento. Aplicaciones rápidas y eficientes con excelentes scores." },
    { titulo: "Innovación", icon: "🔥", descripcion: "Siempre buscando nuevas tecnologías y mejores formas de resolver problemas." },
    { titulo: "Problemática Solving", icon: "🧩", descripcion: "Analítico y metódico. Encuentro soluciones creativas a desafíos complejos." },
    { titulo: "Trabajo en Equipo", icon: "🤝", descripcion: "Comunicativo y colaborativo. Disfruto trabajar con otros desarrolladores." }
  ];

  const valores = [
    { titulo: "Calidad", descripcion: "Código limpio, mantenible y escalable en cada proyecto." },
    { titulo: "Creatividad", descripcion: "Pienso fuera de la caja y busco soluciones innovadoras." },
    { titulo: "Pasión", descripcion: "Amo lo que hago. Cada línea de código escrita con dedicación." },
    { titulo: "Aprendizaje Continuo", descripcion: "Siempre aprendiendo nuevas tecnologías y mejorando." },
    { titulo: "Responsabilidad", descripcion: "Me comprometo con mis proyectos y clientes completamente." },
    { titulo: "Impacto", descripcion: "Busco crear soluciones que generen impacto positivo." }
  ];

  return (
    <div className="aboutme-detailed-container">
      {/* Header */}
      <header className="aboutme-detailed-header">
        <button
          className="back-button-detailed"
          onClick={() => navigate("/#about-mi")}
          aria-label="Volver atrás">
          <span>←</span>
          <span>Volver</span>
        </button>
        <h1 className="page-title">Sobre Mí</h1>
      </header>

      {/* Hero */}
      <section className="hero-aboutme-detailed">
        <div className="hero-content">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2>Hola, soy Alejandro Anchundia</h2>
            <p className="subtitle">Frontend Developer | Creative Coder | Tech Enthusiast</p>
            <p className="description">
              Soy un desarrollador frontend apasionado por crear experiencias web inmersivas
              y visualmente impactantes. Con más de 2 años de experiencia profesional,
              he trabajado en proyectos que van desde aplicaciones simples hasta
              sistemas complejos y escalables.
            </p>
          </motion.div>
          <motion.div
            className="hero-image"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img src={Me} alt="Alejandro Anchundia" />
          </motion.div>
        </div>
      </section>

      {/* Mi Viaje */}
      <section className="journey-section">
        <div className="section-header-detailed">
          <h2>Mi Viaje Profesional</h2>
          <p>La evolución de mi carrera en desarrollo web</p>
        </div>

        <div className="timeline-detailed">
          {miViaje.map((item, index) => (
            <motion.div
              key={index}
              className="timeline-item-detailed"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="timeline-marker-detailed">
                <div className="marker-icon">{item.icon}</div>
                <div className="marker-year">{item.year}</div>
              </div>
              <div className="timeline-content-detailed">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Fortalezas */}
      <section className="strengths-section-detailed">
        <div className="section-header-detailed">
          <h2>Mis Fortalezas</h2>
          <p>Lo que me hace destacar como desarrollador</p>
        </div>

        <div className="strengths-grid-detailed">
          {fortalezas.map((item, index) => (
            <motion.div
              key={index}
              className="strength-card-detailed"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="strength-icon-detailed">{item.icon}</div>
              <h3>{item.titulo}</h3>
              <p>{item.descripcion}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Valores */}
      <section className="values-section-detailed">
        <div className="section-header-detailed">
          <h2>Mis Valores</h2>
          <p>Los principios que guían mi trabajo</p>
        </div>

        <div className="values-grid-detailed">
          {valores.map((item, index) => (
            <motion.div
              key={index}
              className="value-card-detailed"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <h3>{item.titulo}</h3>
              <p>{item.descripcion}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section-detailed">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>¿Listo para trabajar juntos?</h2>
          <p>Si te interesa colaborar en un proyecto o charlar sobre desarrollo web, ¡contactame!</p>
          <button
            className="cta-button-detailed"
            onClick={() => navigate("/#contact")}
          >
            Contactame Ahora
          </button>
        </motion.div>
      </section>
    </div>
  );
}

export default AboutMeDetailed;