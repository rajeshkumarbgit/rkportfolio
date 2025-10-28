/**
 * useConfig Hook
 * React hook for accessing site configuration
 * References: REQ-03 (Navigation & IA)
 */

import { useMemo } from 'react';
import { configService } from '../services/configService';

/**
 * Hook to get complete site config
 */
export function useSiteConfig() {
  return useMemo(() => configService.getSiteConfig(), []);
}

/**
 * Hook to get site info
 */
export function useSiteInfo() {
  return useMemo(() => configService.getSiteInfo(), []);
}

/**
 * Hook to get author info
 */
export function useAuthorInfo() {
  return useMemo(() => configService.getAuthorInfo(), []);
}

/**
 * Hook to get navigation items
 */
export function useNavigation() {
  return useMemo(() => configService.getNavigationItems(), []);
}

/**
 * Hook to get social links
 */
export function useSocialLinks() {
  return useMemo(() => configService.getSocialLinks(), []);
}

/**
 * Hook to get theme config
 */
export function useTheme() {
  return useMemo(() => configService.getThemeConfig(), []);
}

/**
 * Hook to get contact info
 */
export function useContactInfo() {
  return useMemo(() => configService.getContactInfo(), []);
}
