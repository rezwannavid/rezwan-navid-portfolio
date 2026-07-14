# Rezwan Navid Portfolio — Design Specification

## 1. Product scope

Build only the responsive homepage for the Rezwan Navid portfolio.

Future routes should be anticipated but not implemented beyond lightweight placeholders:

- `/work`
- `/about`
- `/work/[slug]`

Every project card on the homepage must be implemented as a link ready to point to a future case-study or project page.

The supplied Desktop, Tablet, and Mobile screenshots are the visual source of truth. The Figma MCP components and variables are the implementation source of truth whenever a screenshot and an inspectable Figma value differ.

---

## 2. Visual direction

The site is a minimal, monochrome, editorial portfolio with a dark gallery-like atmosphere.

Core characteristics:

- Nearly black background
- Warm off-white foreground
- Very restrained use of borders
- Oversized typography
- Pixel-art portrait, eye, and brain imagery
- Deliberate asymmetric compositions
- Tight typography and compact metadata
- Large areas of negative space
- Premium, subtle motion
- No gradients, drop shadows, glassmorphism, or decorative colour

The site should feel precise, intelligent, experimental, and quiet rather than flashy.

---

## 3. Required assets

All files will live in `/public`.

| File | Usage |
|---|---|
| `/RNLogo.svg` | Header and footer logo |
| `/MRNFacePotrait.svg` | Main hero portrait |
| `/Brain.svg` | Footer artwork |
| `/Eyes.svg` | Design philosophy artwork |
| `/rnfavicon.png` | Browser favicon |
| `/linkheader.png` | Social/share metadata image |

Do not redraw, replace, trace, or approximate the supplied SVG artwork.

Icons that are not supplied may be created with lightweight inline SVG. Their stroke weight, scale, and optical alignment must match the Figma references.

Use exact filename casing.

---

## 4. Colour tokens

The uploaded colour-variable screenshot defines the palette.

```css
:root {
  --black-1000: #101010;
  --black-800: #151515;
  --black-700: #1a1a1a;
  --black-500: #1e1e1e;
  --black-400: #252525;
  --black-300: #3b3b3b;

  --white-800: #d8d8d8;
  --white-600: #c5c5c5;
  --white-400: #b3b3b3;

  --white-1000-rgb: 231 231 231;
  --white-1000-004: rgb(var(--white-1000-rgb) / 0.04);
  --white-1000-010: rgb(var(--white-1000-rgb) / 0.10);
  --white-1000-020: rgb(var(--white-1000-rgb) / 0.20);
  --white-1000-060: rgb(var(--white-1000-rgb) / 0.60);
  --white-1000-100: #e7e7e7;
}
```

Recommended semantic mapping:

```css
:root {
  --color-page: var(--black-1000);
  --color-surface: var(--black-400);
  --color-text-primary: var(--white-1000-100);
  --color-text-secondary: var(--white-1000-060);
  --color-text-muted: var(--white-400);
  --color-border: var(--white-1000-010);
  --color-border-strong: var(--white-1000-020);
}
```

Do not invent additional neutral colours unless required for antialiasing or browser-native controls.

---

## 5. Typography

The supplied text-variable file defines these source styles:

| Token | Family | Weight | Size | Tracking |
|---|---|---:|---:|---:|
| Display/Regular | Neue Montreal | 400 | 48px | -2% |
| Display/Desktop/Large/Regular | Neue Montreal | 400 | 72px | -2% |
| Display/Tablet/Large/Regular | Neue Montreal | 400 | 52px | -2% |
| Display/Mobile/Large/Desktop | Neue Montreal | 400 | 48px | -2% |
| Body/XS/Regular | Neue Montreal | 400 | 13px | 0 |
| Body/XS/Medium | Neue Montreal | 500 | 13px | 0 |
| Title/Regular | Neue Montreal | 400 | 20px | 0 |

Implement them as reusable CSS variables or utility classes.

```css
:root {
  --font-sans: "Neue Montreal", Arial, Helvetica, sans-serif;

  --text-display: 3rem;
  --text-display-desktop-lg: 4.5rem;
  --text-display-tablet-lg: 3.25rem;
  --text-display-mobile-lg: 3rem;
  --text-body-xs: 0.8125rem;
  --text-title: 1.25rem;

  --tracking-display: -0.02em;
}
```

Use a supplied local Neue Montreal font only when the font files are actually present. Do not download or substitute an unlicensed font. Until then, keep the fallback stack functional.

Line heights should be visually matched to Figma rather than left at browser defaults:

