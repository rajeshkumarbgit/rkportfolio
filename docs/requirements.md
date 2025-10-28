# Master Requirements: Rajesh Kumar Portfolio Website

## Document Purpose
This file serves as the single source of truth for all portfolio requirements. All code should reference these requirements using REQ-XX identifiers.

---

## REQ-01: High-Level Goals

**Objective**: Build a blazing-fast, accessible React portfolio proving 20+ years of UI/UX + Frontend expertise through measurable outcomes, deep case studies, and hire-ready flows.

**Target Audiences**:
- **Recruiter (R)**: Skims in 60s, needs proof of breadth, stability, FANG-ready polish
- **Hiring Manager (HM)**: Dives into 2-3 flagship case studies, process maturity, systems thinking
- **Founder/Stakeholder (FS)**: Wants brand storytelling, campaigns, conversion impact

**Top Outcomes to Demonstrate**:
1. Complex IA → clear information design; systems & design ops
2. End-to-end UX lifecycle (research → ideation → flows → IA → wireframes → UI → handoff → metrics)
3. Frontend craft: performance, accessibility, componentization, state management, testing

---

## REQ-02: Technical Stack

**Framework**: Vite + React 18 with TypeScript
**Styling**: Tailwind CSS
**Icons**: Lucide React
**Animations**: CSS transitions + Framer Motion (optional)
**Images**: Responsive images from Dribbble/Behance with proper attribution
**Content**: Dynamic JSON files → easily migratable to Supabase/CMS
**Performance**: LCP < 2.5s, CLS < 0.05, Core Web Vitals ≥ 95
**Accessibility**: WCAG 2.2 AA compliant

---

## REQ-03: Navigation & IA

**Header**:
- Fixed top, hide-on-scroll-down / show-on-scroll-up
- Logo left, navigation right
- Menu items: Home, About, Portfolio, Case Studies, Contact
- CTAs: "Download Resume", "Book a 20-min Call"
- Mobile: Hamburger menu with slide-out

**Routes**:
- `/` - Home (hero + highlights)
- `/about` - Bio, timeline, skills matrix, principles
- `/portfolio` - Grid with filters (Branding, Campaigns, Websites, Apps, Wireframes, UX Flows)
- `/case-study/:slug` - Deep dive case study
- `/contact` - Form + calendar link + resume download

**Footer**:
- Contact cards (email/phone/city)
- Quick links to all pages
- Social media links
- Copyright, sitemap, newsletter

---

## REQ-04: Hero Section

**Tagline**: "Designing Systems. Shipping Experiences."

**Subtext**: "UI/UX Product Designer & UI Developer — 20+ years — Frontend across Angular/React/Next, Design Systems, Data-dense UIs"

**CTAs**:
1. View Portfolio (primary)
2. View Case Studies
3. Get in Touch

**Trust Elements**:
- Client logos (5-7 notable companies)
- Key metrics (Years, Projects, Users Impacted, Satisfaction)
- Capability cards with icons

---

## REQ-05: Skills Matrix

**Categories**:
1. UX Design: Research, IA, Wireframing, Prototyping, Design Systems, Accessibility
2. Frontend Development: React, Angular, TypeScript, Next.js, State Management, Testing
3. Tools & Platforms: Figma, HTML/CSS, Tailwind, Git, Performance, Accessibility
4. Product & Strategy: Product Strategy, Stakeholder Management, Agile, Design Ops, Mentoring

**Display**: Visual progress bars with years of experience + proficiency percentage

---

## REQ-06: Case Study Template (STAR Methodology)

**Structure**:
1. **Cover Summary**: One-liner outcome with metrics, role, timeline, team, stack
2. **Problem Context**: Market, users, business goals, constraints
3. **Research & Discovery**: Methods, personas, key insights
4. **Solution Approach**: 3-5 decisive moves, key features
5. **Design & Implementation**: Wireframes, design system, frontend decisions
6. **Results & Impact**: Before/after metrics, testimonials
7. **Key Learnings**: Numbered takeaways
8. **CTA**: "Want results like this? Book a 20-min call"

**Required Elements**:
- Hero with 4 key metrics
- Metadata: role, timeline, team, tools
- Visual hierarchy with numbered sections
- Testimonial quote with attribution
- Navigation back to portfolio

---

## REQ-07: Portfolio Grid

**Categories**: Apps, Design Systems, Campaigns, Websites, Wireframes, UX Flows, Use Cases

**Filters**:
- Category tabs
- Technology chips (React, Angular, Figma, TypeScript, etc.)
- Search input
- Industry filter
- Platform filter (Web, iOS, Android)

