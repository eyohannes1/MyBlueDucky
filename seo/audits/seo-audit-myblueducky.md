# SEO + AEO Audit — myblueducky.com
**Date:** 2026-03-28 | **Auditor:** Claude Code (local codebase audit)

---

## Executive Summary

- **Strengths:** robots.txt is excellent (all AI crawlers allowed), FAQPage + LocalBusiness schemas are well-populated, llms.txt exists with solid content, geo tags are accurate for Surprise AZ, meta tags are clean.
- **Critical Gap:** The site is a **client-side React SPA** — all content renders via JavaScript. Crawlers that don't execute JS (most AI bots) will see an empty `<div id="root"></div>`. This undermines all other SEO/AEO work until the Next.js migration is complete.
- **Quick wins available:** Missing `og-image.jpg` (broken OG/Twitter cards), duplicate H1 tags in hero section, wrong logo path in LocalBusiness schema, stock image alt text, missing Review + HowTo schemas.

---

## 1. TECHNICAL SEO

### Title Tag
- **Current:** `My Blue Ducky | Professional Pool Service & Repair` (52 chars ✅)
- **Issue:** Brand name before primary keyword. For non-brand queries, keyword-first ranks better.
- **Recommended:** `Pool Service & Repair in Surprise, AZ | My Blue Ducky`

### Meta Description
- 160 chars ✅, includes location, price point ($119/mo), CTA — **PASS**

### Canonical
- `https://www.myblueducky.com/` ✅ — **PASS**

### Open Graph / Twitter Cards
- OG/Twitter image references `https://www.myblueducky.com/og-image.jpg`
- **`og-image.jpg` does NOT exist in `/public/`** ❌
- All social shares and many AI citation cards will show broken/no image
- **Fix:** Create a 1200×630px branded image and save as `/public/og-image.jpg`

### Favicon
- `<link rel="icon" href="/favicon.ico">` — **`favicon.ico` does NOT exist** ❌ (only `favicon.png` is present)
- `apple-touch-icon.png` exists ✅
- **Fix:** Convert `favicon.png` → `favicon.ico` or update the href to `/favicon.png`

### Geo Tags
- `geo.placename`: Surprise ✅
- `geo.position` + `ICBM`: 33.6292, -112.3679 ✅ — **PASS**

---

## 2. HEADING HIERARCHY

### CRITICAL: Duplicate H1 on Homepage ❌
```
App.tsx:204  <h1>Designed. Built.</h1>
App.tsx:210  <h1>...Maintained. Perfected.</h1>
```
Two separate `<h1>` elements used for the animation split effect. Google expects exactly one H1.

**Fix — merge into one:**
```jsx
<h1 className="font-playfair text-4xl md:text-6xl lg:text-8xl leading-none">
  Designed. Built. <br />
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
    Maintained. Perfected.
  </span>
</h1>
```

### H2 Hierarchy — PASS ✅
- "Professional Services"
- "We don't just clean pools. We protect your oasis."
- "Elite service for elite properties."
- "Pool Tips & Trends"
- "Get Started Today"

Logical structure, no issues.

### Inner Pages
- `PageHero` uses `<h1>` for page title ✅
- No duplicate H1 on Services/About/Blog views ✅

---

## 3. AI VISIBILITY (AEO)

### robots.txt — EXCELLENT ✅
All required AI crawlers explicitly allowed:
GPTBot, ClaudeBot, anthropic-ai, PerplexityBot, GoogleOther, Bytespider, CCBot, cohere-ai, meta-externalagent — **best-in-class, no changes needed.**

### llms.txt — GOOD, needs URL depth ⚠️
File exists at `/public/llms.txt` ✅

**Issue:** All internal links point to `https://www.myblueducky.com/` (homepage). Since this is a SPA with no real routes, this is understandable — but fragment anchors would help.

