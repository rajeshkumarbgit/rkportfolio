import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { useAllProjects } from '../hooks/useProjects';
import { useImageUrl } from '../hooks/useImages';

interface PortfolioDetailProps {
  projectSlug: string;
  onNavigate: (page: string, slug?: string) => void;
}

export default function PortfolioDetail({ projectSlug, onNavigate }: PortfolioDetailProps) {
  const allProjects = useAllProjects();
  const currentIndex = allProjects.findIndex(p => p.slug === projectSlug);
  const project = allProjects[currentIndex];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'ArrowRight') handleNextImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentImageIndex]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-6">Project not found</p>
          <button
            type="button"
            onClick={() => onNavigate('portfolio')}
            className="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors cursor-pointer"
          >
            Back to Portfolio
          </button>
        </div>
      </div>
    );
  }

  const images = project.gallery || [project.cover];
  const currentImage = useImageUrl(images[currentImageIndex]);

  const handlePrevProject = () => {
    const prevIndex = currentIndex === 0 ? allProjects.length - 1 : currentIndex - 1;
    setCurrentImageIndex(0);
    onNavigate('portfolio-detail', allProjects[prevIndex].slug);
  };

  const handleNextProject = () => {
    const nextIndex = currentIndex === allProjects.length - 1 ? 0 : currentIndex + 1;
    setCurrentImageIndex(0);
    onNavigate('portfolio-detail', allProjects[nextIndex].slug);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1);
  };

  const handleClose = () => {
    onNavigate('portfolio');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="relative h-screen bg-gray-100 overflow-hidden flex-1">
        <img
          src={currentImage}
          alt={`${project.title} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

        <div className="absolute top-8 left-8 right-8 flex items-center justify-between">
          <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-lg max-w-2xl">
            {project.title}
          </h1>

          <div className="flex items-center gap-4">
            {images.length > 1 && (
              <div className="px-4 py-2 bg-black/30 backdrop-blur-md rounded-full text-white text-sm font-semibold">
                {currentImageIndex + 1} / {images.length}
              </div>
            )}
            <button
              type="button"
              onClick={handleClose}
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent cursor-pointer"
              aria-label="Close portfolio detail"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrevImage}
              className="absolute left-8 top-1/2 -translate-y-1/2 p-3 bg-black/30 backdrop-blur-md hover:bg-black/50 rounded-full shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 cursor-pointer text-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              type="button"
              onClick={handleNextImage}
              className="absolute right-8 top-1/2 -translate-y-1/2 p-3 bg-black/30 backdrop-blur-md hover:bg-black/50 rounded-full shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 cursor-pointer text-white"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-black/30 backdrop-blur-md rounded-full">
              {images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentImageIndex(index)}
                  className={`transition-all duration-500 rounded-full focus:outline-none focus:ring-2 focus:ring-white cursor-pointer ${
                    index === currentImageIndex
                      ? 'w-8 h-2 bg-white'
                      : 'w-2 h-2 bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="bg-white overflow-y-auto max-h-[calc(100vh-100vh+400px)] lg:max-h-none">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
          <div className="space-y-12">
            <div className="space-y-6">
              {project.featured && (
                <div className="inline-block px-4 py-2 bg-gray-100 text-gray-900 text-xs font-semibold rounded-full">
                  ✨ Featured Project
                </div>
              )}
              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
                {project.summary}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Industry</p>
                <p className="text-lg font-semibold text-gray-900">{project.industry}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Timeline</p>
                <p className="text-lg font-semibold text-gray-900">{project.timeline}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Platform</p>
                <p className="text-sm font-semibold text-gray-900">{project.platform.join(', ')}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Role</p>
                <p className="text-sm font-semibold text-gray-900">{project.role.join(', ')}</p>
              </div>
            </div>

            {project.kpis.length > 0 && (
              <div className="space-y-4 pt-8 border-t border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900">Key Results</h3>
                <div className="space-y-3">
                  {project.kpis.map((kpi, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="w-6 h-6 rounded-full bg-blue-100 border border-blue-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-blue-600">{idx + 1}</span>
                      </div>
                      <p className="text-base text-gray-700">{kpi}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4 pt-8 border-t border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-gray-100 border border-gray-200 text-gray-900 text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {(project.liveUrl || project.prototype) && (
              <div className="flex flex-wrap gap-4 pt-8 border-t border-gray-200">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                  >
                    Live Project
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                )}
                {project.prototype && (
                  <a
                    href={project.prototype}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-white border-2 border-gray-900 text-gray-900 font-semibold rounded-xl hover:bg-gray-50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                  >
                    Prototype
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white border-t border-gray-200 px-6 sm:px-8 lg:px-12 py-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={handlePrevProject}
            className="group flex items-center gap-3 px-4 sm:px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 cursor-pointer flex-1 sm:flex-none"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-5 h-5" />
            <div className="text-left hidden sm:block">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Prev</div>
              <div className="text-sm font-bold text-gray-900 truncate">
                {allProjects[currentIndex === 0 ? allProjects.length - 1 : currentIndex - 1]?.title}
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={handleClose}
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 cursor-pointer"
            aria-label="Close portfolio"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={handleNextProject}
            className="group flex items-center gap-3 px-4 sm:px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 cursor-pointer flex-1 sm:flex-none justify-end"
            aria-label="Next project"
          >
            <div className="text-right hidden sm:block">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Next</div>
              <div className="text-sm font-bold text-gray-900 truncate">
                {allProjects[currentIndex === allProjects.length - 1 ? 0 : currentIndex + 1]?.title}
              </div>
            </div>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
