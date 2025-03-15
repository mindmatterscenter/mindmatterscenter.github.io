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
    '/anxiety-therapy': 'Our anxiety therapy helps you develop practical coping strategies and regain a sense of calm. We use evidence-based approaches like CBT and mindfulness in a culturally sensitive environment.',
    '/asia-bipoc-therapy': 'Culturally sensitive therapy for Asian Americans and BIPOC communities. Navigate cultural identity, family expectations, and systemic challenges with therapists who understand your experience.',
    '/faq': 'Find answers to frequently asked questions about therapy services at Mind Matters Center, including confidentiality, fees, insurance, and what to expect during sessions.',
    '/services': 'Mind Matters Center specializes in culturally sensitive therapy services for Asian Americans and BIPOC communities, including trauma, anxiety, depression, relationship counseling, and more.',
    '/trauma-therapy': "Healing from trauma takes time, but you don't have to do it alone. Our trauma-informed therapists provide a safe space to process past experiences, build resilience, and regain control.",
    '/womens-therapy': 'Therapy for women facing unique challenges in life transitions, relationships, and personal growth. Our therapists help cultivate self-compassion and empowerment in your journey.',
    '/depression-therapy': "Our depression therapy helps you understand your emotions, develop effective coping strategies, and rediscover motivation and joy in life with culturally sensitive care.",
    '/relationship-counseling': "Our relationship therapy helps couples improve communication, rebuild trust, and strengthen emotional connections. Using evidence-based approaches to foster healthier relationships.",
    '/family-cultural-dynamic': "Navigate intergenerational issues and cultural expectations with compassionate therapy. We help individuals and families honor their heritage while fostering personal growth.",
    '/stress-burnout': "Find relief from chronic stress and burnout with our culturally sensitive therapy. We help you develop personalized strategies for sustainable well-being and work-life balance.",
    '/chinese-services': "Mind Matters Center 提供专业中文心理治疗服务，帮助亚裔美国人和华裔克服文化适应、压力管理和家庭关系等挑战。我们的双语治疗师理解文化背景对心理健康的影响，为加州居民提供线上和线下服务。",
    '/our-team': "Meet Yajun (Stella) Zeng, LCSW, Clinical Director at Mind Matters Center. An Asian American immigrant and bilingual therapist specializing in culturally sensitive mental health care.",
    '/about': "Mind Matters Center is an Asian-owned, women-owned therapy practice dedicated to providing culturally sensitive mental health services for the BIPOC community in California.",
    '/contact': "Contact Mind Matters Center for questions about our therapy services, appointments, or to begin your mental health journey with culturally sensitive care.",
    '/join-our-team': "Join Mind Matters Center as a licensed therapist. We're seeking professionals passionate about providing culturally responsive care to Asian American communities in California.",
    '/resources': 'Access mental health resources and crisis support information compiled by Mind Matters Center. Find hotlines, support services, and non-emergency therapy options.',
    '/privacy-policy': "Mind Matters Center's privacy policy outlines how we collect, use, and protect your information when using our therapy services and website."
    // Add more descriptions for other routes as needed
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

    // Update meta description - First remove any existing one
    const existingMetaDescription = document.querySelector('meta[name="description"]');
    if (existingMetaDescription) {
      existingMetaDescription.remove();
    }

    // Then add the route-specific description with data-rh attribute
    const metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    metaDescription.setAttribute('content', getDescriptionForRoute(route));
    metaDescription.setAttribute('data-rh', 'true'); // Add this for react-helmet compatibility
    document.head.appendChild(metaDescription);

    // Add route-specific meta tags for SEO
    const existingRobotsMeta = document.querySelector('meta[name="robots"]');
    if (!existingRobotsMeta) {
      const robotsMeta = document.createElement('meta');
      robotsMeta.name = 'robots';
      robotsMeta.content = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
      robotsMeta.setAttribute('data-rh', 'true');
      document.head.appendChild(robotsMeta);
    }

    // Generate schema.org JSON-LD for better SEO
    // First, remove any existing ld+json scripts
    const existingSchemaScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingSchemaScripts.forEach(script => script.remove());

    const scriptElement = document.createElement('script');
    scriptElement.type = 'application/ld+json';
    scriptElement.setAttribute('data-rh', 'true');
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