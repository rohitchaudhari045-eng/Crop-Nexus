---
name: Crop Nexus Design System
description: Impeccable agricultural technology design system built on high-contrast organic earth and foliage tones, precise technical typography, and restrained functional layouts.

colors:
  primary: "#14532d"          # Deep forest green (WCAG AA compliant against white/light backgrounds)
  primary-hover: "#052e16"    # Darker spruce green
  accent-leaf: "#166534"      # Leaf green for interactive highlights
  accent-earth: "#854d0e"     # Warm amber / raw sienna for advisories and notices
  surface-ground: "#f8fafc"   # Clean warm-tinted slate neutral ground
  surface-card: "#ffffff"     # Solid card ground
  surface-inset: "#f1f5f9"    # Table headers, insets, and subtle control backgrounds
  border-hairline: "#e2e8f0"  # Subtle 1px structural borders
  border-active: "#166534"    # Active focus and boundary highlight
  text-headline: "#0f172a"    # Deep slate near-black (≥12:1 contrast)
  text-body: "#1e293b"        # High-contrast body text (≥9:1 contrast)
  text-muted: "#475569"       # Captions and secondary metadata (≥4.5:1 contrast, never washed-out gray)
  status-submitted: "#1d4ed8" # Blue 700
  status-scheduled: "#b45309" # Amber 700
  status-verified: "#15803d"  # Green 700
  status-alert: "#b91c1c"     # Red 700

typography:
  display:
    fontFamily: "Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.5rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.35
  body:
    fontFamily: "Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: "Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  meta:
    fontFamily: "Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
  mono:
    fontFamily: "JetBrains Mono, SFMono-Regular, Roboto Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 500

rounded:
  sm: "6px"
  md: "10px"
  lg: "16px"
  pill: "9999px"

spacing:
  xs: "6px"
  sm: "12px"
  md: "20px"
  lg: "32px"
  xl: "48px"

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.text-headline}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
  card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.text-body}"
    rounded: "{rounded.lg}"
    padding: "24px"
---

# Design System: Crop Nexus (Impeccable)

## Overview
Crop Nexus is an operational agricultural governance and farmer assistance platform. It rejects generic AI SaaS templates—banning floating cards-inside-cards, artificial eyebrow chips, identical icon-box stacks, decorative glowing halos, and washed-out low-contrast gray text.

Instead, Crop Nexus embraces **Impeccable's craft floor**:
- High-contrast typography optimized for both outdoor sunlight and desktop revenue office lighting.
- Strict WCAG AA compliance (≥4.5:1 body text contrast, ≥3:1 large headings).
- No functional UI text below 11px. Body text set at 14px–16px with `text-wrap: pretty` to eliminate orphaned single words.
- Purposeful layout structure: flat hierarchy with clear dividers, inline icon pairings instead of artificial rounded-square icon tiles, and distinct spacing groups.
- Official printable `@media print` styling for provisional e-Panchanama draft reports.

## Colors
- **Forest Green (`#14532d`)**: Core brand anchor representing lush, healthy agricultural canopy. Used for primary buttons, active tabs, and primary status indicators.
- **Leaf Green (`#166534`)**: Midtone green for verified badges and secondary emphasis.
- **Amber Earth (`#854d0e`)**: Earthy amber for meteorological notices, crop stress advisories, and pending states.
- **Deep Slate (`#0f172a` / `#1e293b`)**: High-contrast text surfaces ensuring clarity without harsh pure black.
- **Backgrounds (`#f8fafc` / `#ffffff`)**: Crisp, warm slate neutrals with 1px border lines (`#e2e8f0`). Never use gray text on colored backgrounds.

## Typography
- **Font Families**: Plus Jakarta Sans for headings and UI controls; JetBrains Mono for plot coordinates, survey numbers, and claim references.
- **Strict Hierarchy**:
  - `h1`: 36px–56px, bold, tight leading (1.1).
  - `h2`: 24px–32px, bold, comfortable leading (1.25).
  - `h3`: 18px–20px, semi-bold, leading (1.35).
  - Body: 14px–16px with relaxed 1.6 leading and `text-wrap: pretty`.
  - Captions/Metadata: 12px, font-semibold (minimum 11px floor).
- **No Eyebrows / Kickers**: Headings carry their own context. Never place a tiny uppercase pill or chip directly above a heading.

## Layout
- **Container Measures**: Centered max-w-7xl with responsive gutters (px-4 to px-8).
- **Measure Rule**: Reading paragraphs held between 50ch and 72ch to prevent fatigue.
- **Flat Layouts**: Replace nested card enclosures with flat section groupings, horizontal borders, and clear semantic tables.

## Elevation & Depth
- **Soft Realistic Shadows**: Shadows use subtle Y-offsets with gentle diffusion (e.g. `0 1px 3px rgba(0,0,0,0.05)`).
- **No Colored Halos**: Zero-offset colored glow rings are prohibited.
- **Borders**: Clean 1px hairlines (`border border-slate-200`) ground every panel.

## Shapes
- Buttons and inputs: Rounded 10px (`rounded-xl`).
- Structural surface panels: Rounded 16px (`rounded-2xl`).
- Badges: Pill shaped (`rounded-full`) with solid text and border definition.

## Components
- **Buttons**: Clear visual weight. Primary button uses solid forest green with white text; secondary button uses neutral border with crisp dark text. Both feature visible keyboard focus rings.
- **Form Controls**: Distinct 1px borders, high-contrast labels above inputs, generous touch targets (≥42px height).
- **Status Badges**: High contrast text with solid background and border, never low-contrast pastel washouts.
- **Tables**: Clean border-collapse layouts with muted header fills and clear row dividers.

## Do's and Don'ts
### Do
- Do maintain WCAG AA contrast (≥4.5:1) for all text and icons.
- Do keep functional UI text at or above 11px.
- Do integrate icons in natural inline flow with titles rather than boxing them in artificial 48x48 icon tiles.
- Do provide clear focus rings (`focus-visible:ring-2 focus-visible:ring-offset-2`) for accessibility.
- Do theme browser surfaces (selection color, scrollbars, caret).

### Don't
- Don't use eyebrow chips, kickers, or pill labels directly above headlines.
- Don't use thick left-side borders (`border-l-4`) on cards or alerts.
- Don't nest cards inside cards.
- Don't use text gradients or wavy decorative underlines.
- Don't use low-contrast text (#64748b on dark backgrounds or white on bright mint).
- Don't skip heading levels (e.g. jumping from h2 to h4).
