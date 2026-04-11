import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/cart', '/api/'],
    },
    sitemap: 'https://me-by-reign.com/sitemap.xml',
  }
}
