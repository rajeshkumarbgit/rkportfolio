/**
 * Main App Component
 * References: REQ-03 (Navigation & IA)
 */

import { useState, useEffect } from 'react';
import { usePageMetadata } from './hooks/useContent';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedWork from './components/FeaturedWork';
import Portfolio from './components/Portfolio';
import PortfolioDetail from './components/PortfolioDetail';
import CaseStudy from './components/CaseStudy';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [projectSlug, setProjectSlug] = useState<string>('');
  const metadata = usePageMetadata(currentPage);

  const handleNavigate = (page: string, slug?: string) => {
    setCurrentPage(page);
    if (slug) {
      setProjectSlug(slug);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    document.title = metadata.title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', metadata.description);
    }
  }, [currentPage, metadata]);

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />

      <main>
        {currentPage === 'home' && (
          <>
            <Hero onNavigate={handleNavigate} />
            <FeaturedWork />
          </>
        )}
        {currentPage === 'about' && <About />}
        {currentPage === 'portfolio' && <Portfolio onNavigate={handleNavigate} />}
        {currentPage === 'portfolio-detail' && <PortfolioDetail projectSlug={projectSlug} onNavigate={handleNavigate} />}
        {currentPage === 'case-study' && <CaseStudy onNavigate={handleNavigate} />}
        {currentPage === 'contact' && <Contact onNavigate={handleNavigate} />}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
