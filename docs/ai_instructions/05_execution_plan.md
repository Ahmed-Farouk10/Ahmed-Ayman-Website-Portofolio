# Execution Roadmap for AI

When executing the portfolio website renovation, strictly follow this step-by-step roadmap to maintain codebase stability, prevent dependency conflicts, and achieve absolute visual quality.

## Step 1: Base Foundations & Installations
1. Install core rendering and animation packages inside the `/web` directory:
   ```bash
   npm install framer-motion gsap @studio-freight/react-lenis three @react-three/fiber @react-three/drei lucide-react
   ```
2. Setup and initialize Shadcn UI components as visual building blocks:
   ```bash
   npx shadcn@latest init
   ```
3. Establish clean utilities: Ensure `clsx` and `tailwind-merge` are present for dynamic CSS blending.

## Step 2: Global Configuration & Scroll Engine
1. **Scrolling Foundation**: Create `web/components/layout/SmoothScrolling.jsx` using `@studio-freight/react-lenis` and wrap it around the layout root.
2. **Typography & Styling**:
   - Update `globals.css` to add custom display/sans styling rules, ambient neon spotlights, and CSS variables.
   - Configure the static noise texture container layer.
   - Load Space Grotesk and Geist Sans via `next/font` inside `layout.js` and inject them as standard Tailwind variables.

## Step 3: Hero Section Renovation (The Masterpiece)
1. **Interactive 3D Canvas**: Build `web/components/three/HeroCanvas.jsx` to render an interactive floating particle cluster or liquid abstract mesh that shifts coordinates based on pointer drift.
2. **Text Staggering**: Use GSAP or Framer Motion to stagger-reveal the main headings, sub-titles, and primary CTAs upon load.
3. Combine these together inside `Hero.js` under clean responsive layering.

## Step 4: Skills Section Renovation (Fluid & Dynamic)
1. **Marquee Layout**: Create `web/components/ui/InfiniteMarquee.jsx` leveraging CSS animations or Framer Motion.
2. Populate the marquee with skills fetched from Sanity (or static mappings), ensuring layout icons scale and rotate dynamically on hover.

## Step 5: Experience Section (Visual Progress)
1. **Tracing scroll path**: Implement a Tracing Beam container (Aceternity UI) that tracks scroll position and draws a neon path down the timeline.
2. **Timeline Elements**: Render historical roles within glassmorphic Shadcn UI cards.

## Step 6: Projects Section (Isometric Hover)
1. **Hover Parallax Tilt**: Build `web/components/ui/ProjectCard3D.jsx` to map mouse coordinates to isometric card rotations.
2. Pass Sanity project models (images, titles, links) cleanly into these reactive blocks.

## Step 7: Final Performance & Accessibility Audits
1. Audit layout elements: Validate WebGL cleanup triggers and CPU-render boundaries.
2. Ensure high accessibility (aria-labels on links, color contrasts, focus state outlines).
