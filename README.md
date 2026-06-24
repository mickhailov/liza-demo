# Liza Pozhydaeva — Demo Site

Demo website for a permanent makeup artist. Built with Next.js 16, Tailwind CSS, deployed on Vercel.

**GitHub:** https://github.com/mickhailov/liza-demo

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS
- React Context for cart state

## Run locally

```bash
npm install
npm run dev
# opens at http://localhost:3000
```

## Project structure

```
app/
├── page.tsx              # Home — hero, services, about
├── shop/page.tsx         # Shop — 6 product cards
├── courses/page.tsx      # Courses — 3 course cards
├── booking/page.tsx      # Booking — Acuity embed
├── checkout/page.tsx     # Checkout form (simulated)
├── checkout/success/     # Order confirmation page
└── layout.tsx            # Root layout with Header + CartProvider

components/
├── Header.tsx            # Sticky nav + cart icon with badge
└── CartDrawer.tsx        # Sliding cart panel from the right

contexts/
└── CartContext.tsx       # Global cart state (add/remove/clear)
```

## Color palette

| Variable | Hex | Used for |
|----------|-----|----------|
| Background | `#faf8f5` | Page background |
| Accent | `#b8956a` | Highlights, active links, badges |
| Accent light | `#f0e6d8` | Hero bg, about section bg |
| Placeholder | `#d4bfac` | Image placeholder blocks |
| Text muted | `#6b6b6b` | Descriptions, secondary text |
| Border | `#e5ddd4` | Card borders, dividers |

---

## Where to add images

All image placeholders are currently colored `<div>` blocks with the text "Photo coming soon" or colored circles for products. Replace them with real images using `next/image`.

### How to add an image in Next.js

1. Put the image file in `/public/` folder (e.g. `public/hero.jpg`)
2. Import and use the `Image` component:

```tsx
import Image from "next/image"

// Replace the placeholder div with:
<Image
  src="/hero.jpg"
  alt="Liza Pozhydaeva"
  width={600}
  height={400}
  className="rounded-2xl object-cover w-full h-full"
/>
```

### Placeholder locations

#### 1. Home page — `app/page.tsx`

**Hero photo** (right column, line ~30):
```tsx
// REPLACE THIS:
<div className="bg-[#d4bfac] rounded-2xl h-96 flex items-center justify-center">
  <p className="text-[#8a7060] text-sm tracking-wide">Photo coming soon</p>
</div>

// WITH:
<div className="rounded-2xl h-96 overflow-hidden relative">
  <Image src="/hero.jpg" alt="Liza Pozhydaeva" fill className="object-cover" />
</div>
```

**About photo** (left column, line ~75):
```tsx
// REPLACE THIS:
<div className="bg-[#d4bfac] rounded-2xl h-80 flex items-center justify-center">
  <p className="text-[#8a7060] text-sm tracking-wide">Photo coming soon</p>
</div>

// WITH:
<div className="rounded-2xl h-80 overflow-hidden relative">
  <Image src="/about.jpg" alt="About Liza" fill className="object-cover" />
</div>
```

#### 2. Shop page — `app/shop/page.tsx`

Each product card has a colored circle placeholder (lines ~30–35 per card). Replace with a product photo:

```tsx
// REPLACE THIS:
<div className="h-52 flex items-center justify-center" style={{ backgroundColor: product.color + "40" }}>
  <div className="w-16 h-16 rounded-full" style={{ backgroundColor: product.color }} />
</div>

// WITH:
<div className="h-52 relative overflow-hidden">
  <Image src={product.image} alt={product.name} fill className="object-cover" />
</div>
```

And add an `image` field to each product object:
```tsx
{ id: 1, name: "Brow Pigment — Warm Brown", price: 49, ..., image: "/products/pigment-brown.jpg" }
```

Suggested image files to add to `public/products/`:
- `pigment-brown.jpg`
- `pigment-taupe.jpg`
- `pigment-rose.jpg`
- `aftercare-cream.jpg`
- `microblading-pen.jpg`
- `numbing-cream.jpg`

#### 3. Courses page — `app/courses/page.tsx`

No image placeholders currently — course cards are text-only. Optionally add a cover image to each card above the title.

### Recommended image sizes

| Location | Size | Notes |
|----------|------|-------|
| Hero photo | 800×600px | Will be cropped to 16:9 on desktop |
| About photo | 700×560px | Portrait or square works well |
| Product photos | 600×500px | Square preferred for consistent grid |
| Course covers | 800×450px | Landscape 16:9 |

### `next/image` with `fill` prop

When using `fill`, the parent div must have `position: relative` and explicit dimensions. Tailwind classes to use on the wrapper:

```tsx
<div className="relative h-96 w-full rounded-2xl overflow-hidden">
  <Image src="..." alt="..." fill className="object-cover" />
</div>
```

---

## Pages overview

| Route | Description |
|-------|-------------|
| `/` | Home: hero banner, 3 service cards, about section |
| `/shop` | 6 product cards with Add to cart |
| `/courses` | 3 course tiers with Enroll buttons |
| `/booking` | Acuity scheduling embed (`https://butfirstyou.as.me/`) |
| `/checkout` | Mock payment form (Stripe-style UI, no real payments) |
| `/checkout/success` | Order confirmed page |
