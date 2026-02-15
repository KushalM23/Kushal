# Design System Documentation

**Project:** Kushal — Retro Portfolio  
**Stack:** Next.js 16 · React 19 · Tailwind CSS v4 · Framer Motion 12 · TypeScript  
**Theme:** Analog cassette-tape / typewriter aesthetic on warm paper tones  
**Date:** February 12, 2026

---

## 1. Typography System

### Font Families

| Token | Value | Role |
|---|---|---|
| `--font-mono` | `"Aleo", "IBM Plex Mono", "Courier New", monospace` | Primary body font (loaded via `next/font/google`) |
| `--font-display` | `"Special Elite", "Courier New", cursive` | Used by `.typewriter-font` for headings/accent text |

**Loaded fonts:**  
- **Aleo** — loaded in `layout.tsx` via `next/font/google` (weights: 400, 500, 600, 700).

**⚠ Issue:** `"Special Elite"` is referenced in `--font-display` but **never loaded** via `next/font/google` or any `<link>`. It will always fall back to `"Courier New"`. Similarly, `"IBM Plex Mono"` is in the fallback chain but never loaded.

### Font Sizes

| Location | Size | Context |
|---|---|---|
| `body` (globals.css) | `14px` | Base body size |
| `.tape-label` | `9px` | Decorative micro-labels |
| `.retro-titlebar` | `12px` | Window chrome title text |
| `.retro-btn` | `12px` | Button text |
| `.retro-input` | `13px` | Form input text |
| HeroSection name | `64px → 24px` | Dynamic shrink on scroll |
| AboutSection `h1` | `text-3xl / md:text-4xl` (30px / 36px) | Profile name |
| AboutSection tagline | `text-xs` (12px) | Subtitle |
| AboutSection bio | `text-sm` (14px) | Bio paragraph |
| ProjectFolder title active | `text-lg` (18px) | Active folder name |
| ProjectFolder title inactive | `text-sm` (14px) | Collapsed folder name |
| ProjectFolder tech tags | `text-[10px]` | Technology badges |
| ExperienceSection title | `text-lg / md:text-xl` (18px / 20px) | Job title |
| ExperienceSection company | `text-sm` (14px) | Company name |
| ExperienceSection dates | `text-[11px]` | Date range |
| ExperienceSection bullets | `text-xs` (12px) | Job details |
| BlogSection title | `text-lg` (18px) | Blog post title |
| BlogSection date | `text-[10px]` | Date label |
| BlogSection excerpt | `text-xs` (12px) | Post preview |
| ContactSection heading | `text-2xl / md:text-3xl` (24px / 30px) | Section heading |
| ContactSection buttons | `text-sm` (14px) | Button labels |
| Project detail page `h1` | `text-3xl / md:text-5xl` (30px / 48px) | **⚠ Inconsistent** (max is 48px vs 36px in About) |
| Blog post page `h1` | `text-2xl / md:text-3xl` (24px / 30px) | Blog heading |
| CassetteWidget status | `text-[10px]` | Status label |
| End tape footer | `text-[10px]` | End-of-page marker |

### Font Weights

- **400** (regular): paragraph text
- **500**: not explicitly used anywhere
- **600**: not explicitly used anywhere
- **700** (`font-bold`): headings, titles, `.tape-label`, project stats headings

**⚠ Issue:** Weights 500 and 600 are loaded but never used.

### Line Heights

| Location | Value |
|---|---|
| `body` | `1.6` |
| AboutSection bio | `leading-[28px]` (hardcoded pixel value) |
| ExperienceSection bullets | `leading-[28px]` (hardcoded pixel value) |
| ProjectFolder description | `leading-relaxed` (1.625) |
| BlogSection excerpt | `leading-relaxed` (1.625) |
| Blog post content | `leading-relaxed` (1.625) |
| Project page features | `leading-7` (28px) |

**⚠ Issue:** `leading-[28px]` is hardcoded in two places to match the typewriter paper lines. `leading-7` (also 28px) is used in the project detail page. These should be unified under a single token.

### Letter Spacing

| Location | Value |
|---|---|
| `.typewriter-font` | `0.03em` |
| `.tape-label` | `0.2em` |
| `.retro-btn` | `0.05em` |
| HeroSection "Scroll to begin" | `tracking-[0.15em]` |
| AboutSection tagline | `tracking-[0.1em]` |
| ExperienceSection dates | `tracking-wider` (0.05em) |
| ExperienceSection separator | `tracking-[0.3em]` |
| End tape footer | `tracking-[0.3em]` |
| Project detail page headings | `tracking-widest` (0.1em) |
| CassetteWidget status | `tracking-widest` (0.1em) |
| Contact button text | `tracking-wider` (0.05em) |