- Display: approximately `0.92–1`
- Title: approximately `1.05–1.15`
- Body XS: approximately `1.15–1.3`

---

## 6. Responsive strategy

Use the three supplied frames as distinct authored compositions, not as a single desktop layout that merely shrinks.

Suggested breakpoints:

```css
/* Mobile */
@media (max-width: 767px) {}

/* Tablet */
@media (min-width: 768px) and (max-width: 1199px) {}

/* Desktop */
@media (min-width: 1200px) {}
```

Allow fluid scaling inside each range with `clamp()` where appropriate. Avoid arbitrary breakpoint proliferation.

### Desktop composition

- Content sits inside a centered max-width container.
- Header contains:
  - Logo at left
  - `Work` and `About` navigation near the left
  - LinkedIn and email icons at right
  - A horizontal divider beneath
- Hero is centered and spacious.
- The portrait sits near the visual centre.
- `Product`, `Brain`, `Design`, and `Heart` orbit the portrait as individually positioned display words.
- Personal introduction is positioned below the hero, left aligned.
- Client/role list appears opposite it on the right.
- Project grid follows the exact mixed-width composition shown in the desktop reference.
- Philosophy section is two-column: copy on the left, eye artwork on the right.
- Connect section places the title left and pill button right.
- Footer uses three zones:
  - Logo and social links left
  - Brain artwork centred/lower centre
  - Vertical `Create with Impact` statement right

### Tablet composition

- Header remains desktop-like, with logo, links, social icons, and divider.
- Hero changes significantly:
  - Orbital words occupy the left side.
  - Portrait is positioned around the centre.
  - Introduction and role list move to the right side.
- The hero should not be implemented as a scaled desktop composition.
- Project cards use the tablet grid proportions shown in the reference, with content extending closer to viewport edges than desktop.
- Philosophy, connect, and footer retain horizontal structure but use reduced spacing and type sizes.
- Vertical footer statement remains on the right.

### Mobile composition

- Header becomes compact:
  - Menu icon left
  - Centred logo
  - Contact/email icon right
  - Desktop text navigation is hidden
- Hero:
  - Four display words surround the portrait in a compact composition.
  - Introduction and role list move below the visual.
  - Maintain clear separation between the artwork and text.
- Project cards become one column and nearly full width.
- Card media areas remain large and rectangular.
- Philosophy becomes stacked:
  - Eyebrow
  - Large paragraph
  - No eye artwork unless the mobile Figma frame explicitly includes it
- Connect section stacks title and pill button.
- Footer becomes a compact composition:
  - Logo and social links left
  - Vertical `Create with Impact` text right
  - Brain artwork toward the bottom
- Preserve mobile safe areas and do not allow fixed elements to collide with browser chrome.

---

## 7. Page structure

Use semantic sections and clean reusable components.

```txt
HomePage
├── SiteHeader
├── HeroSection
│   ├── OrbitWords
│   ├── PortraitArtwork
│   ├── PersonalIntro
│   └── ExperienceList
├── SelectedWorkSection
│   └── ProjectGrid
│       └── ProjectCard × N
├── DesignPhilosophySection
├── ConnectSection
└── SiteFooter
```

Suggested components:

```txt
components/
├── layout/
│   ├── Container.tsx
│   ├── SiteHeader.tsx
│   └── SiteFooter.tsx
├── home/
│   ├── HeroSection.tsx
│   ├── OrbitWords.tsx
│   ├── ProjectGrid.tsx
│   ├── ProjectCard.tsx
│   ├── DesignPhilosophy.tsx
│   └── ConnectSection.tsx
└── ui/
    ├── AnimatedDivider.tsx
    ├── PillButton.tsx
    └── IconButton.tsx
```

Keep project data separate from presentation:

```ts
type Project = {
  title: string;
  year: string;
  slug: string;
  image?: string;
  alt: string;
  gridArea?: string;
};
```

The content and images will be supplied later. Use clearly labelled temporary entries, not random stock imagery.

---

## 8. Project cards

Each card must:

- Be an accessible link
- Have a media area
- Show project title and year directly below
- Preserve the exact visual gap and hierarchy shown in Figma
- Support future image assets without layout shift
- Have a meaningful `aria-label`
- Use subtle hover/focus behaviour only

Desktop and tablet grids must use CSS Grid with explicit spans or named areas, not JavaScript-driven masonry.

On hover-capable devices:

- Media may brighten slightly
- Image may scale to a maximum of approximately `1.02`
- Metadata may shift or fade subtly
- Avoid large cursor effects or excessive parallax

