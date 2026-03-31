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
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullscreen) return;
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'ArrowRight') handleNextImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, currentImageIndex]);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={handleClose}
          className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 cursor-pointer mb-8"
          aria-label="Close portfolio detail"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-8">
            <div className="space-y-4">
              {project.featured && (
                <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md text-white text-xs font-semibold rounded-full border border-white/20">
                  ✨ Featured Project
                </div>
              )}
              <h1 className="text-5xl sm:text-6xl font-bold text-white tracking-tight leading-tight">
                {project.title}
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed max-w-lg">
                {project.summary}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Industry</p>
                <p className="text-lg font-semibold text-white">{project.industry}</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Timeline</p>
                <p className="text-lg font-semibold text-white">{project.timeline}</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Platform</p>
                <p className="text-sm font-semibold text-white">{project.platform.join(', ')}</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Role</p>
                <p className="text-sm font-semibold text-white">{project.role.join(', ')}</p>
              </div>
            </div>

            {project.kpis.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Key Results</h3>
                <div className="space-y-3">
                  {project.kpis.map((kpi, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-blue-300">{idx + 1}</span>
                      </div>
                      <p className="text-sm text-gray-200">{kpi}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold rounded-full hover:bg-white/20 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {(project.liveUrl || project.prototype) && (
              <div className="flex flex-wrap gap-3 pt-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 hover:shadow-lg hover:shadow-white/20 hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
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
                    className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 hover:shadow-lg hover:shadow-white/20 hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
                  >
                    Prototype
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                )}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div
              className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gray-800 shadow-2xl cursor-zoom-in group"
              onClick={() => setIsFullscreen(true)}
            >
              <img
                src={currentImage}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevImage();
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 cursor-pointer text-white"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextImage();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 cursor-pointer text-white"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(index);
                        }}
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

              {images.length > 1 && (
                <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full text-white text-sm font-semibold">
                  {currentImageIndex + 1} / {images.length}
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2 md:grid-cols-6 lg:grid-cols-4">
                {images.map((img, idx) => {
                  const thumbUrl = useImageUrl(img);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-105 cursor-pointer ${
                        idx === currentImageIndex
                          ? 'border-white ring-2 ring-white/50 scale-105'
                          : 'border-white/20 hover:border-white/40'
                      }`}
                      aria-label={`View image ${idx + 1}`}
                    >
                      <img
                        src={thumbUrl}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 md:flex md:items-center md:justify-between py-12 border-t border-white/10">
          <button
            type="button"
            onClick={handlePrevProject}
            className="group md:col-span-1 col-span-1 flex flex-col md:flex-row items-center gap-2 md:gap-3 px-4 md:px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 cursor-pointer"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-white" />
            <div className="text-center md:text-left hidden sm:block">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Prev</div>
              <div className="text-xs md:text-sm font-bold text-white truncate">
                {allProjects[currentIndex === 0 ? allProjects.length - 1 : currentIndex - 1]?.title}
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={handleClose}
            className="col-span-1 inline-flex items-center justify-center px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 cursor-pointer text-sm md:text-base"
            aria-label="Close portfolio"
          >
            <X className="w-4 h-4 md:hidden" />
            <span className="hidden md:inline">Close</span>
          </button>

          <button
            type="button"
            onClick={handleNextProject}
            className="group md:col-span-1 col-span-1 flex flex-col md:flex-row items-center gap-2 md:gap-3 px-4 md:px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 cursor-pointer justify-end"
            aria-label="Next project"
          >
            <div className="text-center md:text-right hidden sm:block">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Next</div>
              <div className="text-xs md:text-sm font-bold text-white truncate">
                {allProjects[currentIndex === allProjects.length - 1 ? 0 : currentIndex + 1]?.title}
              </div>
            </div>
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
