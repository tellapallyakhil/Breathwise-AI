import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface ForecastChartProps {
  data: { date: string; aqi: number; predicted?: boolean }[]
}

export function ForecastChart({ data }: ForecastChartProps) {
  const labels = data.map(d => new Date(d.date).toLocaleDateString())
  const historicalData = data.filter(d => !d.predicted).map(d => d.aqi)
  const predictedData = data.map(d => d.predicted ? d.aqi : null)

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'AQI Trend & Forecast',
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 500,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  }

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Historical AQI',
        data: historicalData,
        borderColor: 'hsl(142, 76%, 36%)',
        backgroundColor: 'hsl(142, 76%, 36%, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Predicted AQI',
        data: predictedData,
        borderColor: 'hsl(15, 100%, 50%)',
        backgroundColor: 'hsl(15, 100%, 50%, 0.1)',
        borderDash: [5, 5],
        fill: false,
        tension: 0.4,
      },
    ],
  }

  return (
    <div className="w-full h-[300px]">
      <Line options={options} data={chartData} />
    </div>
  )
}