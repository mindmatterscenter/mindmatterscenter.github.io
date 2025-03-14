import Navbar from './Navbar';
import Footer from './Footer';
import BookNowCTA from '../shared/BookNowCTA';
import { Helmet } from 'react-helmet-async';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        {/* Default/Fallback Meta Tags */}
        <html lang="en" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#FCC419" />

        {/* Default Title (will be overridden by page-specific titles) */}
        <title>Mind Matters Center | Culturally Sensitive Therapy</title>

        {/* Fallback Description */}
        <meta name="description" content="Mind Matters Center provides culturally sensitive therapy services for Asian-American and BIPOC communities in California." />

        {/* Robots Meta */}
        <meta name="robots" content="index, follow" />

        {/* Alternate Language Links */}
        <link rel="alternate" href="https://mindmatterscenter.com/chinese-services" hrefLang="zh" />
        <link rel="alternate" href="https://mindmatterscenter.com/" hrefLang="en" />
        <link rel="alternate" href="https://mindmatterscenter.com/" hrefLang="x-default" />

        {/* Sitemap */}
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      </Helmet>

      <Navbar />
      <main className="flex-grow container mx-auto">
        {children}
      </main>
      {/* Sticky Mobile CTA - Always visible on smaller screens */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white shadow-lg z-50">
        <BookNowCTA className="w-full flex justify-center" />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;