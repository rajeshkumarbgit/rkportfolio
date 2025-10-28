import { ArrowRight, Sparkles } from 'lucide-react';
import { useHeroContent } from '../hooks/useContent';

interface HeroProps {
  onNavigate: (page: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const content = useHeroContent();

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto w-full">
        <div className="text-center space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-blue-100 rounded-full text-sm font-medium text-blue-700 shadow-sm animate-slide-up">
            <Sparkles className="w-4 h-4" />
            <span>{content.subtext.split('—')[0].trim()}</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold text-gray-900 leading-tight animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <span className="block mb-2">{content.tagline.split('.')[0]}.</span>
            <span className="block bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              {content.tagline.split('.')[1]}.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {content.description}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            {content.ctas.map((cta, idx) => (
              <button
                key={idx}
                onClick={() => onNavigate(cta.action)}
                className={`group inline-flex items-center px-8 py-4 font-semibold rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  cta.variant === 'primary'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-1 focus:ring-blue-500'
                    : cta.variant === 'secondary'
                    ? 'bg-white text-gray-900 border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg focus:ring-blue-500'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {cta.label}
                {cta.variant === 'primary' && (
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                )}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-12 max-w-4xl mx-auto animate-slide-up" style={{ animationDelay: '0.4s' }}>
            {content.stats.map((stat, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative p-6 bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl hover:border-blue-200 transition-all">
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-12 animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <p className="text-sm text-gray-500 mb-6">{content.trustBar.title}</p>
            <div className="flex flex-wrap items-center justify-center gap-8">
              {content.trustBar.clients.map((client, idx) => (
                <div
                  key={idx}
                  className="px-6 py-3 bg-white/60 backdrop-blur-sm border border-gray-100 rounded-xl text-lg font-bold text-gray-400 hover:text-gray-900 hover:border-gray-300 transition-all"
                >
                  {client}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full p-1">
          <div className="w-1.5 h-3 bg-gray-400 rounded-full mx-auto animate-pulse" />
        </div>
      </div>
    </section>
  );
}
