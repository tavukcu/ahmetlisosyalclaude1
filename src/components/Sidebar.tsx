import WeatherWidget from './WeatherWidget'
import CurrencyWidget from './CurrencyWidget'
import PollWidget from './PollWidget'
import AdBannerServer from './AdBannerServer'
import { getPayload } from '@/lib/payload'
import { getForecast } from '@/lib/weather'

interface SidebarProps {
  weatherTemp?: number | null
  weatherDescription?: string | null
  weatherIcon?: string | null
}

async function getActivePoll() {
  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'polls',
      limit: 1,
      sort: '-createdAt',
      where: { active: { equals: true } },
    })
    return result.docs[0] as any ?? null
  } catch {
    return null
  }
}

export default async function Sidebar({ weatherTemp, weatherDescription, weatherIcon }: SidebarProps) {
  const [activePoll, forecast] = await Promise.all([
    getActivePoll(),
    getForecast(),
  ])

  return (
    <aside className="space-y-6">
      {/* Weather Widget */}
      <WeatherWidget
        temp={weatherTemp}
        description={weatherDescription}
        icon={weatherIcon}
        forecast={forecast.map(d => ({ dayName: d.dayName, tempMax: d.tempMax, tempMin: d.tempMin, icon: d.icon }))}
      />

      {/* Ad Space */}
      <AdBannerServer position="sidebar" />

      {/* Currency Widget */}
      <CurrencyWidget />

      {/* Poll Widget */}
      {activePoll ? (
        <PollWidget
          pollId={activePoll.id}
          question={activePoll.question}
          options={activePoll.options}
          totalVotes={activePoll.totalVotes}
        />
      ) : (
        <PollWidget />
      )}

      {/* Ad Space 2 */}
      <AdBannerServer position="sidebar" />
    </aside>
  )
}
