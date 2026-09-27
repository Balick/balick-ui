# Roadmap

What Balick UI ships today and what comes next. Balick UI is a collection of
blocks designed to go together: compose a page, install it with one command.

## Shipped

### Foundations

- [x] Design rules every block follows ([`DESIGN.md`](DESIGN.md))
- [x] Shared layout primitives: `Section`, `Container`, `SectionHeader`
- [x] Installable theme, kept in sync with the site's palette
- [x] Documentation: introduction, installation, theming

### Components

- [x] Blur Fade
- [x] Grid Pattern
- [x] Marquee
- [x] Section
- [x] Shimmer Button

### Blocks

- [x] Navbar: `navbar-01`
- [x] Hero: `hero-01`, `hero-02`
- [x] Logos: `logos-01`
- [x] Features: `features-01`, `features-02`
- [x] Testimonials: `testimonials-01`
- [x] Pricing: `pricing-01`, `pricing-02`
- [x] FAQ: `faq-01`
- [x] Call to action: `cta-01`
- [x] Footer: `footer-01`, `footer-02`

### Composer

- [x] Pick blocks by category; each one is inserted where it belongs
- [x] Reorder sections by drag and drop or with the keyboard
- [x] Live responsive preview (desktop, tablet, mobile)
- [x] Shareable link: the composition lives in the URL
- [x] One-command install: the page and every block it uses
- [x] Open any composition in v0
- [x] Structure hints (navbar first, footer last, duplicated sections)

## Next

- [ ] Public launch on [ui.balick.me](https://ui.balick.me)
- [ ] `@balick` namespace in the shadcn registry directory
- [ ] More blocks and variants: team, stats, blog, contact, changelog
- [ ] Templates: complete pages assembled from blocks

## Later

- [ ] Quality badges on every component: bundle size, accessibility score,
      Server Components compatibility
- [ ] Guidance for AI agents: when to use each block, `llms.txt`
- [ ] More themes
