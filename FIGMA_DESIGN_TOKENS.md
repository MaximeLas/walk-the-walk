# Figma Design Tokens - ACTUAL VALUES FROM MICHELLE'S DESIGN

**Source:** Unicorn Main File (yDQ6JquKmyd2nrCUhp3nda)
**Page:** Components (node ID 177:32228)
**Extracted:** 2025-10-13

---

## 1. ENTRY CHIPS (Status Indicators)

### Status=No Nudge (177:32808)
- **Label:** "No Nudge"
- **Fill:** `transparent` (no background)
- **Stroke:** `#000000` (black, 1px solid)
- **Border Radius:** 2px
- **Padding:** 12px
- **Font:** Arial Regular, 12px
- **Text Color:** #000000

### Status=Nudge Scheduled (177:32812)
- **Label:** "Nudge Scheduled"
- **Fill:** `#FFFCEF` (light yellow)
- **Stroke:** `#FCD915` (yellow, 1px solid)
- **Border Radius:** 2px
- **Padding:** 12px
- **Font:** Arial Regular, 12px
- **Text Color:** #000000

### Status=Nudge Sent (177:32813)
- **Label:** "Nudge Sent"
- **Fill:** `#EAF6FF` (light blue)
- **Stroke:** `#004CCE` (blue, 1px solid)
- **Border Radius:** 2px
- **Padding:** 12px
- **Font:** Arial Regular, 12px
- **Text Color:** #000000

### Status=Nudge Responded (177:32814)
- **Label:** "Nudge Responded"
- **Fill:** `#EAFFF4` (light green)
- **Stroke:** `#00B017` (green, 1px solid)
- **Border Radius:** 2px
- **Padding:** 12px
- **Font:** Arial Regular, 12px
- **Text Color:** #000000

### Status=Entry Closed (177:32815)
- **Label:** "Entry Closed"
- **Fill:** `#E8DAFF` (light purple)
- **Stroke:** `#843DFF` (purple, 1px solid)
- **Border Radius:** 2px
- **Padding:** 12px
- **Font:** Arial Regular, 12px
- **Text Color:** #000000

---

## 2. NAVIGATION COMPONENTS

### Top Navigation

#### Search Bar
- **Background:** `#FFFFFF` (white)
- **Border:** `#7A7A7A` (gray, 1px solid)
- **Border Radius:** 40px
- **Height:** 44px
- **Width:** 326px
- **Padding:** 20px (horizontal), 28px (vertical)
- **Placeholder Text:** "Where am I at with..."
- **Font:** Arial Regular, 16px
- **Text Color:** #000000

#### Top Nav Container
- **Background:** `#181818` with backdrop blur 6px
- **Border Radius:** 36px (bottom left and right only)
- **Box Shadow:** 0px 4px 16px 0px rgba(0,0,0,0.15)
- **Padding:** 24px

#### Profile Avatar
- **Size:** 44px × 44px
- **Border:** `#7A7A7A` (gray, 1px solid)
- **Border Radius:** 50px (circle)

### Middle Navigation (Filter/Sort Bar)

#### Container
- **Background:** Linear gradient overlay on white
  - `rgba(255, 255, 255, 0.69)` + `rgba(255, 255, 255, 0.4)`
- **Border:** `#E9E9E9` (light gray, 1px solid)
- **Padding:** 12px (vertical), 0px (horizontal inner content has 24px padding)

#### Filter/Sort Text
- **Font:** Arial Regular, 12px
- **Text Color:** #000000

#### View Options Buttons
- **Active State:**
  - Background: `#EFEFEF` (light gray)
  - Border: `#000000` (black, 2px solid)
  - Border Radius: 20px
  - Font: Arial Bold, 14px
  - Padding: 12px (vertical), 24px (horizontal)

- **Inactive State:**
  - Background: transparent
  - Border: none
  - Font: Arial Bold, 14px
  - Padding: 12px

### Screen Mode Toggle

#### Container
- **Background:** Gradient with backdrop blur
  - `rgba(94, 94, 94, 0.2)` + `rgba(255, 255, 255, 0.4)` with 6px backdrop blur
- **Border Radius:** 60px
- **Box Shadow:** 0px 4px 16px 0px rgba(0,0,0,0.15)
- **Padding:** 8px (vertical), 24px (horizontal)

#### Mode Buttons
- **Active State:**
  - Background: `#FFFFFF` (white)
  - Size: 54px × 54px
  - Border Radius: 40px
  - Padding: 8px (vertical), 12px (horizontal)

- **Inactive State:**
  - Background: transparent
  - Size: 54px × 54px (or 56px × 54px for some)
  - Border Radius: 40px
  - Padding: 8px (vertical), 12px (horizontal)

- **Font:** Arial Bold, 10px
- **Text Color:** #000000

### Add Button