---

## 9. Header behaviour

The header differs substantially by breakpoint.

### Desktop and tablet

- Use the Figma MCP top-nav component where available.
- Logo links to `/`.
- `Work` links to `/work`.
- `About` links to `/about`.
- LinkedIn opens in a new tab with proper `rel`.
- Email uses `mailto:`.
- Divider animates from centre to both edges on initial reveal.
- Header may remain static unless Figma explicitly specifies sticky behaviour.

### Mobile

- Menu icon opens an accessible menu or drawer.
- Drawer contains at least `Work`, `About`, LinkedIn, and Email.
- Close on Escape, outside click, or route selection.
- Lock body scroll while open.
- Return focus to the trigger after closing.
- Logo remains centred independent of side-icon widths.

---

## 10. Motion system

Motion must feel premium, restrained, and consistent.

Use Framer Motion only if already installed or if its inclusion is justified. Otherwise use CSS transitions plus Intersection Observer.

### Reveal animation

For text, artwork, cards, and section content:

- Start: `opacity: 0`, `transform: translateY(20px)`
- End: `opacity: 1`, `transform: translateY(0)`
- Duration: approximately `700–950ms`
- Easing: premium deceleration such as `cubic-bezier(0.22, 1, 0.36, 1)`
- Stagger children by roughly `50–100ms`
- Trigger once when content enters the viewport
- Do not animate every small label independently if it creates visual noise

### Animated dividers

Lines should grow from the centre toward both edges.

Recommended implementation:

```css
.animated-divider {
  transform: scaleX(0);
  transform-origin: center;
}

.animated-divider[data-visible="true"] {
  transform: scaleX(1);
  transition: transform 900ms cubic-bezier(0.22, 1, 0.36, 1);
}
```

### Hero entrance

- Logo/header reveals first
- Orbital words enter with subtle stagger
- Portrait fades and rises with a slightly longer duration
- Intro and role list follow
- Avoid spinning the words or portrait unless specified by Figma

### Reduced motion

Respect `prefers-reduced-motion: reduce`.

When enabled:

- Remove transforms and stagger
- Show content immediately or with minimal opacity transition
- Disable smooth scrolling

---

## 11. Smooth scrolling

Use native smooth scrolling:

```css
html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

Do not add a heavy smooth-scroll library unless the project already uses one.

---

## 12. Accessibility

- Use semantic landmarks: `header`, `nav`, `main`, `section`, `footer`
- Maintain keyboard-visible focus states
- Ensure all icon-only buttons have accessible labels
- Supply useful image alt text
- Mark decorative artwork as decorative when it conveys no content
- Maintain WCAG AA contrast
- Make the mobile menu keyboard-accessible
- Do not rely on hover for essential information
- Keep touch targets at least approximately 44×44px where possible

---

## 13. Metadata and linking

Configure:

- Favicon: `/rnfavicon.png`
- Open Graph image: `/linkheader.png`
- Twitter/social card image: `/linkheader.png`
- Page title and description appropriate to Rezwan Navid’s portfolio
- Canonical metadata structure ready for the production domain

In Next.js App Router, use the Metadata API rather than manually duplicating tags.

---

## 14. Engineering requirements

- Next.js with App Router
- TypeScript
- Prefer CSS Modules, Tailwind, or the existing styling system; do not mix several systems without reason
- Reusable components
- No duplicated desktop/tablet/mobile DOM trees unless the composition truly cannot be achieved accessibly through CSS
- Avoid absolute positioning for entire sections; use it only for the hero artwork and orbital typography where necessary
- No horizontal overflow at any viewport
- Images must use correct intrinsic sizing
- Avoid hydration errors
- Keep Lighthouse performance and accessibility in mind
- No console errors or warnings
- Verify at desktop, tablet, and mobile frame widths from Figma

---

## 15. Definition of done

The homepage is complete only when:

- It closely matches all three supplied reference frames
- Header composition changes correctly at each breakpoint
- Hero composition is independently tuned for desktop, tablet, and mobile
- Project-grid spans match the references
- All supplied SVG and PNG assets are linked correctly
- Favicon and social metadata are configured
- Smooth scrolling works
- Reveal animations feel restrained and premium
- Dividers animate from centre to edges
- Reduced-motion preferences are respected
- Every project card links to a future project route
- Placeholder `/work` and `/about` routes do not need full designs
- There is no horizontal overflow
- Keyboard navigation works
- The build, type-check, and lint commands pass
