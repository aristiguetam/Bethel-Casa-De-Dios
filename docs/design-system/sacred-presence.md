---
name: Sacred Presence
colors:
  surface: '#f9f9fc'
  surface-dim: '#dadadd'
  surface-bright: '#f9f9fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f6'
  surface-container: '#eeedf1'
  surface-container-high: '#e8e8eb'
  surface-container-highest: '#e2e2e5'
  on-surface: '#1a1c1e'
  on-surface-variant: '#42474e'
  inverse-surface: '#2f3033'
  inverse-on-surface: '#f1f0f4'
  outline: '#72777e'
  outline-variant: '#c2c7ce'
  surface-tint: '#396285'
  primary: '#00263f'
  on-primary: '#ffffff'
  primary-container: '#0b3c5d'
  on-primary-container: '#7fa7cd'
  inverse-primary: '#a3cbf2'
  secondary: '#735c00'
  on-secondary: '#ffffff'
  secondary-container: '#fed65b'
  on-secondary-container: '#745c00'
  tertiary: '#222424'
  on-tertiary: '#ffffff'
  tertiary-container: '#37393a'
  on-tertiary-container: '#a2a3a3'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cee5ff'
  primary-fixed-dim: '#a3cbf2'
  on-primary-fixed: '#001d32'
  on-primary-fixed-variant: '#1f4a6c'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#f9f9fc'
  on-background: '#1a1c1e'
  surface-variant: '#e2e2e5'
typography:
  h1:
    fontFamily: Noto Serif
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
  h2:
    fontFamily: Noto Serif
    fontSize: 36px
    fontWeight: '600'
    lineHeight: '1.3'
  h3:
    fontFamily: Noto Serif
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1200px
  gutter: 24px
---

## Brand & Style

The brand personality for this design system is rooted in the concept of "Sacred Hospitality." It balances the weight of tradition with a modern, accessible approach to community. The target audience includes multi-generational families seeking spiritual depth and a sense of belonging.

The design style follows a **Modern / Minimalist** approach with editorial influences. It utilizes generous whitespace to evoke a sense of peace and clarity, allowing spiritual content to breathe. The visual language is structured and professional, yet softened by warm color accents and humanist typography to ensure the interface feels approachable and community-focused rather than institutional.

## Colors

The color palette is designed to evoke trust and transcendence. **Deep Blue** serves as the foundation, representing stability, depth, and the infinite. **Gold** is used as a purposeful accent to highlight sacred moments, calls to action, and key highlights, symbolizing light and value.

**White** and **Light Gray** form the background layers, maintaining a clean and airy feel. **Dark Gray** is reserved for primary text to ensure high legibility while appearing softer and more organic than pure black. The color mode is strictly light-first to maintain a welcoming, daytime-sanctuary atmosphere.

## Typography

This design system employs a sophisticated typographic pairing to bridge the gap between the ancient and the contemporary.

**Noto Serif** is utilized for all headings. Its timeless, literary character provides an authoritative and spiritual tone. **Plus Jakarta Sans** is used for body copy and interface elements; its soft, rounded terminals and modern proportions make long-form reading effortless and feel inherently optimistic. For labels and small metadata, uppercase styling with slight letter-spacing is encouraged to maintain a professional, organized hierarchy.

## Layout & Spacing

The layout philosophy relies on a **Fixed Grid** system for desktop to create a sense of order and centeredness, mirroring the architecture of a sanctuary. On mobile devices, the layout transitions to a fluid model with generous side margins (24px) to ensure content does not feel cramped.

The spacing rhythm is built on an 8px base unit. Larger "breathable" increments (48px and 80px) are used between major sections to reinforce the minimalist aesthetic and prevent the UI from feeling cluttered. Vertical rhythm should prioritize white space over decorative dividers whenever possible.

## Elevation & Depth

To maintain a grounded and professional feel, this design system uses **Tonal Layers** combined with **Ambient Shadows**.

Depth is primarily communicated through subtle shifts in background color (e.g., placing a White card on a Light Gray background). Where elevation is required—such as for buttons or featured event cards—use soft, highly diffused shadows with a low opacity (5-10%). These shadows should have a slight Deep Blue tint to integrate with the brand palette, avoiding "dirty" gray shadows. Avoid heavy blurs or glassmorphism to keep the focus on the content and community.

## Shapes

The shape language for this design system is **Rounded**. A base radius of 0.5rem (8px) is applied to standard components like input fields and buttons. For larger containers like cards and image wrappers, a radius of 1rem (16px) is preferred.

This level of roundedness strikes a balance: it is soft enough to feel welcoming and "human," but structured enough to feel professional and reliable. Circular shapes are reserved exclusively for avatars and specific iconography to signify community and wholeness.

## Components

### Buttons
Primary buttons use a Deep Blue background with White text, representing strength. Secondary buttons use a Gold outline with Deep Blue text to draw attention without overpowering the page.

### Cards
Cards are the primary vehicle for sermons and events. They should feature a White background, a subtle ambient shadow, and a 16px corner radius. A thin Gold top-border can be used to denote "Featured" or "Live" status.

### Input Fields
Inputs use a Light Gray fill with a subtle 1px border. Focus states transition the border to Deep Blue. Labels are always placed above the field in the semi-bold Sans-serif font.

### Chips & Tags
Used for ministry categories (e.g., "Youth," "Missions"). Use a soft Gold background with a low opacity and dark-gold text to maintain a warm, glowing appearance.

### Specialized Components
- **Sermon Player:** A minimal audio/video bar fixed to the bottom of the screen or embedded in cards, using Deep Blue for controls.
- **Donation Progress:** A clean, horizontal track using Gold to represent the "light" of the contribution.
- **Community List:** High-density lists for church directories or volunteer groups, using generous horizontal padding and subtle dividers.
