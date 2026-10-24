# Inspiration and reference library

Where to look before designing, and what each source is good for. Two kinds:
- **Readable references** (principles, design systems, prompt libraries): Claude can fetch these pages and use the text directly.
- **Visual galleries**: mostly images and video, which a page fetch can't see. Use them by pointing the user at the right one for the job, or by taking a screenshot in the browser when a visual reference is really needed. Never copy a design wholesale; take the idea, rebuild it in the project's own system.

On cyex projects, the cyex skills win: borrow structure and ideas, never another brand's look.

## Principles and guidelines (read these, they're text)

| Source | Use it for |
|---|---|
| [Laws of UX](https://lawsofux.com) | Naming the principle behind a layout decision: Fitts's law (target size and distance), Hick's law (number of choices), Jakob's law (follow convention), Miller's law, the peak-end rule, Doherty threshold (< 400 ms feedback). |
| [Nielsen's 10 usability heuristics](https://nngroup.com/articles/ten-usability-heuristics/) | The checklist for reviews and `#uitest`: system status, real-world match, user control, consistency, error prevention, recognition over recall, flexibility, minimalism, error recovery, help. |
| [GOV.UK Design System](https://design-system.service.gov.uk) | Forms, validation, error messages and question pages done plainly and accessibly; the best source for form patterns and error wording. |
| [Inclusive Components](https://inclusive-components.design) | Accessible builds of common components (toggles, tabs, menus, cards, tooltips, notifications) with the reasoning. |
| [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines) | Platform conventions, motion, materials, typography, touch targets; pairs with the `apple-design` skill. |

## Design systems (how big teams solve the same problems)

Look up a component here when deciding states, anatomy, spacing or accessibility for something the project doesn't have yet.

| System | Strongest for |
|---|---|
| [Fluent 2](https://fluent2.microsoft.design) (Microsoft) | Windows-native feel: relevant to cyex deck (desktop app on Windows), density, focus, motion. |
| [Spectrum](https://spectrum.adobe.com) (Adobe) | Dense pro tools: inputs, pickers, tables, contextual help. |
| [Base](https://base.uber.com) (Uber) | Restrained, high-contrast product UI; data and maps. |
| [Gestalt](https://gestalt.pinterest.systems) (Pinterest) | Accessibility guidance per component, content guidelines. |
| [Lightning Design System](https://lightningdesignsystem.com) (Salesforce) | Enterprise data UI: tables, forms, record layouts. |
| [Wise Design](https://wise.design) | Clear money and status UI, plain-language content guidance. |
| [Geist](https://vercel.com/geist) (Vercel) | Minimal dark/light developer UI; the Geist font the cyex hub uses. |

## Website inspiration (visual galleries)

| Source | Look here for |
|---|---|
| [land-book.com](https://land-book.com) | Landing pages, browsable by style and industry. |
| [landdding.com](https://landdding.com) | More landing page examples. |
| [inspora.design](https://inspora.design) | Web, branding and motion inspiration. |
| [footer.design](https://footer.design) | Footers only. |
| [cta.gallery](https://cta.gallery) | Call-to-action sections and buttons. |
| [motionin.design](https://motionin.design) | Interactive web sections. |
| [wonderlist.design](https://wonderlist.design) | Premium Figma designs. |
| [reelfolio.io](https://reelfolio.io) | Animated project showreels. |
| [on.design](https://on.design) | Designer community; browse work, not a tool. |

## Motion references

| Source | Look here for |
|---|---|
| [60fps.design](https://60fps.design) | Mobile UI animations, frame by frame. Name what you see with `animation-vocabulary`, build it with `animate`. |
| [motionin.design](https://motionin.design) | Interactive and scroll sections on the web. |

## Prompt libraries for AI-built sites (text, fetchable)

Useful for wording: the vocabulary of a style, section structures, motion descriptions. Read for ideas, then write the project's own spec; don't paste a prompt as the design.

| Source | Gives |
|---|---|
| [getlayers.ai](https://getlayers.ai) | Prompts for standout AI-built websites. |
| [jiro.build](https://jiro.build) | Prompts for better AI website designs. |
| [motionsites.ai](https://motionsites.ai) | Prompts for animated websites. |
| [scrolltide.co](https://scrolltide.co) | Scroll-driven website prompts. |
| [styles.refero.design](https://styles.refero.design) | Named design styles described for AI coding agents. |
| [onepromptdesign.com](https://onepromptdesign.com) | AI **image** prompts with examples (posters, mockups, gradients); for visual assets, not page layouts. |

## Visual assets

| Source | For |
|---|---|
| [backgrounds.supply](https://backgrounds.supply) | Unique backgrounds. |
| [grainient.supply](https://grainient.supply) | Gradients and animated backgrounds. (cyex-web allows one soft accent glow at most and no grain; use on other projects.) |
| [iconly.design](https://iconly.design) | App icon inspiration. |
| [fontinlogo.com](https://fontinlogo.com) | Which fonts famous logos use. |
| [ASCII Magic](https://www.ascii-magic.com/ascii) | A gallery of animated ASCII art (library pieces MIT licensed) and a free tool that turns text, images or video into ASCII. Exports GIF, MP4/WebM, PNG, embed code (script tag, React, README snippet) and terminal playback. Good for README headers, CLI splash screens, 404s and playful backgrounds. Keep it decorative (`aria-hidden`), with a real text alternative, and paused under reduced motion. |

Check each asset's licence before shipping it.

## AI design tools (external services)

| Tool | What it does |
|---|---|
| [v0.app](https://v0.app) / [v0 templates](https://v0.app/templates) | Turns prompts into React/shadcn web apps; templates to start from. |
| [pen.dev](https://pen.dev) | Visual design with AI agents. |

These are other services: only use them when the user asks, and never send the user's code or private material to them unasked. Templates fetched from them are starting points to rebuild in the project's system.

## How to use this list

- **Designing a section** (hero, pricing, footer, CTA): check the gallery for that section type for structure ideas, then build with the project's tokens and the components in [../SKILL.md](../SKILL.md).
- **Deciding a behaviour or state**: read the relevant design-system component page and the matching Laws of UX entry.
- **Reviewing a design** (`#uitest`, critique): Nielsen's heuristics and Laws of UX are the checklist; Inclusive Components and GOV.UK for accessibility and forms.
- **Describing motion**: 60fps.design to see it, `animation-vocabulary` to name it, `animate` to build it.
