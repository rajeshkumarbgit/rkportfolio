# Architecture Documentation

## System Overview

This portfolio follows a **service-oriented architecture** where all data is managed through a service layer, making components purely presentational and the system easily migratable to any backend (Supabase, Contentful, Notion, etc.).

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         Components                           │
│  (Presentational only - no hardcoded data)                  │
│                                                              │
│  Header | Hero | Portfolio | CaseStudy | About | Contact   │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────────┐
│                       Custom Hooks                           │
│  (Data access layer for components)                         │
│                                                              │
│  useContent() | useProjects() | useImages() | useCaseStudy()│
└────────────────────┬────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────────┐
│                       Service Layer                          │
│  (Business logic, filtering, transformations)               │
│                                                              │
│  contentService | projectService | imageService | config    │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────────┐
│                         Data Layer                           │
│  (JSON files - easily swappable to database)                │
│                                                              │
│  content.json | projects.json | images.json | skills.json   │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Flow

### Reading Data
1. Component renders and needs data
2. Component calls custom hook (e.g., `useProjects()`)
3. Hook calls service method (e.g., `projectService.getAll()`)
4. Service reads from JSON file or cache
5. Service transforms/filters data as needed
6. Hook returns typed data to component
7. Component renders with data

### Filtering Data
1. User interacts with filter UI
2. Component updates filter state
3. Component calls hook with filter params
4. Hook calls service with filters
5. Service applies filtering logic
6. Service returns filtered results
7. Component re-renders with filtered data

---

## Directory Structure

```
/project
├── /docs                          # Documentation
│   ├── requirements.md            # Master requirements (REQ-XX)
│   ├── architecture.md            # This file
│   ├── content-guidelines.md      # Content sourcing rules
│   └── api-reference.md           # Service API documentation
│
├── /src
│   ├── /data                      # JSON data files
│   │   ├── content.json           # All text content
│   │   ├── images.json            # Image URLs & attribution
│   │   ├── projects.json          # Project data
│   │   ├── case-studies.json      # Case study details
│   │   ├── skills.json            # Skills matrix
│   │   ├── timeline.json          # Career timeline
│   │   ├── testimonials.json      # Client testimonials
│   │   └── config.json            # Site configuration
│   │
│   ├── /types                     # TypeScript definitions
│   │   └── index.ts               # All interfaces and types
│   │
│   ├── /services                  # Business logic layer
│   │   ├── contentService.ts      # Content management
│   │   ├── projectService.ts      # Project filtering/search
│   │   ├── imageService.ts        # Image URL management
│   │   └── configService.ts       # Configuration access
│   │
│   ├── /hooks                     # Custom React hooks
│   │   ├── useContent.ts          # Access content data
│   │   ├── useProjects.ts         # Access & filter projects
│   │   ├── useImages.ts           # Access images
│   │   ├── useCaseStudy.ts        # Access case studies
│   │   └── useSkills.ts           # Access skills data
│   │
│   ├── /components                # React components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Portfolio.tsx
│   │   ├── CaseStudy.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   │
│   ├── App.tsx                    # Main app component
│   ├── main.tsx                   # Entry point
│   └── index.css                  # Global styles
│
└── /public                        # Static assets
    └── (build artifacts)
```

---

## Service Layer Design

### contentService.ts
**Purpose**: Manage all text content (labels, CTAs, descriptions)

**Methods**:
- `getHeroContent()` → Hero section text
- `getAboutContent()` → About page text
- `getContactContent()` → Contact page text
- `getLabels(section)` → UI labels for specific section
- `getMetadata(page)` → SEO metadata per page

**References**: REQ-10

---

### projectService.ts
**Purpose**: Manage project data with filtering and search

**Methods**:
- `getAllProjects()` → All projects
- `getFeaturedProjects()` → Featured projects only
- `filterProjects(filters)` → Apply category/tech/search filters
- `getProjectBySlug(slug)` → Single project details
- `getCategories()` → Unique categories
- `getTechnologies()` → Unique tech tags

**References**: REQ-07, REQ-08

---

### imageService.ts
**Purpose**: Manage image URLs from Dribbble/Behance

**Methods**:
- `getImage(id)` → Single image with attribution
- `getImagesByCategory(category)` → Images for specific use
- `getHeroImages()` → Hero background images
- `getProjectCovers()` → Project cover images
- `getAttribution(imageId)` → Attribution for image

**References**: REQ-10

---

### configService.ts
**Purpose**: Site-wide configuration

**Methods**:
- `getSiteConfig()` → General site config
- `getThemeConfig()` → Colors, fonts, spacing
- `getNavigationConfig()` → Menu items and routes
- `getSocialLinks()` → Social media links
- `getContactInfo()` → Email, phone, location

**References**: REQ-03

---

## Custom Hooks Design

### useContent(section: string)
```typescript
// Usage in components
const { title, description, ctas } = useContent('hero');
```

