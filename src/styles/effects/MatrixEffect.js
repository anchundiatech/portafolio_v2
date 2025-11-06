export const startMatrixEffect = (canvas, ctx, animationRef) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()".split("");
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = Array(Math.floor(columns)).fill(1);

  const draw = () => {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#8b5cf6";
    ctx.font = `${fontSize}px monospace`;

    drops.forEach((y, i) => {
      const text = chars[Math.floor(Math.random() * chars.length)];
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
