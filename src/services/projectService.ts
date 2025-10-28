/**
 * Project Service
 * Manages project data with filtering and search capabilities
 * References: REQ-07 (Portfolio Grid), REQ-08 (Content Data Model)
 */

import type { Project, ProjectFilters, CaseStudy } from '../types';
import projectsData from '../data/projects.json';
import caseStudiesData from '../data/case-studies.json';

class ProjectService {
  private projects: Project[];
  private caseStudies: CaseStudy[];

  constructor() {
    this.projects = projectsData.projects as Project[];
    this.caseStudies = caseStudiesData.caseStudies as CaseStudy[];
  }

  /**
   * Get all projects
   * @returns Array of all projects
   */
  getAllProjects(): Project[] {
    return this.projects;
  }

  /**
   * Get featured projects only
   * @returns Array of featured projects
   */
  getFeaturedProjects(): Project[] {
    return this.projects.filter(project => project.featured);
  }

  /**
   * Get project by slug
   * @param slug Project slug
   * @returns Project or undefined
   */
  getProjectBySlug(slug: string): Project | undefined {
    return this.projects.find(project => project.slug === slug);
  }

  /**
   * Filter projects based on criteria
   * @param filters Filter criteria
   * @returns Filtered projects
   */
  filterProjects(filters: ProjectFilters): Project[] {
    let filtered = [...this.projects];

    // Filter by category
    if (filters.category && filters.category !== 'All') {
      filtered = filtered.filter(project =>
        project.category.includes(filters.category!)
      );
    }

    // Filter by technology
    if (filters.technology && filters.technology !== 'All') {
      filtered = filtered.filter(project =>
        project.tags.some(tag =>
          tag.toLowerCase().includes(filters.technology!.toLowerCase())
        )
      );
    }

    // Filter by industry
    if (filters.industry && filters.industry !== 'All') {
      filtered = filtered.filter(project =>
        project.industry === filters.industry
      );
    }

    // Filter by platform
    if (filters.platform && filters.platform !== 'All') {
      filtered = filtered.filter(project =>
        project.platform.includes(filters.platform!)
      );
    }

    // Filter by search query
    if (filters.search && filters.search.trim() !== '') {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchLower) ||
        project.summary.toLowerCase().includes(searchLower) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
        project.industry.toLowerCase().includes(searchLower)
      );
    }

    // Filter by featured
    if (filters.featured !== undefined) {
      filtered = filtered.filter(project => project.featured === filters.featured);
    }

    return filtered;
  }

  /**
   * Get unique categories from all projects
   * @returns Array of unique categories
   */
  getCategories(): string[] {
    const categories = new Set<string>();
    this.projects.forEach(project => {
      project.category.forEach(cat => categories.add(cat));
    });
    return Array.from(categories).sort();
  }

  /**
   * Get unique technologies from all projects
   * @returns Array of unique technologies
   */
  getTechnologies(): string[] {
    const technologies = new Set<string>();
    this.projects.forEach(project => {
      project.tags.forEach(tag => technologies.add(tag));
    });
    return Array.from(technologies).sort();
  }

  /**
   * Get unique industries from all projects
   * @returns Array of unique industries
   */
  getIndustries(): string[] {
    const industries = new Set<string>();
    this.projects.forEach(project => {
      industries.add(project.industry);
    });
    return Array.from(industries).sort();
  }

  /**
   * Get unique platforms from all projects
   * @returns Array of unique platforms
   */
  getPlatforms(): string[] {
    const platforms = new Set<string>();
    this.projects.forEach(project => {
      project.platform.forEach(plat => platforms.add(plat));
    });
    return Array.from(platforms).sort();
  }

  /**
   * Search projects by query
   * @param query Search query
   * @returns Matching projects
   */
  searchProjects(query: string): Project[] {
    return this.filterProjects({ search: query });
  }

  /**
   * Get case study by slug
   * @param slug Case study slug
   * @returns Case study or undefined
   */
  getCaseStudyBySlug(slug: string): CaseStudy | undefined {
    return this.caseStudies.find(study => study.slug === slug);
  }

  /**
   * Get all case studies
   * @returns Array of all case studies
   */
  getAllCaseStudies(): CaseStudy[] {
    return this.caseStudies;
  }

  /**
   * Check if project has case study
   * @param projectSlug Project slug
   * @returns Boolean indicating if case study exists
   */
  hasCaseStudy(projectSlug: string): boolean {
    return this.caseStudies.some(study => study.slug === projectSlug);
  }

  /**
   * Get projects by category
   * @param category Category name
   * @returns Projects in category
   */
  getProjectsByCategory(category: string): Project[] {
    return this.projects.filter(project => project.category.includes(category));
  }

  /**
   * Get projects by technology
   * @param technology Technology name
   * @returns Projects using technology
   */
  getProjectsByTechnology(technology: string): Project[] {
    return this.projects.filter(project =>
      project.tags.some(tag =>
        tag.toLowerCase().includes(technology.toLowerCase())
      )
    );
  }

  /**
   * Get project count
   * @returns Total number of projects
   */
  getProjectCount(): number {
    return this.projects.length;
  }

  /**
   * Get featured project count
   * @returns Number of featured projects
   */
  getFeaturedProjectCount(): number {
    return this.projects.filter(p => p.featured).length;
  }
}

// Export singleton instance
export const projectService = new ProjectService();
export default projectService;
