# PureSeed image brief (25 images)

**Already done:** the supplied photos (SEEDS.zip) now fill `hero.jpg`, `sesame-seeds.jpg`, `sesame-oil.jpg`, both sesame banners and eight service images; the PureSeed logo set (`logo.png`, `logo-light.png`, `logo-tagline.png`, `logo-mark.png`), `favicon.png` and `og-default.jpg` are built from the supplied brand files. The 25 images below are still placeholders.

Put every file in `public/images/` using the **exact filename** shown. The site already points to these names, and the current files are labelled placeholders that you overwrite. No code change is needed if you keep the same name and extension.

## Option 1: download open-licence photos automatically (no API key)
Run `npm install`, then `npm run fetch-images`. It searches Openverse (a free index of openly licensed photos), downloads a match for every slot below, crops it to the exact size, and writes credits to `public/images/CREDITS.md`. Notes:
- Results are mostly Flickr and Wikimedia photos, so quality varies and some will be off-target. Review them, and re-pick one with `-- --only=hero.jpg`.
- Most licences (CC BY) require attribution. Keep `CREDITS.md`, or use `-- --safe` for CC0/public-domain images only, which need no credit but give fewer matches.
- The five product images need a clean white background, which this search rarely finds. Those are the best ones to make with AI (prompts below) or replace with your own photos.
- Anonymous Openverse access is rate-limited. If it says so, wait and re-run; finished files are kept.
- If you later get a Pexels key, set `PEXELS_API_KEY` and the script uses Pexels instead.

## Option 2: use the brief manually
(How to use this brief)
- **Search** = keywords for Unsplash / Pexels / Pixabay. Check the licence allows commercial use.
- **Prompt** = the subject for an AI image tool (Midjourney, Flux, DALL·E, Ideogram, etc.). **Append the matching style suffix below to every prompt** so the whole site looks like one set.
- Generate at the aspect ratio shown, then crop and resize to the listed size. Compress with Squoosh or TinyPNG; aim for under 250 KB per photo. Next.js converts to WebP/AVIF automatically.

**PHOTO suffix** (everything except product cutouts):
> Photorealistic documentary photograph, natural daylight, muted earthy greens with warm honey-amber accents, shallow depth of field, authentic East African setting, high detail, no text, no watermarks, no logos.

**CUTOUT suffix** (the 5 product images):
> Studio product photograph, centered, shot slightly from above, soft diffused light, gentle natural shadow, plain pure white background, crisp detail, premium food-commodity catalogue look, square 1:1, no text, no logos, no brand labels.
Then remove the background (remove.bg or Photoroom) and save as a transparent PNG.

**Be careful with authenticity.** Buyers in the US will ask about facilities and certifications. Use AI images for mood, but replace the processing, warehouse, lab and port images with real photos of PureSeed's own operations as soon as you have them. Don't present AI images as real facilities.

---

## A. Homepage (1)

### 1. `hero.jpg`: homepage hero
Size: 1600×1200 JPG (4:3).
Search: `agricultural products flat lay sesame cashew peanuts honey`
Prompt: Overhead flat-lay of five ceramic bowls on a neutral linen surface holding white sesame seeds, golden sesame oil, whole cashew kernels, shelled groundnuts and raw honey with a wooden dipper, a few loose seeds and nuts scattered, calm premium feel. + PHOTO suffix

---

## B. Product cutouts (5), used on product cards, product pages and the portfolio table
Size: 1000×1000 transparent PNG each.

### 2. `sesame-seeds.jpg` (done, supplied photo)
Search: `sesame seeds pile isolated white background`
Prompt: A neat heap of clean hulled white sesame seeds with a few seeds scattered around and a small wooden scoop. + CUTOUT suffix

### 3. `sesame-oil.jpg` (done, supplied photo)
Search: `sesame oil bottle isolated`
Prompt: A clear glass bottle of golden sesame oil, unlabeled, with a small bowl of sesame seeds beside it. + CUTOUT suffix

### 4. `cashew-nuts.png`
Search: `cashew kernels pile isolated white background`
Prompt: A loose mound of whole raw cashew kernels with two or three cashew nuts in their shells next to it. + CUTOUT suffix

### 5. `groundnuts.png`
Search: `peanuts groundnuts isolated white background`
Prompt: A loose pile of shelled raw groundnuts with a few peanuts still in their shells. + CUTOUT suffix

### 6. `organic-honey.png`
Search: `honey jar dipper isolated`
Prompt: A glass jar of golden raw honey, unlabeled, with a wooden honey dipper resting on top and a slow drip of honey. + CUTOUT suffix

---

## C. Product page banners (5)
Size: 1600×700 JPG (about 2.3:1). Shown full width at the bottom of each product page.

### 7. `sesame-seeds-field.jpg`
Search: `sesame field harvest africa`
Prompt: Ripe sesame plants with seed pods in a field at golden hour, smallholder farmland in Tanzania, a farmer in the soft-focus background. + PHOTO suffix

