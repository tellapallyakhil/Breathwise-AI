export interface AirQualityData {
  date: string
  city: string
  pm25: number
  pm10: number
  no2: number
  so2: number
  co: number
  o3: number
  aqi: number
  temperature: number
  humidity: number
  wind: number
}

export const cities = [
  'New York', 'Los Angeles', 'London', 'Paris', 'Tokyo', 'Beijing', 
  'Delhi', 'Mumbai', 'São Paulo', 'Mexico City', 'Cairo', 'Lagos'
]

// Generate realistic mock data based on the Kaggle dataset structure
export function generateMockData(city: string, days: number = 30): AirQualityData[] {
  const data: AirQualityData[] = []
  const baseDate = new Date()
  
  // City-specific base pollution levels
  const cityFactors = {
    'New York': { base: 45, variance: 20 },
    'Los Angeles': { base: 65, variance: 25 },
    'London': { base: 40, variance: 15 },
    'Paris': { base: 50, variance: 18 },
    'Tokyo': { base: 55, variance: 20 },
    'Beijing': { base: 120, variance: 40 },
    'Delhi': { base: 180, variance: 50 },
    'Mumbai': { base: 90, variance: 30 },
    'São Paulo': { base: 70, variance: 25 },
    'Mexico City': { base: 85, variance: 30 },
    'Cairo': { base: 110, variance: 35 },
    'Lagos': { base: 95, variance: 28 }
  }
  
  const cityFactor = cityFactors[city as keyof typeof cityFactors] || { base: 60, variance: 25 }
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(baseDate)
    date.setDate(date.getDate() - i)
    
    // Add some seasonal and weekly patterns
    const seasonal = Math.sin((date.getMonth() / 12) * 2 * Math.PI) * 10
    const weekly = Math.sin((date.getDay() / 7) * 2 * Math.PI) * 5
    const random = (Math.random() - 0.5) * cityFactor.variance
    
    const aqi = Math.max(0, Math.round(cityFactor.base + seasonal + weekly + random))
    
    // Calculate component pollutants based on AQI
    const pm25 = Math.round(aqi * 0.4 + Math.random() * 10)
    const pm10 = Math.round(pm25 * 1.5 + Math.random() * 15)
    const no2 = Math.round(aqi * 0.3 + Math.random() * 8)
    const so2 = Math.round(aqi * 0.2 + Math.random() * 5)
    const co = Math.round(aqi * 0.1 + Math.random() * 3)
    const o3 = Math.round(aqi * 0.35 + Math.random() * 12)
    
    data.push({
      date: date.toISOString().split('T')[0],
      city,
      pm25,
      pm10,
      no2,
      so2,
      co,
      o3,
      aqi,
      temperature: Math.round(15 + Math.random() * 20),
      humidity: Math.round(40 + Math.random() * 40),
      wind: Math.round(Math.random() * 15)
    })
  }
  
  return data
}

export function predictAQI(historicalData: AirQualityData[], daysAhead: number = 1): number {
  // Simple LSTM-like prediction simulation
  const recentData = historicalData.slice(-7) // Last 7 days
  const weights = [0.4, 0.25, 0.15, 0.1, 0.05, 0.03, 0.02] // Decreasing weights for older data
  
  let prediction = 0
  recentData.forEach((data, index) => {
    prediction += data.aqi * weights[index]
  })
  
  // Add some trend and seasonality
  const trend = (recentData[recentData.length - 1].aqi - recentData[0].aqi) / 7
  const seasonality = Math.sin((new Date().getMonth() / 12) * 2 * Math.PI) * 5
  
  prediction += trend * daysAhead + seasonality
  
  // Add some realistic noise
  prediction += (Math.random() - 0.5) * 20
  
  return Math.max(0, Math.round(prediction))
}