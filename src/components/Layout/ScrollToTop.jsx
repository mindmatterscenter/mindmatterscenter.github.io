import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Check if this is a path that was redirected from 404
    // by looking for a special flag in sessionStorage
    const isRedirectedPath = sessionStorage.getItem('redirected') === pathname;
    
    // If this is a redirected path, clear the flag but don't scroll
    if (isRedirectedPath) {
      sessionStorage.removeItem('redirected');
      return; // Skip scrolling for redirected paths
    }

    // First attempt with requestAnimationFrame
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      
      // Backup scroll for mobile browsers
      setTimeout(() => {
        if (window.scrollY !== 0) {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
          });
        }
      }, 100);
    };

    // Wait for next frame to ensure DOM updates
    requestAnimationFrame(scrollToTop);

    // Force scroll for stubborn mobile browsers
    document.documentElement.style.scrollBehavior = 'auto';
    document.body.style.scrollBehavior = 'auto';
    
    scrollToTop();

    // Reset scroll behavior
    return () => {
      document.documentElement.style.scrollBehavior = '';
      document.body.style.scrollBehavior = '';
    };
  }, [pathname]);

  return null;
};

export default ScrollToTop;