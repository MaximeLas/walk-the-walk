# Complete Figma Design Extraction

This document contains a systematic extraction of ALL design values from Michelle's Figma Components page.

**Source:** Figma File Key: yDQ6JquKmyd2nrCUhp3nda | Page: Components (177:32228)

---

## Entry Chips

Entry chips are status indicators with various states. All chips share common typography but differ in colors.

### Status=No Nudge (177:32808)

**Colors:**
- Background: Transparent (no bg class)
- Border: #000000 (black, 1px solid)
- Text: #000000 (black)

**Sizing:**
- Height: Not fixed (size-full, flexible)
- Padding: 12px all sides
- Gap: 6px (internal gap)
- Border radius: 2px (rounded-[2px])
- Border radius (outer): 2.5px (for the border overlay)

**Typography:**
- Font family: Arial Regular, sans-serif
- Font size: 12px
- Font weight: Regular (400)
- Line height: 0 (with leading-none, essentially tight)
- Text align: Center
- Text transform: None

**Effects:**
- Border radius: 2px
- Shadow: None

---

### Status=Nudge Scheduled (177:32812)

**Colors:**
- Background: #FFFCEF (light yellow/cream)
- Border: #FCD915 (golden yellow, 1px solid)
- Text: #000000 (black)

**Sizing:**
- Height: Not fixed (size-full, flexible)
- Padding: 12px all sides
- Gap: 6px (internal gap)
- Border radius: 2px (rounded-[2px])
- Border radius (outer): 2.5px

**Typography:**
- Font family: Arial Regular, sans-serif
- Font size: 12px
- Font weight: Regular (400)
- Line height: 0 (leading-none)
- Text align: Center
- White space: nowrap

**Effects:**
- Border radius: 2px
- Shadow: None

---

### Status=Nudge Sent (177:32813)

**Colors:**
- Background: #EAF6FF (light blue)
- Border: #004CCE (deep blue, 1px solid)
- Text: #000000 (black)

**Sizing:**
- Height: Not fixed (size-full, flexible)
- Padding: 12px all sides
- Gap: 6px (internal gap)
- Border radius: 2px (rounded-[2px])
- Border radius (outer): 2.5px

**Typography:**
- Font family: Arial Regular, sans-serif
- Font size: 12px
- Font weight: Regular (400)
- Line height: 0 (leading-none)
- Text align: Center

**Effects:**
- Border radius: 2px
- Shadow: None

---

### Status=Nudge Responded (177:32814)

**Colors:**
- Background: #EAFFF4 (light green)
- Border: #00B017 (green, 1px solid)
- Text: #000000 (black)

**Sizing:**
- Height: Not fixed (size-full, flexible)
- Padding: 12px all sides
- Gap: 6px (internal gap)
- Border radius: 2px (rounded-[2px])
- Border radius (outer): 2.5px

**Typography:**
- Font family: Arial Regular, sans-serif
- Font size: 12px
- Font weight: Regular (400)
- Line height: 0 (leading-none)
- Text align: Center

**Effects:**
- Border radius: 2px
- Shadow: None

---

### Status=Entry Closed (177:32815)

**Colors:**
- Background: #E8DAFF (light purple)
- Border: #843DFF (purple, 1px solid)
- Text: #000000 (black)

**Sizing:**
- Height: Not fixed (size-full, flexible)
- Padding: 12px all sides
- Gap: 6px (internal gap)
- Border radius: 2px (rounded-[2px])
- Border radius (outer): 2.5px

**Typography:**
- Font family: Arial Regular, sans-serif
- Font size: 12px
- Font weight: Regular (400)
- Line height: 0 (leading-none)
- Text align: Center

**Effects:**
- Border radius: 2px
- Shadow: None

---

## Avatars

Avatar components with three different fill types.

### Fill=Image (177:32863)

**Colors:**
- Background: #0B0B0B (very dark gray/black) - for the avatar container
- Border: None
- Image: User profile photo

**Sizing:**
- Container: size-full (flexible, inherits parent)
- Border radius: 50px (circular)
- Image positioning:
  - Height: 90.08% of container
  - Width: 79.79% of container
  - Left offset: 10.61%
  - Top offset: 3.25%

