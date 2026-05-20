# Design System & Styling Rules

To enforce a high-fidelity creative developer aesthetic, follow these strict visual guidelines:

## 1. Unified Color Palette
- **Backgrounds (The Obsidian Void)**: Avoid standard flat `#000000`. Use deep zinc elements.
  - Base: `bg-zinc-950` (`#09090b`)
  - Cards & Containers: `bg-zinc-900/40` with glassmorphic transparency
- **Text Layers (Contrast and Legibility)**:
  - Titles & Headings: `text-zinc-100` (`#f4f4f5`)
  - Descriptions & Subheadings: `text-zinc-400` (`#a1a1aa`)
- **Primary Accent (The Cyber Spark)**:
  - Highlight Accent: Cyan-500 (`#06b6d4`)
  - Text Gradients: `bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent`

## 2. Modern Typography Pairing
- **Headings (Display Font)**: Space Grotesk (Geometric, tech-forward, high character).
- **Body & Controls (Sans Font)**: Geist Sans or Inter (Extremely legible, clean vertical rhythms).
- **Implementation**: Map these via Next.js `next/font` inside `layout.js` and bind them to standard Tailwind CSS utilities (`font-sans` and `font-display`).

## 3. Structural Polish & Micro-Aesthetics
- **Whitespace (Breathing Room)**: Massive separation between core layouts using `py-24` to `py-32`.
- **Card Boundaries**:
  - Border Style: High-definition thin border `border border-white/5` or `border border-zinc-800`.
  - Glass Effect: `backdrop-blur-md bg-zinc-900/40` to create an elegant glass layer.
- **Background Spotlights**: Position highly-blurred colored circular structures in the absolute background.
  - Example: `absolute w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px]`
- **Global Micro-Texture**:
  - Add a faint, repeating noise png overlay at ~3% opacity across the site root. This breaks up flat digital colors and introduces a physical, analog feel to high-contrast gradients.

---

## 4. Microsoft Inclusive Design Principles (Diana Mounter Style)

Apply the core concept: **"Solve for One, Extend to Many."**

### A. Color & Contrast Adaptability (Diana Mounter Philosophy)
- **Contrast Ratios**: All text-to-background combinations MUST exceed a **4.5:1 ratio (WCAG AA)** by default. Never sacrifice readability for a low-contrast gray aesthetic.
- **Obsidian High-Contrast Toggle**: Implement an accessible hook or keyboard toggle that switches the canvas into a high-luminance Obsidian theme:
  - Base: Pure `#000000` (zero light emissions).
  - Primary Text: Zinc-50 (maximum contrast).
  - Interactive highlights: Pure Cyan (`#00e5ff`).
- **Chromatic Redundancy**: NEVER rely solely on color to convey state or actions. Combine colors with clear icon changes, font-weight transitions, or textual badges.

### B. High-Visibility Keyboard Navigation
- **Custom Focus Halo**: Do not rely on default browser outlines. Build a custom, highly visible, and elegant glowing focus utility using tailwind variables:
  ```css
  .focus-ring-halo:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px #09090b, 0 0 0 4px #06b6d4, 0 0 20px rgba(6, 182, 212, 0.4);
  }
  ```
- **Sequential Indexing**: Every custom interaction element (cards, buttons, tabs) must be naturally focusable (`tabIndex={0}`) and triggered seamlessly using the standard `Space` and `Enter` keys.
