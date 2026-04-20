// ─── Enriched Blog Post Data ──────────────────────────────────────────────────
// Used by /blog/[id]/page.tsx for full article pages.
// The blog listing page (app/blog/page.tsx) uses its own inline data for images;
// this file stores the full article content keyed by the same integer IDs.

export interface BlogPostContent {
  id: number
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  image: string
  readTime: string
  author: string
  content: {
    intro: string
    sections: { heading: string; text: string }[]
    conclusion: string
  }
}

export const BLOG_POSTS: BlogPostContent[] = [
  {
    id: 1,
    slug: 'ancient-art-of-botanical-skincare',
    title: 'The Ancient Art of Botanical Skincare',
    excerpt: 'Exploring time-honored traditions from Mediterranean herbalists and how they inform our modern formulations.',
    date: 'March 28, 2026',
    category: 'Heritage',
    image: 'https://images.unsplash.com/photo-1763742259246-80eb61e760d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    readTime: '8 min read',
    author: 'Reign',
    content: {
      intro: 'Long before serums came in glass droppers and moisturizers had fifty-step routines, people across the world were tending to their skin with what the earth provided. Flowers, roots, resins, and oils — ingredients that carried not just chemistry but memory.',
      sections: [
        {
          heading: 'Mediterranean Roots',
          text: 'The herbalists of ancient Greece, Egypt, and the Levant were the first cosmetic chemists. Cleopatra famously bathed in rose water and milk. Roman physicians catalogued the healing properties of lavender, sage, and calendula. These weren\'t vanity rituals — they were medicine, ceremony, and self-preservation woven into one.',
        },
        {
          heading: 'West African Traditions',
          text: 'Closer to our own roots at ME byReign, the botanical traditions of West Africa are equally profound. Shea butter — pressed by hand from the nut of the Vitellaria tree — has been used for centuries to protect skin from the harmattan winds. Black soap, born from plantain ash and palm kernel oil, remains one of the most effective cleansers the world has ever produced.',
        },
        {
          heading: 'How We Translate Tradition into Formula',
          text: 'At ME byReign, we don\'t look to these traditions as aesthetic inspiration — we look to them as scientific precedent. Every botanical we use was used by someone before us, for good reason. Our Golden Elixir Serum contains cold-pressed rosehip oil not because it photographs well, but because its natural retinoid content has been validated across centuries of use.',
        },
        {
          heading: 'The Modern Return',
          text: 'The global clean beauty movement is, in many ways, a return. Consumers are reading labels, demanding transparency, and gravitating back toward ingredients they can name. It\'s the oldest instinct in skincare: if it comes from the earth and your grandmother could pronounce it, it probably works.',
        },
      ],
      conclusion: 'When you press a few drops of serum into your skin each morning, you are participating in a ritual that stretches back thousands of years. That continuity is not incidental — it\'s the whole point.',
    },
  },
  {
    id: 2,
    slug: 'mindful-morning-ritual',
    title: 'Creating a Mindful Morning Ritual',
    excerpt: 'How to transform your skincare routine into a grounding practice that sets the tone for your entire day.',
    date: 'March 21, 2026',
    category: 'Wellness',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    readTime: '5 min read',
    author: 'Reign',
    content: {
      intro: 'The most powerful wellness practice isn\'t the most expensive supplement or the hardest workout. It\'s the quality of attention you bring to the ordinary moments — the ones that happen every day whether you\'re paying attention or not.',
      sections: [
        {
          heading: 'Start Before You Reach for Your Phone',
          text: 'The temptation to check email or social media before your feet hit the floor is a modern reflex worth resisting. Give yourself the first five minutes. Sit with the quiet. Let your nervous system ease into the day before the world starts asking things of you.',
        },
        {
          heading: 'Make the Bathroom a Sanctuary',
          text: 'Light a candle. Open a window. Put on music that calms rather than hypes. The bathroom is one of the few places in a home where you can be genuinely alone with yourself — treat it accordingly. Our Noir Fig & Amber Candle was formulated specifically to transform this daily space into something that feels intentional.',
        },
        {
          heading: 'Slow Down Every Step',
          text: 'Skincare done in a hurry is still skincare, but it\'s a different experience entirely. When you massage a serum into your face, feel the warmth of it transferring. When you splash water, let it wake rather than shock you. The products matter, but the attention you bring to them matters just as much.',
        },
        {
          heading: 'The Two-Minute Rule',
          text: 'If your mornings are chaotic, try the two-minute rule: give yourself just two minutes of intentional stillness somewhere in your routine. After cleansing, before moisturizing. Just pause. Breathe. This small act of reclaiming presence can shift the entire tenor of your day.',
        },
      ],
      conclusion: 'A morning ritual isn\'t about perfection or elaborate protocols. It\'s about choosing, deliberately, how you begin. The products you select and the care you bring to applying them are a daily vote for the kind of life you want to live.',
    },
  },
  {
    id: 3,
    slug: 'power-of-rose-in-natural-beauty',
    title: 'The Power of Rose in Natural Beauty',
    excerpt: 'Discover why rose has been treasured for centuries and how we harness its properties in our signature serum.',
    date: 'March 14, 2026',
    category: 'Ingredients',
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    readTime: '6 min read',
    author: 'Reign',
    content: {
      intro: 'Of all the botanicals available to a formulator, rose is perhaps the most storied — and the most misunderstood. It\'s easy to dismiss it as perfumery, as decoration. But strip away the romance and what remains is an extraordinarily complex plant with a chemistry that modern dermatology continues to validate.',
      sections: [
        {
          heading: 'Rosa Damascena vs. Rosa Canina',
          text: 'The rose family is vast, but two varieties dominate skincare: Rosa Damascena, the Damask rose, known for its essential oil and hydrating properties; and Rosa Canina, the wild rosehip, whose seed oil is one of nature\'s richest sources of natural trans-retinoic acid. They work differently and both are worth knowing.',
        },
        {
          heading: 'What Rose Actually Does for Skin',
          text: 'Rose water tones and balances skin\'s pH while offering mild anti-inflammatory action — particularly useful for redness and reactive skin types. Rosehip seed oil delivers essential fatty acids (linoleic and oleic) that repair the lipid barrier, reduce hyperpigmentation, and slow visible aging. Together, they represent a complete approach to skin health from a single botanical family.',
        },
        {
          heading: 'How We Source Ours',
          text: 'The rosa damascena in our Velvet Rose Body Oil is sourced from small farms in the Rose Valley of Bulgaria, where the growing conditions — cool nights, mineral-rich soil, morning harvests — produce oil of a quality that industrially-grown rose cannot match. It is expensive to source this way. It is worth it.',
        },
        {
          heading: 'The Emotional Dimension',
          text: 'Fragrance is processed in the limbic system — the part of the brain responsible for emotion and memory. Rose, in particular, has been clinically shown to reduce cortisol levels and promote a sense of warmth and ease. This is not incidental to our formulations. It is intentional. We believe skincare that makes you feel something is skincare that works on more levels than one.',
        },
      ],
      conclusion: 'Rose has survived five thousand years of use because it deserves to. It is not a trend. It is the foundation of botanical beauty — and one we will continue to build on at ME byReign.',
    },
  },
  {
    id: 4,
    slug: 'spa-energy-into-your-home',
    title: 'Bringing Spa Energy Into Your Home',
    excerpt: 'Simple ways to create a sanctuary atmosphere through scent, light, and intentional design.',
    date: 'March 7, 2026',
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1600857062241-98e5dba7f417?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    readTime: '7 min read',
    author: 'Reign',
    content: {
      intro: 'The spa is not a place. It\'s a feeling — a particular quality of air and light and quiet that makes the body exhale and the mind go still. The good news is that you don\'t need a reservation, a robe, or a credit card to access it. You need an understanding of what creates that feeling.',
      sections: [
        {
          heading: 'The Role of Scent',
          text: 'Scent is the fastest route to the nervous system. A diffuser running cedarwood and eucalyptus in a bathroom changes the entire experience of being in that bathroom. Our Cedar & Sage Room Mist was developed specifically for this purpose — a single spritz shifts the atmosphere of a room within seconds. The botanicals interact with your body\'s stress response before you even consciously register the scent.',
        },
        {
          heading: 'Light as a Design Element',
          text: 'Overhead lighting is the enemy of sanctuary. Soft, warm light at eye level or below — candles, low lamps, the glow of something small and steady — tells your nervous system that the workday is over. This is not decoration. It is neurological signaling. Our Noir Fig & Amber Candle, in its matte black vessel, is designed to double as sculpture.',
        },
        {
          heading: 'The Clear Surface Principle',
          text: 'Clutter activates the same cognitive load as an unfinished task. One clear surface — a tray with your most-used products, a single beautiful object, nothing else — does more for the feeling of a space than any product. The Minimalist Sculptural Vase exists to be that object: something that earns its space by being genuinely beautiful.',
        },
        {
          heading: 'Textiles and Temperature',
          text: 'The spa experience is also deeply tactile. Our Linen Cloud Pillowcase Set was developed from a simple premise: linen breathes in a way cotton doesn\'t. It regulates temperature, ages into softness, and holds the particular quality of coolness that good sleep requires. Luxury, in this case, is simply the right material used well.',
        },
      ],
      conclusion: 'The sanctuary you\'ve been seeking doesn\'t require travel or expense. It requires attention — and a few objects chosen with care. Start with one corner of one room. Let the feeling grow from there.',
    },
  },
  {
    id: 5,
    slug: 'understanding-clean-beauty',
    title: 'Understanding Clean Beauty',
    excerpt: "What 'clean' really means, why it matters, and how to navigate the overwhelming world of natural skincare.",
    date: 'February 28, 2026',
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    readTime: '10 min read',
    author: 'Reign',
    content: {
      intro: '"Clean beauty" is everywhere — and it means almost nothing. The term is unregulated in the United States. Any brand can print it on a label without substantiating the claim. Understanding what it actually means requires looking past marketing and into chemistry.',
      sections: [
        {
          heading: 'What "Clean" Actually Means',
          text: 'In its most honest form, clean beauty refers to products formulated without ingredients that carry meaningful risk of harm — not to average users in typical usage, but to sensitive individuals, to accumulation over time, or to the environment. The commonly avoided list includes parabens, synthetic fragrances, formaldehyde-releasing preservatives, PEGs, and certain silicones. The science on all of these is nuanced, but the precautionary principle makes sense.',
        },
        {
          heading: 'Natural Does Not Mean Safe',
          text: 'Poison ivy is natural. So is arsenic. The appeal to nature fallacy does real damage in the clean beauty space, because it leads consumers to accept ingredients they shouldn\'t (like certain essential oils at high concentrations) and reject ingredients they should welcome (like well-studied synthetic preservatives that prevent bacterial contamination). Formulation is chemistry. Good chemistry, whether natural or synthetic, is safe. Bad chemistry, from either source, is not.',
        },
        {
          heading: 'How to Read an Ingredients List',
          text: 'Ingredients are listed by concentration, from highest to lowest. The first five or six ingredients make up the bulk of the product. If your "rose serum" lists water, glycerin, dimethicone, and fragrance before any mention of rose, the rose is decoration. At ME byReign, our key botanicals appear in the top third of every formula — not in the tail as marketing.',
        },
        {
          heading: 'What ME byReign Commits To',
          text: 'We avoid: synthetic fragrance, parabens, PEGs, sulfates in cleansers, and petroleum derivatives. We use: cold-pressed plant oils, botanical extracts at efficacious concentrations, naturally-derived preservatives, and essential oils at safe and considered dilutions. We test. We reformulate when we learn something new. Clean, to us, is a practice — not a label.',
        },
      ],
      conclusion: 'The most powerful thing you can do as a consumer is read the ingredients list before reading the brand\'s about page. Let the chemistry speak first. The story should match it.',
    },
  },
  {
    id: 6,
    slug: 'seasonal-skincare-spring-edition',
    title: 'Seasonal Skincare: Spring Edition',
    excerpt: "Adjusting your routine as the seasons change to support your skin's evolving needs.",
    date: 'February 21, 2026',
    category: 'Skincare',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    readTime: '6 min read',
    author: 'Reign',
    content: {
      intro: 'Skin is not static. It responds to humidity, temperature, UV exposure, and the particular biology of each season. A routine built for January in Atlanta is a different formula from one that serves you in May. Most people use the same products year-round and wonder why their skin feels inconsistent.',
      sections: [
        {
          heading: 'What Happens in Spring',
          text: 'As temperatures rise and humidity increases, sebaceous glands become more active. The skin begins producing more oil in response to warmth — a mechanism designed to protect it, but one that can lead to congestion if your routine doesn\'t accommodate it. This is the season to lighten, not strip.',
        },
        {
          heading: 'Swap Weights, Not Products',
          text: 'The transition doesn\'t require buying a new routine. It requires adjusting density. If you\'ve been using a rich night cream, move to a lighter oil — our Velvet Rose Body Oil applied sparingly to the face is a beautiful spring alternative, sheer enough to let skin breathe but nourishing enough to maintain barrier integrity. If you\'ve been double-layering serums, choose one.',
        },
        {
          heading: 'Spring Cleaning for Your Skin',
          text: 'Spring is a natural moment for gentle exfoliation — clearing the congestion that winter layers of moisturizer and dry skin cells can leave behind. We recommend enzyme-based exfoliation over physical scrubs, and never more than twice a week. The goal is clarity, not trauma.',
        },
        {
          heading: 'SPF as a Non-Negotiable',
          text: 'UV exposure increases dramatically in spring — not just in energy but in behavior. We spend more time outside. Windows are open. This is when SPF most often gets neglected, and it\'s also when the damage compounds. Sunscreen is cleancare, not skincare — it\'s the single most preventative step in any routine, in any season.',
        },
      ],
      conclusion: 'Your skin knows the season even before you do. Pay attention to what it\'s telling you. Ease into spring with lighter textures, consistent exfoliation, and non-negotiable SPF — and your skin will arrive in summer looking like it spent the year being cared for. Because it did.',
    },
  },
]

// Backward-compatible alias — BlogPreview.tsx and other existing imports use this name
export const blogPosts = BLOG_POSTS
