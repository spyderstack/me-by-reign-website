// ─── Enriched Product Data ────────────────────────────────────────────────────
// Rich detail data for /products/[handle] pages.
// Keyed by handle to match the MOCK_PRODUCTS in lib/shopify/client.ts.
// When Shopify is connected, this will be replaced by Storefront API data.

export interface ProductDetail {
  handle: string
  name: string
  category: string
  price: string
  images: string[]
  description: string
  fullDescription: string
  size: string
  ingredients: string[]
  benefits: string[]
  howToUse: string
}

export const PRODUCT_DETAILS: ProductDetail[] = [
  {
    handle: 'golden-elixir-serum',
    name: 'Golden Elixir Serum',
    category: 'Skincare',
    price: '$120.00',
    images: [
      'https://images.unsplash.com/photo-1768483018807-bd0b9ab86539?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      'https://images.unsplash.com/photo-1761746556491-d8c0123a6f03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    ],
    description: 'Our signature botanical face serum — a radiance ritual in a bottle.',
    fullDescription: 'The Golden Elixir Serum is ME by Reign\'s most celebrated formula — a luxurious, small-batch blend of cold-pressed botanical oils that works to restore radiance, reduce the appearance of fine lines, and deeply nourish the skin barrier. Handcrafted in limited quantities to ensure freshness and potency.',
    size: '30ml / 1 fl oz',
    ingredients: [
      'Cold-Pressed Rosehip Seed Oil',
      'Bulgarian Rose Otto Essential Oil',
      'Organic Jojoba Oil',
      'Vitamin E (Tocopherol)',
      'Sea Buckthorn CO₂ Extract',
      'Frankincense Essential Oil',
    ],
    benefits: [
      'Visibly reduces fine lines and hyperpigmentation',
      'Deep hydration without heaviness',
      'Brightens and evens skin tone',
      'Rich in natural Vitamin A (retinoids)',
      'Strengthens the lipid barrier',
      'Calms redness and reactivity',
    ],
    howToUse: 'Press 3–4 drops onto clean, damp skin each morning and evening. Warm between fingertips first, then press gently into face and neck. Follow with a moisturizer if desired. A little goes a long way.',
  },
  {
    handle: 'oat-honey-soap',
    name: 'Oat & Honey Artisanal Soap',
    category: 'Skincare',
    price: '$28.00',
    images: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    ],
    description: 'A gentle cold-process soap bar that cleanses without stripping.',
    fullDescription: 'Cold-process crafted in small batches, our Oat & Honey Artisanal Soap combines the soothing power of colloidal oats with the humectant properties of raw local honey. Each bar is hand-poured and cured for four weeks, resulting in a dense, long-lasting lather that respects the skin barrier.',
    size: '4 oz bar',
    ingredients: [
      'Olive Oil',
      'Coconut Oil',
      'Colloidal Oat Powder',
      'Raw Local Honey',
      'Shea Butter',
      'Lavender Essential Oil',
    ],
    benefits: [
      'Gentle, non-stripping cleanse',
      'Soothes dry and sensitive skin',
      'Balances moisture without drying',
      'Natural humectant from raw honey',
      'Free from synthetic detergents',
      'Biodegradable formula',
    ],
    howToUse: 'Wet hands and bar. Work into a lather and apply to face or body in gentle circular motions. Rinse with warm water. Keep bar dry between uses for longevity.',
  },
  {
    handle: 'noir-fig-amber-candle',
    name: 'Noir Fig & Amber Candle',
    category: 'Home Decor',
    price: '$85.00',
    images: [
      'https://images.unsplash.com/photo-1603905485372-c8e96a3a4aaa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      'https://images.unsplash.com/photo-1602528495494-c9b82d88a94b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    ],
    description: 'A deep, complex fragrance for your most intentional space.',
    fullDescription: 'The Noir Fig & Amber Candle begins with the green, almost stem-like sharpness of fresh fig leaf and deepens into warm amber resin and sandalwood. Hand-poured into a matte black vessel designed to double as sculpture once the wax is spent. Made with 100% natural coconut-soy wax and cotton wicks.',
    size: '9 oz / approx. 60-hour burn',
    ingredients: [
      '100% Natural Coconut-Soy Wax',
      'Cotton Wick (lead-free)',
      'Fig Leaf Absolute',
      'Benzoin Resin',
      'Sandalwood Essential Oil',
      'Amber Fragrance (phthalate-free)',
    ],
    benefits: [
      'Clean burn — no paraffin or petroleum',
      'Transforms the atmosphere of any room',
      'Vessel designed for reuse',
      'Long 60-hour burn time',
      'Phthalate-free fragrance',
      'Supports nervous system relaxation',
    ],
    howToUse: 'Trim wick to ¼ inch before each use. Allow wax to pool to the edges on first burn (approximately 2 hours) to prevent tunneling. Never burn longer than 4 hours at a time. Keep away from drafts.',
  },
  {
    handle: 'minimalist-sculptural-vase',
    name: 'Minimalist Sculptural Vase',
    category: 'Home Decor',
    price: '$150.00',
    images: [
      'https://images.unsplash.com/photo-1772442364571-c340bcc2efc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      'https://images.unsplash.com/photo-1771287490580-0d75787b278a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    ],
    description: 'Hand-thrown stoneware — each piece is one of a kind.',
    fullDescription: 'The Minimalist Sculptural Vase is hand-thrown by an Atlanta-based ceramicist and finished with a matte natural glaze that emphasizes the unpredictable beauty of the clay. No two are identical. The organic form works with fresh botanicals, dried arrangements, or simply as a sculptural object on its own.',
    size: '12" height × 5" diameter',
    ingredients: [
      'Hand-thrown Stoneware Clay',
      'Natural Matte Glaze',
      'Kiln-fired to Cone 6',
      'Food-safe interior glaze',
    ],
    benefits: [
      'One-of-a-kind sculptural piece',
      'Works with fresh or dried botanicals',
      'Food-safe interior if used as a vessel',
      'Supports local Atlanta ceramicists',
      'Timeless natural aesthetic',
      'Museum-quality craftsmanship',
    ],
    howToUse: 'Clean interior with warm water only — avoid soap for unglazed surfaces. Display in a location away from direct sunlight to preserve glaze integrity. Each piece is unique and will vary slightly from the images shown.',
  },
  {
    handle: 'velvet-rose-body-oil',
    name: 'Velvet Rose Body Oil',
    category: 'Skincare',
    price: '$68.00',
    images: [
      'https://images.unsplash.com/photo-1573575155376-b5010099301b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    ],
    description: 'A silky, fast-absorbing body oil with a true rose botanical heart.',
    fullDescription: 'The Velvet Rose Body Oil is built around Rosa Damascena otto — real Bulgarian rose essential oil, not a synthetic duplicate. Suspended in a blend of fast-absorbing sweet almond and grapeseed oils, it leaves skin luminous but never greasy. A ritual object as much as a skincare product.',
    size: '100ml / 3.4 fl oz',
    ingredients: [
      'Rosa Damascena Essential Oil (Bulgaria)',
      'Sweet Almond Oil',
      'Grapeseed Oil',
      'Vitamin E',
      'Jojoba Oil',
      'Rosehip Seed Oil',
    ],
    benefits: [
      'True rose scent — never synthetic',
      'Non-greasy, fast absorption',
      'Deeply nourishes dry skin',
      'Natural mood-lifting aromatherapy',
      'Strengthens the skin barrier',
      'Suitable for body and hands',
    ],
    howToUse: 'Apply to damp skin immediately after bathing for best absorption. Massage in upward strokes toward the heart. Can also be used as a hand treatment or scalp oil. A little goes a long way.',
  },
  {
    handle: 'linen-cloud-pillowcase',
    name: 'Linen Cloud Pillowcase Set',
    category: 'Home Decor',
    price: '$95.00',
    images: [
      'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    ],
    description: 'European flax linen — breathable, temperature-regulating, effortlessly beautiful.',
    fullDescription: 'Woven from 100% European flax linen, the Linen Cloud Pillowcase Set offers the kind of sleep quality that most bedding cannot. Linen naturally regulates temperature, becomes softer with each wash, and develops a beautifully lived-in texture over time. Set includes two standard pillowcases in an envelope closure.',
    size: 'Set of 2 — Standard (20" × 26") or King (20" × 36")',
    ingredients: [
      '100% European Flax Linen',
      'OEKO-TEX® Certified',
      'Stone-washed finish',
      'Envelope closure — no buttons',
    ],
    benefits: [
      'Temperature-regulating — cool in summer, warm in winter',
      'Softens with every wash',
      'Hypoallergenic — ideal for sensitive skin',
      'Naturally anti-bacterial',
      'Biodegradable and sustainable',
      'Ages beautifully',
    ],
    howToUse: 'Machine wash cold with mild detergent. Tumble dry low or line dry — linen is strongest when air-dried. Remove promptly to minimize wrinkling, or enjoy the relaxed texture. Iron on medium heat if preferred.',
  },
  {
    handle: 'obsidian-face-roller',
    name: 'Obsidian Face Roller',
    category: 'Skincare',
    price: '$42.00',
    images: [
      'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    ],
    description: 'Volcanic obsidian, hand-polished to a mirror finish. A tool and a ritual object.',
    fullDescription: 'The Obsidian Face Roller uses the naturally cool, smooth surface of volcanic obsidian to depuff, promote lymphatic drainage, and encourage product absorption. Unlike jade or quartz, obsidian retains cold longer. Store in the refrigerator for an intensified cooling effect.',
    size: 'Dual-ended: large roller (face/neck) + small roller (eye/lip)',
    ingredients: [
      'Natural Volcanic Obsidian',
      'Stainless steel frame',
      'Hand-polished finish',
    ],
    benefits: [
      'Promotes lymphatic drainage',
      'Depuffs and contours',
      'Improves serum absorption',
      'Naturally stays cool',
      'Soothes inflammation',
      'A meditative ritual tool',
    ],
    howToUse: 'Apply a serum or oil first. Roll outward from the center of the face — cheeks toward ears, forehead toward temples, neck downward. Use gentle pressure. Roll over each area 3–5 times. Clean with a damp cloth after each use.',
  },
  {
    handle: 'cedar-sage-room-mist',
    name: 'Cedar & Sage Room Mist',
    category: 'Home Decor',
    price: '$55.00',
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    ],
    description: 'A single spritz that transforms a room into a sanctuary.',
    fullDescription: 'The Cedar & Sage Room Mist opens with the cleansing, almost medicinal brightness of white sage and settles into warm cedarwood and vetiver. Formulated with a pure alcohol base that carries the essential oils evenly and disperses them without residue. Designed to shift the energetic and emotional quality of a space immediately.',
    size: '100ml / 3.4 fl oz',
    ingredients: [
      'Organic Cane Alcohol',
      'White Sage Essential Oil',
      'Cedarwood Atlas Essential Oil',
      'Vetiver Essential Oil',
      'Bergamot Essential Oil',
      'Distilled Water',
    ],
    benefits: [
      'Instant atmosphere transformation',
      'Naturally antimicrobial (sage)',
      'No synthetic fragrance or carriers',
      'Promotes calm and mental clarity',
      'Residue-free formula',
      'Safe on most textiles',
    ],
    howToUse: 'Shake gently before use. Mist into the air at arm\'s length, allowing the spray to fall naturally into a room. Can also be spritzed onto linens. Avoid spraying directly onto wood surfaces or electronic equipment.',
  },
]

export function getProductByHandle(handle: string): ProductDetail | undefined {
  return PRODUCT_DETAILS.find((p) => p.handle === handle)
}
