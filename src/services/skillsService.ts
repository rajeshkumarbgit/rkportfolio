/**
 * Skills Service
 * Manages skills matrix and career timeline data
 * References: REQ-05 (Skills Matrix), REQ-08 (About Page)
 */

import type { SkillCategory, TimelineEntry } from '../types';
import skillsData from '../data/skills.json';
import timelineData from '../data/timeline.json';

class SkillsService {
  private skillCategories: SkillCategory[];
  private timeline: TimelineEntry[];

  constructor() {
    this.skillCategories = skillsData.categories as SkillCategory[];
    this.timeline = timelineData.timeline as TimelineEntry[];
  }

  /**
   * Get all skill categories
   * @returns Array of skill categories with skills
   */
  getAllSkillCategories(): SkillCategory[] {
    return this.skillCategories;
  }

  /**
   * Get skill category by name
   * @param categoryName Category name
   * @returns Skill category or undefined
   */
  getSkillCategory(categoryName: string): SkillCategory | undefined {
    return this.skillCategories.find(cat => cat.category === categoryName);
  }

  /**
   * Get all timeline entries
   * @returns Array of career timeline entries
   */
  getTimeline(): TimelineEntry[] {
    return this.timeline;
  }

  /**
   * Get timeline entry by year range
   * @param year Year or year range
   * @returns Timeline entry or undefined
   */
  getTimelineEntry(year: string): TimelineEntry | undefined {
    return this.timeline.find(entry => entry.year === year);
  }

  /**
   * Get total years of experience
   * @returns Number of years (calculated from timeline)
   */
  getTotalYearsExperience(): number {
    // Calculate from earliest timeline entry
    if (this.timeline.length === 0) return 0;

    const earliestYear = this.timeline[this.timeline.length - 1].year;
    const startYear = parseInt(earliestYear.split('-')[0]);
    const currentYear = new Date().getFullYear();

    return currentYear - startYear;
  }

  /**
   * Get skills by category icon
   * @param icon Icon name
   * @returns Skill category or undefined
   */
  getSkillsByIcon(icon: string): SkillCategory | undefined {
    return this.skillCategories.find(cat => cat.icon === icon);
  }

  /**
   * Get all skills flattened
   * @returns Array of all skills across categories
   */
  getAllSkills() {
    return this.skillCategories.flatMap(category =>
      category.skills.map(skill => ({
        ...skill,
        category: category.category
      }))
    );
  }

  /**
   * Get skills with expertise level above threshold
   * @param minLevel Minimum level (0-100)
   * @returns Array of skills above threshold
   */
  getExpertSkills(minLevel: number = 90) {
    return this.getAllSkills().filter(skill => skill.level >= minLevel);
  }

  /**
   * Get most recent role
   * @returns Most recent timeline entry
   */
  getCurrentRole(): TimelineEntry | undefined {
    return this.timeline[0];
  }

  /**
   * Get timeline count
   * @returns Number of timeline entries
   */
  getTimelineCount(): number {
    return this.timeline.length;
  }
}

// Export singleton instance
export const skillsService = new SkillsService();
export default skillsService;
