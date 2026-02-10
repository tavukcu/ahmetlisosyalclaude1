const AHMETLI_LAT = 38.5167
const AHMETLI_LON = 27.95
const API_KEY = process.env.OPENWEATHERMAP_API_KEY

export interface WeatherData {
  temp: number
  feelsLike: number
  humidity: number
  windSpeed: number
  windDeg: number
  description: string
  icon: string
  main: string
}

export interface ForecastDay {
  date: string
  dayName: string
  temp: number
  tempMin: number
  tempMax: number
  description: string
  icon: string
  humidity: number
  windSpeed: number
}

export interface AgriculturalData {
  soilMoisture: string
  frostRisk: string
  irrigationAdvice: string
  harvestSuitability: string
  windInfo: string
}

export async function getCurrentWeather(): Promise<WeatherData | null> {
  if (!API_KEY) return null

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${AHMETLI_LAT}&lon=${AHMETLI_LON}&appid=${API_KEY}&units=metric&lang=tr`,
      { next: { revalidate: 1800 } }
    )
    if (!res.ok) return null
    const data = await res.json()
    return {
      temp: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      windDeg: data.wind.deg,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      main: data.weather[0].main,
    }
  } catch {
    return null
  }
}

export async function getForecast(): Promise<ForecastDay[]> {
  if (!API_KEY) return []

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${AHMETLI_LAT}&lon=${AHMETLI_LON}&appid=${API_KEY}&units=metric&lang=tr`,
      { next: { revalidate: 1800 } }
    )
    if (!res.ok) return []
    const data = await res.json()

    const days: Record<string, ForecastDay> = {}
    const dayNames = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi']

    for (const item of data.list) {
      const date = item.dt_txt.split(' ')[0]
      if (!days[date]) {
        const d = new Date(date)
        days[date] = {
          date,
          dayName: dayNames[d.getDay()],
          temp: Math.round(item.main.temp),
          tempMin: Math.round(item.main.temp_min),
          tempMax: Math.round(item.main.temp_max),
          description: item.weather[0].description,
          icon: item.weather[0].icon,
          humidity: item.main.humidity,
          windSpeed: item.wind.speed,
        }
      } else {
        days[date].tempMin = Math.min(days[date].tempMin, Math.round(item.main.temp_min))
        days[date].tempMax = Math.max(days[date].tempMax, Math.round(item.main.temp_max))
      }
    }

    return Object.values(days).slice(0, 5)
  } catch {
    return []
  }
}

export function getAgriculturalData(weather: WeatherData | null): AgriculturalData {
  if (!weather) {
    return {
      soilMoisture: 'Veri yok',
      frostRisk: 'Veri yok',
      irrigationAdvice: 'Veri yok',
      harvestSuitability: 'Veri yok',
      windInfo: 'Veri yok',
    }
  }

  const { temp, humidity, windSpeed, windDeg } = weather

  // Soil moisture estimate based on humidity
  let soilMoisture = 'Normal'
  if (humidity > 80) soilMoisture = 'Yüksek — Toprak nemli'
  else if (humidity > 60) soilMoisture = 'Orta — Normal düzeyde'
  else if (humidity > 40) soilMoisture = 'Düşük — Sulama gerekebilir'
  else soilMoisture = 'Çok Düşük — Sulama gerekli'

  // Frost risk
  let frostRisk = 'Yok'
  if (temp <= 0) frostRisk = 'Yüksek — Don riski var!'
  else if (temp <= 3) frostRisk = 'Orta — Don olabilir'
  else if (temp <= 5) frostRisk = 'Düşük — Dikkatli olun'

  // Irrigation advice
  let irrigationAdvice = 'Normal sulama yapılabilir'
  if (humidity > 80) irrigationAdvice = 'Sulama ertelenmeli — Nem yüksek'
  else if (humidity < 40 && temp > 25) irrigationAdvice = 'Acil sulama önerilir'
  else if (windSpeed > 5) irrigationAdvice = 'Rüzgarlı — Damla sulama tercih edin'

  // Harvest suitability
  let harvestSuitability = 'Uygun'
  if (humidity > 85) harvestSuitability = 'Uygun Değil — Nem çok yüksek'
  else if (windSpeed > 8) harvestSuitability = 'Dikkatli Olun — Rüzgar kuvvetli'
  else if (temp > 38) harvestSuitability = 'Uygun Değil — Sıcaklık çok yüksek'

  // Wind direction
  const directions = ['K', 'KD', 'D', 'GD', 'G', 'GB', 'B', 'KB']
  const windDirection = directions[Math.round(windDeg / 45) % 8]
  const windInfo = `${windSpeed.toFixed(1)} m/s — ${windDirection} yönünde`

  return { soilMoisture, frostRisk, irrigationAdvice, harvestSuitability, windInfo }
}

export function getWeatherIcon(iconCode: string): string {
  const iconMap: Record<string, string> = {
    '01d': '☀️', '01n': '🌙',
    '02d': '⛅', '02n': '☁️',
    '03d': '☁️', '03n': '☁️',
    '04d': '☁️', '04n': '☁️',
    '09d': '🌧️', '09n': '🌧️',
    '10d': '🌦️', '10n': '🌧️',
    '11d': '⛈️', '11n': '⛈️',
    '13d': '🌨️', '13n': '🌨️',
    '50d': '🌫️', '50n': '🌫️',
  }
  return iconMap[iconCode] || '🌡️'
}
