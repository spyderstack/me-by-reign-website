import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Journal — Botanical Wellness & Rituals',
  description:
    'Explore articles on botanical wellness, skincare rituals, and luxury living from ME byReign. Tips, guides, and inspiration for your daily ritual.',
  openGraph: {
    title: 'The Journal — ME byReign',
    description:
      'Insights on botanical wellness, skincare rituals, and luxury living from ME byReign.',
    url: '/blog',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Journal — ME byReign',
    description:
      'Botanical wellness, skincare rituals, and luxury living.',
  },
  alternates: {
    canonical: '/blog',
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
