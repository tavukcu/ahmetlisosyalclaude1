export const dynamic = 'force-dynamic'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'
import { getCurrentWeather, getWeatherIcon } from '@/lib/weather'
import { getCurrencyRates, getGoldPrices } from '@/lib/currency'

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Fetch weather data for header
  const weather = await getCurrentWeather()
  const weatherIcon = weather ? getWeatherIcon(weather.icon) : null

  // Fetch currency data for ticker
  const rates = await getCurrencyRates()
  const goldPrices = await getGoldPrices()

  const currencyTicker = [
    ...rates.map(r => `${r.code}: ${r.buying.toFixed(2)} ₺ (${r.change >= 0 ? '+' : ''}${r.changePercent.toFixed(2)}%)`),
    ...goldPrices.map(g => `${g.name}: ${g.buying.toLocaleString('tr-TR')} ₺ (${g.change >= 0 ? '+' : ''}${g.changePercent.toFixed(2)}%)`),
  ].join('   •   ')

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        weatherTemp={weather?.temp}
        weatherIcon={weatherIcon}
        currencyTicker={currencyTicker}
      />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <CookieBanner />
    </div>
  )
}