**Improvements:**
- Change service links to use anchors: `https://www.myblueducky.com/#services`
- Add `https://www.myblueducky.com/#contact` for the contact section
- Once Next.js migration adds real routes, update with actual URLs

### FAQPage Schema — GOOD ✅
5 solid Q&As with specifics (price, ROC license number, CPO cert number) — strong AI citation signal.

**Suggested additions:**
- "Does My Blue Ducky repair pool equipment?"
- "How long has My Blue Ducky been in business?"

### LocalBusiness Schema — GOOD with bugs ⚠️

| Field | Status | Issue |
|-------|--------|-------|
| `@type: LocalBusiness` | ✅ | Consider `PoolService` subtype if available |
| `telephone` | ✅ | |
| `address` | ✅ | Surprise AZ |
| `geo` | ✅ | Accurate coordinates |
| `openingHoursSpecification` | ✅ | Mon–Fri 8–5 |
| `image` | ❌ | Points to `/logo.png` (root) — file is at `/assets/images/logo.png` |
| `aggregateRating` | ⚠️ | `reviewCount: 120` must be real data or remove |
| `sameAs` | ⚠️ | Only FB + Yelp — add Google Business Profile URL |
| `areaServed` | ✅ | 8 cities listed |

**Fix logo path in `index.html:53`:**
```json
"image": "https://www.myblueducky.com/assets/images/logo.png"
```

### HowTo Schema — MISSING ❌
Services section describes multi-step processes but no HowTo schema. Strong AEO signal for "how to" queries.

**Add HowTo for:**
- "How weekly pool service works"
- "How cartridge filter cleaning works"

### Review Schema — MISSING ❌
Three real customer testimonials in `App.tsx:444-458` (Peckham, Boyce, Roth) but no `Review` JSON-LD. Wasted trust signal.

### Article/BlogPosting Schema — MISSING ❌
Blog posts have no Article schema. Add once SSR routes are live.

---

## 4. CONTENT STRUCTURE

### SPA Architecture — CRITICAL AEO RISK ❌
The site is fully client-side React. The HTML served to crawlers is:
```html
<div id="root"></div>
```

**Impact by crawler:**
| Crawler | JS Rendering | Result |
|---------|-------------|--------|
| Googlebot | Yes (Wave 2, delayed) | Indexes content eventually |
| GPTBot | No | Sees empty page |
| ClaudeBot | No | Sees empty page |
| PerplexityBot | No | Sees empty page |
| Bingbot/Copilot | Partial | Inconsistent |

**Note:** Schema in `<head>` is readable without JS rendering — so FAQPage and LocalBusiness schemas ARE visible to crawlers ✅. But all body content (service descriptions, testimonials, about text) is invisible.

**Resolution:** Next.js migration (in progress) will fully resolve this.

