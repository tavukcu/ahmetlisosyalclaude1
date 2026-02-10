import { Metadata } from 'next'
import Link from 'next/link'
import { getCurrentWeather, getForecast, getAgriculturalData, getWeatherIcon } from '@/lib/weather'
import { FiChevronRight, FiDroplet, FiWind, FiThermometer, FiAlertTriangle, FiSun } from 'react-icons/fi'

export const metadata: Metadata = {
  title: 'Hava Durumu — Ahmetli',
  description: 'Ahmetli, Manisa hava durumu, 5 günlük tahmin ve tarımsal hava durumu bilgileri.',
}

export const revalidate = 1800 // Revalidate every 30 minutes

export default async function WeatherPage() {
  const weather = await getCurrentWeather()
  const forecast = await getForecast()
  const agricultural = getAgriculturalData(weather)
  const weatherIcon = weather ? getWeatherIcon(weather.icon) : '🌤️'

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-600">Ana Sayfa</Link>
        <FiChevronRight className="w-3 h-3" />
        <span className="text-gray-400">Hava Durumu</span>
      </nav>

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Ahmetli Hava Durumu
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Weather */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-2xl p-8 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 mb-1">Ahmetli, Manisa</p>
                <div className="text-6xl font-bold mb-2">
                  {weather ? `${weather.temp}°C` : '--°C'}
                </div>
                <p className="text-xl capitalize text-blue-100">
                  {weather?.description || 'Veri bekleniyor...'}
                </p>
                {weather && (
                  <div className="flex items-center gap-4 mt-4 text-blue-100 text-sm">
                    <span className="flex items-center gap-1">
                      <FiThermometer className="w-4 h-4" />
                      Hissedilen: {weather.feelsLike}°C
                    </span>
                    <span className="flex items-center gap-1">
                      <FiDroplet className="w-4 h-4" />
                      Nem: %{weather.humidity}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiWind className="w-4 h-4" />
                      Rüzgar: {weather.windSpeed} m/s
                    </span>
                  </div>
                )}
              </div>
              <div className="text-8xl">{weatherIcon}</div>
            </div>
          </div>

          {/* 5-Day Forecast */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">5 Günlük Tahmin</h2>
            {forecast.length > 0 ? (
              <div className="grid grid-cols-5 gap-3">
                {forecast.map((day, i) => (
                  <div key={i} className="text-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="font-semibold text-gray-700 text-sm">{day.dayName}</div>
                    <div className="text-3xl my-2">{getWeatherIcon(day.icon)}</div>
                    <div className="text-lg font-bold text-gray-800">{day.tempMax}°</div>
                    <div className="text-sm text-gray-400">{day.tempMin}°</div>
                    <div className="text-xs text-gray-500 mt-1 capitalize">{day.description}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <div className="text-4xl mb-2">🌤️</div>
                <p>Tahmin verisi için OpenWeatherMap API anahtarı gereklidir.</p>
                <p className="text-xs mt-1">Admin panelinden API anahtarınızı ekleyin.</p>
              </div>
            )}
          </div>

          {/* Agricultural Weather */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FiSun className="w-5 h-5 text-yellow-500" />
              Tarımsal Hava Durumu
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Ahmetli ve çevresi için tarımsal bilgiler ve öneriler
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Soil Moisture */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FiDroplet className="w-5 h-5 text-blue-500" />
                  <h3 className="font-semibold text-gray-700">Toprak Nemi</h3>
                </div>
                <p className="text-sm text-gray-600">{agricultural.soilMoisture}</p>
              </div>

              {/* Frost Risk */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FiAlertTriangle className="w-5 h-5 text-orange-500" />
                  <h3 className="font-semibold text-gray-700">Don Riski</h3>
                </div>
                <p className="text-sm text-gray-600">{agricultural.frostRisk}</p>
              </div>

              {/* Irrigation Advice */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FiDroplet className="w-5 h-5 text-cyan-500" />
                  <h3 className="font-semibold text-gray-700">Sulama Önerisi</h3>
                </div>
                <p className="text-sm text-gray-600">{agricultural.irrigationAdvice}</p>
              </div>

              {/* Wind Info */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FiWind className="w-5 h-5 text-gray-500" />
                  <h3 className="font-semibold text-gray-700">Rüzgar Bilgisi</h3>
                </div>
                <p className="text-sm text-gray-600">{agricultural.windInfo}</p>
              </div>

              {/* Harvest Suitability */}
              <div className="border rounded-lg p-4 sm:col-span-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🌾</span>
                  <h3 className="font-semibold text-gray-700">Hasat Uygunluğu</h3>
                </div>
                <p className="text-sm text-gray-600">{agricultural.harvestSuitability}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-800 mb-3">Ahmetli Hakkında</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><span className="font-medium">İl:</span> Manisa</li>
              <li><span className="font-medium">Rakım:</span> ~100 m</li>
              <li><span className="font-medium">İklim:</span> Akdeniz iklimi</li>
              <li><span className="font-medium">Koordinat:</span> 38.52°N, 27.95°E</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <h3 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
              <FiAlertTriangle className="w-4 h-4" />
              Bilgilendirme
            </h3>
            <p className="text-sm text-yellow-700">
              Tarımsal hava durumu verileri genel bir rehber niteliğindedir.
              Detaylı bilgi için yerel tarım müdürlüğü ile iletişime geçiniz.
            </p>
          </div>

          {!weather && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-semibold text-blue-800 mb-2">API Kurulumu</h3>
              <p className="text-sm text-blue-700">
                Gerçek hava durumu verisi için{' '}
                <a href="https://openweathermap.org/api" className="underline" target="_blank" rel="noopener">
                  OpenWeatherMap
                </a>
                {' '}üzerinden ücretsiz bir API anahtarı alıp .env dosyasına ekleyin.
              </p>
              <code className="block mt-2 text-xs bg-blue-100 p-2 rounded">
                OPENWEATHERMAP_API_KEY=your_key_here
              </code>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
