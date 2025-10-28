/**
 * About Component - Fully Dynamic
 * References: REQ-08
 */

import { Code, Palette, Users, Zap, Target, BookOpen } from 'lucide-react';
import { useAboutContent } from '../hooks/useContent';
import { useSkillCategories, useTimeline } from '../hooks/useSkills';

const iconMap: Record<string, any> = {
  Users,
  Zap,
  Target,
  Code,
  BookOpen,
  Palette
};

export default function About() {
  const content = useAboutContent();
  const skillCategories = useSkillCategories();
  const timeline = useTimeline();

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">{content.title}</h2>
          <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
            {content.introduction.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">{content.principlesTitle}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.principles.map((principle, idx) => {
              const Icon = iconMap[principle.icon];
              return (
                <div
                  key={idx}
                  className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <Icon className="w-8 h-8 text-gray-900 mb-4" />
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{principle.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{principle.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">{content.skillsTitle}</h3>
          <div className="grid lg:grid-cols-2 gap-8">
            {skillCategories.map((category, idx) => {
              const Icon = iconMap[category.icon];
              return (
                <div key={idx} className="space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-gray-900 rounded-lg">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">{category.category}</h4>
                  </div>
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIdx) => (
                      <div key={skillIdx} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-gray-900">{skill.name}</span>
                          <span className="text-gray-600">{skill.years} years</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gray-900 rounded-full transition-all duration-500"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-gray-900 mb-8">{content.timelineTitle}</h3>
          <div className="space-y-8">
            {timeline.map((item, idx) => (
              <div key={idx} className="relative pl-8 pb-8 border-l-2 border-gray-200 last:border-0">
                <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 bg-gray-900 rounded-full" />
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-600">{item.year}</div>
                  <h4 className="text-xl font-bold text-gray-900">{item.role}</h4>
                  <div className="text-gray-700 font-medium">{item.company}</div>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
