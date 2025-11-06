# 🎮 Estructura CSS Modular - Portafolio

## 📁 Organización de Archivos

```
src/styles/
├── main.css                  # Archivo principal que importa todos los módulos
├── base/                     # Configuración base y fundamentos
│   ├── variables.css         # Variables CSS (colores, espaciado, etc.)
│   └── reset.css            # Reset CSS y configuración global
├── components/              # Estilos de componentes específicos
│   ├── header.css           # Navegación y header
│   ├── hero.css            # Sección hero principal
│   ├── sobremi.css         # Sección "Sobre Mí"
│   ├── tecnologias.css     # Grid de tecnologías
│   ├── proyectos.css       # Portfolio de proyectos
│   └── footer.css          # Footer del sitio
├── effects/                 # Efectos y animaciones
│   └──  -effects.css   # Efectos   (partículas, brillos, etc.)
├── layouts/                 # Layouts y estructuras
│   └── main.css            # Grids, flex layouts, responsive
└── utils/                   # Utilidades y helpers
    └── utilities.css        # Classes utilitarias y responsive
```

## 🎨 Características del Sistema

### Variables CSS
- **Paleta de colores**: Negro y morado neón
- **Gradientes épicos**: Combinaciones futuristas
- **Sombras neón**: Efectos de brillo morado
- **Espaciado consistente**: Sistema de spacing modular

### Efectos
- **Partículas digitales**: Lluvia de código y patrones de circuitos
- **Animaciones fluidas**: Transformaciones 3D y efectos de hover
- **Brillos neón**: Efectos de luz que se activan con interacciones
- **Transiciones épicas**: Movimientos suaves y profesionales

### Componentes Modulares
- **Header responsivo**: Navegación fija con efectos de blur
- **Hero épico**: Grid con imagen y efectos de fondo
- **Tecnologías  **: Cards con indicadores de nivel
- **Proyectos interactivos**: Hover 3D y efectos de hover
- **Footer estilizado**: Elementos con animaciones sutiles

### Sistema Responsive
- **Breakpoints**: Mobile, tablet y desktop
- **Grids automáticos**: Auto-fit para diferentes tamaños
- **Flex layouts**: Layouts flexibles y adaptativos
- **Utilidades**: Classes helper para responsive design

## 🔧 Cómo Usar

### 1. Importación Principal
```css
/* En App.css */
@import './styles/main.css';
```

### 2. Estructura de Variables
```css
/* Usar variables CSS predefinidas */
.mi-componente {
  background: var(--bg-secondary);
  color: var(--text-primary);
  border: 2px solid var(--neon-purple);
  box-shadow: var(--shadow-purple);
}
```

### 3. Classes Utilitarias
```html
<!-- Espaciado -->
<div class="p-lg mt-xl mb-md">

<!-- Layouts -->
<div class="flex justify-center items-center">
<div class="grid grid-cols-3 gap-lg">

<!-- Responsive -->
<div class="hidden-mobile visible-desktop">
```

### 4. Efectos
```html
<!-- Sección con efectos de fondo -->
<section class=" -section">
  <div class="tech-bg-effects">
    <div class="digital-rain"></div>
    <div class="circuit-pattern"></div>
    <div class="energy-field"></div>
  </div>
  <div class="container">
    <!-- Contenido -->
  </div>
</section>
```

## 🎮 Componentes Disponibles

### Botones
```html
<button class="btn- ">Botón Épico</button>
<a href="#" class="btn_primary">Acción Principal</a>
<a href="#" class="btn_secondary">Acción Secundaria</a>
```

### Cards
```html
<div class="card- ">
  <h3>Título</h3>
  <p>Contenido...</p>
</div>
```

### Tecnologías
```html
<div class="tech_card">
  <div class="rarity_indicator rarity_epic">Épico</div>
  <div class="tech_icon_wrapper">
    <img src="..." class="tech_icon" alt="...">
  </div>
  <div class="tech_info">
    <span class="tech_name">React</span>
  </div>
</div>
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: max-width: 480px
- **Tablet**: 481px - 768px
- **Desktop**: min-width: 769px

### Classes Responsive
- `.hidden-mobile` / `.visible-mobile`
- `.hidden-tablet` / `.visible-tablet`
- `.hidden-desktop` / `.visible-desktop`
- `.text-center-mobile`
- `.flex-col-mobile`
- `.grid-cols-1-mobile`

## 🎨 Paleta de Colores

### Colores Principales
- `--neon-purple`: #8b5cf6
- `--deep-purple`: #7c3aed
- `--electric-purple`: #c084fc
- `--neon-pink`: #ec4899

### Backgrounds
- `--bg-primary`: #000000 (Negro puro)
- `--bg-secondary`: #111111 (Charcoal)
- `--bg-tertiary`: #1a1a1a (Gris oscuro)

### Texto
- `--text-primary`: #f8fafc (Cyber white)
- `--text-secondary`: #b0b0b0 (Gris claro)
- `--text-accent`: #8b5cf6 (Morado neón)

## ⚡ Efectos Especiales

### Animaciones Principales
- `purpleAura`: Aura de fondo pulsante
- `digitalRain`: Lluvia de partículas
- `purpleGlowPulse`: Pulso de brillo
- `epicGlow`: Resplandor épico en hover

### Sombras Neón
- `--shadow-purple`: Sombra estándar
- `--shadow-purple-intense`: Sombra intensa
- `--shadow-purple-glow`: Resplandor ambiental

## 🔧 Mantenimiento

### Agregar Nuevos Componentes
1. Crear archivo en `src/styles/components/`
2. Agregar import en `src/styles/main.css`
3. Usar variables y utilities existentes

### Modificar Variables
1. Editar `src/styles/base/variables.css`
2. Los cambios se propagan automáticamente

### Agregar Efectos
1. Crear en `src/styles/effects/`
2. Importar en main.css
3. Aplicar clases en componentes

## 🚀 Beneficios

✅ **Modularidad**: Cada componente tiene su archivo
✅ **Mantenibilidad**: Fácil de encontrar y editar
✅ **Escalabilidad**: Agregar nuevos estilos es simple
✅ **Consistencia**: Variables centralizadas
✅ **Performance**: Importación optimizada
✅ **Responsive**: Sistema responsive completo
✅ **  Theme**: Efectos y animaciones épicas

---

*Creado con 💜 para el portafolio   más épico*