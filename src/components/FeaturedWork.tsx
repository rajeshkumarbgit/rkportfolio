import Carousel from './Carousel';
import { useImageUrl } from '../hooks/useImages';

export default function FeaturedWork() {
  const carouselItems = [
    {
      image: useImageUrl('carousel-1'),
      title: 'Modern Mobile Banking App',
      description: 'Complete redesign of mobile banking experience with focus on accessibility and performance - 40% increase in user engagement',
      alt: 'Modern mobile app UI design showcase'
    },
    {
      image: useImageUrl('carousel-2'),
      title: 'Enterprise Dashboard Platform',
      description: 'Multi-device responsive dashboard for data analytics - serving 50K+ users with 99.9% uptime',
      alt: 'Website design on multiple devices'
    },
    {
      image: useImageUrl('carousel-3'),
      title: 'Healthcare UX Research & Design',
      description: 'Comprehensive UX research leading to patient portal that improved satisfaction by 35%',
      alt: 'Creative UI design process and wireframes'
    },
    {
      image: useImageUrl('carousel-4'),
      title: 'Real-time Analytics Dashboard',
      description: 'Data visualization platform processing 1M+ events per day with sub-second latency',
      alt: 'Dashboard analytics and data visualization'
    }
  ];

  return (
    <section className="py-24 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Featured Work</h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            A selection of recent projects showcasing design systems, mobile experiences, and enterprise platforms
          </p>
        </div>

        <Carousel items={carouselItems} autoPlay={true} interval={6000} />
      </div>
    </section>
  );
}
