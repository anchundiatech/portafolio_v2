import { useState, useEffect } from 'react';

const useGitHubProjects = (username = 'anchundiatech') => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const mapGitHubRepoToProject = (repo) => {
    // Detectar tecnologías basadas en el lenguaje principal y topics
    const detectTechnologies = (repo) => {
      const techs = [];

      // Basado en el lenguaje principal
      const languageMap = {
        'JavaScript': ['JavaScript'],
        'TypeScript': ['TypeScript'],
        'HTML': ['HTML', 'CSS'],
        'CSS': ['CSS'],
        'Python': ['Python'],
        'Java': ['Java'],
        'C++': ['C++'],
        'C#': ['C#'],
        'PHP': ['PHP'],
        'Go': ['Go'],
        'Rust': ['Rust'],
        'Ruby': ['Ruby']
      };

      if (repo.language && languageMap[repo.language]) {
        techs.push(...languageMap[repo.language]);
      }

      // Detectar frameworks/librerías basado en topics o nombre del repo
      const name = repo.name.toLowerCase();
      const description = (repo.description || '').toLowerCase();
      const topics = repo.topics || [];

      const techDetection = [
        { keywords: ['react', 'reactjs'], tech: 'React' },
        { keywords: ['vue', 'vuejs'], tech: 'Vue.js' },
        { keywords: ['angular'], tech: 'Angular' },
        { keywords: ['next', 'nextjs'], tech: 'Next.js' },
        { keywords: ['tailwind', 'tailwindcss'], tech: 'TailwindCSS' },
        { keywords: ['bootstrap'], tech: 'Bootstrap' },
        { keywords: ['node', 'nodejs', 'express'], tech: 'Node.js' },
        { keywords: ['mongo', 'mongodb'], tech: 'MongoDB' },
        { keywords: ['postgres', 'postgresql'], tech: 'PostgreSQL' },
        { keywords: ['mysql'], tech: 'MySQL' },
        { keywords: ['firebase'], tech: 'Firebase' },
        { keywords: ['vercel'], tech: 'Vercel' },
        { keywords: ['netlify'], tech: 'Netlify' }
      ];

      techDetection.forEach(({ keywords, tech }) => {
        const found = keywords.some(keyword =>
          name.includes(keyword) ||
          description.includes(keyword) ||
          topics.includes(keyword)
        );
        if (found && !techs.includes(tech)) {
          techs.push(tech);
        }
      });

      return techs.length > 0 ? techs : ['Web Development'];
    };

    // Determinar rareza basada en criterios
    const determineRarity = (repo) => {
      const stars = repo.stargazers_count || 0;
      const forks = repo.forks_count || 0;
      const isForked = repo.fork;
      const hasDescription = !!repo.description;
      const hasTopics = repo.topics && repo.topics.length > 0;
      const recentActivity = new Date(repo.updated_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // Último mes

      // Epic: Proyectos destacados
      if (stars >= 5 || (hasDescription && hasTopics && recentActivity && !isForked)) {
        return 'Epic';
      }

      // Rare: Proyectos con buena documentación
      if (stars >= 2 || (hasDescription && hasTopics) || (!isForked && recentActivity)) {
        return 'Rare';
      }

      // Common: El resto
      return 'Common';
    };

    // Generar imagen placeholder o usar imagen de Open Graph
    const generateProjectImage = (repo) => {
      // Puedes usar servicios como:
      // - GitHub Social Preview API
      // - Placeholder services
      // - Screenshots automáticos
      return `https://opengraph.githubassets.com/1/${repo.full_name}`;
    };

    return {
      id: repo.id,
      title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      description: repo.description || 'Proyecto desarrollado con tecnologías modernas.',
      shortDescription: repo.description ?
        repo.description.substring(0, 100) + (repo.description.length > 100 ? '...' : '') :
        'Proyecto desarrollado con tecnologías modernas.',
      image: generateProjectImage(repo),
      link: repo.homepage || repo.html_url, // Demo site o repo si no hay demo
      repository: repo.html_url,
      tecnologies: detectTechnologies(repo),
      status: repo.archived ? 'Archivado' : 'Completado',
      rarity: determineRarity(repo),
      featured: repo.stargazers_count >= 3 || repo.topics?.includes('featured'),
      achievements: [
        `⭐ ${repo.stargazers_count} estrellas`,
        `🍴 ${repo.forks_count} forks`,
        `📅 Actualizado ${new Date(repo.updated_at).toLocaleDateString()}`,
        ...(repo.topics || []).slice(0, 2).map(topic => `🏷️ ${topic}`)
      ].filter(Boolean),
      githubData: {
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        topics: repo.topics,
        createdAt: repo.created_at,
        updatedAt: repo.updated_at,
        size: repo.size,
        openIssues: repo.open_issues_count
      }
    };
  };

  useEffect(() => {
    const fetchGitHubProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        // Obtener repositorios del usuario
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=50`,
          {
            headers: {
              'Accept': 'application/vnd.github.v3+json',
              // Opcionalmente, puedes agregar un token para mayor límite de requests
              // 'Authorization': `token ${process.env.REACT_APP_GITHUB_TOKEN}`
            }
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const repos = await response.json();

        // Filtrar repositorios (excluir forks, repos vacíos, etc.)
        const filteredRepos = repos.filter(repo =>
          !repo.fork && // Excluir forks
          !repo.private && // Excluir privados
          repo.name !== username && // Excluir repo de perfil
          repo.size > 0 && // Excluir repos vacíos
          repo.name.toLowerCase() !== 'readme' // Excluir repos de README
        );

        // Convertir a formato de proyecto
        const mappedProjects = filteredRepos.map(mapGitHubRepoToProject);

        // Ordenar por rareza y actividad reciente
        const sortedProjects = mappedProjects.sort((a, b) => {
          const rarityOrder = { 'Epic': 3, 'Rare': 2, 'Common': 1 };
          const rarityDiff = rarityOrder[b.rarity] - rarityOrder[a.rarity];
          if (rarityDiff !== 0) return rarityDiff;

          // Si tienen la misma rareza, ordenar por estrellas
          return b.githubData.stars - a.githubData.stars;
        });

        setProjects(sortedProjects);
      } catch (err) {
        console.error('Error fetching GitHub projects:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubProjects();
  }, [username]);

  return { projects, loading, error, refetch: () => window.location.reload() };
};

export default useGitHubProjects;