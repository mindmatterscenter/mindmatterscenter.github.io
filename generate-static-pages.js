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

// Map of page components to their actual titles and h1 headings from the source React components
const pageContent = {
  '/': {
    title: 'Mental Therapy for Asian Americans and BIPOC in California',
    h1: 'Virtual therapy in California for Asian-American and BIPOC communities on their path to healing'
  },
  '/about': {
    title: 'About Us | Asian-Owned Mental Health Practice',
    h1: 'Welcome to Mind Matters Center'
  },
  '/services': {
    title: 'Our Therapy Specialties | Asian American Mental Health Services',
    h1: 'Our specialties'
  },
  '/trauma-therapy': {
    title: 'Trauma Therapy | Evidence-Based Treatment & Support',
    h1: 'Trauma therapy'
  },
  '/womens-therapy': {
    title: 'Women\'s Therapy | Mind Matters Center',
    h1: 'Therapy for women'
  },
  '/asia-bipoc-therapy': {
    title: 'Asian American & BIPOC Therapy | Culturally Sensitive Care',
    h1: 'Therapy for Asian Americans & BIPOC communities'
  },
  '/anxiety-therapy': {
    title: 'Anxiety Therapy | Culturally Sensitive Treatment',
    h1: 'Anxiety Therapy'
  },
  '/depression-therapy': {
    title: 'Depression Therapy | Evidence-Based Treatment',
    h1: 'Depression therapy'
  },
  '/relationship-counseling': {
    title: 'Relationship Counseling | Couples Therapy Services',
    h1: 'Couples therapy'
  },
  '/family-cultural-dynamic': {
    title: 'Family & Cultural Dynamics Therapy | Cultural Identity',
    h1: 'Family & cultural dynamics'
  },
  '/stress-burnout': {
    title: 'Stress & Burnout Therapy | Mind Matters Center',
    h1: 'Stress & burnout'
  },
  '/faq': {
    title: 'FAQ | Frequently Asked Questions | Therapy Services',
    h1: 'Frequently Asked Questions'
  },
  '/resources': {
    title: 'Mental Health Resources | Crisis Support & Help',
    h1: 'Resources for your mental health journey'
  },
  '/our-team': {
    title: 'Our Team | Asian American Therapists in California',
    h1: 'Meet our team'
  },
  '/contact': {
    title: 'Contact Us | Mental Health Support in California',
    h1: 'Contact Us'
  },
  '/join-our-team': {
    title: 'Join Our Team | Therapist Careers in California',
    h1: 'Join our team'
  },
  '/chinese-services': {
    title: 'Chinese Services | Mandarin & Cantonese Therapy Support',
    h1: 'Mind Matters Center'
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Mind Matters Center',
    h1: 'Privacy Policy'
  }
};

// Get the title for a specific route
const getTitleForRoute = (route) => {
  // Check if we have a predefined title for this route
  if (pageContent[route] && pageContent[route].title) {

    return pageContent[route].title;
  }
  // Fallback to the previous method if no predefined title exists
  if (route === '/') {
    return 'Mind Matters Center | Culturally Sensitive Therapy';
  }
  // Convert route to title format as fallback
  const baseName = route.substring(1).replace(/-/g, ' ');
  return `${baseName.charAt(0).toUpperCase() + baseName.slice(1)} | Mind Matters Center`;
};

// Get the H1 heading for a specific route
const getH1ForRoute = (route) => {
  // Check if we have a predefined H1 for this route
  if (pageContent[route] && pageContent[route].h1) {
    return pageContent[route].h1;
  }

  // Fallback to using the title without the site name
  if (pageContent[route] && pageContent[route].title) {
    return pageContent[route].title;
  }

  // Last resort fallback
  const baseName = route.substring(1).replace(/-/g, ' ');
  return `${baseName.charAt(0).toUpperCase() + baseName.slice(1)}`;
};

