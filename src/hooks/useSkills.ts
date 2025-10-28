/**
 * useSkills Hook
 * React hook for accessing skills and timeline data
 * References: REQ-05 (Skills Matrix), REQ-08 (About Page)
 */

import { useMemo } from 'react';
import { skillsService } from '../services/skillsService';

/**
 * Hook to get all skill categories
 */
export function useSkillCategories() {
  return useMemo(() => skillsService.getAllSkillCategories(), []);
}

/**
 * Hook to get specific skill category
 * @param categoryName Category name
 */
export function useSkillCategory(categoryName: string) {
  return useMemo(() => skillsService.getSkillCategory(categoryName), [categoryName]);
}

/**
 * Hook to get career timeline
 */
export function useTimeline() {
  return useMemo(() => skillsService.getTimeline(), []);
}

/**
 * Hook to get total years of experience
 */
export function useYearsExperience(): number {
  return useMemo(() => skillsService.getTotalYearsExperience(), []);
}

/**
 * Hook to get all skills flattened
 */
export function useAllSkills() {
  return useMemo(() => skillsService.getAllSkills(), []);
}

/**
 * Hook to get expert skills (level >= 90)
 */
export function useExpertSkills() {
  return useMemo(() => skillsService.getExpertSkills(), []);
}

/**
 * Hook to get current role
 */
export function useCurrentRole() {
  return useMemo(() => skillsService.getCurrentRole(), []);
}
