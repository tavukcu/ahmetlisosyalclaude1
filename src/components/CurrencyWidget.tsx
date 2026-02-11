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
      <h3 className="widget-header">Döviz & Altın</h3>

      <div className="space-y-1">
        {defaultRates.map((rate) => (
          <div key={rate.code} className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                <span className="font-bold text-primary-700 text-xs">{rate.code.substring(0, 2)}</span>
              </div>
              <div>
                <span className="font-bold text-gray-800 text-sm block leading-tight">{rate.code}</span>
                <span className="text-[10px] text-gray-400 hidden sm:block">{rate.name}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-gray-800 block leading-tight">{rate.buying.toFixed(2)} ₺</span>
              <span className={`inline-flex items-center text-[10px] font-bold ${rate.change >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                {rate.change >= 0 ? <FiTrendingUp className="w-2.5 h-2.5 mr-0.5" /> : <FiTrendingDown className="w-2.5 h-2.5 mr-0.5" />}
                %{Math.abs(rate.changePercent).toFixed(2)}
              </span>
            </div>
          </div>
        ))}

        <div className="border-t border-gray-100 my-1" />

        {defaultGold.map((gold, i) => (
          <div key={i} className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent-50 flex items-center justify-center">
                <span className="text-accent-600 text-sm">Au</span>
              </div>
              <span className="font-bold text-gray-800 text-sm">{gold.name}</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-gray-800 block leading-tight">{gold.buying.toLocaleString('tr-TR')} ₺</span>
              <span className={`inline-flex items-center text-[10px] font-bold ${gold.change >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                {gold.change >= 0 ? <FiTrendingUp className="w-2.5 h-2.5 mr-0.5" /> : <FiTrendingDown className="w-2.5 h-2.5 mr-0.5" />}
                %{Math.abs(gold.changePercent).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="text-[10px] text-gray-400 mt-3 text-center">Son güncelleme: Anlık</p>
    </div>
  )
}
