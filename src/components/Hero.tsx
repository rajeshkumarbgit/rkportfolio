/**
 * Hero Component - Fully Dynamic
 * References: REQ-04 (Hero Section)
 */

import { ArrowRight, Briefcase, Code, Palette } from 'lucide-react';
import { useHeroContent } from '../hooks/useContent';

interface HeroProps {
  onNavigate: (page: string) => void;
}

const iconMap: Record<string, any> = {
  Palette,
  Code,
  Briefcase
};

export default function Hero({ onNavigate }: HeroProps) {
  const content = useHeroContent();

  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block">
                <span className="text-sm font-medium text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
                  {content.subtext}
                </span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                {content.tagline}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {content.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              {content.ctas.map((cta, idx) => (
                <button
                  key={idx}
                  onClick={() => onNavigate(cta.action)}
                  className={`group inline-flex items-center px-6 py-3 font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 ${
                    cta.variant === 'primary'
                      ? 'bg-gray-900 text-white hover:bg-gray-800'
                      : cta.variant === 'secondary'
                      ? 'bg-white text-gray-900 border-2 border-gray-200 hover:border-gray-900'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  {cta.label}
                  {cta.variant === 'primary' && (
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  )}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4">
              {content.stats.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            {content.capabilities.map((cap, idx) => {
              const Icon = iconMap[cap.icon];
              return (
                <div
                  key={idx}
                  className="group p-6 bg-white rounded-2xl border-2 border-gray-100 hover:border-gray-900 transition-all hover:shadow-lg"
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gray-100 rounded-lg group-hover:bg-gray-900 transition-colors">
                      <Icon className="w-6 h-6 text-gray-900 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{cap.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{cap.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 p-6 bg-gray-100 rounded-2xl">
          <p className="text-sm text-gray-600 text-center mb-4">{content.trustBar.title}</p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-50">
            {content.trustBar.clients.map((client, idx) => (
              <div key={idx} className="text-2xl font-bold text-gray-900">{client}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
