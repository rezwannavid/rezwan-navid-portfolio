# Codex Implementation Prompt — Rezwan Navid Portfolio Homepage

You are implementing the responsive homepage of my personal portfolio from supplied Figma frames, Figma MCP components, design variables, and local assets.

Read `design.md` completely before writing code. Treat it as the project specification.

## Goal

Create a production-quality, responsive homepage that accurately matches the three supplied designs:

1. Desktop
2. Tablet
3. Mobile

Build only the homepage now. The site will eventually include `/work`, `/about`, and individual project pages, but those pages do not need to be designed or built beyond route-ready links or minimal placeholders.

Do not stop after scaffolding. Complete the homepage, run it, inspect it at all three target widths, fix visual and technical issues, and leave the project in a clean working state.

## Source-of-truth priority

When resolving ambiguity, use this order:

1. Inspectable Figma MCP properties, variables, and supplied components
2. Desktop, Tablet, and Mobile reference frames
3. `design.md`
4. Sensible responsive interpolation

Do not loosely reinterpret the design. Match the supplied compositions.

## Setup

Create the project if it does not exist.

Use:

- Next.js App Router
- TypeScript
- A clean, maintainable styling approach
- Reusable components
- Semantic HTML

Do not use a UI kit that changes the visual language.

## Supplied assets

The following files will be placed in `/public`:

- `RNLogo.svg`
- `MRNFacePotrait.svg`
- `Brain.svg`
- `Eyes.svg`
- `rnfavicon.png`
- `linkheader.png`

Reference them exactly as:

- `/RNLogo.svg`
- `/MRNFacePotrait.svg`
- `/Brain.svg`
- `/Eyes.svg`
- `/rnfavicon.png`
- `/linkheader.png`

Pay attention to filename casing.

Do not recreate or replace these files. Other simple icons may be implemented as minimal inline SVG or taken directly from the supplied Figma MCP top-nav/button components.

If these assets are not present at the beginning, create the `/public` folder and wire the expected paths anyway. Do not generate fake replacement artwork.

## Figma MCP usage

Inspect and use the supplied Figma MCP data for:

- Header/top navigation
- Buttons
- Exact spacing
- Borders
- Component dimensions
- Responsive frame widths
- Colour variables
- Typography variables

Do not approximate components that are available through Figma MCP.

## Key responsive requirement

The header and hero are not the same layout scaled down.

### Desktop

- Logo at left
- `Work` and `About` navigation near the left
- LinkedIn and email icons at right
- Divider beneath the header
- Large centred hero composition
- Pixel portrait in the centre
- `Product`, `Brain`, `Design`, and `Heart` orbiting the portrait
- Introduction below-left
- Experience/client-role list below-right

### Tablet

- Keep the desktop-style header
- Recompose the hero:
  - Orbital words on the left
  - Portrait near the centre
  - Introduction and role list on the right
- Do not simply scale the desktop hero

### Mobile

- Compact header:
  - Menu icon left
  - Centred RN logo
  - Contact/email icon right
- Hide desktop text navigation
- Put the four words around the portrait in the compact arrangement shown
- Place introduction and role list below the artwork
- Implement an accessible mobile navigation drawer

Use CSS Grid/Flexbox for structural layout and absolute positioning only where it is appropriate for the orbital hero composition.

## Homepage sections

Implement in this order:

1. Header
2. Hero
3. Selected Works
4. Design Philosophy
5. Connect
6. Footer

### Selected Works

- Use data-driven reusable project cards
- The content and final media will be supplied separately
- Add clearly labelled temporary project data matching the visible project names and years where available
- Each card must link to `/work/[slug]`
- Do not build the destination case studies now
- Match the mixed grid spans of each supplied breakpoint
- Mobile becomes a single-column list
- Prevent layout shift by reserving media aspect ratios

### Design Philosophy

- Include the eyebrow label and supplied text
- Use `/Eyes.svg` in the desktop/tablet composition
- Follow the mobile reference if the eye is omitted there
- Animate the divider from its centre outward

### Connect

- Include the eyebrow label
- Include “Let’s build something memorable”
- Use the Figma MCP pill button
- Link the button to email
- Preserve the breakpoint-specific alignment

### Footer

- Use `/RNLogo.svg`
- Include social links
- Use `/Brain.svg`
- Include the vertical “Create with Impact” treatment
- Match the different desktop/tablet/mobile compositions rather than shrinking one layout

## Colour and typography

Use the exact tokens defined in `design.md`.

Use Neue Montreal only when local font files are available. Do not fetch a questionable external font or silently bundle an unlicensed file. Keep the specified fallback stack.

The page must remain monochrome and use the supplied neutral variables. Do not add accent colours.

## Motion

Implement premium, restrained animation.

Required:

- Smooth native scrolling
- Fade-up reveals for meaningful objects and section groups
- Small stagger between related children
- Dividers reveal from the centre to both edges
- Subtle project-card hover states
- A polished initial hero entrance
- `prefers-reduced-motion` support

Motion should never delay interaction or make the page feel theatrical. Avoid constant looping, bouncing, aggressive parallax, or large rotations.

Suggested motion:

- `opacity: 0 → 1`
- `translateY(20px) → 0`
- `700–950ms`
- `cubic-bezier(0.22, 1, 0.36, 1)`

Use Intersection Observer and CSS, or Framer Motion if it is already appropriate for the codebase. Do not introduce a heavy scrolling library.

## Metadata

Configure through the Next.js Metadata API:

- Favicon: `/rnfavicon.png`
- Open Graph image: `/linkheader.png`
- Twitter image: `/linkheader.png`
- Suitable title and description

## Accessibility and quality

- Semantic landmarks
- Visible keyboard focus
- Accessible names for icon buttons
- Useful alt text
- Escape/outside-click support for mobile menu
- Body-scroll lock while mobile menu is open
- Reduced-motion support
- No horizontal overflow
- No console errors
- No broken asset paths
- No hydration warnings
- Touch-friendly controls
- Good colour contrast

## Implementation workflow

Work through the task without waiting for confirmation:

1. Inspect the repository
2. Inspect the Figma MCP frames, variables, top nav, and buttons
3. Read `design.md`
4. Create the Next.js structure if needed
5. Build reusable components
6. Implement all responsive layouts
7. Wire all required assets and metadata
8. Add motion and reduced-motion behaviour
9. Run lint, type-check, and build
10. Run the site locally
11. Compare at the exact Figma desktop, tablet, and mobile widths
12. Correct spacing, typography, wrapping, image sizing, grid spans, and overflow
13. Finish only when the homepage is complete and stable

## Deliverables

At completion, provide:

- A concise summary of what was implemented
- The main files created or changed
- Commands to run the project
- Any missing user-supplied assets that still need to be dropped into `/public`
- Confirmation of lint/type-check/build results

Do not claim pixel accuracy without actually comparing all three breakpoints. Do not leave TODOs for core homepage work.