// Get meta description for a route
const getDescriptionForRoute = (route) => {
  const descriptions = {
    '/': 'Mind Matters Center provides culturally sensitive therapy services for Asian-American and BIPOC communities in California.',
    '/anxiety-therapy': 'Evidence-based anxiety therapy with culturally sensitive approaches to help you develop coping strategies and regain calm.',
    '/asia-bipoc-therapy': 'Therapy for Asian Americans and BIPOC communities with therapists who understand your cultural experience.',
    '/faq': 'Answers about therapy services at Mind Matters Center, including confidentiality, fees, and what to expect.',
    '/services': 'Culturally sensitive therapy services for Asian Americans and BIPOC communities, including trauma, anxiety, and depression.',
    '/trauma-therapy': "Trauma therapy in a safe space where you can heal, build resilience, and reclaim your story with compassionate support.",
    '/womens-therapy': 'Support for women facing challenges in life transitions, relationships, and personal growth with culturally sensitive care.',
    '/depression-therapy': "Depression therapy to understand emotions, develop coping strategies, and rediscover joy with cultural sensitivity.",
    '/relationship-counseling': "Helping couples improve communication, rebuild trust, and strengthen emotional connections through evidence-based approaches.",
    '/family-cultural-dynamic': "Navigate intergenerational issues and cultural expectations with therapy that honors heritage while fostering growth.",
    '/stress-burnout': "Relief from chronic stress and burnout with culturally sensitive therapy and personalized well-being strategies.",
    '/chinese-services': "Mind Matters Center 提供专业中文心理治疗服务，帮助亚裔美国人和华裔克服文化适应、压力管理和家庭关系等挑战。我们的双语治疗师理解文化背景对心理健康的影响，为加州居民提供线上和线下服务。",
    '/our-team': "Meet our team of Asian American therapists dedicated to culturally responsive mental health care. ",
    '/about': "An Asian-owned, women-owned therapy practice for culturally sensitive mental health services in California.",
    '/contact': "Contact Mind Matters Center for questions about our therapy services, appointments, or to begin your mental health journey with culturally sensitive care.",
    '/join-our-team': "Join our team as a licensed therapist passionate about culturally responsive care for Asian American communities.",
    '/resources': 'Access mental health resources, crisis support information, hotlines, and non-emergency therapy options.',
    '/privacy-policy': "Mind Matters Center's privacy policy outlines how we collect, use, and protect your information when using our therapy services and website."
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

  // Process all routes including homepage
  for (const route of routes) {
    // For homepage, modify the existing index.html
    const htmlPath = route === '/'
      ? path.join(distDir, 'index.html')
      : path.join(distDir, route.substring(1), 'index.html');

    // For non-homepage routes, ensure the directory exists
    if (route !== '/') {
      const routeDir = path.join(distDir, route.substring(1));
      if (!fs.existsSync(routeDir)) {
        fs.mkdirSync(routeDir, { recursive: true });
      }
    }

    // Read the existing HTML file or use index.html as template for new routes
    let html;
    if (route === '/' || fs.existsSync(htmlPath)) {
      html = fs.readFileSync(htmlPath, 'utf8');
    } else {
      html = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
    }

    // Create a DOM to modify the HTML
    const dom = new JSDOM(html);
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

    // Add hidden H1 tag for SEO purposes but keep it invisible
    const mainContent = document.querySelector('main') || document.querySelector('body');
    if (mainContent) {
      // Remove any existing H1 created by this script
      const existingHiddenH1 = document.querySelector('h1.sr-only, h1[style*="position: absolute"]');
      if (existingHiddenH1) {
        existingHiddenH1.remove();
      }

      // Carefully check for all H1 elements - React might render them with various classes
      const allH1Elements = document.querySelectorAll('h1');

      // If no H1 exists at all, only then add a hidden one
      if (allH1Elements.length === 0) {
        const h1Element = document.createElement('h1');
        h1Element.textContent = getH1ForRoute(route);

        // Add CSS to hide the element visually while keeping it accessible
        h1Element.className = "sr-only";
        h1Element.style.cssText = "position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;";

        // Insert the H1 at the beginning of the main content
        mainContent.insertBefore(h1Element, mainContent.firstChild);
      }
    }

    // Write the modified HTML back to the file
    fs.writeFileSync(htmlPath, dom.serialize());
    console.log(`Created/Updated static page for ${route} with proper title, meta description, and hidden H1 tags`);
  }

  console.log('Static page generation complete!');
};

generateStaticPages().catch(console.error);