import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Story — The Botanical Journey',
  description:
    'Discover the story behind ME byReign — artisan skincare and luxury home decor rooted in botanical wisdom and handcrafted with intention.',
  openGraph: {
    title: 'Our Story — ME byReign',
    description:
      'Born from a deep reverence for nature\'s wisdom and centuries-old botanical traditions. Learn about the heart behind ME byReign.',
    url: '/our-story',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Story — ME byReign',
    description:
      'Born from a deep reverence for nature\'s wisdom. The story behind ME byReign.',
  },
  alternates: {
    canonical: '/our-story',
  },
}

export default function OurStoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
