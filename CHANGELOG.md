# Changelog

All notable changes to LaunchKit and VibeBoard.

## [0.9.0] — 2026-04-16 — FINAL RELEASE

38 commits, 9 versions, single session. Wireframe → production-ready.

**Stats:** 3,554 LOC · 7 pages · 33 files · 0 dependencies · PWA · Offline · Bilingual

### v0.8 — Internationalization
- EN/中文 toggle across all 3 products, shared localStorage

### v0.7 — Service Worker + Accessibility
- Offline support, skip-to-content, ARIA labels, first-visit pulse

### v0.6 — PWA
- manifest.json, installable, app shortcuts

### v0.5 — Growth Engine
- tool.html + share.html for SEO, sitemap, robots.txt, JSON-LD, MIT License

### v0.4 — Polish
- Toast notifications, skeleton loading, scroll-to-top, animations, QA fixes

### v0.3 — Flywheel
- LaunchKit ↔ VibeBoard bidirectional integration, collections, social sharing

### v0.2 — Features
- Pro tips, checklist, history, keyboard shortcuts, badges, comparison

### v0.1 — Foundation
- Interactive prototypes, hub page, design system, README

## [0.6.0] — 2026-04-16 — THE INSTALLABLE RELEASE

### Infrastructure
- **Added** PWA manifest.json — installable as desktop/mobile app
- **Added** App shortcuts for LaunchKit and VibeBoard from home screen

## [0.5.0] — 2026-04-16 — THE GROWTH ENGINE RELEASE

### LaunchKit
- **Added** share.html — shareable results page with OG tags
- **Added** Share button wired to share.html?tool=X&tone=Y

### VibeBoard
- **Added** tool.html — individual tool detail page for SEO
- **Added** Share URLs now point to tool detail pages
- **Added** Each tool has its own shareable URL with OG previews

### Infrastructure
- **Added** sitemap.xml for search engine discovery
- **Added** robots.txt with sitemap reference
- **Added** JSON-LD structured data (Schema.org WebSite + WebApplication)
- **Added** MIT License
- **Added** README badges (deploy status, license, live demo)
- **Added** OG social preview image (SVG)

## [0.4.0] — 2026-04-16 — THE POLISH RELEASE

### LaunchKit
- **Fixed** QA verification of all JS function references
- **Added** Toast notification system (copy, export feedback)
- **Added** Scroll-to-top floating button
- **Added** Keyboard shortcut hints below URL input
- **Added** Favicon (rocket emoji)

### VibeBoard
- **Fixed** Dark mode coverage for all sections
- **Fixed** Keyboard shortcuts skip when modals are open
- **Fixed** Mobile responsive modals and collections
- **Added** Skeleton loading shimmer on page load
- **Added** Scroll-to-top floating button
- **Added** "New!" animated badges on recent tools
- **Added** Newsletter subscribe success animation with confetti
- **Added** Sort transition animations
- **Added** Keyboard shortcut tooltips
- **Added** Logo tooltip ("What's VibeBoard?")
- **Added** Share URL button in tool detail modal

### Infrastructure
- **Added** GitHub Actions workflow for auto-deployment
- **Added** Open Graph social preview image (SVG)
- **Added** Hub animated grid background + ambient glow

## [0.3.0] — 2026-04-16 — THE FLYWHEEL RELEASE

### LaunchKit ↔ VibeBoard Integration (CRITICAL)
- **Added** URL parameter support — VibeBoard sends users to LaunchKit with pre-filled data
- **Added** "Submit to VibeBoard" CTA after generating a package
- **Added** LaunchKit → VibeBoard → LaunchKit bidirectional flywheel is LIVE

### LaunchKit
- **Added** Social preview mockups (Reddit dark card, Twitter light card)
- **Added** SEO meta tags (Open Graph, Twitter Card)
- **Added** Analytics-ready `data-event` attributes on all key interactions

### VibeBoard
- **Added** "Launch with LaunchKit" button in tool detail modals
- **Added** Collections: "Weekend Projects", "AI-Powered", "Developer Essentials"
- **Added** Social sharing buttons (Twitter, Reddit, copy link) on every tool card
- **Added** Maker profiles with avatar and "view all by maker" filter
- **Added** Tool submission → LaunchKit promotion CTA

### Hub
- **Added** Feature badges on product cards
- **Added** CONTRIBUTING.md for open-source readiness

## [0.2.0] — 2026-04-16

### LaunchKit
- **Added** Platform-specific pro tips (collapsible under each tab)
- **Added** Launch checklist with localStorage persistence
- **Added** History feature — restore past generations
- **Added** Share button with URL encoding
- **Added** A/B variant generator for alternative copy

### VibeBoard
- **Added** "Featured on VibeBoard" embeddable badge generator
- **Added** Weekly digest preview with subscribe CTA
- **Added** Tool comparison (side-by-side)
- **Added** Animated stats counter on scroll
- **Added** Keyboard shortcuts (j/k navigate, v vote, / search)

## [0.1.0] — 2026-04-16

### LaunchKit
- Initial interactive prototype
- URL input with loading animation
- Tabbed output: Reddit, Twitter, Product Hunt, HN, Landing Page
- Copy-to-clipboard with feedback
- Live character counts vs platform limits
- Edit-in-place (contenteditable)
- Tone selector: Professional / Casual / Hype
- 3 example URLs with different outputs
- Export all as Markdown
- Responsive mobile design

### VibeBoard
- Initial interactive prototype
- Working upvote system (localStorage)
- Search & category filter
- Sort: Hot / New / Trending
- Tool detail modals
- Submit tool form
- 14 sample tools across 6 categories
- Dark/light mode toggle
- Load more pagination
- Newsletter signup
- Trending badges on top 3
- Staggered animations

### Hub
- Landing page with product cards
- Flywheel visualization
- Design system reference page
- README with project overview
