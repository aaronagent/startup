# 🚀 Startup — LaunchKit + VibeBoard

[![Deploy](https://github.com/aaronagent/startup/actions/workflows/deploy.yml/badge.svg)](https://github.com/aaronagent/startup/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Pages](https://img.shields.io/badge/Live-GitHub%20Pages-blue)](https://aaronagent.github.io/startup/)
[![Release](https://img.shields.io/github/v/release/aaronagent/startup)](https://github.com/aaronagent/startup/releases/latest)
[![i18n](https://img.shields.io/badge/i18n-EN%20%7C%20中文-green)](https://aaronagent.github.io/startup/)
[![Zero Deps](https://img.shields.io/badge/dependencies-0-brightgreen)]()

> **Build it. Launch it. Get discovered.**
> The complete toolkit for vibe coders.

🌐 **Live Demo:** [aaronagent.github.io/startup](https://aaronagent.github.io/startup/)

## Two Products, One Mission

### 🚀 [LaunchKit](/launchkit)
**Paste your URL → Get a complete launch package.**

Vibe coders build amazing tools but don't know how to promote them. LaunchKit solves this by generating everything you need to launch:
- 📱 Reddit post (optimized for r/vibecoding, r/sideproject)
- 🐦 Twitter thread (with hashtags & engagement hooks)
- 🚀 Product Hunt copy (tagline + description + maker comment)
- 💻 Hacker News "Show HN" post
- 🌐 Landing page (ready to share)

All AI-generated. All editable. All copyable with one click.

### ⚡ [VibeBoard](/vibeboard)
**The front page for vibe-coded tools.**

Product Hunt for the vibe coding era. Discover what people are building with AI, vote for the best, submit your own creation.
- 🔍 Search & filter by category
- ⬆️ Vote for your favorite tools
- 📊 "Built with" stats (Cursor vs Claude Code vs Bolt)
- 📬 Weekly newsletter of top picks
- 🌙 Dark mode support

## The Flywheel

```
Build a tool → LaunchKit generates your launch package
     → Post everywhere → Get discovered on VibeBoard
          → More builders see what's possible → Build more tools
```

## Tech Stack

- **Frontend:** Pure HTML/CSS/JS (zero dependencies, instant load)
- **Design:** LaunchKit (dark theme, #00d4aa accent) / VibeBoard (light theme, #6c5ce7 accent)
- **Hosting:** GitHub Pages / Vercel

## Getting Started

```bash
# Clone the repo
git clone https://github.com/aaronagent/startup.git
cd startup

# Open the hub
open index.html

# Or open individual products
open launchkit/index.html
open vibeboard/index.html
```

## Project Structure

```
startup/
├── index.html              # Hub page — entry point
├── og-image.svg            # Social preview image
├── sitemap.xml             # Search engine sitemap
├── robots.txt              # Crawler directives
├── design-system.html      # Shared design reference
├── 404.html                # Custom 404 page
├── launchkit/
│   ├── index.html          # LaunchKit app
│   ├── share.html          # Shareable results page
│   ├── launchkit-wireframe.html  # Original wireframe
│   ├── launchkit-wireframe.png
│   └── launchkit-design.md      # Product design doc
├── vibeboard/
│   ├── index.html          # VibeBoard app
│   ├── tool.html           # Individual tool SEO page
│   ├── vibeboard-wireframe.html  # Original wireframe
│   ├── vibeboard-wireframe.png
│   └── vibeboard-design.md      # Product design doc
└── README.md
```

## Roadmap

- [x] Product design docs (LaunchKit + VibeBoard)
- [x] Wireframe prototypes
- [x] Interactive prototypes (v1)
- [x] LaunchKit v2: Pro tips, launch checklist, history, keyboard shortcuts
- [x] VibeBoard v2: Badge generator, weekly digest, tool comparison, animated stats, keyboard shortcuts
- [x] GitHub Pages deployment
- [x] SEO & Open Graph meta tags
- [ ] LaunchKit: Real AI-powered copy generation (Claude API)
- [ ] VibeBoard: Backend with Supabase (real data persistence)
- [ ] User authentication (GitHub OAuth)
- [ ] Newsletter integration (Beehiiv)
- [ ] Custom domain deployment

## Philosophy

> "大部分 vibe coders 不推广的原因是'太麻烦'而不是'没渠道'。"

We believe the gap isn't in *channels* — Reddit, Twitter, HN, Product Hunt all exist. The gap is in *motivation and knowledge*. LaunchKit removes the friction. VibeBoard provides the stage.

---

Built with ❤️ and AI · [aaronagent](https://github.com/aaronagent)
