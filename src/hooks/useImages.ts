/**
 * useImages Hook
 * React hook for accessing image data
 * References: REQ-10 (Content Management)
 */

import { useMemo } from 'react';
import { imageService } from '../services/imageService';
import type { ImageData } from '../types';

/**
 * Hook to get image by ID
 * @param id Image identifier
 */
export function useImage(id: string): ImageData | undefined {
  return useMemo(() => imageService.getImage(id), [id]);
}

/**
 * Hook to get image URL by ID
 * @param id Image identifier
 */
export function useImageUrl(id: string): string {
  return useMemo(() => imageService.getImageUrl(id), [id]);
}

/**
 * Hook to get images by category
 * @param category Category name
 */
export function useImagesByCategory(category: string): ImageData[] {
  return useMemo(() => imageService.getImagesByCategory(category), [category]);
}

/**
 * Hook to get hero images
 */
export function useHeroImages(): ImageData[] {
  return useMemo(() => imageService.getHeroImages(), []);
}

/**
 * Hook to get project cover images
 */
export function useProjectCovers(): ImageData[] {
  return useMemo(() => imageService.getProjectCovers(), []);
}

/**
 * Hook to get image attribution
 * @param imageId Image identifier
 */
export function useImageAttribution(imageId: string) {
  return useMemo(() => imageService.getAttribution(imageId), [imageId]);
}
