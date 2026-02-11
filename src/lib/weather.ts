// Open-Meteo API — ücretsiz, API anahtarı gerektirmez
// https://open-meteo.com/

const AHMETLI_LAT = 38.5167
const AHMETLI_LON = 27.95

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

// WMO Weather Code → Türkçe açıklama
function wmoDescription(code: number): string {
  const map: Record<number, string> = {
    0: 'Açık hava',
    1: 'Çoğunlukla açık',
    2: 'Parçalı bulutlu',
    3: 'Kapalı',
    45: 'Sisli',
    48: 'Kırağılı sis',
    51: 'Hafif çisenti',
    53: 'Çisenti',
    55: 'Yoğun çisenti',
    61: 'Hafif yağmurlu',
    63: 'Yağmurlu',
    65: 'Kuvvetli yağmur',
    71: 'Hafif karlı',
    73: 'Karlı',
    75: 'Yoğun kar',
    77: 'Kar taneleri',
    80: 'Sağanak yağış',
    81: 'Orta sağanak',
    82: 'Kuvvetli sağanak',
    85: 'Karlı sağanak',
    86: 'Yoğun karlı sağanak',
    95: 'Gök gürültülü fırtına',
    96: 'Dolulu fırtına',
    99: 'Yoğun dolulu fırtına',
  }
  return map[code] ?? 'Bilinmiyor'
}

// WMO Weather Code → emoji (gece/gündüz)
function wmoIcon(code: number, isDay: boolean): string {
  if (code === 0) return isDay ? '☀️' : '🌙'
  if (code === 1) return isDay ? '🌤️' : '🌙'
  if (code === 2) return '⛅'
  if (code === 3) return '☁️'
  if (code === 45 || code === 48) return '🌫️'
  if (code >= 51 && code <= 55) return '🌦️'
  if (code >= 61 && code <= 65) return '🌧️'
  if (code >= 71 && code <= 77) return '🌨️'
  if (code >= 80 && code <= 82) return '🌦️'
  if (code >= 85 && code <= 86) return '🌨️'
  if (code >= 95) return '⛈️'
  return '🌡️'
}

// WMO code → "main" kategori (geriye dönük uyumluluk için)
function wmoMain(code: number): string {
  if (code === 0 || code === 1) return 'Clear'
  if (code === 2 || code === 3) return 'Clouds'
  if (code === 45 || code === 48) return 'Fog'
  if (code >= 51 && code <= 55) return 'Drizzle'
  if (code >= 61 && code <= 65) return 'Rain'
  if (code >= 71 && code <= 77) return 'Snow'
  if (code >= 80 && code <= 82) return 'Rain'
  if (code >= 95) return 'Thunderstorm'
  return 'Unknown'
}

export async function getCurrentWeather(): Promise<WeatherData | null> {
  try {
    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${AHMETLI_LAT}&longitude=${AHMETLI_LON}` +
      `&current=temperature_2m,relative_humidity_2m,apparent_temperature,` +
      `weather_code,wind_speed_10m,wind_direction_10m,is_day` +
      `&wind_speed_unit=ms&timezone=Europe%2FIstanbul`

    const res = await fetch(url, { next: { revalidate: 1800 } })
    if (!res.ok) return null

    const data = await res.json()
    const c = data.current

    const code: number = c.weather_code
    const isDay: boolean = c.is_day === 1

    return {
      temp: Math.round(c.temperature_2m),
      feelsLike: Math.round(c.apparent_temperature),
      humidity: c.relative_humidity_2m,
      windSpeed: parseFloat(c.wind_speed_10m.toFixed(1)),
      windDeg: c.wind_direction_10m,
      description: wmoDescription(code),
      icon: wmoIcon(code, isDay),
      main: wmoMain(code),
    }
  } catch {
    return null
  }
}

export async function getForecast(): Promise<ForecastDay[]> {
  try {
    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${AHMETLI_LAT}&longitude=${AHMETLI_LON}` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min,` +
      `relative_humidity_2m_max,wind_speed_10m_max,wind_direction_10m_dominant` +
      `&wind_speed_unit=ms&timezone=Europe%2FIstanbul&forecast_days=5`

    const res = await fetch(url, { next: { revalidate: 1800 } })
    if (!res.ok) return []

    const data = await res.json()
    const daily = data.daily
    const dayNames = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi']

    return daily.time.map((date: string, i: number) => {
      const code: number = daily.weather_code[i]
      const d = new Date(date)
      return {
        date,
        dayName: dayNames[d.getDay()],
        temp: Math.round((daily.temperature_2m_max[i] + daily.temperature_2m_min[i]) / 2),
        tempMin: Math.round(daily.temperature_2m_min[i]),
        tempMax: Math.round(daily.temperature_2m_max[i]),
        description: wmoDescription(code),
        icon: wmoIcon(code, true),
        humidity: daily.relative_humidity_2m_max[i] ?? 0,
        windSpeed: parseFloat((daily.wind_speed_10m_max[i] ?? 0).toFixed(1)),
      }
    })
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

  let soilMoisture = 'Normal'
  if (humidity > 80) soilMoisture = 'Yüksek — Toprak nemli'
  else if (humidity > 60) soilMoisture = 'Orta — Normal düzeyde'
  else if (humidity > 40) soilMoisture = 'Düşük — Sulama gerekebilir'
  else soilMoisture = 'Çok Düşük — Sulama gerekli'

  let frostRisk = 'Yok'
  if (temp <= 0) frostRisk = 'Yüksek — Don riski var!'
  else if (temp <= 3) frostRisk = 'Orta — Don olabilir'
  else if (temp <= 5) frostRisk = 'Düşük — Dikkatli olun'

  let irrigationAdvice = 'Normal sulama yapılabilir'
  if (humidity > 80) irrigationAdvice = 'Sulama ertelenmeli — Nem yüksek'
  else if (humidity < 40 && temp > 25) irrigationAdvice = 'Acil sulama önerilir'
  else if (windSpeed > 5) irrigationAdvice = 'Rüzgarlı — Damla sulama tercih edin'

  let harvestSuitability = 'Uygun'
  if (humidity > 85) harvestSuitability = 'Uygun Değil — Nem çok yüksek'
  else if (windSpeed > 8) harvestSuitability = 'Dikkatli Olun — Rüzgar kuvvetli'
  else if (temp > 38) harvestSuitability = 'Uygun Değil — Sıcaklık çok yüksek'

  const directions = ['K', 'KD', 'D', 'GD', 'G', 'GB', 'B', 'KB']
  const windDirection = directions[Math.round(windDeg / 45) % 8]
  const windInfo = `${windSpeed.toFixed(1)} m/s — ${windDirection} yönünde`

  return { soilMoisture, frostRisk, irrigationAdvice, harvestSuitability, windInfo }
}

// Geriye dönük uyumluluk — icon artık emoji string döndürür
export function getWeatherIcon(icon: string): string {
  return icon
}
