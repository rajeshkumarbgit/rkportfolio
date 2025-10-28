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
    <section className="py-32 px-6 sm:px-8 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mb-20">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-8 tracking-tight">{content.title}</h1>
          <div className="space-y-6 text-xl text-gray-600 leading-relaxed">
            {content.introduction.map((paragraph, idx) => (
              <p key={idx} className="leading-[1.7]">{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="mb-24">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 tracking-tight">{content.principlesTitle}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.principles.map((principle, idx) => {
              const Icon = iconMap[principle.icon];
              return (
                <div
                  key={idx}
                  className="group p-8 bg-gray-50 rounded-3xl hover:bg-gray-100 transition-all duration-300 border border-transparent hover:border-gray-200"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-gray-900" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{principle.title}</h3>
                  <p className="text-gray-600 text-base leading-relaxed">{principle.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-24">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 tracking-tight">{content.skillsTitle}</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {skillCategories.map((category, idx) => {
              const Icon = iconMap[category.icon];
              return (
                <div key={idx} className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center">
                      <Icon className="w-7 h-7 text-gray-900" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{category.category}</h3>
                  </div>
                  <div className="space-y-5 pl-2">
                    {category.skills.map((skill, skillIdx) => (
                      <div key={skillIdx} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-semibold text-gray-900">{skill.name}</span>
                          <span className="text-gray-500">{skill.years}</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gray-900 rounded-full transition-all duration-1000"
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
          <h2 className="text-4xl font-bold text-gray-900 mb-12 tracking-tight">{content.timelineTitle}</h2>
          <div className="space-y-8">
            {timeline.map((entry, idx) => (
              <div
                key={idx}
                className="relative pl-12 pb-8 border-l-2 border-gray-200 last:border-transparent"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-gray-900 rounded-full" />
                <div className="text-sm font-semibold text-gray-500 mb-2">{entry.year}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{entry.role}</h3>
                <div className="text-lg text-gray-600 mb-4">{entry.company}</div>
                <p className="text-base text-gray-600 leading-relaxed mb-4">{entry.description}</p>
                {entry.achievements && entry.achievements.length > 0 && (
                  <ul className="space-y-2">
                    {entry.achievements.map((achievement, achIdx) => (
                      <li key={achIdx} className="flex items-start gap-3 text-gray-600">
                        <span className="text-gray-900 font-bold mt-1">•</span>
                        <span className="text-base leading-relaxed">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
