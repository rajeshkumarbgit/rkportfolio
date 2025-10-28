/**
 * Portfolio Component - Fully Dynamic
 * References: REQ-07 (Portfolio Grid)
 */

import { useState, useMemo } from 'react';
import { ExternalLink, Figma, Award, Filter } from 'lucide-react';
import { useFilteredProjects, useFilterOptions, useHasCaseStudy } from '../hooks/useProjects';
import { usePortfolioContent } from '../hooks/useContent';
import { useImageUrl } from '../hooks/useImages';

interface PortfolioProps {
  onNavigate: (page: string) => void;
}

export default function Portfolio({ onNavigate }: PortfolioProps) {
  const content = usePortfolioContent();
  const { categories, technologies } = useFilterOptions();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTech, setSelectedTech] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const { projects } = useFilteredProjects({
    category: selectedCategory !== 'All' ? selectedCategory : undefined,
    technology: selectedTech !== 'All' ? selectedTech : undefined,
    search: searchQuery || undefined
  });

  const hasActiveFilters = selectedCategory !== 'All' || selectedTech !== 'All' || searchQuery !== '';

  const clearAll = () => {
    setSelectedCategory('All');
    setSelectedTech('All');
    setSearchQuery('');
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">{content.title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{content.description}</p>
        </div>

        <div className="mb-8 space-y-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Filter className="w-4 h-4" />
            <span className="font-medium">{content.filterLabel}</span>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">{content.categoryLabel}</label>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 ${
                    selectedCategory === cat
                      ? 'bg-gray-900 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">{content.technologyLabel}</label>
            <div className="flex flex-wrap gap-2">
              {technologies.map(tech => (
                <button
                  key={tech}
                  onClick={() => setSelectedTech(tech)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 ${
                    selectedTech === tech
                      ? 'bg-gray-900 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>

          <div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={content.searchPlaceholder}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-900 transition-colors"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <p className="text-sm text-gray-600">
              {content.showingLabel} <span className="font-semibold">{projects.length}</span> {content.ofLabel} {useFilterOptions().categories.length - 1} {content.projectsLabel}
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearAll}
                className="text-sm text-gray-600 hover:text-gray-900 underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 rounded"
              >
                {content.clearFiltersLabel}
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => {
            const coverUrl = useImageUrl(project.cover);
            const hasCaseStudy = useHasCaseStudy(project.slug);

            return (
              <article
                key={project.id}
                className="group bg-white rounded-2xl border-2 border-gray-100 hover:border-gray-900 transition-all hover:shadow-xl overflow-hidden"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                  <img
                    src={coverUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {project.featured && (
                    <div className="absolute top-4 right-4 bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      {content.featuredBadge}
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{project.summary}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-3 py-1 text-gray-500 text-xs font-medium">
                        +{project.tags.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="pt-2 space-y-2">
                    <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        {project.industry}
                      </span>
                      <span>•</span>
                      <span>{project.timeline}</span>
                    </div>

                    {project.kpis.length > 0 && (
                      <div className="pt-2 space-y-1">
                        {project.kpis.slice(0, 2).map((kpi, idx) => (
                          <p key={idx} className="text-xs text-gray-600 flex items-start gap-1">
                            <span className="text-green-600 font-semibold">✓</span>
                            {kpi}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>

                  {hasCaseStudy && (
                    <button
                      onClick={() => onNavigate('case-study')}
                      className="w-full mt-4 inline-flex items-center justify-center px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 group"
                    >
                      {content.viewCaseStudyLabel}
                      <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
