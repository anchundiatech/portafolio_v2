import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({
  title = 'Alejandro Anchundia - Frontend Developer',
  description = 'Desarrollador Frontend especializado en React, JavaScript y tecnologías modernas. Portafolio con proyectos innovadores y diseño gaming.',
  image = 'https://portafolio-v2-peach.vercel.app/me.jpg',
  url = 'https://portafolio-v2-peach.vercel.app/',
  type = 'website'
}) {
  return (
    <Helmet>
      {/* Básicos */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charset="utf-8" />

      {/* Palabras clave */}
      <meta name="keywords" content="Frontend, React, JavaScript, CSS, Developer, Portafolio, Web Development" />
      <meta name="author" content="Alejandro Anchundia" />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Alejandro Anchundia" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Favicon */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="shortcut icon" href="/favicon.ico" />

      {/* Preconnect */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

      {/* Preload críticos */}
      <link rel="preload" as="image" href="/src/assets/me.jpg" />

      {/* Robots */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
    </Helmet>
  );
}