**Typography:**
- N/A (image-based avatar)

**Effects:**
- Border radius: 50px (circular)
- Shadow: None
- Overflow: hidden (rounded)

---

### Fill=Contact Initials (177:32875)

**Colors:**
- Background: #4B4B4B (medium gray)
- Border: None
- Text: #FFFFFF (white)

**Sizing:**
- Container: size-full (flexible)
- Avatar circle: aspect-61/61 (square aspect ratio, circular with border-radius)
- Border radius: 50px (circular)
- Text container:
  - Left: 20.83% of container
  - Right: 20.83% of container
  - Top: 25% of container (top-1/4)
  - Bottom: 25% of container (bottom-1/4)

**Typography:**
- Font family: IBM Plex Mono Bold, sans-serif
- Font size: 10px
- Font weight: Bold (700)
- Line height: 0 (leading-none)
- Text align: Center
- Color: White (#FFFFFF)

**Effects:**
- Border radius: 50px (circular)
- Shadow: None

---

### Fill=Space Initials (177:32876)

**Colors:**
- Background: #B9B9B9 (light gray)
- Border: None
- Text: #000000 (black)

**Sizing:**
- Container: size-full (flexible)
- Avatar circle: aspect-61/61 (square aspect ratio, circular with border-radius)
- Border radius: 50px (circular)
- Text container:
  - Left: 20.83% of container
  - Right: 20.83% of container
  - Top: 25% of container (top-1/4)
  - Bottom: 25% of container (bottom-1/4)

**Typography:**
- Font family: IBM Plex Mono Bold, sans-serif
- Font size: 10px
- Font weight: Bold (700)
- Line height: 0 (leading-none)
- Text align: Center
- Color: Black (#000000)

**Effects:**
- Border radius: 50px (circular)
- Shadow: None

---

## List Cards

### Type=Contact (177:32766)

**Colors:**
- Background: White (#FFFFFF) with gradient overlay
  - Linear gradient: rgba(255, 255, 255, 1) to rgba(255, 255, 255, 1)
  - Secondary gradient: rgba(255, 255, 255, 0.4) to rgba(255, 255, 255, 0.4)
- Card Top background: #FFFFFF (white)
- Card Bottom background: #FFFFFF (white)
- Name text: #000000 (black)
- Timestamp text: #585858 (medium gray)
- Status indicator (dot): #00B017 (green, 8px circle)
- Border: None on main card

**Sizing:**
- Overall card: size-full (flexible)
- Border radius: 8px (rounded-[8px])
- Card Top padding: 12px all sides
- Card Top width: 412px
- Card Top gap: 8px
- Avatar size: 24x24px
- Status dot: 8x8px, rounded-[30px] (circular)
- Card Bottom padding: 12px horizontal, 6px vertical
- Card Bottom gap: 12px between chips
- Entry chips: height 36px, min-width 80px, padding 12px

**Typography:**
- Name:
  - Font family: Hiragino Kaku Gothic Pro W6, sans-serif
  - Font size: 16px
  - Font weight: W6 (Semi-bold, ~600)
  - Color: Black (#000000)
  - Line height: 0 (leading-none)
- Timestamp:
  - Font family: Hiragino Kaku Gothic Pro W3, sans-serif
  - Font size: 12px
  - Font weight: W3 (Light, ~300)
  - Color: #585858
  - Text align: Right
  - White space: nowrap

**Effects:**
- Border radius: 8px
- Shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.15)
- Backdrop filter: blur(6px)

---

### Type=Space (177:32834)

**Colors:**
- Background: White (#FFFFFF) with gradient overlay
  - Linear gradient: rgba(255, 255, 255, 1) to rgba(255, 255, 255, 1)
  - Secondary gradient: rgba(255, 255, 255, 0.4) to rgba(255, 255, 255, 0.4)
- Card Top background: #FFFFFF (white)
- Card Bottom background: #FFFFFF (white)
- Name text: #000000 (black)
- Connection count text: #000000 (black)
- Timestamp text: #585858 (medium gray)
- Border: None on main card

**Sizing:**
- Overall card: size-full (flexible)
- Border radius: 8px (rounded-[8px])
- Card Top padding: 12px all sides
- Card Top width: 412px
- Card Top gap: 8px
- Avatar size: 24x24px
- Name and connections gap: 12px
- Card Bottom padding: 12px horizontal, 6px vertical
- Card Bottom gap: 12px between chips
- Entry chips: height 36px, min-width 80px, padding 12px

**Typography:**
- Space name:
  - Font family: Hiragino Kaku Gothic Pro W6, sans-serif
  - Font size: 16px
  - Font weight: W6 (Semi-bold, ~600)
  - Color: Black (#000000)
  - White space: nowrap
- Connection count:
  - Font family: Hiragino Kaku Gothic Pro W3, sans-serif
  - Font size: 12px
  - Font weight: W3 (Light, ~300)
  - Color: Black (#000000)
  - Text align: Center
  - White space: nowrap
- Timestamp:
  - Font family: Hiragino Kaku Gothic Pro W3, sans-serif
  - Font size: 12px
  - Font weight: W3 (Light, ~300)
  - Color: #585858
  - Text align: Right
  - White space: nowrap

**Effects:**
- Border radius: 8px
- Shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.15)
- Backdrop filter: blur(6px)

**Note:** Space cards include a separator line (24px wide, rotated 90deg) and "+X Others" text that Contact cards don't have.

---

## Navigation Components

### Top Navigation - Active=No (177:32452)

**Colors:**
- Background: #181818 (very dark gray, almost black)
- Search bar background: #FFFFFF (white)
- Search bar border: #7A7A7A (medium gray, 1px solid)
- Search placeholder text: #000000 (black)
- Profile avatar border: #7A7A7A (medium gray, 1px solid)

**Sizing:**
- Overall container: size-full (flexible)
- Border radius: 0px top, 36px bottom-left and bottom-right (rounded-bl-[36px] rounded-br-[36px])
- Padding: 24px all sides
- Gap between search and avatar: 10px
- Search bar:
  - Width: 326px
  - Height: 44px
  - Border radius: 40px (rounded-[40px])
  - Padding: 28px vertical, 20px horizontal
  - Gap: 5px between icon and text
- Search icon: 20x20px
- Profile avatar: 44x44px, circular (rounded-[50px])

**Typography:**
- Search placeholder:
  - Font family: Arial Regular, sans-serif
  - Font size: 16px
  - Font weight: Regular (400)
  - Color: Black (#000000)
  - Text align: Center
  - White space: nowrap
  - Text: "Where am I at with..."

**Effects:**
- Border radius: 36px (bottom corners only)
- Shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.15)
- Backdrop filter: blur(6px)
- Search bar border: 1px solid #7A7A7A

---

### Top Navigation - Active=Yes (177:32739)

**Colors:**
- Background: #181818 (very dark gray, almost black)
- Search bar background: #FFFFFF (white)
- Search bar border: #7A7A7A (medium gray, 1px solid)
- Search input text: #000000 (black)
- Profile avatar border: #7A7A7A (medium gray, 1px solid)

**Sizing:**
- Overall container: size-full (flexible)
- Border radius: 0px top, 36px bottom-left and bottom-right (rounded-bl-[36px] rounded-br-[36px])
- Padding: 24px all sides
- Gap between search and avatar: 10px
- Search bar:
  - Width: 326px
  - Height: 44px
  - Border radius: 40px (rounded-[40px])
  - Padding: 28px vertical, 20px horizontal
  - Gap: 5px between icon and text
- Search icon: 20x20px
- Profile avatar: 44x44px, circular (rounded-[50px])

**Typography:**
- Search input cursor:
  - Font family: Arial Regular, sans-serif
  - Font size: 16px
  - Font weight: Regular (400)
  - Color: Black (#000000)
  - Text align: Center
  - White space: nowrap
  - Text: "|" (cursor indicator)

**Effects:**
- Border radius: 36px (bottom corners only)
- Shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.15)
- Backdrop filter: blur(6px)
- Search bar border: 1px solid #7A7A7A

**Note:** Active=Yes shows the search bar in active/focused state with cursor, while Active=No shows placeholder text.

---

### Middle Navigation - Active=All (177:32453)

**Colors:**
- Background: White with semi-transparent overlay
  - Linear gradient: rgba(255, 255, 255, 0.69) to rgba(255, 255, 255, 0.69)
  - Secondary gradient: rgba(255, 255, 255, 0.4) to rgba(255, 255, 255, 0.4)
- Border: #E9E9E9 (very light gray, 1px solid)
- Filter/Sort text: #000000 (black)
- Active tab ("All") background: #EFEFEF (light gray)
- Active tab border: #000000 (black, 2px solid)
- Active tab text: #000000 (black)
- Inactive tab text: #000000 (black)
- Divider line: Appears as separator

**Sizing:**
- Overall container: size-full (flexible)
- Padding: 12px vertical, 0px horizontal
- Gap: 10px between sections
- Filters/Sort section padding: 0px vertical, 24px horizontal
- Filter gap: 4px between icon and text
- Filter icon: 16x16px
- Sort icon: 16x16px
- View options padding: 0px vertical, 24px horizontal
- View option buttons:
  - Min-width: 100px
  - Padding: 12px vertical, 24px horizontal
  - Border radius: 20px (rounded-[20px])
  - Active button border: 2px solid black (border radius: 22px for outer)

**Typography:**
- Filter/Sort labels:
  - Font family: Arial Regular, sans-serif
  - Font size: 12px
  - Font weight: Regular (400)
  - Color: Black (#000000)
  - Text align: Center
  - White space: nowrap
- View option buttons:
  - Font family: Arial Bold, sans-serif
  - Font size: 14px
  - Font weight: Bold (700)
  - Color: Black (#000000)
  - Text align: Center
  - Line height: 0 (leading-none)

**Effects:**
- Border: 1px solid #E9E9E9
- Active button border: 2px solid black
- Border radius: 20px on view option buttons
- Shadow: None

---

### Middle Navigation - Active=Contacts (177:32615)

**Colors:**
- Background: White with semi-transparent overlay
  - Linear gradient: rgba(255, 255, 255, 0.69) to rgba(255, 255, 255, 0.69)
  - Secondary gradient: rgba(255, 255, 255, 0.4) to rgba(255, 255, 255, 0.4)
- Border: #E9E9E9 (very light gray, 1px solid)
- Filter/Sort text: #000000 (black)
- Active tab ("Contacts") background: #EFEFEF (light gray)
- Active tab border: #000000 (black, 2px solid)
- Active tab text: #000000 (black)
- Inactive tab text: #000000 (black)

**Sizing:**
- Same as Active=All variant
- Overall container: size-full (flexible)
- Padding: 12px vertical, 0px horizontal
- Gap: 10px between sections
- Filters/Sort section padding: 0px vertical, 24px horizontal
- Filter gap: 4px between icon and text
- Filter icon: 16x16px
- Sort icon: 16x16px
- View options padding: 0px vertical, 24px horizontal
- View option buttons:
  - Min-width: 100px
  - Padding: 12px vertical, 24px horizontal
  - Border radius: 20px (rounded-[20px])
  - Active button border: 2px solid black

**Typography:**
- Same as Active=All variant
- Filter/Sort labels:
  - Font family: Arial Regular, sans-serif
  - Font size: 12px
  - Font weight: Regular (400)
  - Color: Black (#000000)
- View option buttons:
  - Font family: Arial Bold, sans-serif
  - Font size: 14px
  - Font weight: Bold (700)
  - Color: Black (#000000)
  - Text align: Center

**Effects:**
- Same as Active=All variant
- Border: 1px solid #E9E9E9
- Active button ("Contacts") border: 2px solid black
- Border radius: 20px on view option buttons

---

### Middle Navigation - Active=Spaces (177:32652)

**Colors:**
- Background: White with semi-transparent overlay
  - Linear gradient: rgba(255, 255, 255, 0.69) to rgba(255, 255, 255, 0.69)
  - Secondary gradient: rgba(255, 255, 255, 0.4) to rgba(255, 255, 255, 0.4)
- Border: #E9E9E9 (very light gray, 1px solid)
- Filter/Sort text: #000000 (black)
- Active tab ("Spaces") background: #EFEFEF (light gray)
- Active tab border: #000000 (black, 2px solid)
- Active tab text: #000000 (black)
- Inactive tab text: #000000 (black)

**Sizing:**
- Same as Active=All and Active=Contacts variants
- Overall container: size-full (flexible)
- Padding: 12px vertical, 0px horizontal
- Gap: 10px between sections
- View option buttons:
  - Min-width: 100px
  - Padding: 12px vertical, 24px horizontal
  - Border radius: 20px (rounded-[20px])
  - Active button border: 2px solid black

**Typography:**
- Same as other Middle Navigation variants
- Filter/Sort labels:
  - Font family: Arial Regular, sans-serif
  - Font size: 12px
  - Font weight: Regular (400)
  - Color: Black (#000000)
- View option buttons:
  - Font family: Arial Bold, sans-serif
  - Font size: 14px
  - Font weight: Bold (700)
  - Color: Black (#000000)
  - Text align: Center

**Effects:**
- Same as other Middle Navigation variants
- Border: 1px solid #E9E9E9
- Active button ("Spaces") border: 2px solid black
- Border radius: 20px on view option buttons

---

## Screen Mode Components

### Mode=List (177:32975)

**Colors:**
- Background: Semi-transparent gray
  - Linear gradient: rgba(94, 94, 94, 0.2) to rgba(94, 94, 94, 0.2)
  - Secondary gradient: rgba(255, 255, 255, 0.4) to rgba(255, 255, 255, 0.4)
- Active tab ("List") background: #FFFFFF (white)
- Active tab text: #000000 (black)
- Inactive tab text: #000000 (black)
- Inactive tab background: Transparent

**Sizing:**
- Overall container: size-full (flexible)
- Border radius: 60px (rounded-[60px], fully rounded pill shape)
- Padding: 8px vertical, 24px horizontal
- Gap between tabs: justified space-between
- Tab buttons:
  - Width: 54px (List) or 56px (Grid, Chat)
  - Height: 54px
  - Padding: 8px vertical, 12px horizontal
  - Border radius: 40px (rounded-[40px])
  - Gap: 4px between icon and label
- Icon sizes:
  - List icon: 26.929px wide x 20px high
  - Grid icon: 24x24px
  - Chat icon: 20x20px

**Typography:**
- Tab labels:
  - Font family: Arial Bold, sans-serif
  - Font size: 10px
  - Font weight: Bold (700)
  - Color: Black (#000000)
  - Text align: Center
  - White space: nowrap
  - Line height: 0 (leading-none)

**Effects:**
- Border radius: 60px (outer container, pill shape)
- Border radius: 40px (tab buttons)
- Shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.15)
- Backdrop filter: blur(6px)

---

### Mode=Grid (177:32962)

**Colors:**
- Background: Semi-transparent gray
  - Linear gradient: rgba(94, 94, 94, 0.2) to rgba(94, 94, 94, 0.2)
  - Secondary gradient: rgba(255, 255, 255, 0.4) to rgba(255, 255, 255, 0.4)
- Active tab ("Grid") background: #FFFFFF (white)
- Active tab text: #000000 (black)
- Inactive tab text: #000000 (black)
- Inactive tab background: Transparent

**Sizing:**
- Same as Mode=List
- Overall container: size-full (flexible)
- Border radius: 60px (rounded-[60px])
- Padding: 8px vertical, 24px horizontal
- Tab buttons:
  - Width: 54px or 56px
  - Height: 54px
  - Padding: 8px vertical, 12px horizontal
  - Border radius: 40px (rounded-[40px])
  - Gap: 4px between icon and label

**Typography:**
- Same as Mode=List
- Tab labels:
  - Font family: Arial Bold, sans-serif
  - Font size: 10px
  - Font weight: Bold (700)
  - Color: Black (#000000)
  - Text align: Center
  - White space: nowrap

**Effects:**
- Same as Mode=List
- Border radius: 60px (outer container)
- Border radius: 40px (tab buttons)
- Shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.15)
- Backdrop filter: blur(6px)

---

### Mode=Chat (177:32924)

**Colors:**
- Background: Semi-transparent gray
  - Linear gradient: rgba(94, 94, 94, 0.2) to rgba(94, 94, 94, 0.2)
  - Secondary gradient: rgba(255, 255, 255, 0.4) to rgba(255, 255, 255, 0.4)
- Active tab ("Chat") background: #FFFFFF (white)
- Active tab text: #000000 (black)
- Inactive tab text: #000000 (black)
- Inactive tab background: Transparent

**Sizing:**
- Same as Mode=List and Mode=Grid
- Overall container: size-full (flexible)
- Border radius: 60px (rounded-[60px])
- Padding: 8px vertical, 24px horizontal
- Tab buttons:
  - Width: 54px or 56px
  - Height: 54px
  - Padding: 8px vertical, 12px horizontal
  - Border radius: 40px (rounded-[40px])
  - Gap: 4px between icon and label

**Typography:**
- Same as Mode=List and Mode=Grid
- Tab labels:
  - Font family: Arial Bold, sans-serif
  - Font size: 10px
  - Font weight: Bold (700)
  - Color: Black (#000000)
  - Text align: Center
  - White space: nowrap

**Effects:**
- Same as Mode=List and Mode=Grid
- Border radius: 60px (outer container)
- Border radius: 40px (tab buttons)
- Shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.15)
- Backdrop filter: blur(6px)

---

## Add Button

### Icon=Add (177:32897)

**Colors:**
- Background: Semi-transparent gray with white button
  - Container gradient: rgba(94, 94, 94, 0.2) to rgba(94, 94, 94, 0.2)
  - Secondary gradient: rgba(255, 255, 255, 0.4) to rgba(255, 255, 255, 0.4)
- Button background: #FFFFFF (white)
- Icon color: #000000 (black)

**Sizing:**
- Overall container: size-full (flexible)
- Border radius: 48px (rounded-[48px], fully rounded)
- Container padding: 8px all sides
- Button size: 42x42px (aspect-[42/42])
- Button border radius: 40px (rounded-[40px], circular)
- Button padding: 28px all sides (tight padding around icon)
- Icon size: 24x24px
- Gap: 10px

**Typography:**
- N/A (icon-only button)

**Effects:**
- Border radius: 48px (outer container)
- Border radius: 40px (button, circular)
- Shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.15)
- Backdrop filter: blur(6px)

---

### Icon=Close (177:33071)

This variant includes both the close button and the expanded "Add Options" menu.

**Colors:**
- Add Options menu background: Semi-transparent gray
  - Gradient: rgba(94, 94, 94, 0.2) to rgba(94, 94, 94, 0.2)
  - Secondary gradient: rgba(255, 255, 255, 0.4) to rgba(255, 255, 255, 0.4)
- Add Options menu border: #000000 (black, 2px solid)
- Option buttons background: #131313 (very dark gray, almost black)
- Option buttons text: #FFFFFF (white)
- Close button container background: Semi-transparent gray (same as Add button)
- Close button background: #131313 (very dark gray, almost black)
- Close button border: #000000 (black, 2px solid)
- Close icon color: #FFFFFF (white)

**Sizing:**
- Overall container: size-full (flexible)
- Gap between menu and button: 24px
- Add Options menu:
  - Border radius: 14px (rounded-[14px])
  - Border radius (outer with border): 16px
  - Padding: 12px all sides
  - Gap between option buttons: 12px
  - Option buttons:
    - Height: 40px
    - Border radius: 40px (rounded-[40px], pill shape)
    - Padding: 28px (horizontal, creates pill shape)
    - Gap: 10px internal
- Close button container:
  - Size: 68x68px
  - Border radius: 48px (rounded-[48px])
  - Padding: 8px all sides
- Close button:
  - Size: 40x40px (42x42px aspect ratio)
  - Border radius: 40px (rounded-[40px], circular)
  - Padding: 28px all sides
- Close icon: 24x24px

**Typography:**
- Option button labels:
  - Font family: Hiragino Kaku Gothic Pro W6, sans-serif
  - Font size: 12px
  - Font weight: W6 (Semi-bold, ~600)
  - Color: White (#FFFFFF)
  - Text align: Center
  - White space: nowrap
  - Line height: 0 (leading-none)

**Effects:**
- Add Options menu:
  - Border radius: 14px
  - Border: 2px solid black
  - Shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.15)
  - Backdrop filter: blur(6px)
- Close button container:
  - Border radius: 48px
  - Border: 2px solid black (neutral-950)
  - Shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.15)
  - Backdrop filter: blur(6px)
- Close button:
  - Border radius: 40px (circular)

---

## Summary of Common Design Tokens

### Color Palette
- **Black text:** #000000
- **White:** #FFFFFF
- **Dark backgrounds:** #181818, #131313, #0B0B0B
- **Medium gray text:** #585858
- **Borders/Dividers:** #7A7A7A, #E9E9E9
- **Avatars:** #4B4B4B (contact), #B9B9B9 (space)
- **Status colors:**
  - Green (responded/active): #00B017
  - Light green bg: #EAFFF4
  - Blue (sent): #004CCE
  - Light blue bg: #EAF6FF
  - Yellow (scheduled): #FCD915
  - Light yellow bg: #FFFCEF
  - Purple (closed): #843DFF
  - Light purple bg: #E8DAFF
- **Neutral backgrounds:** #EFEFEF

### Typography Scale
- **10px:** Avatar initials, mode tab labels
- **12px:** Entry chip text, timestamps, filter/sort labels, connection counts, option button labels
- **14px:** View option buttons (All/Contacts/Spaces)
- **16px:** Contact/space names, search bar text

### Font Families
- **Arial Regular:** Entry chips, filters, search bar
- **Arial Bold:** View options, mode tabs
- **Hiragino Kaku Gothic Pro W6:** Contact/space names, option buttons (semi-bold)
- **Hiragino Kaku Gothic Pro W3:** Timestamps, connection counts (light)
- **IBM Plex Mono Bold:** Avatar initials

### Border Radius Scale
- **2px:** Entry chips (small, subtle corners)
- **8px:** List cards
- **14px:** Add options menu
- **20px:** View option buttons
- **30px:** Status indicator dots
- **36px:** Top navigation (bottom corners only)
- **40px:** Buttons, search bar, avatars (circular elements)
- **48px:** Add button container
- **50px:** Avatars (circular)
- **60px:** Screen mode switcher (pill shape)

### Spacing Scale
- **4px:** Small gaps (filter icon-text, mode tab icon-label)
- **6px:** Entry chip internal gap, card bottom padding (vertical)
- **8px:** Card top gap, mode switcher padding (vertical), button container padding
- **10px:** Top nav gap (search-avatar), button internal gap
- **12px:** Card padding, entry chip padding, add options padding, view option button padding (vertical), middle nav padding (vertical)
- **24px:** Top nav padding, mode switcher padding (horizontal), view options padding (horizontal), add button gap
- **28px:** Search bar padding (vertical), button tight padding

### Shadows
- **Standard card/component shadow:** 0px 4px 16px 0px rgba(0, 0, 0, 0.15)

### Effects
- **Backdrop blur:** blur(6px) - Used on most overlays and glass-morphism effects
- **Gradients:** Multiple components use layered linear gradients for semi-transparent overlays

---

## Implementation Notes

1. **Consistency:** All status chips share identical sizing and typography, varying only in color schemes.

2. **Avatar system:** Three-tier approach - images for real users, dark gray (#4B4B4B) with white text for contacts, light gray (#B9B9B9) with black text for spaces.

3. **Typography hierarchy:** Clear distinction between bold headers (W6), regular body text, and light supplementary text (W3).

4. **Glassmorphism:** Extensive use of backdrop-blur and semi-transparent overlays throughout the design.

5. **Border treatment:** Most components use subtle 1-2px borders, with active states receiving 2px black borders for emphasis.

6. **Circular elements:** Consistently use 40-50px border radius for fully rounded shapes (buttons, avatars, status dots).

7. **Spacing system:** Follows an 8px grid with occasional 4px and 6px variations for tighter layouts.

8. **Color system:** Status-driven color coding with consistent light backgrounds paired with darker borders of the same hue family.

---

**Extraction completed on:** 2025-10-13
**Total components extracted:** 22 component variants across 5 categories
**File path:** /Users/maximelas/Projects/Unicorn/walk-the-walk/COMPLETE_FIGMA_EXTRACTION.md