#### Icon=Add (177:32897)
- **Background:** Gradient with backdrop blur
  - `rgba(94, 94, 94, 0.2)` + `rgba(255, 255, 255, 0.4)` with 6px backdrop blur
- **Border Radius:** 48px
- **Box Shadow:** 0px 4px 16px 0px rgba(0,0,0,0.15)
- **Size:** 68px × 68px
- **Padding:** 8px
- **Inner Circle:**
  - Background: `#FFFFFF` (white)
  - Border Radius: 40px
  - Padding: 28px (contains 24px icon)

#### Icon=Close (177:33071)
- **Add Options Panel:**
  - Background: Gradient with backdrop blur (same as Icon=Add)
  - Border: `#000000` (black, 2px solid)
  - Border Radius: 14px
  - Box Shadow: 0px 4px 16px 0px rgba(0,0,0,0.15)
  - Padding: 12px
  - Gap: 12px

- **Option Buttons (Contact/Space/Entry):**
  - Background: `#131313` (dark gray)
  - Border Radius: 40px
  - Height: 40px
  - Font: Hiragino Kaku Gothic Pro W6, 12px
  - Text Color: #FFFFFF (white)
  - Padding: 28px

- **Close Button:**
  - Background: Gradient (same as outer container)
  - Border: `#0B0B0B` (near black, 2px solid)
  - Border Radius: 48px
  - Size: 68px × 68px
  - Inner Circle Background: `#131313` (dark gray)
  - Inner Circle Border Radius: 40px
  - Icon Color: #FFFFFF (white)

---

## 3. CARDS

### List Card - Type=Contact (177:32766)

#### Container
- **Background:** White with backdrop blur
  - `rgba(255, 255, 255, 1)` + `rgba(255, 255, 255, 0.4)` with 6px backdrop blur
- **Border Radius:** 8px
- **Box Shadow:** 0px 4px 16px 0px rgba(0,0,0,0.15)
- **Size:** 412px × 94px

#### Card Top
- **Background:** `#FFFFFF` (white)
- **Padding:** 12px
- **Gap:** 8px

#### Name Text
- **Font:** Hiragino Kaku Gothic Pro W6, 16px
- **Text Color:** #000000

#### Status Text (timestamp)
- **Font:** Hiragino Kaku Gothic Pro W3, 12px
- **Text Color:** `#585858` (gray)

#### Status Dot
- **Colors by status:**
  - Green (Responded): `#00B017`
  - Yellow (Scheduled): `#FCD915`
  - Blue (Sent): `#004CCE`
  - Purple (Closed): `#843DFF`
- **Size:** 8px × 8px
- **Border Radius:** 30px (circle)

#### Card Bottom (Entry Chips)
- **Background:** `#FFFFFF` (white)
- **Padding:** 6px (vertical), 12px (horizontal)
- **Gap:** 12px
- Entry chips use the same styling as documented in Section 1

### List Card - Type=Space (177:32834)
- Same styling as Type=Contact
- Includes connection indicator: "+2 Others" text with divider line

### Quick Nudge Cards

#### Property 1=Sliding (177:36134)
- **Background:** Gradient
  - `rgba(255, 248, 195, 1)` to `rgba(255, 248, 195, 0)` (yellow gradient)
  - Plus `rgba(255, 255, 255, 0.4)` overlay with 6px backdrop blur
- **Border:** `#FCD915` (yellow, 1px solid)
- **Border Radius:** 8px
- **Box Shadow:** 0px 4px 16px 0px rgba(0,0,0,0.15)
- **Padding:** 41px (vertical), 24px (horizontal)
- **Title:** "Quick Nudge"
  - Font: Inter Bold, 12px
  - Text Color: #000000
- **Date/Time Buttons:**
  - Background: `rgba(118, 118, 128, 0.12)` (gray transparent)
  - Border Radius: 100px
  - Font: SF Pro Regular, 17px, tracking -0.43px
  - Text Color: #000000
  - Padding: 6px (vertical), 11px (horizontal)

#### Property 1=Open (177:36165)
- Same as Sliding except:
- **Date/Time Buttons Background:** `#FFFFFF` (white instead of transparent gray)

---

## 4. AVATARS

### Card Avatar - Fill=Image (177:32863)
- **Size:** 24px × 24px
- **Background:** `#0B0B0B` (near black)
- **Border Radius:** 50px (circle)
- Contains image positioned at specific coordinates

### Card Avatar - Fill=Contact Initials (177:32875)
- **Size:** 24px × 24px
- **Background:** `#4B4B4B` (dark gray)
- **Border Radius:** 50px (circle)
- **Text:** Initials (e.g., "KC")
  - Font: IBM Plex Mono Bold, 10px
  - Text Color: #FFFFFF (white)
  - Centered

### Card Avatar - Fill=Space Initials (177:32876)
- **Size:** 24px × 24px
- **Background:** `#B9B9B9` (light gray)
- **Border Radius:** 50px (circle)
- **Text:** Initials (e.g., "U")
  - Font: IBM Plex Mono Bold, 10px
  - Text Color: #000000 (black)
  - Centered

