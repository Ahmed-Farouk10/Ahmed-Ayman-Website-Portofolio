# Portfolio Website Renovation Plan: "No Constraints Visual Masterpiece"

This document outlines the detailed master plan for executing the high-fidelity frontend overhaul of Ahmed Ayman's portfolio website. The objective is to inject cutting-edge interactive technologies (**Three.js, Framer Motion, GSAP, Lenis, Shadcn**) into the existing Next.js 16 + React 19 + Tailwind CSS v4 codebase while keeping the backend data schemas in Sanity completely untouched.

---

## 🤖 Specialized Agent Assigned
- **Agent Name**: `creative-technologist` (Visual Visualizer & Motion Maestro)
- **Soul/Persona**: Extreme creative freedom, zero-compromise animations, ultra-fluid interactive spatial fields, and high-performance WebGL optimizations. "No constraints. Just great creative shit. No risk, no fun."

---

## 🛠️ Tech Stack & Library Mapping

| Library | Role in Portfolio | Target Aesthetic |
|---|---|---|
| **`@studio-freight/react-lenis`** | Smooth Scroll foundation | Delivers frictionless inertia scroll physics |
| **`gsap` + `ScrollTrigger`** | Scroll-driven layout orchestrations | Staggered geometric typographic reveals |
| **`framer-motion`** | State-driven UI micro-interactions | Parallax tilted overlays, floating physics stacks, spring-based animations |
| **`three` + `@react-three/fiber`** | WebGL graphics rendering | Live pointer-reactive shader canvases behind the Hero section |
| **`shadcn-ui`** | Structural building blocks | Minimal, highly accessible interactive overlays |
| **Tailwind CSS v4** | Clean, CSS-first design system | Deep space background variables and custom glowing utilities |

---

## 🗺️ Architectural Phase Breakdown

### Phase 1: Engine Initialization & Foundations
1. **Dependency Integration**: Proactively install all necessary packages inside `web/package.json`.
2. **Design System Integration**: Configure local theme properties inside `web/app/globals.css` to build beautiful dark-slate surfaces (`bg-zinc-950`), custom ambient glow circles, a faint tactile noise overlay (~3% opacity), and selection colors.
3. **Typography Configuration**: Map display font (Space Grotesk) and sans font (Geist Sans) using `next/font` inside `layout.js`.
4. **Scrolling Integration**: Embed the customized `<SmoothScrolling>` wrapper inside the main client layout page to establish smooth physics.

### Phase 2: Hero Section Overhaul (Visceral 3D)
1. **Interactive Canvas**: Write a React Three Fiber particle field component that reacts dynamically to pointer movement and scroll height.
2. **Typography Orchestration**: Structure the introductory header elements to stagger-reveal from behind masks using GSAP animations on load.
3. **Contrast Layering**: Keep background graphics highly blurred and muted to ensure readability of the white heading text.

### Phase 3: Interactive Skills & Dynamic Experience
1. **Infinite Loop Marquees**: Replace static skill badges with dual-directional infinite marquees (Magic UI). Add custom hover hooks that rotate and scale elements dynamically on mouse pointer intersection.
2. **Tracing Beam Scroll Lines**: Add Aceternity's Tracing Scroll component inside `Experience.js` to draw a neon-cyan tracking line as the user reviews Ahmed's history.
3. **Glassmorphism Timeline**: Style experience blocks within accessible, highly structured, frosted-glass Shadcn cards.

### Phase 4: Isometric Projects & Polish
1. **3D Parallax Tilt**: Wrap Sanity project elements inside customized hover-tilt cards. Use cursor coordinates to translate visual elements along X and Y angles, giving them physical depth.
2. **Lucide Icons & Gradients**: Update small icon accents, contact buttons, and interactive hooks to use vibrant cyan-to-blue text gradients.

---

## 🧪 Verification & Optimization Plan

### Automated Validations
- **WebGL Memory leak audits**: Ensure all material geometry and textures are correctly disposed on viewport changes.
- **FPS benchmarking**: Verify scroll triggers run at a locked 60FPS on mid-range devices by turning off canvas rendering loops when components scroll out of view.
- **Next.js Compilation checks**: Run local build sequences (`npm run build`) to guarantee strict React 19 compilation.

### Manual Reviews
- Review typography rendering across desktop and mobile screens.
- Test scroll physics with Lenis to ensure there is no scroll-hijacking conflict on touch-screen devices.