**Project Card Elements**:
- Cover image (Dribbble/Behance)
- Title
- Summary (2-3 lines)
- Tags (3-4 visible)
- KPIs (2 key metrics)
- Featured badge for flagship projects
- CTA to case study or prototype

**Behavior**:
- Filters update URL params
- Show result count
- Empty state with clear filters option
- Keyboard navigable
- Hover animations

---

## REQ-08: About Page

**Sections**:
1. **Introduction**: 3-4 paragraphs about background and expertise
2. **Design Principles**: 5 core principles with icons and descriptions
3. **Skills Matrix**: 4 categories with 6+ skills each, progress bars
4. **Career Timeline**: 6+ positions from 2004 to present with achievements

**Timeline Format**:
- Year range
- Role title
- Company name
- 2-3 key achievements with metrics

---

## REQ-09: Contact Page

**Elements**:
1. **Contact Info**: Email, Phone, Location with icons
2. **Quick Actions**: Book Call, Download Resume, View Portfolio
3. **Social Links**: LinkedIn, GitHub, Twitter with handles
4. **Contact Form**: Name, Email, Company, Message with validation
5. **Availability Status**: Current availability indicator
6. **CTA Section**: Conversion-focused final push

---

## REQ-10: Content Management

**All content must be**:
- Stored in JSON files in `/src/data/`
- Typed with TypeScript interfaces
- Accessed via service layer
- Never hardcoded in components

**Data Files**:
- `content.json` - All text, labels, CTAs
- `images.json` - Dribbble/Behance URLs with attribution
- `projects.json` - 12+ projects with full details
- `case-studies.json` - STAR methodology data
- `skills.json` - Skills matrix data
- `timeline.json` - Career progression
- `testimonials.json` - Client quotes
- `config.json` - Site configuration

---

## REQ-11: Accessibility Requirements

**WCAG 2.2 AA Compliance**:
- Proper heading hierarchy (h1 → h2 → h3)
- ARIA labels on all interactive elements
- Keyboard navigation throughout
- Focus indicators visible and high contrast
- Color contrast ratio ≥ 4.5:1
- Skip-to-content link
- Alt text for all images
- Form labels and error messages
- Reduced motion support

---

## REQ-12: Performance Requirements

**Targets**:
- Lighthouse Performance ≥ 95
- LCP < 2.5s
- FID < 100ms
- CLS < 0.05
- Bundle size < 300KB gzipped

**Optimizations**:
- Code splitting by route
- Lazy loading for images
- Prefetch on hover/intent
- Optimized images (WebP/AVIF)
- Tree shaking
- CSS purging

---

## REQ-13: SEO Requirements

**Meta Tags**:
- Unique title per page
- Meta description per page
- Open Graph tags
- Twitter Card tags
- Canonical URLs
- Keywords

**Structured Data**:
- JSON-LD for Person schema
- JSON-LD for CreativeWork
- Sitemap.xml
- Robots.txt

---

## REQ-14: Animation & Interaction

**Micro-interactions**:
- Button hover states
- Card hover elevation
- Header hide/show on scroll
- Smooth scroll behavior
- Loading states
- Form submission feedback
- Page transitions

**Respect prefers-reduced-motion**:
- Disable animations if user prefers
- Provide instant feedback
- Maintain functionality

---

## REQ-15: Responsive Design

**Breakpoints**:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

**Requirements**:
- Mobile-first approach
- Touch-friendly targets (min 44x44px)
- Readable text without zoom
- Horizontal scrolling avoided
- Optimized images per breakpoint

---

## REQ-16: Visual Design

**Style**:
- Minimal, editorial, generous whitespace
- 8-point grid system
- Typography: Inter font family
- Palette: Grayscale + one accent (blue or green, NO purple/indigo)
- Cards: soft shadows, rounded-2xl
- Professional, clean, modern

---

## Implementation Checklist

- [ ] Requirements documented and versioned
- [ ] TypeScript types for all data structures
- [ ] JSON data files with real content
- [ ] Service layer for data access
- [ ] Custom hooks for components
- [ ] All 6 pages implemented
- [ ] Header with hide-on-scroll
- [ ] Footer with all links
- [ ] Portfolio filtering working
- [ ] Case study with STAR template
- [ ] Contact form functional
- [ ] Accessibility audit passing
- [ ] Performance metrics met
- [ ] SEO meta tags added
- [ ] Responsive on all devices
- [ ] Build succeeds without errors

---

## Change Log

**Version 1.0** - Initial requirements document created
- All master prompt requirements captured
- Organized by functional area
- REQ-XX identifiers added for traceability