**Returns**: Content object for specified section
**Caching**: Yes, cached after first load
**References**: REQ-10

---

### useProjects(filters?: ProjectFilters)
```typescript
// Usage in Portfolio component
const { projects, isLoading } = useProjects({
  category: 'Apps',
  technology: 'React'
});
```

**Returns**: Filtered projects array + loading state
**Caching**: Yes, with filter-based cache keys
**References**: REQ-07

---

### useImages(category?: string)
```typescript
// Usage anywhere images needed
const { images } = useImages('hero');
```

**Returns**: Image objects with URLs and attribution
**References**: REQ-10

---

## TypeScript Type System

### Core Interfaces

**Project**:
```typescript
interface Project {
  id: string;
  slug: string;
  title: string;
  category: string[];
  tags: string[];
  role: string[];
  team: string;
  timeline: string;
  kpis: string[];
  summary: string;
  cover: string;
  featured: boolean;
  industry: string;
  platform: string[];
}
```

**CaseStudy**:
```typescript
interface CaseStudy {
  slug: string;
  title: string;
  hero: HeroSection;
  metadata: ProjectMetadata;
  sections: {
    problem: string;
    research: ResearchSection;
    solution: SolutionSection;
    design: DesignSection;
    results: ResultsSection;
    learnings: string[];
  };
}
```

**References**: REQ-06, REQ-08

---

## State Management

**Current Approach**: React hooks + context (if needed)

**State Types**:
- **Local Component State**: UI state (modals, forms)
- **Shared State via Hooks**: Data fetched from services
- **URL State**: Filters, current page (via query params)

**No global state management library needed** - services handle data consistency

---

## Performance Optimizations

### Code Splitting
- Each page is a separate component
- Lazy load heavy components
- Dynamic imports for modals

### Data Caching
- Services cache responses
- Cache invalidation on data changes
- LRU cache for images

### Image Optimization
- Lazy loading below fold
- Responsive images with srcset
- WebP format when supported

**References**: REQ-12

---

## Accessibility Architecture

### ARIA Implementation
- All interactive elements have ARIA labels
- Landmark roles on major sections
- Live regions for dynamic content

### Keyboard Navigation
- Tab order logical and predictable
- Focus management in modals
- Skip links for screen readers

### Visual Accessibility
- Focus indicators always visible
- Color contrast meets WCAG 2.2 AA
- Text scales up to 200%

**References**: REQ-11

---

## Migration Path to Supabase

### Phase 1: JSON Files (Current)
- Quick to implement
- Version controlled
- No backend needed

### Phase 2: Supabase Integration
1. Create Supabase tables matching JSON schema
2. Migrate data from JSON to Supabase
3. Update service layer to use Supabase client
4. Keep service interfaces unchanged
5. Components require zero changes

**Service Layer Abstraction Benefits**:
- Components never know data source
- Switch from JSON → Supabase by changing only services
- Add caching layer transparent to components
- A/B test different data sources

---

## Testing Strategy

### Unit Tests
- Service layer functions
- Utility functions
- Type validations

### Integration Tests
- Hook behavior with services
- Filter logic
- Form submissions

### E2E Tests
- User flows through site
- Navigation
- Filter interactions

---

## Build & Deployment

### Build Process
1. TypeScript compilation with strict mode
2. Vite bundles with optimizations
3. Tailwind CSS purging
4. Image optimization
5. HTML generation with meta tags

### Production Optimizations
- Code splitting by route
- Tree shaking unused code
- CSS minification
- Asset compression

**References**: REQ-12

---

## Security Considerations

### Data Validation
- Runtime validation of JSON data
- Type guards for API responses
- Sanitize user inputs (contact form)

### Content Security
- No inline scripts
- CSP headers when deployed
- Secure external links (rel="noopener")

---

## Extensibility

### Adding New Pages
1. Create data file if needed
2. Add service methods
3. Create custom hook
4. Build component using hook
5. Add route to App.tsx

### Adding New Project
1. Add entry to `projects.json`
2. Optionally add to `case-studies.json`
3. Add images to `images.json`
4. No code changes needed

### Changing Content
1. Edit JSON files
2. No code changes
3. Rebuild to see changes

---

## Documentation Requirements

### Code Documentation
- JSDoc on all public functions
- REQ-XX references in comments
- Type definitions exported

### User Documentation
- Content editing guide
- Image sourcing guide
- Deployment guide

---

## Success Metrics

### Performance
- Lighthouse score ≥ 95
- LCP < 2.5s
- Build time < 10s

### Code Quality
- Zero TypeScript errors
- All hooks properly typed
- 100% data from services

### Maintainability
- Add new project in < 5 minutes
- Change content without code
- Clear separation of concerns

---

## Change Log

**v1.0** - Initial architecture
- Service-oriented design established
- Data layer abstraction complete
- Migration path to Supabase defined
