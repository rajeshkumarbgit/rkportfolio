/**
 * Portfolio Component - Fully Dynamic
 * References: REQ-07 (Portfolio Grid)
 */

import { useState, useMemo } from 'react';
import { ExternalLink, Award, Search, Sparkles } from 'lucide-react';
import { useAllProjects, useHasCaseStudy } from '../hooks/useProjects';
import { usePortfolioContent } from '../hooks/useContent';
import { useImageUrl } from '../hooks/useImages';
import { projectService } from '../services/projectService';

interface PortfolioProps {
  onNavigate: (page: string) => void;
}

export default function Portfolio({ onNavigate }: PortfolioProps) {
  const content = usePortfolioContent();
  const allProjects = useAllProjects();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(() => ['All', ...projectService.getCategories()], []);

  const projects = useMemo(() => {
    let filtered = allProjects;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category.includes(selectedCategory));
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.summary.toLowerCase().includes(query) ||
        p.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [allProjects, selectedCategory, searchQuery]);

  const hasActiveFilters = selectedCategory !== 'All' || searchQuery !== '';

  const clearAll = () => {
    setSelectedCategory('All');
    setSearchQuery('');
  };

  return (
    <section className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Explore My Work</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            {content.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{content.description}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={content.searchPlaceholder}
              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-gray-900 placeholder-gray-400"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30 scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>
              <span className="font-semibold text-gray-900">{projects.length}</span> {projects.length === 1 ? 'project' : 'projects'}
            </span>
            {hasActiveFilters && (
              <button
                onClick={clearAll}
                className="text-blue-600 hover:text-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const coverUrl = useImageUrl(project.cover);
            const hasCaseStudy = useHasCaseStudy(project.slug);

            return (
              <article
                key={project.id}
                className="group relative bg-white rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 border border-gray-100 hover:border-blue-200"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
                  <img
                    src={coverUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {project.featured && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg">
                      <Award className="w-3.5 h-3.5" />
                      Featured
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 4).map((tag, idx) => (
                        <span key={idx} className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-medium rounded-lg">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {project.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{project.summary}</p>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-gray-500 pt-2 border-t border-gray-100">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      {project.industry}
                    </span>
                    <span>•</span>
                    <span>{project.timeline}</span>
                  </div>

                  {hasCaseStudy && (
                    <button
                      onClick={() => onNavigate('case-study')}
                      className="w-full mt-4 inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      View Case Study
                      <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 mb-4">{content.nothingFoundTitle}</p>
            <button
              onClick={clearAll}
              className="text-gray-900 hover:underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 rounded"
            >
              {content.nothingFoundAction}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
