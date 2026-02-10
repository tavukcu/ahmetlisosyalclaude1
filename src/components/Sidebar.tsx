import WeatherWidget from './WeatherWidget'
import CurrencyWidget from './CurrencyWidget'
import PollWidget from './PollWidget'
import AdBanner from './AdBanner'

interface SidebarProps {
  weatherTemp?: number | null
  weatherDescription?: string | null
  weatherIcon?: string | null
}

export default function Sidebar({ weatherTemp, weatherDescription, weatherIcon }: SidebarProps) {
  return (
    <aside className="space-y-6">
      {/* Weather Widget */}
      <WeatherWidget
        temp={weatherTemp}
        description={weatherDescription}
        icon={weatherIcon}
      />

      {/* Ad Space */}
      <AdBanner position="sidebar" />

      {/* Currency Widget */}
      <CurrencyWidget />

      {/* Poll Widget */}
      <PollWidget />

      {/* Ad Space 2 */}
      <AdBanner position="sidebar" />
    </aside>
  )
}
