export const startGlitchEffect = (canvas, ctx, animateionRef) => {
  const width = canvas.width;
  const height = canvas.height;
  const glitchColors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#00ffff", "#ff00ff"];

  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = glitchColors[Math.floor(Math.random() * glitchColors.length)];
    ctx.fillRect(Math.random() * width, Math.random() * height, 100, 100);
  };

  const animate = () => {
    draw();
    animationRef.current = requestAnimationFrame(animate);
  };

  animate();
};

