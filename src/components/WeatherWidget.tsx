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
    <div className="sidebar-widget">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800">Hava Durumu</h3>
        <Link href="/hava-durumu" className="text-primary-600 text-xs hover:underline flex items-center gap-1">
          Detay <FiArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="text-center py-3">
        <div className="text-4xl mb-1">{icon || '🌤️'}</div>
        <div className="text-3xl font-bold text-gray-800">
          {temp !== null && temp !== undefined ? `${temp}°C` : '--°C'}
        </div>
        <p className="text-sm text-gray-500 capitalize mt-1">
          {description || 'Veri bekleniyor...'}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">Ahmetli, Manisa</p>
      </div>

      {forecast && forecast.length > 0 && (
        <div className="border-t mt-3 pt-3">
          <div className="grid grid-cols-5 gap-1 text-center">
            {forecast.slice(0, 5).map((day, i) => (
              <div key={i} className="text-xs">
                <div className="text-gray-500 font-medium">{day.dayName.substring(0, 3)}</div>
                <div className="text-lg my-0.5">{day.icon}</div>
                <div className="text-gray-800 font-semibold">{day.tempMax}°</div>
                <div className="text-gray-400">{day.tempMin}°</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
