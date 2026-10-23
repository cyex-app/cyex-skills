---
name: web-design-toolkit
description: Curated sources for building web pages and UI - animated React components (Kokonut UI, Cult UI, React Bits, Componentry), charts (Bklit UI), motion (Motion / motion.dev) and 3D (three.js) - with when to use each, install commands through the shadcn registry, and the rules for keeping borrowed components on-brand, accessible and fast. Use automatically whenever building, designing or restyling a website, landing page, web app UI, component, animation, chart or 3D scene, especially in React, Next.js, Tailwind or shadcn/ui projects.
---

# web design toolkit

Use real, maintained building blocks instead of hand-rolling effects, and use them with restraint. A component library is a starting point you own and edit, not a style to adopt wholesale.

## Order of precedence

1. **The project's own design system** (tokens, components, CLAUDE.md). For cyex projects that's `cyex-design` + `cyex-web` / `cyex-app`, and their rules win: e.g. cyex-web bans pointer-following effects, so no magnetic docks or cursor trails there.
2. **Emil Kowalski's skills** for taste and motion decisions: `emil-design-eng`, `apple-design`, `animate`, `animation-performance`, `mobile-native`; `pick-ui-library` (invoke `/pick-ui-library`) for utility libraries (toasts, command menus, virtualisation, drag and drop, number animation…).
3. **The sources below** for the component itself.

## Sources

| Source | What it is | Reach for it when | Install |
|---|---|---|---|
| [Motion](https://motion.dev) | The animation library for React, JS and Vue (formerly Framer Motion): springs, layout animations, enter/exit, gestures, scroll. | Any motion beyond a CSS transition: shared layout, exit animations, springs, scroll-linked effects. Default choice for animation in React. | `npm i motion`, then `import { motion, AnimatePresence } from "motion/react"` |
| [three.js](https://threejs.org) | WebGL 3D engine. | A 3D scene that earns its weight: a product model, a hero object. Not for decoration. In React use `@react-three/fiber` + `@react-three/drei`. | `npm i three` |
| [Bklit UI](https://bklit.com) | ~200 chart components for shadcn/ui. | Dashboards, stats, analytics views. | `npx shadcn@latest add @bklit/area-chart` (add the `@bklit` registry, `https://ui.bklit.com/r/{name}.json`, to `components.json` if it's missing) |
| [Kokonut UI](https://kokonutui.com) | ~100 animated components (React, Tailwind, Motion, shadcn/ui): backgrounds, cards, navigation, inputs, AI-chat UI, text effects, buttons. | Polished app-like pieces, AI interfaces. | `npx shadcn@latest add @kokonutui/<name>` |
| [Cult UI](https://www.cult-ui.com) | ~150 MIT animated components for shadcn/ui: globe, kanban, charts, device mockups, cards. | Marketing sections, device frames, bento layouts. | `npx shadcn@latest add @cult-ui/<name>` |
| [React Bits](https://reactbits.dev) | Animated text, backgrounds, micro-interactions; JS or TS, CSS or Tailwind variants. | One expressive moment: a hero headline, a background. | `npx shadcn@latest add @react-bits/<Name>-TS-TW` (`-JS`/`-TS`, `-CSS`/`-TW`) |
| [Componentry](https://componentry.dev) | ~50 animated React components: text effects, image trails, docks, card stacks, carousels. | Playful, showcase-style interactions on non-cyex pages. | `npx shadcn@latest add @componentry/<name>` |

Before installing, open the component's page (WebFetch) to get its exact name, dependencies and props. Prefer the project's package manager (`pnpm dlx`, `bunx`, `npx`).

## Rules for borrowed components

- **Read what you install.** The shadcn CLI writes source into the repo; review it like your own code. Strip unused variants and props.
- **Re-skin to the project's tokens**: colours, radii, fonts, easing and duration variables. No component keeps its demo palette.
- **One expressive effect per view, at most.** Text scramble, particles, beams, glows and trails are seasoning. Most sections need none.
- **Accessibility survives:** keyboard reachable, visible focus, labels, contrast in both themes, and a `prefers-reduced-motion` branch for every animation (many library components ship without one; add it).
- **Performance survives:** animate `transform` and `opacity` only; lazy-load heavy pieces (three.js, canvas backgrounds, globes) after first paint and only on capable devices; nothing on the first screen waits for them; check CLS stays 0.
- **Licences:** note the licence of anything copied in (Cult UI is MIT; check the others per component).
- **Don't stack libraries** for the same job: one animation library (Motion), one chart source, one icon set.

## Not a component source

[Manus](https://manus.im) is a general-purpose AI agent (it can build sites itself, via its own app or API), not a library to pull components from. Only use it if the user asks to hand work to Manus.
