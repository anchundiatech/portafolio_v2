export default function TechFilters({ isPlaying, setIsPlaying, rotationSpeed, setRotationSpeed, selectedCategory, setSelectedCategory, categories }) {
  return (
    <div className="galaxy-controls">
      <div className="control-group">
        <button className={`control-btn ${isPlaying ? 'active' : ''}`} onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? "⏸️ Pausar" : "▶️ Reproducir"}
        </button>
      </div>

      <div className="control-group">
        <span className="control-label">Velocidad:</span>
        <div className="speed-controls">
          {[0.5, 1, 1.5, 2].map(speed => (
            <button key={speed} className={`speed-btn ${rotationSpeed === speed ? 'active' : ''}`} onClick={() => setRotationSpeed(speed)}>
              {speed}x
            </button>
          ))}
        </div>
      </div>

      <div className="control-group">
        <span className="control-label">Filtro:</span>
        <div className="category-filters-mini">
          {categories.map(category => (
            <button key={category} className={`filter-btn-mini ${selectedCategory === category ? 'active' : ''}`} onClick={() => setSelectedCategory(category)}>
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
