import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us — Get in Touch',
  description:
    'Reach out to ME byReign with questions about our handmade skincare, luxury candles, and home décor. We\'d love to hear from you.',
  openGraph: {
    title: 'Contact Us — ME byReign',
    description:
      'Have a question about our artisan skincare or luxury home décor? Get in touch with the ME byReign team.',
    url: '/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us — ME byReign',
    description:
      'Have a question about our products? Get in touch with ME byReign.',
  },
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
