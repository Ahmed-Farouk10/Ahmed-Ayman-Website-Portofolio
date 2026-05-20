# Animation & Motion Guidelines

Avoid visual chaos by organizing animations into dedicated functional roles.

## 1. Engine Separation Checklist
- **Framer Motion**: The master of stateful, responsive layout changes:
  - Cursor tracking hover effects.
  - Cards floating or expanding on click.
  - Interactive drag bounds or physics-based components.
  - Smooth page transitions and modular mounts.
- **GSAP + ScrollTrigger**: The master of sequential, scroll-bound narratives:
  - Exact, timeline-based text staggering (reveal text line-by-line using vertical scroll height).
  - High-impact layout pinning (pinning background containers while sliding horizontal visual cards).
- **CRITICAL**: Never bind both Framer Motion and GSAP controls to the exact same DOM node. Wrap elements in parent `div` containers if you need complex scroll-pinning on top of hovering pop-ups.

## 2. Section-by-Section Engineering Details
- **Hero Section (Three.js Background)**:
  - Set up a React Three Fiber `<Canvas>` wrapped inside React `Suspense`.
  - Feature a Slow-rotating wireframe mesh or a floating, interactive particle cloud reacting to local mouse coordinate drifts.
  - Foreground intro text should animate in using GSAP staggering text reveals.
- **Skills Section (Infinite Marquee)**:
  - Display skill icon elements inside dual continuous sliding marquees moving in opposite directions (Magic UI).
  - Apply `whileHover={{ scale: 1.15, rotate: 3 }}` to individual icons to make them reactive.
- **Projects Section (Isometric Parallax Tilt)**:
  - Integrate Aceternity's 3D Pin cards or build a custom `onMouseMove` hook that calculates hover angle and translates the card structure into a dynamic 3D tilt.
- **Performance Constraints**:
  - Always wrap complex WebGL/Three.js assets in custom checks (`useInView`) to freeze render loop cycles when components scroll completely out of view.
  - Ensure all layout transformations utilize only GPU-accelerated elements (`transform` and `opacity`).
