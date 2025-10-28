/**
 * useContent Hook
 * React hook for accessing content data
 * References: REQ-10 (Content Management)
 */

import { useMemo } from 'react';
import { contentService } from '../services/contentService';
import type { HeroContent, AboutContent, PortfolioContent, ContactContent } from '../types';

/**
 * Hook to get hero content
 */
export function useHeroContent(): HeroContent {
  return useMemo(() => contentService.getHeroContent(), []);
}

/**
 * Hook to get about content
 */
export function useAboutContent(): AboutContent {
  return useMemo(() => contentService.getAboutContent(), []);
}

/**
 * Hook to get portfolio content
 */
export function usePortfolioContent(): PortfolioContent {
  return useMemo(() => contentService.getPortfolioContent(), []);
}

/**
 * Hook to get contact content
 */
export function useContactContent(): ContactContent {
  return useMemo(() => contentService.getContactContent(), []);
}

/**
 * Hook to get labels
 * @param section Optional section name
 */
export function useLabels(section?: 'common' | 'nav' | 'form' | 'buttons') {
  return useMemo(() => contentService.getLabels(section), [section]);
}

/**
 * Hook to get page metadata
 * @param page Page identifier
 */
export function usePageMetadata(page: string) {
  return useMemo(() => contentService.getPageMetadata(page), [page]);
}

/**
 * Hook to get specific label
 * @param section Section name
 * @param key Label key
 */
export function useLabel(section: 'common' | 'nav' | 'form' | 'buttons', key: string) {
  return useMemo(() => contentService.getLabel(section, key), [section, key]);
}
