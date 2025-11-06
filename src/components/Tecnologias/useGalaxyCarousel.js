import { useState, useRef } from "react";

export function useGalaxyCarousel() {
  const [hoveredTech, setHoveredTech] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentFocus, setCurrentFocus] = useState(null);
  const [rotationSpeed, setRotationSpeed] = useState(1);

  const carouselRef = useRef(null);

  return {
    hoveredTech, setHoveredTech,
    selectedCategory, setSelectedCategory,
    isPlaying, setIsPlaying,
    currentFocus, setCurrentFocus,
    rotationSpeed, setRotationSpeed,
    carouselRef
  };
}
