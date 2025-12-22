// Cursor personalizado estilo videojuego
export function initGameCursor() {
    // Verificar si ya existe un cursor para no duplicarlo
    if (document.querySelector('.game-cursor')) return;

    // Crear hoja de estilos dinámica
    const style = document.createElement('style');
    style.textContent = `
    .game-cursor {
      position: fixed;
      width: 32px;
      height: 32px;
      border: 2px solid var(--neon-ice);
      border-radius: 50%;
      pointer-events: none;
      z-index: 99999;
      transform: translate(-50%, -50%);
      transition: transform 0.1s ease, width 0.2s ease, height 0.2s ease;
      box-shadow: var(--glow-lg);
      background: color-mix(in srgb, var(--neon-ice) 10%, transparent);
      backdrop-filter: blur(2px);
    }

    .game-cursor::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 8px;
      height: 8px;
      background: var(--neon-ice);
      border-radius: 50%;
      box-shadow: var(--glow-sm), var(--glow-md);
    }

    .game-cursor.click {
      transform: translate(-50%, -50%) scale(0.8);
      background: color-mix(in srgb, var(--neon-ice) 30%, transparent);
    }

    body.game-cursor-active {
      cursor: none !important;
    }

    body.game-cursor-active a,
    body.game-cursor-active button,
    body.game-cursor-active .control-btn,
    body.game-cursor-active .play-pause-btn,
    body.game-cursor-active .close-btn {
      cursor: none !important;
    }
  `;
    document.head.appendChild(style);


    const cursor = document.createElement('div');
    cursor.className = 'game-cursor';
    document.body.appendChild(cursor);


    document.body.classList.add('game-cursor-active');


    const updateCursorPosition = (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    };

    document.addEventListener('mousemove', updateCursorPosition);


    document.addEventListener('mousedown', () => {
        cursor.classList.add('click');
    });

    document.addEventListener('mouseup', () => {
        cursor.classList.remove('click');
    });


    const handleHover = (e) => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursor.style.borderColor = 'var(--pacific-blue)';
        cursor.style.boxShadow = 'var(--glow-xl)';
    };

    const handleHoverLeave = (e) => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.borderColor = 'var(--neon-ice)';
        cursor.style.boxShadow = 'var(--glow-lg)';
    };


    const applyHoverEffects = () => {
        const interactiveElements = document.querySelectorAll(
            'a, button, .control-btn, .play-pause-btn, .close-btn, [role="button"], [tabindex="0"]'
        );

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', handleHover);
            el.addEventListener('mouseleave', handleHoverLeave);
        });
    };


    applyHoverEffects();


    const observer = new MutationObserver((mutations) => {
        applyHoverEffects();
    });


    observer.observe(document.body, {
        childList: true,
        subtree: true
    });


    return () => {
        document.removeEventListener('mousemove', updateCursorPosition);
        document.removeEventListener('mousedown', handleHover);
        document.removeEventListener('mouseup', handleHoverLeave);
        observer.disconnect();
        if (cursor.parentNode) {
            cursor.parentNode.removeChild(cursor);
        }
        if (style.parentNode) {
            style.parentNode.removeChild(style);
        }
        document.body.classList.remove('game-cursor-active');
    };
}


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initGameCursor();
    });
} else {

    setTimeout(initGameCursor, 0);
}