**⚠ Issue:** Seven different letter-spacing values used across the project with no clear hierarchy. Should be consolidated to 3 tiers: tight, normal, wide.

### Code / Mono Fonts

All text uses the mono/typewriter fonts — no separate code font needed since the entire site is mono-themed.

---

## 2. Color System

### Design Tokens (defined in `globals.css` `@theme inline`)

| Token | Hex | Role |
|---|---|---|
| `--color-bg` | `#F5F0E8` | Main page background |
| `--color-bg-alt` | `#EBE5D9` | Alternate/darker background |
| `--color-bg-window` | `#F0EBE1` | Window body background |
| `--color-fg` | `#2C2416` | Primary text |
| `--color-fg-muted` | `#6B5E4F` | Secondary text |
| `--color-fg-faint` | `#A89882` | Tertiary / placeholder text |
| `--color-border` | `#D1C8B8` | Primary borders |
| `--color-border-light` | `#BFB5A2` | Heavier borders (naming is misleading) |
| `--color-red` | `#E63946` | Primary accent / CTA color |
| `--color-green` | `#2D8A4E` | Status — completed / positive |
| `--color-amber` | `#B8860B` | **⚠ Defined but never used** |
| `--color-card` | `#EDE8DD` | **⚠ Defined but never used** |
| `--color-titlebar` | `#DDD6C8` | Window titlebar background |
| `--color-paper` | `#FDFBF7` | Input field background |
| `--color-ink` | `#2C2416` | **⚠ Redundant** — identical to `--color-fg` |
| `--color-yellow` | `#FFB703` | Window button hover (minimize) |

### Border Token Naming Issue

**⚠ `--color-border-light` (`#BFB5A2`) is visually darker than `--color-border` (`#D1C8B8`).** The name "light" is misleading — it should be `--color-border-strong` or the values should be swapped.

### Hardcoded Colors Found Outside the System

| File | Value | What It Does |
|---|---|---|
| ExperienceSection.tsx | `rgba(44,36,22,0.15)` | Dashed separator line |
| ExperienceSection.tsx | `rgba(44,36,22,0.3)` | Separator label text |
| ExperienceSection.tsx | `rgba(44,36,22,0.15)` | Same separator (repeated) |
| Project detail page | `rgba(18,16,16,0)`, `rgba(0,0,0,0.05)`, `rgba(255,0,0,0.01)`, `rgba(0,255,0,0.01)`, `rgba(0,0,255,0.01)` | Scanline CRT overlay |
| Blog post page | `prose-invert` class | **⚠ Applies dark-theme prose styles to a light theme** |

### Unused / Redundant Tokens

| Token | Issue |
|---|---|
| `--color-card` | Never referenced in any component |
| `--color-amber` | Never referenced in any component |
| `--color-ink` | Identical to `--color-fg` (`#2C2416`) — redundant |

### Hover States

| Element | Default | Hover |
|---|---|---|
| `.retro-btn` | `bg-bg`, `text-fg`, `border-border-light` | `bg-red`, `text-white`, `border-red` |
| `.retro-window` | `border-border` | `border-border-light` |
| Navigation links | `text-fg-muted` | `text-red` |
| Profile image | `grayscale` + `brightness-125 contrast-75` | `grayscale-0` (full color) |
| Blog post title | `text-fg` | `text-red` |
| Titlebar buttons | `bg-bg-alt` | Red / Yellow / Green respectively |
| Scrollbar thumb | `bg-border-light` | `bg-fg-faint` |

### Active / Pressed States

| Element | State |
|---|---|
| `.retro-btn:active` | Shifts border to create inset/pressed look, `translate(1px, 1px)` |

### Disabled States

None defined — no disabled patterns exist in the system.

### Missing Color: `bg-red-dark`

**⚠ CassetteWidget** uses `bg-red-dark` class for the play button's active state. This token **does not exist** in the theme. Tailwind will not generate a utility for it, so it renders as transparent/no background.

---

## 3. Spacing System

### Section Spacing (Consistent)

All main page sections use: `px-1 md:px-2 mb-6`

### Container

- Main page: `max-w-7xl mx-auto pb-8 pt-24 px-2 md:px-4`
- Project detail page: `container mx-auto max-w-4xl` **⚠ Redundant** — `container` and `max-w-4xl` conflict
- Blog detail page: `max-w-3xl mx-auto`

