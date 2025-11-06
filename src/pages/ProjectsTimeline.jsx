import React from 'react'
import useGitHubProjects from '@/hooks/useGitHubProjects'
import '@/styles/components/projects_timeline.css'

export default function ProjectsTimeline() {
  const { projects, loading, error } = useGitHubProjects('anchundiatech')

  return (
    <section className="projects-timeline-page">
      <div className="timeline_header">
        <h1 className="glowing-text">Proyectos</h1>
        <a href="#inicio" className="btn_secondary">← Volver al inicio</a>
      </div>

      {loading && <div className="timeline_status">Cargando proyectos...</div>}
      {error && <div className="timeline_status error">Error: {error}</div>}

      {!loading && !error && (
        <div className="timeline">
          {projects.map((p) => (
            <article key={p.id} className="timeline_item" style={{ ['--tech-color']: 'var(--neon-purple)' }}>
              <div className="timeline_marker" />
              <div className="timeline_content">
                <h3 className="timeline_title">{p.title}</h3>
                <p className="timeline_desc">{p.shortDescription}</p>
                <div className="timeline_meta">
                  <span>★ {p.githubData.stars}</span>
                  <span>•</span>
                  <span>{new Date(p.githubData.updatedAt).toLocaleDateString()}</span>
                </div>
                <div className="timeline_actions">
                  <a href={p.link} target="_blank" rel="noreferrer" className="btn_primary">Ver Proyecto</a>
                  <a href={p.repository} target="_blank" rel="noreferrer" className="btn_secondary">Código</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
