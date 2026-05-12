---
name: Viandas Chanetón Design System
colors:
  surface: '#fff8f5'
  surface-dim: '#f6d4b6'
  surface-bright: '#fff8f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff1e7'
  surface-container: '#ffeada'
  surface-container-high: '#ffe3cc'
  surface-container-highest: '#ffdcbe'
  on-surface: '#291806'
  on-surface-variant: '#4d4632'
  inverse-surface: '#412c18'
  inverse-on-surface: '#ffeee1'
  outline: '#7f775f'
  outline-variant: '#d0c6ab'
  surface-tint: '#705d00'
  primary: '#705d00'
  on-primary: '#ffffff'
  primary-container: '#ffd600'
  on-primary-container: '#705d00'
  inverse-primary: '#e9c400'
  secondary: '#006e1c'
  on-secondary: '#ffffff'
  secondary-container: '#98f994'
  on-secondary-container: '#0c7521'
  tertiary: '#b02e00'
  on-tertiary: '#ffffff'
  tertiary-container: '#ffcec1'
  on-tertiary-container: '#b02e00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffe170'
  primary-fixed-dim: '#e9c400'
  on-primary-fixed: '#221b00'
  on-primary-fixed-variant: '#544600'
  secondary-fixed: '#98f994'
  secondary-fixed-dim: '#7ddc7a'
  on-secondary-fixed: '#002204'
  on-secondary-fixed-variant: '#005313'
  tertiary-fixed: '#ffdbd1'
  tertiary-fixed-dim: '#ffb5a0'
  on-tertiary-fixed: '#3b0900'
  on-tertiary-fixed-variant: '#872100'
  background: '#fff8f5'
  on-background: '#291806'
  surface-variant: '#ffdcbe'
typography:
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
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
  gutter: 16px
  margin: 20px
---

## Brand & Style

The visual identity of this design system is built to evoke the sensory experience of a traditional Argentine neighborhood rotisserie: the warmth of a roasting spit, the freshness of local ingredients, and the welcoming atmosphere of a family-run shop. It targets local residents seeking comfort and quality through "viandas" (prepared meals).

The design style is **Modern-Tactile**. It avoids the clinical coldness of flat minimalism in favor of soft, organic depth, warm-tinted surfaces, and vibrant color transitions. The UI should feel as approachable and reliable as a favorite neighborhood cook, blending contemporary usability with a rustic, homemade soul.

## Colors

The palette is derived directly from the energetic heritage of the brand. It utilizes a high-energy **Bright Yellow** as the primary driver for attention and appetite. **Fresh Green** serves as the secondary color, emphasizing the quality of ingredients and balanced meals. **Deep Orange** is used for accents and calls to action, mirroring the tones of perfectly roasted meats.

To maintain a "homemade" feel, the background is a soft **Warm Cream** rather than a pure white. Gradients should be used sparingly but effectively on primary surfaces, transitioning from orange to yellow to mimic a flame or a glowing oven. Text and structural elements use a **Deep Umber** instead of pure black to keep the interface feeling organic and warm.

## Typography

This design system uses a pairing of two friendly, modern sans-serifs. **Plus Jakarta Sans** is used for headlines and UI labels; its soft curves and geometric clarity make it highly legible and optimistic. **Be Vietnam Pro** is selected for body copy and descriptions, providing a contemporary and warm reading experience that remains clear even on small mobile screens.

Headlines should use tight line heights and heavy weights to create a bold, "billboard" effect reminiscent of hand-painted shop signs, while body text remains airy to ensure readability for daily menu updates.

## Layout & Spacing

The layout follows a **Fixed Grid** model on desktop (max-width 1200px) to provide a grounded, structured feel. On mobile, it utilizes a fluid system with generous 20px side margins to ensure the interface doesn't feel cramped.

The spacing rhythm is based on an 8px scale. To reinforce the "welcoming" nature of the brand, we prioritize internal padding over external margins, making containers feel "full" and generous, much like a well-packed food container. Elements are grouped in logical clusters to represent menu categories and daily specials.

## Elevation & Depth

This design system avoids harsh, technical shadows. Instead, it uses **Ambient Warm Shadows**—soft, diffused drop shadows that use a slight orange or brown tint rather than neutral gray. This makes elements appear as if they are sitting on a kitchen counter under warm lighting.

Hierarchy is also established through **Tonal Layering**. The base background is the Warm Cream color, while primary interactive cards use a pure White surface to pop. Subtle inner glows or very low-contrast outlines in a light tan color are used to define the edges of input fields and containers without creating visual noise.

## Shapes

The shape language is consistently **Rounded**. A 0.5rem (8px) corner radius is the standard for cards and inputs, providing a soft, approachable aesthetic that avoids the aggression of sharp corners.

Buttons and specific callouts (like "Daily Special" tags) use a more aggressive **Pill-shape** to stand out and feel more playful. Photography should also follow these rounding rules, ensuring that food imagery feels integrated into the friendly UI wrapper.

## Components

### Buttons
Primary buttons use the Bright Yellow to Deep Orange gradient with dark brown text. They should feel "squishy" and interactive, utilizing a subtle lift effect on hover. Secondary buttons use a simple green outline.

### Cards
Product cards are the core of this design system. They feature a large image area at the top, a 0.5rem rounded corner, and a subtle warm shadow. Content is centered or left-aligned with a focus on the price and "Add" button.

### Chips & Badges
Used for food categories (e.g., "Gluten-Free," "Today's Special"). These are pill-shaped with high-contrast background colors (Green for fresh/healthy, Orange for spicy/hot).

### Input Fields
Inputs use a thick 2px border in a light tan color that transitions to Green when focused. This provides clear feedback and a sturdy, "physical" feel.

### Lists
Menu lists should use generous vertical padding (16px+) and be separated by soft, dashed lines to mimic a traditional paper order pad or chalkboard menu.

### Additional Components
- **Menu Toggles:** Large, tactile switches for choosing between "Pickup" and "Delivery."
- **Quantity Pickers:** Large "+" and "-" buttons to ensure easy use even while the user might be busy in the kitchen.