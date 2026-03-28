```markdown
# Design System Specification: The Submerged Sanctuary

## 1. Overview & Creative North Star
This design system is built upon the Creative North Star of **"The Submerged Sanctuary."** Unlike traditional meditation apps that rely on flat, clinical minimalism, this system treats the interface as a three-dimensional liquid environment. We prioritize depth, weightlessness, and light diffusion to evoke a sense of being underwater or within a vast, starlit space.

To break the "template" look, we abandon rigid grids in favor of **Intentional Asymmetry**. Elements should feel like they are floating or drifting, utilizing overlapping surfaces and high-contrast typography scales (e.g., a massive `display-lg` title paired with a tiny, spacious `label-md`) to create an editorial, premium feel that prioritizes focus over utility.

---

## 2. Colors & Surface Philosophy
The palette avoids the harshness of pure black or white, opting for a "Soft Dark" foundation that mimics the transition from twilight to deep night.

### Surface Hierarchy & Nesting
We reject the concept of a flat UI. Surfaces must be treated as physical layers—stacked sheets of frosted glass. 
- **Base Ground:** Use `surface` (`#0b0d1e`) for the primary background.
- **Nesting Logic:** Create depth by stacking. A `surface-container-low` (`#0f1227`) section should house cards using `surface-container-high` (`#1a1d3a`). This "step-up" in brightness naturally guides the eye without requiring lines.

### The "No-Line" Rule
**Explicit Instruction:** 1px solid borders are strictly prohibited for sectioning or containment. 
- Boundaries are defined solely through background shifts (e.g., a `surface-container-lowest` card on a `surface-container-low` background).
- If separation is needed, use the **Spacing Scale** (e.g., a `10` or `12` gap) to let whitespace act as the divider.

### The "Glass & Gradient" Rule
To add visual "soul," primary actions and hero moments must use subtle gradients.
- **CTA Textures:** Transition from `primary` (`#b4b5ff`) to `primary-container` (`#a5a6f7`) at a 45-degree angle.
- **Glassmorphism:** For floating overlays (like navigation bars or player controls), use `surface-variant` (`#1f2344`) at 60% opacity with a `20px` backdrop-blur. This allows the soft pastels of the background to bleed through, maintaining a sense of place.

---

### 3. Typography: Editorial Intent
We use **Manrope** exclusively. Its geometric yet warm construction provides the "Clean Sans-Serif" required for a modern, premium feel.

- **The Power of Scale:** Use `display-lg` (`3.5rem`) for introspective prompts or "Welcome" states. Pair this with a `body-md` (`0.875rem`) for subtext to create a sophisticated, high-end editorial hierarchy.
- **Breathing Room:** All typography must utilize a generous line-height (minimum 1.6x for body text). This prevents the "cluttered" feeling common in data-heavy apps.
- **Weight Strategy:** Stick to `medium` for headlines and `regular` for body. Avoid `bold` weights, as they introduce unnecessary visual "noise" and aggression into a peaceful environment.

---

## 4. Elevation & Depth
In this system, elevation is a product of **Tonal Layering**, not structural shadows.

- **The Layering Principle:** Place a `surface-container-lowest` (`#000000`) element on a `surface-container-low` (`#0f1227`) section to create a soft, natural "sink" or "lift."
- **Ambient Shadows:** When an element must float (e.g., a modal), use a shadow tinted with `on-surface` (`#e3e3ff`) at 6% opacity. Set the blur to at least `32px` to mimic natural, ambient light diffusion.
- **The "Ghost Border" Fallback:** If a border is required for accessibility, use the `outline-variant` (`#414569`) at **15% opacity**. Never use 100% opaque lines.
- **Glassmorphism:** Use `surface-bright` (`#24294f`) for frosted containers. The subtle blue-tinted transparency ensures the UI feels "airy" rather than heavy.

---

## 5. Components

### Buttons & Chips
- **Primary Button:** High-pill shape (`rounded-full`). Gradient of `primary` to `primary-container`. Typography: `title-sm`. No shadow; let the color glow against the `surface`.
- **Secondary/Ghost Button:** No background. Use `on-surface` text with a "Ghost Border" (15% opacity `outline-variant`).
- **Selection Chips:** Use `secondary-container` (`#002d0b`) for unselected and `secondary` (`#90d792`) with `on-secondary` (`#004b18`) text for selected states. Use `rounded-md` (`0.75rem`).

### Cards & Lists
- **The Divider Ban:** Strictly forbid `<hr>` tags or divider lines. Separate list items using `spacing-4` (`1.4rem`) and subtle background shifts (e.g., alternating between `surface-container-low` and `surface-container-highest`).
- **Corner Radii:** Content cards must use `xl` (`1.5rem`) for a soft, approachable feel. Smaller nested elements use `md` (`0.75rem`).

### Input Fields
- **Text Inputs:** Use `surface-container-highest` as the base fill. No border. Label should use `label-md` floating above the field with `spacing-1.5` gap. 
- **Error States:** Use `error_dim` (`#c8475d`) for text and a subtle `error_container` (`#8a1632`) glow at 10% opacity around the field.

### Signature Component: The "Breath Orb"
A custom component for this app. A large circular container using a radial gradient of `secondary` to `primary`, with a `20px` backdrop blur. The size pulses using a sine-wave animation to guide the user’s breathing.

---

## 6. Do's and Don'ts

### Do
- **Do** use intentional asymmetry. Place a headline on the left and a small supporting label on the far right to create "white space tension."
- **Do** use the `tertiary` palette (`warm sand`) for moments of "human connection" or "grounding" (e.g., community features or journals).
- **Do** rely on `primary_dim` and `secondary_dim` for icons to ensure they don't overpower the text.

### Don't
- **Don't** use pure `#000000` for backgrounds unless it is the `surface-container-lowest` for extreme contrast.
- **Don't** use standard "drop shadows" with 0,0,0 hex codes. They break the "Submerged Sanctuary" atmosphere.
- **Don't** cram content. If a screen feels full, move 30% of the content to a secondary layer or increase the vertical scroll length. Whitespace is a functional requirement, not a luxury.
- **Don't** use "hard" animation. Every transition should be a slow "Ease-In-Out" or "Cubic-Bezier" to maintain the peaceful tone.```