# Solvanta — Premium Immersive Solar Website

A responsive React + Vite solar company website concept featuring a procedural Three.js / React Three Fiber solar installation, GSAP scroll reveals, interactive product selector, service cards, portfolio, FAQ accordion and enquiry form.

## Requirements
- Node.js 18.18+ (Node 20 LTS recommended)
- npm

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite (usually http://localhost:5173).

## Production build
```bash
npm run build
npm run preview
```
The production site is generated in `dist/`.

## Customize before publishing
1. Replace the demo brand name `SOLVANTA` throughout `src/` and `index.html`.
2. In `src/App.jsx`, replace `hello@solvanta.example` in the contact details and `ContactForm` with the real business email. The form validates fields and opens the visitor's configured email application with a prefilled message. This is a frontend-only implementation and does not store or send leads to a server.
3. Replace the illustrative portfolio images and demo project details with verified company projects and permissioned photography.
4. Replace the brand statement in the testimonial section with real customer feedback and consented attribution.
5. Review product specifications, claims, warranties and service areas before launch. Current wattages and project capacities are illustrative demo content.
6. Update social links in the footer to the company's actual profiles.

## Project structure
```text
src/
  components/
    Navigation.jsx    Responsive mobile/desktop navigation
    Reveal.jsx        GSAP ScrollTrigger reveal wrapper
    SolarScene.jsx    Procedural 3D solar panel installation
  App.jsx             Page sections, product selector, FAQ and enquiry form
  main.jsx            React entry point
  styles.css          Tailwind directives and responsive design system
```

## Notes
- The hero 3D model is built from Three.js geometry. No paid model or external 3D asset is required.
- The Canvas uses capped device pixel ratio for performance. On devices that cannot render WebGL, the hero retains its background, text and layout, though the 3D object will not render.
- Product and portfolio imagery use remote Unsplash image URLs; replace with optimized local assets for production.
- Google Fonts are loaded from Google Fonts. System fallbacks remain available if fonts cannot load.
