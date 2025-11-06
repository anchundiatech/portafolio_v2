// data.js
import Css from "@/assets/tecnologias/css3.svg";
import Html from "@/assets/tecnologias/html5 .svg";
import Git from '@/assets/tecnologias/git.svg';
import Github from '@/assets/tecnologias/github.svg';
import Javascript from '@/assets/tecnologias/javascript.svg';
import Reactjs from '@/assets/tecnologias/react-svgrepo-com.svg';
import Tailwind from '@/assets/tecnologias/tailwind-svgrepo-com.svg';

export const tecnologias = [
  { name: "CSS3", icon: Css, level: "Avanzado", category: "Frontend", experience: "2+ años", description: "Estilos modernos, Flexbox, Grid, animaciones", power: 95, rarity: "Epic", color: "#264de4" },
  { name: "HTML5", icon: Html, level: "Avanzado", category: "Frontend", experience: "2+ años", description: "Semántica web, accesibilidad, SEO", power: 90, rarity: "Epic", color: "#e34c26" },
  { name: "Git", icon: Git, level: "Intermedio", category: "Herramientas", experience: "1+ año", description: "Control de versiones, ramas, colaboración", power: 75, rarity: "Rare", color: "#f1502f" },
  { name: "GitHub", icon: Github, level: "Intermedio", category: "Herramientas", experience: "1+ año", description: "Repositorios, pull requests, GitHub Actions", power: 80, rarity: "Rare", color: "#181717" },
  { name: "JavaScript", icon: Javascript, level: "Avanzado", category: "Frontend", experience: "1+ año", description: "ES6+, DOM, APIs, programación asíncrona", power: 88, rarity: "Epic", color: "#f7df1e" },
  { name: "React", icon: Reactjs, level: "Intermedio", category: "Frontend", experience: "1+ año", description: "Hooks, componentes, estado, Context API", power: 85, rarity: "Epic", color: "#61dafb" },
  { name: "Tailwind CSS", icon: Tailwind, level: "Intermedio", category: "Frontend", experience: "6+ meses", description: "Utility-first, responsive design, componentes", power: 70, rarity: "Rare", color: "#38bdf8" }
];

export const categories = ["Todas", "Frontend", "Herramientas"];