---

## 5. PINNED COMPONENTS

### Pinned Section (177:32552)
- **Background:** `#FFFFFF` (white)
- **Gap:** 8px between items
- **Section Title:** "Pinned"
  - Font: Arial Regular, 12px
  - Text Color: #000000

### Pinned Contact or Space (177:32483)
- **Background:** `#FFFFFF` (white)
- **Height:** 24px
- **Layout:** Horizontal flex, space-between

#### Name Text
- **Font:** Hiragino Kaku Gothic Pro W6, 14px
- **Text Color:** #000000

#### Entry Label
- **Font:** Hiragino Kaku Gothic Pro W3, 12px
- **Text Color:** #000000

#### Status Dot
- **Size:** 8px × 8px
- **Border Radius:** 30px (circle)
- **Colors:**
  - Green: `#00B017`
  - Yellow: `#FCD915`

#### Time Text
- **Font:** Hiragino Kaku Gothic Pro W3, 12px
- **Text Color:** #000000

### Pinned Entry (177:32599)
- Same layout as Pinned Contact or Space
- Status dot color for "Entry Closed": `#843DFF` (purple)

---

## COLOR PALETTE (All Unique Colors Extracted)

### Primary Colors
- **Black:** `#000000`
- **White:** `#FFFFFF`
- **Near Black:** `#0B0B0B`, `#131313`
- **Dark Gray:** `#181818`, `#4B4B4B`
- **Medium Gray:** `#585858`, `#7A7A7A`, `#B9B9B9`
- **Light Gray:** `#E9E9E9`, `#EFEFEF`

### Status Colors

#### Green (Responded/Active)
- **Fill:** `#EAFFF4` (light green)
- **Stroke/Dot:** `#00B017` (green)

#### Yellow (Scheduled)
- **Fill:** `#FFFCEF` (light yellow)
- **Stroke/Dot:** `#FCD915` (yellow)

#### Blue (Sent)
- **Fill:** `#EAF6FF` (light blue)
- **Stroke:** `#004CCE` (blue)

#### Purple (Closed)
- **Fill:** `#E8DAFF` (light purple)
- **Stroke/Dot:** `#843DFF` (purple)

### Transparent Overlays
- **Gray Overlay:** `rgba(94, 94, 94, 0.2)`
- **White Overlay:** `rgba(255, 255, 255, 0.4)`, `rgba(255, 255, 255, 0.69)`
- **Button Gray:** `rgba(118, 118, 128, 0.12)`
- **Icon Gray:** `rgba(142, 142, 142, 0.3)`

---

## TYPOGRAPHY

### Fonts Used

1. **Arial Regular** - 12px, 16px
2. **Arial Bold** - 10px, 14px
3. **Hiragino Kaku Gothic Pro W3** (Light) - 12px
4. **Hiragino Kaku Gothic Pro W6** (Semibold) - 12px, 14px, 16px
5. **IBM Plex Mono Bold** - 10px (avatars)
6. **Inter Bold** - 12px (Quick Nudge)
7. **SF Pro Regular** - 17px (date/time pickers)
8. **SF Pro Semibold** - 17px (grabber icon)

### Text Colors
- **Primary:** `#000000` (black)
- **Secondary:** `#585858` (gray)
- **On Dark:** `#FFFFFF` (white)

---

## SPACING & SIZING

### Common Padding Values
- 6px, 8px, 10px, 11px, 12px, 20px, 24px, 28px, 41px

### Common Border Radius
- 2px (chips)
- 8px (cards)
- 14px (add options panel)
- 20px (view option buttons)
- 30px (status dots - actually circles)
- 36px (top nav bottom corners)
- 40px (search bar, buttons, inner circles)
- 48px (add button)
- 50px (avatars - actually circles)
- 60px (screen mode toggle)
- 100px (date/time buttons)

### Common Sizes
- **Status Dots:** 8px × 8px
- **Avatars:** 24px × 24px, 44px × 44px
- **Icons:** 16px, 20px, 24px
- **Buttons:** 40px, 44px, 54px, 68px

### Shadows
- **Standard:** `0px 4px 16px 0px rgba(0,0,0,0.15)`
- **Text Shadow:** `0px 4px 16px rgba(0,0,0,0.15)` (for grabber icon)

### Effects
- **Backdrop Blur:** 6px (used throughout on glass morphism elements)

---

## NOTES

1. **No Purple Previously:** The previous implementation incorrectly omitted purple colors for "Entry Closed" status
2. **Exact Color Values:** All hex values extracted directly from Figma-generated code
3. **Glass Morphism:** Heavy use of backdrop-blur with gradient overlays for depth
4. **Consistent Status System:** Each status has a paired light fill + bold stroke/dot color
5. **Border Weights:** Mostly 1px, with 2px used for active/emphasized states
