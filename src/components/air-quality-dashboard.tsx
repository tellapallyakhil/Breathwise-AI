import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AqiBadge } from '@/components/ui/aqi-badge'
import { ForecastChart } from '@/components/forecast-chart'
import { PolicyGenerator } from '@/components/policy-generator'
import { cities, generateMockData, predictAQI, AirQualityData } from '@/lib/air-quality-data'
import { CalendarDays, MapPin, TrendingUp, Wind, Thermometer, Droplets } from 'lucide-react'

export function AirQualityDashboard() {
  const [selectedCity, setSelectedCity] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0])
  const [historicalData, setHistoricalData] = useState<AirQualityData[]>([])
  const [prediction, setPrediction] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  const generateForecast = async () => {
    if (!selectedCity) return
    
    setLoading(true)
    
    // Simulate model loading and prediction
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const data = generateMockData(selectedCity, 30)
    setHistoricalData(data)
    
    const predictedAQI = predictAQI(data, 1)
    setPrediction(predictedAQI)
    
    setLoading(false)
  }

  const chartData = historicalData.length > 0 ? [
    ...historicalData.slice(-7).map(d => ({ date: d.date, aqi: d.aqi, predicted: false })),
    ...(prediction ? [{ date: selectedDate, aqi: prediction, predicted: true }] : [])
  ] : []

  const latestData = historicalData[historicalData.length - 1]

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          BreatheWise AI
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          AI-powered air pollution forecasting and policy generation system for sustainable urban planning
        </p>
      </div>

      {/* Controls */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Forecast Configuration
          </CardTitle>
          <CardDescription>
            Select a city and date to generate air quality predictions and policy recommendations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a city" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map(city => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">Forecast Date</Label>
              <Input
                id="date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div className="flex items-end">
              <Button 
                onClick={generateForecast} 
                disabled={!selectedCity || loading}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Wind className="mr-2 h-4 w-4 animate-spin" />
                    Forecasting...
                  </>
                ) : (
                  <>
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Generate Forecast
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {prediction !== null && latestData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Current Status & Prediction */}
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-primary" />
                  Air Quality Forecast
                </CardTitle>
                <CardDescription>
                  Predicted AQI for {selectedDate} in {selectedCity}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-6xl font-bold text-primary mb-2">{prediction}</div>
                  <AqiBadge aqi={prediction} className="text-lg px-6 py-3" />
                </div>
                
                {/* Current Conditions */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <Thermometer className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                    <div className="text-sm text-muted-foreground">Temperature</div>
                    <div className="font-semibold">{latestData.temperature}°C</div>
                  </div>
                  <div className="text-center">
                    <Droplets className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                    <div className="text-sm text-muted-foreground">Humidity</div>
                    <div className="font-semibold">{latestData.humidity}%</div>
                  </div>
                  <div className="text-center">
                    <Wind className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                    <div className="text-sm text-muted-foreground">Wind Speed</div>
                    <div className="font-semibold">{latestData.wind} km/h</div>
                  </div>
                </div>

                {/* Pollutant Breakdown */}
                <div className="space-y-3 pt-4 border-t">
                  <h4 className="font-semibold text-sm text-muted-foreground">POLLUTANT LEVELS</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex justify-between">
                      <span>PM2.5:</span>
                      <span className="font-medium">{latestData.pm25} μg/m³</span>
                    </div>
                    <div className="flex justify-between">
                      <span>PM10:</span>
                      <span className="font-medium">{latestData.pm10} μg/m³</span>
                    </div>
                    <div className="flex justify-between">
                      <span>NO2:</span>
                      <span className="font-medium">{latestData.no2} μg/m³</span>
                    </div>
                    <div className="flex justify-between">
                      <span>O3:</span>
                      <span className="font-medium">{latestData.o3} μg/m³</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Chart */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>7-Day Trend Analysis</CardTitle>
                <CardDescription>
                  Historical data and prediction visualization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ForecastChart data={chartData} />
              </CardContent>
            </Card>
          </div>

          {/* Policy Recommendations */}
          <div>
            <PolicyGenerator aqi={prediction} city={selectedCity} />
          </div>
        </div>
      )}

      {/* Empty State */}
      {prediction === null && !loading && (
        <Card className="shadow-lg">
          <CardContent className="text-center py-12">
            <Wind className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Ready to Forecast</h3>
            <p className="text-muted-foreground">
              Select a city and date above to generate air quality predictions and policy recommendations
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}