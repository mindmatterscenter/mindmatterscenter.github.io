import { Helmet } from 'react-helmet-async';

const SEO = ({
  title,
  description,
  canonicalUrl,
  keywords,
  ogType = 'website',
  ogImage = '/logo.jpg',
  structuredData = null
}) => {
  const siteTitle = 'Mind Matters Center';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} data-rh="true" />
      {keywords && <meta name="keywords" content={keywords} data-rh="true" />}

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} data-rh="true" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} data-rh="true" />
      <meta property="og:title" content={fullTitle} data-rh="true" />
      <meta property="og:description" content={description} data-rh="true" />
      <meta property="og:image" content={ogImage} data-rh="true" />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} data-rh="true" />}
      <meta property="og:site_name" content={siteTitle} data-rh="true" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" data-rh="true" />
      <meta name="twitter:title" content={fullTitle} data-rh="true" />
      <meta name="twitter:description" content={description} data-rh="true" />
      <meta name="twitter:image" content={ogImage} data-rh="true" />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json" data-rh="true">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;