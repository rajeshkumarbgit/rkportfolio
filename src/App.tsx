/**
 * Main App Component
 * References: REQ-03 (Navigation & IA)
 */

import { useState, useEffect } from 'react';
import { usePageMetadata } from './hooks/useContent';
import Header from './components/Header';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import CaseStudy from './components/CaseStudy';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const metadata = usePageMetadata(currentPage);

  useEffect(() => {
    document.title = metadata.title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', metadata.description);
    }
  }, [currentPage, metadata]);

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />

      <main>
        {currentPage === 'home' && <Hero onNavigate={setCurrentPage} />}
        {currentPage === 'about' && <About />}
        {currentPage === 'portfolio' && <Portfolio onNavigate={setCurrentPage} />}
        {currentPage === 'case-study' && <CaseStudy onNavigate={setCurrentPage} />}
        {currentPage === 'contact' && <Contact onNavigate={setCurrentPage} />}
      </main>

      <Footer onNavigate={setCurrentPage} />
    </div>
  );
}

export default App;
