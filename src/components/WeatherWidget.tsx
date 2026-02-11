import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'

interface WeatherWidgetProps {
  temp?: number | null
  description?: string | null
  icon?: string | null
  forecast?: Array<{
    dayName: string
    tempMax: number
    tempMin: number
    icon: string
  }>
}

export default function WeatherWidget({ temp, description, icon, forecast }: WeatherWidgetProps) {
  return (
    <div className="sidebar-widget overflow-hidden relative">
      {/* Gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-accent-400 to-primary-500" />

      <div className="flex items-center justify-between mb-4 pt-1">
        <h3 className="widget-header !mb-0 !pb-0 after:hidden">Hava Durumu</h3>
        <Link href="/hava-durumu" className="text-primary-600 text-xs font-semibold hover:text-primary-700 flex items-center gap-1 transition-colors">
          Detay <FiArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="text-center py-4 bg-gradient-to-br from-primary-50/50 to-accent-50/30 rounded-xl">
        <div className="text-5xl mb-2">{icon || '🌤️'}</div>
        <div className="text-4xl font-extrabold text-gray-800 tracking-tight">
          {temp !== null && temp !== undefined ? `${temp}°` : '--°'}
        </div>
        <p className="text-sm text-gray-500 capitalize mt-1 font-medium">
          {description || 'Veri bekleniyor...'}
        </p>
        <p className="text-xs text-gray-400 mt-1 font-medium">Ahmetli, Manisa</p>
      </div>

      {forecast && forecast.length > 0 && (
        <div className="border-t border-gray-100 mt-4 pt-4">
          <div className="grid grid-cols-5 gap-1 text-center">
            {forecast.slice(0, 5).map((day, i) => (
              <div key={i} className="text-xs py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="text-gray-400 font-semibold uppercase text-[10px]">{day.dayName.substring(0, 3)}</div>
                <div className="text-xl my-1">{day.icon}</div>
                <div className="text-gray-800 font-bold">{day.tempMax}°</div>
                <div className="text-gray-400 text-[10px]">{day.tempMin}°</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
