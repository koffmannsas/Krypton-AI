import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  canonical, 
  ogType = 'website',
  ogImage = 'https://krypton-ia.tech/og-image.png' // Default OG image
}) => {
  const siteTitle = `${title} | Krypton AI`;
  const url = canonical ? `https://krypton-ia.tech${canonical}` : 'https://krypton-ia.tech';

  return (
    <Helmet>
      {/* Basic Metadata */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={url} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Robots */}
      <meta name="robots" content="index, follow" />
    </Helmet>
  );
};

export default SEO;
