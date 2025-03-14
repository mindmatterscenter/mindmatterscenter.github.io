// generate-static-pages.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { JSDOM } from 'jsdom';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Extract routes from your Navbar.jsx file
const extractRoutes = () => {
  // Read routes directly from your components or define them manually
  return [
    '/',
    '/about',
    '/services',
    '/trauma-therapy',
    '/womens-therapy',
    '/asia-bipoc-therapy',
    '/anxiety-therapy',
    '/depression-therapy',
    '/relationship-counseling',
    '/family-cultural-dynamic',
    '/stress-burnout',
    '/faq',
    '/resources',
    '/our-team',
    '/contact',
    '/join-our-team',
    '/chinese-services',
    '/privacy-policy'
  ];
};

// Get the title for a specific route
const getTitleForRoute = (route) => {
  if (route === '/') return 'Mind Matters Center | Culturally Sensitive Therapy';
  
  // Convert route to title format
  const baseName = route.substring(1).replace(/-/g, ' ');
  return `${baseName.charAt(0).toUpperCase() + baseName.slice(1)} | Mind Matters Center`;
};

// Get meta description for a route
const getDescriptionForRoute = (route) => {
  const descriptions = {
    '/': 'Mind Matters Center provides culturally sensitive therapy services for Asian-American and BIPOC communities in California.',
    '/faq': 'Find answers to frequently asked questions about therapy services at Mind Matters Center, including confidentiality, fees, insurance, and what to expect during sessions.',
    // Add more descriptions for other routes
  };
  
  return descriptions[route] || 'Mind Matters Center provides culturally sensitive therapy services for Asian-American and BIPOC communities in California.';
};

const generateStaticPages = async () => {
  const routes = extractRoutes();
  const distDir = path.resolve(__dirname, 'dist');
  
  // Ensure the build directory exists
  if (!fs.existsSync(distDir)) {
    console.error('Build directory does not exist. Run build first.');
    process.exit(1);
  }
  
  // Copy the index.html as a template
  const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
  
  // Create directory for each route and add index.html
  for (const route of routes) {
    if (route === '/') continue; // Skip homepage
    
    const routeDir = path.join(distDir, route.substring(1));
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }
    
    // Create a DOM to modify the HTML
    const dom = new JSDOM(indexHtml);
    const document = dom.window.document;
    
    // Update the title
    const titleElement = document.querySelector('title');
    if (titleElement) {
      titleElement.textContent = getTitleForRoute(route);
    }
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', getDescriptionForRoute(route));
    }
    
    // REMOVED: Do not add canonical URL here
    // It will be handled by the SEO component at runtime
    
    // Add route-specific meta tags for SEO
    const robotsMeta = document.createElement('meta');
    robotsMeta.name = 'robots';
    robotsMeta.content = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
    document.head.appendChild(robotsMeta);
    
    // Generate schema.org JSON-LD for better SEO
    const scriptElement = document.createElement('script');
    scriptElement.type = 'application/ld+json';
    scriptElement.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': getTitleForRoute(route),
      'description': getDescriptionForRoute(route),
      'url': `https://mindmatterscenter.com${route}`
    });
    document.head.appendChild(scriptElement);
    
    // Write the modified HTML to the route's index.html
    fs.writeFileSync(path.join(routeDir, 'index.html'), dom.serialize());
    console.log(`Created static page for ${route}`);
  }
  
  console.log('Static page generation complete!');
};

generateStaticPages().catch(console.error);