### Window Inner Padding (Inconsistent)

| Component | Padding |
|---|---|
| AboutSection | `p-6 md:p-8` |
| BlogSection | `p-6 md:p-8` |
| ContactSection | `p-6 md:p-12` **⚠ Different** |
| ExperienceSection | `p-6 pl-14 md:p-8 md:pl-16` **⚠ Different** (intentional for paper margin) |
| Project detail | `p-6 md:p-10` **⚠ Different** |

### Button Padding (Inconsistent)

| Location | Padding |
|---|---|
| `.retro-btn` base | `8px 16px` (CSS) |
| About buttons | `px-4 py-2` (Tailwind override) |
| Contact buttons | `py-4 px-6` **⚠ Much larger** |
| Cassette transport | `px-3 py-1.5` (small), `px-5 py-1.5` (play) |

### Gap Values Used

`gap-2`, `gap-3`, `gap-4`, `gap-6`, `gap-8` — reasonable scale within Tailwind defaults.

### Arbitrary Spacing

- `bottom-16` on HeroSection extra content
- `mb-6`, `mb-8`, `mb-10`, `mt-4`, `mt-5`, `mt-6`, `mt-8`, `mt-12` — varied margins across sections

---

## 4. Layout System

### Container Structure

```
<html>
  <body>
    <HeroSection /> (fixed header, shrinks on scroll)
    <main class="max-w-7xl mx-auto pb-8 pt-24 px-2 md:px-4">
      <AboutSection />     → <RetroWindow>
      <ProjectsSection />  → <RetroWindow>
      <ExperienceSection />→ <RetroWindow>
      <BlogSection />      → <RetroWindow>
      <ContactSection />   → <RetroWindow>
      <footer />
    </main>
  </body>
</html>
```

### Max Widths

| Page | Max Width |
|---|---|
| Home | `max-w-7xl` (80rem / 1280px) |
| Project detail | `max-w-4xl` (56rem / 896px) |
| Blog detail | `max-w-3xl` (48rem / 768px) |

### Breakpoints

Only `md:` (768px) is used. No `sm:`, `lg:`, or `xl:` breakpoints.

### Grid System

- Project detail page: `grid md:grid-cols-3 gap-8` (content 2/3, sidebar 1/3)
- All other layouts use `flex` exclusively

### Responsive Strategy

- Mobile-first with single `md:` breakpoint
- Hero: stacked on mobile, same on desktop (centered)
- About: `flex-col md:flex-row` 
- Contact buttons: `flex-col md:flex-row`
- All retro windows are full-width within the container

---

## 5. Component Design Patterns

### RetroWindow (Reusable Shell)

**Variants:** `normal` (default), `terminal`, `notepad`

| Variant | Titlebar Color | Body Style | Label |
|---|---|---|---|
| `normal` | `text-fg-muted` | Default | "exe" |
| `terminal` | `text-green` | `bg-bg font-mono` | "bash" |
| `notepad` | `text-fg-muted` | Default | "txt" |

**⚠ Issues:**
- `notepad` variant never uses its `menuItems` prop in practice
- `terminal` variant is never used by any section

**Animation:** Spring entrance — `stiffness: 350, damping: 28, duration: 0.25`

### Buttons (`.retro-btn`)

**Base style:** Mono font, 12px, border with bottom/right shadow for 3D look  
**Hover:** Red background, white text  
**Active:** Inverted borders (pressed state), 1px translate  
**⚠ Inconsistency:** Contact buttons have significantly larger padding (`py-4 px-6`) vs standard (`8px 16px`)

### Cards / Project Folders

**Style:** `border border-border bg-bg-window` with expand/collapse accordion  
**Hover:** `hover:border-border-light`  
**Active state:** Title turns red, chevron rotates 90°

### Tape Label

**Style:** Uppercase, 9px, 0.2em letter-spacing, dashed border, mono font

### CassetteWidget

**Style:** Gradient body (`bg-alt → bg`), 8px border-radius, dashed border  
**⚠ Issues:**
- `bg-red-dark` class is undefined
- `inset-shadow` class is non-standard
- Imports 5 Tabler player icons but uses inline SVGs instead

### TypewriterText

**Props:** `text`, `delay`, `speed`, `cursorColor`, `showCursor`, `mute`  
**Cursor:** Red blinking underscore (`_`), 1s step-end blink

### CRTOverlay

