import { useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
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

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Project not found</p>
          <button
            type="button"
            onClick={() => onNavigate('portfolio')}
            className="text-gray-900 underline cursor-pointer"
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
    onNavigate('portfolio-detail', allProjects[prevIndex].slug);
  };

  const handleNextProject = () => {
    const nextIndex = currentIndex === allProjects.length - 1 ? 0 : currentIndex + 1;
    onNavigate('portfolio-detail', allProjects[nextIndex].slug);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1);
  };

  return (
    <article className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <button
          type="button"
          onClick={() => onNavigate('portfolio')}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-12 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 rounded-lg px-4 py-2 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Portfolio
        </button>

        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          <div>
            <div className="mb-8">
              {project.featured && (
                <span className="inline-block px-4 py-2 bg-gray-900 text-white text-xs font-semibold rounded-full mb-4">
                  Featured Project
                </span>
              )}
              <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                {project.title}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {project.summary}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Industry</h3>
                <p className="text-lg text-gray-900 font-medium">{project.industry}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Timeline</h3>
                <p className="text-lg text-gray-900 font-medium">{project.timeline}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Platform</h3>
                <p className="text-lg text-gray-900 font-medium">{project.platform.join(', ')}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Role</h3>
                <p className="text-lg text-gray-900 font-medium">{project.role.join(', ')}</p>
              </div>
            </div>

            {project.kpis.length > 0 && (
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Results</h3>
                <div className="space-y-4">
                  {project.kpis.map((kpi, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-5 bg-gray-50 rounded-2xl">
                      <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-white">{idx + 1}</span>
                      </div>
                      <p className="text-base text-gray-700">{kpi}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Technologies Used</h3>
              <div className="flex flex-wrap gap-3">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-5 py-3 bg-white border-2 border-gray-200 text-gray-900 text-sm font-semibold rounded-2xl hover:border-gray-900 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {(project.liveUrl || project.prototype) && (
              <div className="flex flex-wrap gap-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-semibold rounded-2xl hover:bg-gray-800 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                  >
                    View Live Project
                    <ExternalLink className="ml-2 w-5 h-5" />
                  </a>
                )}
                {project.prototype && (
                  <a
                    href={project.prototype}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-8 py-4 bg-white border-2 border-gray-200 text-gray-900 font-semibold rounded-2xl hover:border-gray-900 hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                  >
                    View Prototype
                    <ExternalLink className="ml-2 w-5 h-5" />
                  </a>
                )}
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gray-100 shadow-2xl">
              <img
                src={currentImage}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-white/95 backdrop-blur-md hover:bg-white rounded-full shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-900" />
                  </button>

                  <button
                    type="button"
                    onClick={handleNextImage}
                    className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-white/95 backdrop-blur-md hover:bg-white rounded-full shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-900" />
                  </button>

                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setCurrentImageIndex(index)}
                        className={`transition-all duration-500 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 cursor-pointer ${
                          index === currentImageIndex
                            ? 'w-10 h-2.5 bg-white'
                            : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/75'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.slice(0, 4).map((img, idx) => {
                  const thumbUrl = useImageUrl(img);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        idx === currentImageIndex
                          ? 'border-gray-900 scale-105'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
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

        <div className="flex items-center justify-between py-12 border-t-2 border-gray-200">
          <button
            type="button"
            onClick={handlePrevProject}
            className="group flex items-center gap-3 px-6 py-4 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
            <div className="text-left">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Previous</div>
              <div className="text-sm font-bold text-gray-900">
                {allProjects[currentIndex === 0 ? allProjects.length - 1 : currentIndex - 1]?.title}
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={handleNextProject}
            className="group flex items-center gap-3 px-6 py-4 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 cursor-pointer"
          >
            <div className="text-right">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Next</div>
              <div className="text-sm font-bold text-gray-900">
                {allProjects[currentIndex === allProjects.length - 1 ? 0 : currentIndex + 1]?.title}
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
          </button>
        </div>
      </div>
    </article>
  );
}
