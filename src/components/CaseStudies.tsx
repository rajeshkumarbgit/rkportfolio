import { Sparkles } from 'lucide-react';
import { useAllCaseStudies } from '../hooks/useProjects';
import { useImageUrl } from '../hooks/useImages';

interface CaseStudiesProps {
  onNavigate: (page: string, slug?: string) => void;
}

export default function CaseStudies({ onNavigate }: CaseStudiesProps) {
  const caseStudies = useAllCaseStudies();

  return (
    <section className="min-h-screen py-32 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-white via-gray-50/50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-semibold text-gray-700 mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>In-Depth Stories</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
            Case Studies
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Deep dives into complex product challenges and the strategic solutions that delivered measurable impact
          </p>
        </div>

        {caseStudies.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">No case studies available yet.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {caseStudies.map((caseStudy, index) => {
              const heroImageUrl = useImageUrl(caseStudy.hero.image);

              return (
                <article
                  key={caseStudy.slug}
                  onClick={() => onNavigate('case-study-detail', caseStudy.slug)}
                  className="group relative bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-700 border border-gray-200 hover:border-gray-300 cursor-pointer"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  <div className="grid lg:grid-cols-2 gap-0">
                    <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-gray-100">
                      <img
                        src={heroImageUrl}
                        alt={caseStudy.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    <div className="p-12 flex flex-col justify-center">
                      <div className="mb-6">
                        <div className="inline-block px-4 py-2 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full mb-4">
                          {caseStudy.metadata.industry}
                        </div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight group-hover:text-blue-600 transition-colors">
                          {caseStudy.title}
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed mb-8">
                          {caseStudy.hero.tagline}
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-6 mb-8">
                        {caseStudy.hero.metrics.map((metric, idx) => (
                          <div key={idx}>
                            <div className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</div>
                            <div className="text-sm text-gray-500">{metric.label}</div>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {caseStudy.metadata.tools.slice(0, 5).map((tool, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 bg-gray-50 text-gray-700 text-xs font-medium rounded-lg"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>

                      <div className="text-sm font-semibold text-gray-500 group-hover:text-gray-900 transition-colors">
                        Read case study →
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