### Answer Block Optimization
Content has strong E-E-A-T (Dave's origin story, license numbers, CPO cert) but headings are not in question format. FAQ schema covers this — once SSR is live, add a visible FAQ section in the HTML body to reinforce schema.

---

## 5. IMAGE AUDIT

| Image | Alt Text | Status |
|-------|----------|--------|
| hero_pool_deck.jpg | "Luxury pool deck at sunset" | ✅ |
| logo.png | "My Blue Ducky Logo" | ✅ |
| Unsplash coastal pool (`App.tsx:424`) | "Pristine coastal pool" | ⚠️ Stock image, generic alt |
| Unsplash water detail (`App.tsx:433`) | "Water detail" | ❌ Too vague |
| resort_pool_about.png | "Technical expertise" | ⚠️ Alt doesn't describe image |
| technician_skimming_pool_*.png | From `item.title` var | ✅ |

**Recommendations:**
1. Replace Unsplash stock images with real job-site photos (E-E-A-T signal)
2. `alt="Water detail"` → `alt="Pool water chemistry testing by My Blue Ducky technician"`
3. `alt="Pristine coastal pool"` → `alt="Residential pool maintenance in Surprise AZ"`
4. `alt="Technical expertise"` → `alt="My Blue Ducky pool service team Surprise Arizona"`

---

## 6. SITEMAP

- Only homepage in sitemap — correct for current SPA ✅
- Commented-out entries for future routes are appropriate ✅
- Once Next.js migration adds real routes, uncomment and populate `/services`, `/about`, `/blog/*`

---

## 7. PERFORMANCE (Code-Level Concerns)

| Issue | Severity | Detail |
|-------|---------|--------|
| Tailwind via CDN | 🔴 High | `cdn.tailwindcss.com` loads ~350KB unminified, no purging. Switch to compiled Tailwind in Next.js build. |
| ESM imports from esm.sh | 🟡 Medium | React, framer-motion, lucide-react loaded as separate CDN requests at runtime. Bundle via Vite/Next.js instead. |
| No hero image preload | 🟡 Medium | `hero_pool_deck.jpg` is LCP image. Add `<link rel="preload" as="image">` to improve LCP score. |
| 8 Google Font variants | 🟡 Medium | Consider subsetting or reducing to 4-5 most-used weights. |

---

## PRIORITIZED ACTION PLAN

### 🔴 Quick Wins (Do Today) CHECK IF DONE

| # | Issue | Location | Fix |
|---|-------|----------|-----|
| 1 | Duplicate H1 | `App.tsx:204,210` | Merge into single H1 with `<span>` for second line |
| 2 | Missing og-image.jpg | `/public/` | Create 1200×630 branded image |
| 3 | favicon.ico missing | `/public/` | Convert favicon.png → .ico or update href |
| 4 | Wrong logo path in schema | `index.html:53` | Change to `/assets/images/logo.png` |
| 5 | Stock image alt text | `App.tsx:424,433` | Rewrite with location-specific descriptions |
| 6 | llms.txt link depth | `/public/llms.txt` | Add `#services`, `#contact` anchor fragments |

### 🟡 Medium Priority (This Week)

| # | Issue | Fix |
|---|-------|-----|
| 7 | Add Review schema | Wrap 3 testimonials in JSON-LD `Review` in `index.html` |
| 8 | Add HowTo schema | 2 HowTo schemas for weekly service + filter cleaning |
| 9 | Add 2 more FAQ entries | Equipment repair + years in business |
| 10 | Title tag keyword order | Move geo keyword before brand name |
| 11 | Replace Unsplash images | Real job-site photos for E-E-A-T |
| 12 | aggregateRating accuracy | Verify 120 reviews is accurate, or remove/update |

### 🟢 Long-term (Next.js Migration — In Progress)

| # | Issue | Fix |
|---|-------|-----|
| 13 | SPA → SSR | Complete Next.js migration — unlocks AI bot content visibility |
| 14 | Article schema | BlogPosting schema per post once routes are live |
| 15 | Sitemap expansion | Uncomment and populate all page routes |
| 16 | Tailwind CDN → compiled | PostCSS build in Next.js eliminates CDN dependency |
| 17 | Bundle JS | Replace esm.sh with npm packages via Next.js bundler |
| 18 | Preload hero image | `<link rel="preload">` for LCP improvement |
| 19 | Visible FAQ section | Render FAQ questions as HTML body content (not only schema) |

---

## AI VISIBILITY SCORE (Current Estimate)

| Platform | Score | Notes |
|----------|-------|-------|
| Google AI Overviews | 2/3 | Google renders JS; FAQPage schema strong signal |
| ChatGPT (Bing) | 1/3 | Schema in `<head>` readable; body invisible |
| Perplexity | 0-1/3 | No JS rendering; body content invisible |
| Claude | 1/3 | llms.txt present; body content invisible |
| Copilot (Bing) | 1/3 | Same as ChatGPT |

**Post-Next.js migration estimated score: 2–3/3 across all platforms**
