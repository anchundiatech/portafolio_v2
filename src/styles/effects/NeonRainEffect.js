export const startNeonRainEffect = (canvas, ctx, animationRef) => {
  const neonChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()".split("");
  const fontSize = 16;
  const columns = canvas.width / fontSize;
  const drops = Array(Math.floor(columns)).fill(1);
  const neonColors = ["#39ff14", "#ff073a", "#0ff", "#ff6ec4", "#ffff33"];

  const draw = () => {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${fontSize}px monospace`;

    drops.forEach((y, i) => {
      const text = neonChars[Math.floor(Math.random() * neonChars.length)];
      ctx.fillStyle = neonColors[Math.floor(Math.random() * neonColors.length)];
      ctx.fillText(text, i * fontSize, y * fontSize);
      drops[i] = y * fontSize > canvas.height && Math.random() > 0.975 ? 0 : y + 1;
    });
  };

  const animate = () => {
    draw();
    animationRef.current = requestAnimationFrame(animate);
  };
  animate();
};