**Current state:** Completely invisible — CSS sets both `crt-scanlines` and `crt-vignette` to `background: none`. The component is only used on the blog detail page, where it renders an invisible overlay.

---

## 6. Animation System

### Library: Framer Motion v12

### Spring Configurations (Inconsistent)

| Component | Stiffness | Damping | Duration |
|---|---|---|---|
| RetroWindow | 350 | 28 | 0.25 |
| ExperienceSection entries | 400 | 30 | 0.15 |
| ProjectFolder entrance | — | — | 0.3 (no spring) |
| Project accordion expand | — | — | 0.3, ease: "easeInOut" |
| Blog post page article | — | — | 0.5 (no spring) |
| AboutSection name | — | — | 0.01 (near instant) |

**⚠ Issue:** Three different spring configurations and multiple non-spring transitions with varying durations. Should standardize.

### CSS Keyframe Animations

| Name | Duration | Timing | Used By |
|---|---|---|---|
| `cursor-blink` | 1s | step-end | TypewriterText cursor |
| `reel-spin` | 3s | linear | HeroSection cassette reels |
| `reel-slow` | 6s | linear | HeroSection + ExperienceSection reels |
| `crt-flicker` | 10s | linear | CRTOverlay (invisible) |
| `keystrike` | — | — | **⚠ Never used** |
| `tape-scroll` | — | — | **⚠ Never used** |

### Hover Animations

- Profile image: `transition-all duration-500` (grayscale to color)
- Blog border-left: `transition-colors` (default 150ms)
- Blog "READ_ENTRY": `transition-all duration-300` with translate
- Folder icon color: `transition-colors duration-150`
- Back button arrow: `transition-transform` (default 150ms)

### Scroll Animations

- `whileInView` used on: RetroWindow, ProjectFolder, ExperienceSection entries, AboutSection name
- `viewport={{ once: true }}` on ProjectFolder
- `viewport={{ once: false }}` on RetroWindow, ExperienceSection, AboutSection — **⚠ Inconsistent** `once` values

---

## 7. Shadows, Borders, and Effects

### Border Radius Scale

| Element | Value |
|---|---|
| Title bar buttons | `border-radius: 50%` (circles) |
| `.cassette-body` | `border-radius: 8px` |
| Tape window | `rounded` (4px) |
| Felt pad | `rounded-sm` (2px) |
| Architecture box | `rounded` (4px) |
| Everything else | 0 (sharp corners — intentional retro) |

### Shadow Scale

| Element | Shadow |
|---|---|
| `.retro-btn` | Bottom/right border trick (no box-shadow) |
| `.retro-input:focus` | `box-shadow: 0 0 0 1px var(--color-red)` (focus ring) |
| No other shadows used | — |

### Backdrop / Blur Effects

None used.

### Gradients

| Element | Gradient |
|---|---|
| `.cassette-body` | `linear-gradient(180deg, bg-alt 0%, bg 100%)` |
| Project page scanlines | `linear-gradient(...)` for CRT effect |

### Opacity Patterns

- `opacity-50` on: ExperienceSection reel, project page ASCII art, cassette felt pad
- `opacity-30` on: project page scanline overlay
- `opacity-0.8` on: cassette SVG reel tape bulk

---

## 8. Iconography

### Library: `@tabler/icons-react` v3.36.1

### Icons Used

| Icon | Size | Location |
|---|---|---|
| `IconExternalLink` | 14 | ProjectsSection, Project detail |
| `IconBrandGithub` | 14 | ProjectsSection, Project detail |
| `IconArrowRight` | **10** | BlogSection **⚠ Smaller** |
| `IconArrowLeft` | 14 | Project detail, Blog detail |
| `IconServer` | 14 | Project detail |
| `IconDeviceAnalytics` | **48** | Project detail placeholder (intentionally large) |

### Unused Imports

| Icon | File |
|---|---|
| `IconCode` | Project detail page — imported but never used |
| `IconMail` | ContactSection — imported but never used |
| `IconBrandLinkedin` | ContactSection — imported but never used |
| `IconBrandGithub` | ContactSection — imported but never used |
| `IconPlayerPlayFilled` | CassetteWidget — imported but never used |
| `IconPlayerPauseFilled` | CassetteWidget — imported but never used |
| `IconPlayerStopFilled` | CassetteWidget — imported but never used |
| `IconPlayerTrackNextFilled` | CassetteWidget — imported but never used |
| `IconPlayerTrackPrevFilled` | CassetteWidget — imported but never used |

