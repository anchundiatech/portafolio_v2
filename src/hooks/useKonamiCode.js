  
import { useState, useEffect } from "react";

const KONAMI_SEQUENCE = [
  "ArrowUp","ArrowUp",
  "ArrowDown","ArrowDown",
  "ArrowLeft","ArrowRight",
  "ArrowLeft","ArrowRight",
  "KeyB","KeyA"
];

export const useKonamiCode = () => {
  const [isActive, setIsActive] = useState(false);
  const [input, setInput] = useState([]);

  useEffect(() => {
    const onKeyDown = (e) => {
      setInput(prev => {
        const newInput = [...prev, e.code].slice(-KONAMI_SEQUENCE.length);
        if (JSON.stringify(newInput) === JSON.stringify(KONAMI_SEQUENCE)) {
          setIsActive(true);
        }
        return newInput;
      });
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const deactivate = () => setIsActive(false);

  return { isActive, deactivate };
};
