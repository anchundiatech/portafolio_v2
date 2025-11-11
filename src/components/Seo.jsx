import React from 'react';

const SEO = ({
  title = "Alejandro Anchundia - Desarrollador Frontend",
  description = "Portafolio de Alejandro Anchundia. Desarrollador Frontend especializado en React, JavaScript y diseño responsivo.",
  url = "https://portafolio-v2-peach.vercel.app",
  image = "https://portafolio-v2-peach.vercel.app/og-image.jpg"
} = {}) => {
  React.useEffect(() => {
    document.title = title;

    // Meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description;

    // Open Graph
    const updateMeta = (property, content) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    updateMeta('og:title', title);
    updateMeta('og:description', description);
    updateMeta('og:url', url);
    updateMeta('og:image', image);
    updateMeta('og:type', 'website');

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [title, description, url, image]);

  return null;
};

export default SEO;