**⚠ 9 unused icon imports** across 3 files increase bundle size unnecessarily.

### Icon Size Consistency

Standard inline icon size: **14px**  
**⚠ Exception:** `IconArrowRight` at 10px in BlogSection.

---

## 9. Identified Design Inconsistencies

### 9.1 Typography Inconsistencies

#### T1: Missing Font Loading — `Special Elite`
- **File:** [src/app/globals.css](src/app/globals.css) (line defining `--font-display`), [src/app/layout.tsx](src/app/layout.tsx)
- **Problem:** `"Special Elite"` is declared in `--font-display` but never loaded. All `.typewriter-font` text falls back to `"Courier New"`.
- **Why it breaks consistency:** The intended typewriter aesthetic is lost; users see a generic monospace font.
- **Fix:** Load `Special Elite` via `next/font/google` in `layout.tsx`.

#### T2: Blog Post Page Uses `font-sans`
- **File:** [src/app/blog/[slug]/page.tsx](src/app/blog/%5Bslug%5D/page.tsx#L20)
- **Problem:** Blog post page body has `font-sans` class, breaking the mono/typewriter theme.
- **Why it breaks consistency:** Every other page uses `--font-mono`. This page looks out of place.
- **Fix:** Remove `font-sans` class.

#### T3: Inconsistent H1 Sizes Across Pages
- **Files:** AboutSection (`text-3xl md:text-4xl`), Project detail (`text-3xl md:text-5xl`), Blog post (`text-2xl md:text-3xl`)
- **Problem:** Three different max heading sizes for the same semantic level.
- **Why it breaks consistency:** No clear heading hierarchy across pages.
- **Fix:** Standardize to `text-3xl md:text-4xl` for all page-level H1s.

#### T4: Inconsistent Letter Spacing
- **Files:** Multiple components
- **Problem:** 7+ different letter-spacing values with no clear scale.
- **Fix:** Standardize to 3 tiers: `tracking-wide` (0.025em), `tracking-wider` (0.05em), `tracking-[0.2em]` (labels).

### 9.2 Color Inconsistencies

#### C1: Undefined `bg-red-dark` Class
- **File:** [src/components/CassetteWidget.tsx](src/components/CassetteWidget.tsx#L131)
- **Problem:** `bg-red-dark` is used but not defined in the theme. Renders as no background.
- **Why it breaks consistency:** Active play button loses its visual state.
- **Fix:** Replace with `bg-red/80` or define the token.

#### C2: Hardcoded RGBA Values
- **File:** [src/components/ExperienceSection.tsx](src/components/ExperienceSection.tsx#L73-L82)
- **Problem:** `rgba(44,36,22,0.15)` and `rgba(44,36,22,0.3)` used inline instead of design tokens.
- **Why it breaks consistency:** Changes to `--color-fg` won't cascade to these values.
- **Fix:** Replace with `border-fg/15` and `text-fg/30` (Tailwind opacity modifiers).

#### C3: `prose-invert` on Light Theme
- **File:** [src/app/blog/[slug]/page.tsx](src/app/blog/%5Bslug%5D/page.tsx#L42)
- **Problem:** `prose-invert` applies dark-mode prose typography colors to a light-theme page.
- **Why it breaks consistency:** Text colors conflict with the warm paper palette.
- **Fix:** Remove `prose-invert`.

#### C4: Redundant `--color-ink` Token
- **File:** [src/app/globals.css](src/app/globals.css#L17)
- **Problem:** `--color-ink` (`#2C2416`) is identical to `--color-fg`. Used in ExperienceSection and AboutSection via inline styles.
- **Why it breaks consistency:** Two names for the same value; inline styles bypass Tailwind.
- **Fix:** Remove `--color-ink`, use `text-fg` Tailwind class instead of inline `style`.

#### C5: Unused Color Tokens
- **File:** [src/app/globals.css](src/app/globals.css)
- **Problem:** `--color-card` and `--color-amber` are defined but never used.
- **Fix:** Remove them to reduce noise.

#### C6: Misleading `--color-border-light` Naming
- **File:** [src/app/globals.css](src/app/globals.css)
- **Problem:** `--color-border-light` (`#BFB5A2`) is visually **darker** than `--color-border` (`#D1C8B8`). The name suggests the opposite.
- **Fix:** Rename to `--color-border-strong`.

### 9.3 Spacing Inconsistencies

#### S1: Contact Button Padding
- **File:** [src/components/ContactSection.tsx](src/components/ContactSection.tsx#L23)
- **Problem:** Contact buttons use `py-4 px-6` while all other retro-btns use the base `8px 16px` or `px-4 py-2`.
- **Fix:** Use `py-3 px-5` for a middle ground that keeps them prominent without being outsized.

#### S2: Inconsistent Window Content Padding
- **Files:** Contact (`md:p-12`), Project detail (`md:p-10`), About/Blog (`md:p-8`)
- **Problem:** Different max padding across windows of the same type.
- **Fix:** Standardize to `p-6 md:p-8` for all RetroWindow content areas.

### 9.4 Animation Inconsistencies

#### A1: Inconsistent Spring Parameters
- **Files:** RetroWindow (350/28), ExperienceSection (400/30)
- **Problem:** Two different spring configs for similar entrance animations.
- **Fix:** Standardize to `stiffness: 350, damping: 28` across all components.

#### A2: Inconsistent `viewport.once` Values
- **Files:** RetroWindow (`once: false`), ProjectFolder (`once: true`), ExperienceSection (`once: false`)
- **Problem:** Some animations replay on re-entering viewport, others don't.
- **Fix:** Standardize to `once: true` — repeating entrance animations is distracting.

#### A3: Unused CSS Keyframes
- **File:** [src/app/globals.css](src/app/globals.css)
- **Problem:** `keystrike` and `tape-scroll` keyframes are defined but never used.
- **Fix:** Remove them.

### 9.5 Code Quality Issues

#### Q1: Unused Icon Imports
- **Files:** CassetteWidget.tsx (5 icons), ContactSection.tsx (3 icons), Project detail page (1 icon)
- **Problem:** 9 imported icons are never used in JSX.
- **Fix:** Remove all unused imports.

#### Q2: Container Redundancy
- **File:** [src/app/projects/[id]/page.tsx](src/app/projects/%5Bid%5D/page.tsx#L21)
- **Problem:** Uses `container mx-auto max-w-4xl` — `container` and `max-w-4xl` both set max-width, potentially conflicting.
- **Fix:** Remove `container`, keep `max-w-4xl mx-auto`.

#### Q3: CRTOverlay Is A No-Op
- **File:** [src/components/CRTOverlay.tsx](src/components/CRTOverlay.tsx), [src/app/globals.css](src/app/globals.css)
- **Problem:** `crt-scanlines` and `crt-vignette` both have `background: none`. The overlay renders nothing visible.
- **Fix:** Remove CRTOverlay import from blog page since it does nothing.

#### Q4: Mixed Styling — Inline `style` vs Tailwind
- **Files:** ExperienceSection.tsx, AboutSection.tsx
- **Problem:** `style={{ color: "var(--color-ink)" }}` used alongside Tailwind classes. Mixes two approaches.
- **Fix:** Replace inline styles with `text-fg` Tailwind class (since `--color-ink` = `--color-fg`).

---

## 10. Public Assets

| File | Type | Used By |
|---|---|---|
| `profile pic wo bg.png` | Image | AboutSection (profile photo) |
| `resume.pdf` | Document | AboutSection download button |
| `file.svg` | Icon | Not referenced in code |
| `globe.svg` | Icon | Not referenced in code |
| `next.svg` | Icon | Not referenced in code |
| `vercel.svg` | Icon | Not referenced in code |
| `window.svg` | Icon | Not referenced in code |

**⚠** 5 SVG files in `/public` are Next.js defaults and not used by the portfolio.

---

## 11. Scrollbar & Selection Styling

### Scrollbar (WebKit)
- Width: 10px
- Track: `--color-bg`, left border
- Thumb: `--color-border-light`, hover `--color-fg-faint`

### Text Selection
- Background: `--color-red`
- Text: white

### Custom Cursor
- Default: Black SVG arrow cursor
- Interactive: Red SVG arrow cursor

---

## 12. Summary of Design Token Usage

### Well-Used Tokens
`--color-bg`, `--color-bg-alt`, `--color-bg-window`, `--color-fg`, `--color-fg-muted`, `--color-fg-faint`, `--color-border`, `--color-border-light`, `--color-red`, `--color-green`, `--color-titlebar`, `--color-yellow`

### Underused / Problematic Tokens
| Token | Status |
|---|---|
| `--color-card` | Never used — remove |
| `--color-amber` | Never used — remove |
| `--color-ink` | Redundant (= `--color-fg`) — remove |
| `--color-paper` | Only used in `.retro-input` — keep |
| `--color-border-light` | Misleadingly named — rename |

---

*End of Design System Documentation*
