import React, { useEffect, useRef, useState } from "react";

// --- Utilidad: Konami code ---
const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

// Cache CSS variable to avoid repeated getComputedStyle calls
let cachedNeonIceColor = "#34EBEB";

function getCachedNeonColor() {
  if (cachedNeonIceColor === "#34EBEB") {
    try {
      const rootStyles = getComputedStyle(document.documentElement);
      cachedNeonIceColor =
        rootStyles.getPropertyValue("--neon-ice").trim() || "#34EBEB";
    } catch (e) {
      console.warn("Failed to get neon color:", e);
    }
  }
  return cachedNeonIceColor;
}

// --- Efecto: Matrix ---
function startMatrixEffect(canvas, ctx, animationRef) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()".split("");
  const fontSize = 14;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);

  // Cache the color once, not on every frame
  const neonIce = getCachedNeonColor();

  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = neonIce;
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  function animate() {
    draw();
    animationRef.current = requestAnimationFrame(animate);
  }
  animate();
}

// --- Efecto: Lluvia Neón ---
function startNeonRainEffect(canvas, ctx, animationRef) {
  const raindrops = [];
  const createRaindrop = () => ({
    x: Math.random() * canvas.width,
    y: -10,
    speed: Math.random() * 3 + 2,
    length: Math.random() * 20 + 10,
    color: `hsl(${Math.random() * 60 + 240}, 100%, 70%)`,
  });

  for (let i = 0; i < 100; i++) raindrops.push(createRaindrop());

  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    raindrops.forEach((drop, idx) => {
      ctx.strokeStyle = drop.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(drop.x, drop.y);
      ctx.lineTo(drop.x, drop.y + drop.length);
      ctx.stroke();

      drop.y += drop.speed;

      if (drop.y > canvas.height + drop.length) {
        raindrops[idx] = createRaindrop();
      }
    });
  }

  function animate() {
    draw();
    animationRef.current = requestAnimationFrame(animate);
  }
  animate();
}

// --- Efecto: Partículas ---
function startParticlesEffect(canvas, ctx, animationRef) {
  const particles = [];
  const createParticle = () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 2,
    vy: (Math.random() - 0.5) * 2,
    size: Math.random() * 3 + 1,
    life: 1,
    decay: Math.random() * 0.01 + 0.005,
    color: `hsl(${Math.random() * 60 + 240}, 100%, 70%)`,
  });

  for (let i = 0; i < 200; i++) particles.push(createParticle());

  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, idx) => {
      ctx.save();
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;

      if (p.life <= 0) particles[idx] = createParticle();
    });
  }

  function animate() {
    draw();
    animationRef.current = requestAnimationFrame(animate);
  }
  animate();
}

// --- Efecto: Glitch ---
function startGlitchEffect(canvas, ctx, animationRef) {
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 20; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const w = Math.random() * 100 + 20;
      const h = Math.random() * 20 + 5;

      ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
      ctx.globalAlpha = 0.3;
      ctx.fillRect(x, y, w, h);
    }
    ctx.globalAlpha = 1;
  }

  function animate() {
    draw();
    // glitch un poco más lento
    setTimeout(() => {
      animationRef.current = requestAnimationFrame(animate);
    }, 100);
  }
  animate();
}

export default function KonnamiGame() {
  const [isActive, setIsActive] = useState(false);
  const [effect, setEffect] = useState("matrix"); // "matrix" | "neon-rain" | "particles" | "glitch"
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Detectar Konami code
  useEffect(() => {
    let buffer = [];
    const onKeyDown = (e) => {
      buffer.push(e.code);
      buffer = buffer.slice(-KONAMI.length);
      if (KONAMI.every((k, i) => k === buffer[i])) {
        setIsActive(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Lanzar efecto cuando se activa o cambia
  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    // tamaño inicial
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // cancelar animación anterior
    if (animationRef.current) cancelAnimationFrame(animationRef.current);

    const effects = {
      matrix: startMatrixEffect,
      "neon-rain": startNeonRainEffect,
      particles: startParticlesEffect,
      glitch: startGlitchEffect,
    };

    const launcher = effects[effect] || startMatrixEffect;
    launcher(canvas, ctx, animationRef);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isActive, effect]);

  // Resize del canvas
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const deactivate = () => {
    setIsActive(false);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
  };

  return (
    <>
      {/* Canvas */}
      {isActive && (
        <canvas
          ref={canvasRef}
          style={{
            position: "fixed",
            inset: 0,
            width: "100vw",
            height: "100vh",
            pointerEvents: "none",
            zIndex: 9999,
            opacity: 0.7,
            mixBlendMode: "screen",
            background: "transparent",
          }}
        />
      )}

      {/* Controles */}
      {isActive && (
        <div
          style={{
            position: "fixed",
            right: 24,
            top: 24,
            zIndex: 10000,
            background: "rgba(17, 17, 24, 0.8)",
            backdropFilter: "blur(8px)",
            border:
              "1px solid color-mix(in srgb, var(--neon-ice) 40%, transparent)",
            borderRadius: 16,
            padding: 16,
            color: "#fff",
            fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI",
            boxShadow: "var(--shadow-primary-lg)",
          }}>
          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              marginBottom: 12,
            }}>
            <span style={{ fontWeight: 700 }}>🎮 KONAMI MODE</span>
            <button
              onClick={deactivate}
              aria-label="Cerrar modo Konami"
              style={{
                marginLeft: "auto",
                border: "1px solid rgba(255,255,255,0.15)",
                background: "transparent",
                color: "#fff",
                padding: "6px 10px",
                borderRadius: 8,
                cursor: "pointer",
              }}>
              ✕
            </button>
          </div>

          <div style={{ display: "grid", gap: 8 }}>
            <label style={{ opacity: 0.8, fontSize: 12 }}>Effect:</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["matrix", "neon-rain", "particles", "glitch"].map((m) => (
                <button
                  key={m}
                  onClick={() => setEffect(m)}
                  style={{
                    border:
                      "1px solid color-mix(in srgb, var(--neon-ice) 60%, transparent)",
                    background:
                      effect === m
                        ? "color-mix(in srgb, var(--neon-ice) 60%, transparent)"
                        : "transparent",
                    color: "#fff",
                    padding: "6px 10px",
                    borderRadius: 8,
                    cursor: "pointer",
                  }}>
                  {m.toUpperCase()}
                </button>
              ))}
            </div>
            <p style={{ marginTop: 8, opacity: 0.75, fontSize: 12 }}>
              Actívalo con: ↑ ↑ ↓ ↓ ← → ← → B A
            </p>
          </div>
        </div>
      )}
    </>
  );
}
