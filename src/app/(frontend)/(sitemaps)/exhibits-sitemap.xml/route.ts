import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'

const getExhibitsSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://example.com'

    const results = await payload.find({
      collection: 'exhibits',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: {
        _status: {
          equals: 'published',
        },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const dateFallback = new Date().toISOString()

    return results.docs
      .filter((exhibit) => Boolean(exhibit.slug))
      .map((exhibit) => ({
        loc: `${SITE_URL}/exhibits/${exhibit.slug}`,
        lastmod: exhibit.updatedAt || dateFallback,
      }))
  },
  ['exhibits-sitemap'],
  {
    tags: ['exhibits-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getExhibitsSitemap()

  return getServerSideSitemap(sitemap)
}
