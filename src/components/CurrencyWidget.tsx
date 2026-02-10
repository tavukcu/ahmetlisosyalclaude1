'use client'

import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi'

interface CurrencyRate {
  code: string
  name: string
  buying: number
  selling: number
  change: number
  changePercent: number
}

interface CurrencyWidgetProps {
  rates?: CurrencyRate[]
  goldPrices?: Array<{
    name: string
    buying: number
    selling: number
    change: number
    changePercent: number
  }>
}

export default function CurrencyWidget({ rates, goldPrices }: CurrencyWidgetProps) {
  const defaultRates: CurrencyRate[] = rates || [
    { code: 'USD', name: 'Amerikan Doları', buying: 34.25, selling: 34.42, change: 0.12, changePercent: 0.35 },
    { code: 'EUR', name: 'Euro', buying: 37.15, selling: 37.35, change: 0.08, changePercent: 0.22 },
    { code: 'GBP', name: 'İngiliz Sterlini', buying: 43.80, selling: 44.05, change: -0.05, changePercent: -0.12 },
  ]

  const defaultGold = goldPrices || [
    { name: 'Gram Altın', buying: 2850, selling: 2875, change: 15, changePercent: 0.53 },
  ]

  return (
    <div className="sidebar-widget">
      <h3 className="font-semibold text-gray-800 mb-3">Döviz & Altın</h3>

      <div className="space-y-2">
        {defaultRates.map((rate) => (
          <div key={rate.code} className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0">
            <div>
              <span className="font-semibold text-gray-800 text-sm">{rate.code}</span>
              <span className="text-xs text-gray-400 ml-1.5 hidden sm:inline">{rate.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">{rate.buying.toFixed(2)}</span>
              <span className={`flex items-center text-xs font-medium ${rate.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {rate.change >= 0 ? <FiTrendingUp className="w-3 h-3 mr-0.5" /> : <FiTrendingDown className="w-3 h-3 mr-0.5" />}
                %{Math.abs(rate.changePercent).toFixed(2)}
              </span>
            </div>
          </div>
        ))}

        {defaultGold.map((gold, i) => (
          <div key={i} className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0">
            <span className="font-semibold text-gray-800 text-sm">{gold.name}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">{gold.buying.toLocaleString('tr-TR')} ₺</span>
              <span className={`flex items-center text-xs font-medium ${gold.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {gold.change >= 0 ? <FiTrendingUp className="w-3 h-3 mr-0.5" /> : <FiTrendingDown className="w-3 h-3 mr-0.5" />}
                %{Math.abs(gold.changePercent).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="text-[10px] text-gray-400 mt-2">Son güncelleme: Anlık</p>
    </div>
  )
}
