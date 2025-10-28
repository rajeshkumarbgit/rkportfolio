/**
 * Case Study Component - Dynamic STAR Methodology
 * References: REQ-06
 */

import { ArrowLeft, Calendar } from 'lucide-react';
import { useCaseStudy } from '../hooks/useProjects';
import { useImageUrl } from '../hooks/useImages';

interface CaseStudyProps {
  onNavigate: (page: string) => void;
}

export default function CaseStudy({ onNavigate }: CaseStudyProps) {
  const caseStudy = useCaseStudy('sath-notification-system');

  if (!caseStudy) return <div className="py-16 px-4 text-center">Case study not found</div>;

  const heroImageUrl = useImageUrl(caseStudy.hero.image);

  return (
    <article className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => onNavigate('portfolio')}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 rounded"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Portfolio
        </button>

        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">{caseStudy.title}</h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">{caseStudy.hero.tagline}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {caseStudy.hero.metrics.map((metric, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</div>
                <div className="text-sm text-gray-600">{metric.label}</div>
              </div>
            ))}
          </div>

          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl mb-8">
            <img
              src={heroImageUrl}
              alt={caseStudy.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-xl">
            <div className="space-y-3">
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-1">Role</p>
                <p className="text-sm text-gray-600">{caseStudy.metadata.role.join(', ')}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-1">Timeline</p>
                <p className="text-sm text-gray-600">{caseStudy.metadata.timeline}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-1">Team</p>
                <p className="text-sm text-gray-600">{caseStudy.metadata.team}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-1">Tools</p>
                <p className="text-sm text-gray-600">{caseStudy.metadata.tools.join(', ')}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="prose prose-lg max-w-none space-y-12">
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">The Problem</h2>
            {caseStudy.sections.problem.split('\n\n').map((p, idx) => (
              <p key={idx} className="text-gray-700 leading-relaxed mb-4">{p}</p>
            ))}
          </section>

          <section className="bg-gray-50 -mx-4 sm:-mx-6 px-4 sm:px-6 py-8 rounded-2xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Research & Discovery</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Methods</h3>
                <ul className="space-y-3">
                  {caseStudy.sections.research.methods.map((method, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-6 h-6 bg-gray-900 text-white rounded-full text-xs font-bold flex-shrink-0 mt-0.5">
                        ✓
                      </span>
                      <span className="text-gray-700">{method}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Insights</h3>
                <div className="grid gap-4">
                  {caseStudy.sections.research.insights.map((insight, idx) => (
                    <div key={idx} className="p-4 bg-white rounded-lg border-l-4 border-gray-900">
                      <p className="text-gray-700">{insight}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">The Solution</h2>
            {caseStudy.sections.solution.approach.split('\n\n').map((p, idx) => (
              <p key={idx} className="text-gray-700 leading-relaxed mb-4">{p}</p>
            ))}
            <div className="mt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Key Features</h3>
              <div className="grid gap-4">
                {caseStudy.sections.solution.keyFeatures.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Results & Impact</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {caseStudy.sections.results.metrics.map((metric, idx) => (
                <div key={idx} className="p-6 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 rounded-xl">
                  <div className="text-3xl font-bold text-gray-900 mb-2">{metric.label}</div>
                  <div className="text-lg text-gray-700 mb-2">{metric.value}</div>
                  <div className="text-sm text-gray-600">{metric.context}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gray-50 -mx-4 sm:-mx-6 px-4 sm:px-6 py-8 rounded-2xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Learnings</h2>
            <div className="space-y-4">
              {caseStudy.sections.learnings.map((learning, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-white rounded-lg">
                  <span className="flex items-center justify-center w-6 h-6 bg-gray-900 text-white rounded-full text-xs font-bold flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-gray-700">{learning}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-16 p-8 bg-gray-900 text-white rounded-2xl text-center">
          <h3 className="text-2xl font-bold mb-3">Want results like this?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Let's discuss how I can help transform your product through strategic UX design and robust frontend development.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center px-6 py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Book a 20-min Call
          </button>
        </div>
      </div>
    </article>
  );
}
