import { getPayload } from '@/lib/payload'
import AdBanner from './AdBanner'

type AdPosition = 'header-banner' | 'sidebar' | 'in-article' | 'mobile-banner' | 'footer-banner'

interface AdBannerServerProps {
  position: AdPosition
}

export default async function AdBannerServer({ position }: AdBannerServerProps) {
  try {
    const payload = await getPayload()
    const now = new Date().toISOString()

    const result = await payload.find({
      collection: 'ads',
      limit: 1,
      where: {
        and: [
          { position: { equals: position } },
          { active: { equals: true } },
          {
            or: [
              { startDate: { less_than_equal: now } },
              { startDate: { exists: false } },
            ],
          },
          {
            or: [
              { endDate: { greater_than_equal: now } },
              { endDate: { exists: false } },
            ],
          },
        ],
      },
      depth: 1,
    })

    const ad = result.docs[0] as any
    if (!ad) {
      return <AdBanner position={position} />
    }

    return (
      <AdBanner
        position={position}
        ad={{
          id: ad.id,
          name: ad.name,
          image: {
            url: ad.image?.url || '',
            alt: ad.image?.alt || ad.name,
          },
          link: ad.link,
        }}
      />
    )
  } catch {
    return <AdBanner position={position} />
  }
}
