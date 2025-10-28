/**
 * Content Service
 * Manages all text content throughout the application
 * References: REQ-04 (Hero), REQ-10 (Content Management)
 */

import type {
  Content,
  HeroContent,
  AboutContent,
  PortfolioContent,
  ContactContent,
  Labels,
  PageMetadata
} from '../types';
import contentData from '../data/content.json';

class ContentService {
  private content: Content;

  constructor() {
    this.content = contentData as Content;
  }

  /**
   * Get hero section content
   * References: REQ-04
   */
  getHeroContent(): HeroContent {
    return this.content.hero;
  }

  /**
   * Get about page content
   * References: REQ-08
   */
  getAboutContent(): AboutContent {
    return this.content.about;
  }

  /**
   * Get portfolio page content
   * References: REQ-07
   */
  getPortfolioContent(): PortfolioContent {
    return this.content.portfolio;
  }

  /**
   * Get contact page content
   * References: REQ-09
   */
  getContactContent(): ContactContent {
    return this.content.contact;
  }

  /**
   * Get UI labels for specific section
   * @param section Section name ('common', 'nav', 'form', 'buttons')
   * @returns Object with labels
   */
  getLabels(section?: keyof Labels): Record<string, string> {
    if (section) {
      return this.content.labels[section];
    }
    return this.content.labels.common;
  }

  /**
   * Get specific label by key
   * @param section Section name
   * @param key Label key
   * @returns Label text
   */
  getLabel(section: keyof Labels, key: string): string {
    return this.content.labels[section][key] || key;
  }

  /**
   * Get page metadata for SEO
   * @param page Page identifier
   * @returns Page metadata
   */
  getPageMetadata(page: string) {
    return this.content.metadata[page] || this.content.metadata.home;
  }

  /**
   * Get all metadata
   * @returns All page metadata
   */
  getAllMetadata(): PageMetadata {
    return this.content.metadata;
  }

  /**
   * Get hero stats
   * @returns Array of stats for hero section
   */
  getHeroStats() {
    return this.content.hero.stats;
  }

  /**
   * Get hero CTAs
   * @returns Array of CTAs for hero section
   */
  getHeroCTAs() {
    return this.content.hero.ctas;
  }

  /**
   * Get hero capabilities
   * @returns Array of capability cards
   */
  getHeroCapabilities() {
    return this.content.hero.capabilities;
  }

  /**
   * Get trust bar content
   * @returns Trust bar data
   */
  getTrustBar() {
    return this.content.hero.trustBar;
  }

  /**
   * Get design principles
   * @returns Array of principles
   */
  getPrinciples() {
    return this.content.about.principles;
  }

  /**
   * Get about introduction paragraphs
   * @returns Array of introduction paragraphs
   */
  getAboutIntroduction() {
    return this.content.about.introduction;
  }

  /**
   * Get form labels
   * @returns Form label object
   */
  getFormLabels() {
    return this.content.labels.form;
  }

  /**
   * Get button labels
   * @returns Button label object
   */
  getButtonLabels() {
    return this.content.labels.buttons;
  }

  /**
   * Get navigation labels
   * @returns Navigation label object
   */
  getNavLabels() {
    return this.content.labels.nav;
  }
}

// Export singleton instance
export const contentService = new ContentService();
export default contentService;
