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
import CaseStudies from './components/CaseStudies';
import CaseStudyDetail from './components/CaseStudyDetail';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [projectSlug, setProjectSlug] = useState<string>('');
  const [caseStudySlug, setCaseStudySlug] = useState<string>('');
  const metadata = usePageMetadata(currentPage);

  const handleNavigate = (page: string, slug?: string) => {
    setCurrentPage(page);
    if (page === 'portfolio-detail' && slug) {
      setProjectSlug(slug);
    } else if (page === 'case-study-detail' && slug) {
      setCaseStudySlug(slug);
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
        {currentPage === 'case-studies' && <CaseStudies onNavigate={handleNavigate} />}
        {currentPage === 'case-study-detail' && <CaseStudyDetail caseStudySlug={caseStudySlug} onNavigate={handleNavigate} />}
        {currentPage === 'contact' && <Contact onNavigate={handleNavigate} />}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
