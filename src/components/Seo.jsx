import { useEffect } from 'react';

const SEO = ({
  title = "Alejandro Anchundia - Desarrollador Frontend",
  description = "Desarrollador Frontend especializado en React, JavaScript y tecnologías modernas. Portafolio con proyectos innovadores.",
  url = "https://portafolio-v2-peach.vercel.app",
  image = "https://portafolio-v2-peach.vercel.app/og-image.jpg",
  keywords = "Alejandro Anchundia, Frontend Developer, React, JavaScript, Desarrollador Web",
  type = "website"
}) => {
  useEffect(() => {
    document.title = title;

    const updateOrCreateMeta = (name, content, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    updateOrCreateMeta('description', description);
    updateOrCreateMeta('keywords', keywords);
    updateOrCreateMeta('robots', 'index, follow');

    updateOrCreateMeta('og:title', title, true);
    updateOrCreateMeta('og:description', description, true);
    updateOrCreateMeta('og:url', url, true);
    updateOrCreateMeta('og:image', image, true);
    updateOrCreateMeta('og:type', type, true);
    updateOrCreateMeta('og:locale', 'es_ES', true);

    updateOrCreateMeta('twitter:card', 'summary_large_image', true);
    updateOrCreateMeta('twitter:title', title, true);
    updateOrCreateMeta('twitter:description', description, true);
    updateOrCreateMeta('twitter:image', image, true);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

  }, [title, description, url, image, keywords, type]);

  return null;
};

export default SEO;