### 8. `sesame-oil-pressing.jpg`
Search: `sesame oil pressing production`
Prompt: Golden sesame oil pouring from an oil press into a stainless steel container in a clean, bright processing facility, worker wearing a hairnet and gloves. + PHOTO suffix

### 9. `cashew-nuts-processing.jpg`
Search: `cashew processing factory sorting`
Prompt: Workers in hairnets, aprons and gloves hand-sorting cashew kernels at a clean steel table in a bright processing facility. + PHOTO suffix

### 10. `groundnuts-harvest.jpg`
Search: `groundnut harvest africa farmers drying`
Prompt: Farmers laying freshly harvested groundnut pods to dry in the sun on a tarpaulin, rural East Africa, warm light. + PHOTO suffix

### 11. `organic-honey-apiary.jpg`
Search: `beekeeper hive africa honey harvest`
Prompt: A beekeeper in a protective suit lifting a frame of honeycomb from wooden hives in African woodland, bees visible, dappled light. + PHOTO suffix

---

## D. Service page banners (7)
Size: 1600×800 JPG (2:1). Shown at the top of each service page and cropped to 3:2 on the Services overview.

### 12. `service-sourcing.jpg`: Agricultural Sourcing
Search: `farmer hands holding cashew nuts`
Prompt: Close-up of a farmer's hands holding raw cashew nuts, a green orchard softly blurred behind. + PHOTO suffix

### 13. `service-bulk.jpg`: Bulk Supply
Search: `warehouse sacks pallets stacked`
Prompt: Rows of neatly stacked 50 kg sacks of agricultural produce on pallets inside a bright, tidy warehouse. + PHOTO suffix

### 14. `service-processing.jpg`: Processing & Manufacturing
Search: `food processing plant conveyor stainless steel`
Prompt: Clean stainless steel food processing line with seeds moving along a conveyor, workers in hairnets and white coats in the background. + PHOTO suffix

### 15. `service-quality.jpg`: Quality & Traceability
Search: `quality inspector seeds sample tablet`
Prompt: A quality inspector in a lab coat examining a sample of sesame seeds in a dish while recording details on a tablet. + PHOTO suffix

### 16. `service-packaging.jpg`: Flexible Packaging Solutions
Search: `packaging machine filling bags food`
Prompt: Packaging line filling and sealing bags of nuts, close-up on the sealer, clean modern facility. + PHOTO suffix

### 17. `service-private-label.jpg`: Private Label
Search: `blank packaging mockup food pouch jars`
Prompt: Blank unbranded retail pouches and glass jars of sesame, cashews and honey arranged on a clean table with color swatches and label samples. + PHOTO suffix

### 18. `service-export.jpg`: Export & Logistics
Search: `container ship port sunrise dar es salaam`
Prompt: A container ship docked at a busy African port at sunrise, stacked containers and cranes. + PHOTO suffix

---

## E. Service page secondary images (7)
Size: 900×630 JPG (10:7). Shown beside the "What we offer" style list on each service page.

### 19. `service-sourcing-origin.jpg`
Search: `aerial farmland tanzania`
Prompt: Aerial view of a patchwork of smallholder farms and fields in East Africa, green and golden plots. + PHOTO suffix

### 20. `service-bulk-warehouse.jpg`
Search: `forklift loading sacks truck`
Prompt: A forklift moving a pallet of sacks toward a truck at a warehouse loading bay. + PHOTO suffix

### 21. `service-processing-grading.jpg`
Search: `seed sorting machine grading`
Prompt: Close-up of an optical sorting machine grading sesame seeds as they fall in a stream, sharp focus on the seeds. + PHOTO suffix

### 22. `service-quality-lab.jpg`
Search: `food laboratory testing samples moisture`
Prompt: A laboratory bench with labelled sample jars of seeds and nuts, a precision scale and a moisture meter. + PHOTO suffix

### 23. `service-packaging-bulk.jpg`
Search: `cartons bulk bags export stacked`
Prompt: Stacked brown cartons and large woven bulk bags on pallets, shrink-wrapped and ready for export. + PHOTO suffix

### 24. `service-private-label-packs.jpg`
Search: `packaging design label mockup hands`
Prompt: Designer's hands arranging blank label mockups and sample pouches on a desk, bright studio light. + PHOTO suffix

### 25. `service-export-port.jpg`
Search: `loading shipping container sacks dock`
Prompt: Dock workers loading sacks into an open 20-foot shipping container at a port. + PHOTO suffix

---

## Where each image appears
| Images | Used on |
|---|---|
| 1 | Homepage hero |
| 2–6 | Homepage product grid, /shop, product pages, About, Portfolio table |
| 7–11 | Bottom banner of each product page |
| 12–18 | Service page banner and the Services overview cards |
| 19–25 | Second image on each service page |
