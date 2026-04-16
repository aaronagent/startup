# Contributing to Startup (LaunchKit + VibeBoard)

Thanks for your interest in contributing! Here's how to get started.

## Quick Start

```bash
git clone https://github.com/aaronagent/startup.git
cd startup
open index.html  # or use any local server
```

No build step required — everything is pure HTML/CSS/JS.

## Project Structure

- `index.html` — Hub landing page
- `launchkit/index.html` — LaunchKit product (dark theme)
- `vibeboard/index.html` — VibeBoard product (light theme)
- `design-system.html` — Shared design reference

## Design Guidelines

### LaunchKit
- Background: `#0a0a0a`
- Primary accent: `#00d4aa`
- Dark theme only
- Tone: Professional, helpful

### VibeBoard
- Background: `#fafafa` (light) / `#0a0a0a` (dark mode)
- Primary accent: `#6c5ce7`
- Supports light/dark toggle
- Tone: Community-driven, discoverable

### Shared Rules
- **Single-file apps** — each product is one HTML file with inline CSS/JS
- **Zero dependencies** — no npm, no build tools, no frameworks
- **Mobile-first** — must work on 375px width
- **Accessible** — semantic HTML, keyboard navigable
- **Performance** — aim for <50KB per page

## Commit Style

```
Short imperative subject (under 70 chars)

Optional body explaining why, not what. The diff shows what.

Co-Authored-By: Your Name <your@email.com>
```

## Submitting Changes

1. Fork the repo
2. Create a feature branch
3. Make your changes
4. Test on mobile and desktop
5. Open a PR with screenshots if visual changes

## Ideas Welcome

Check the [README roadmap](README.md) for planned features, or open an issue with your idea.
