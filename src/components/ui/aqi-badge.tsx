import { cn } from "@/lib/utils"

interface AqiBadgeProps {
  aqi: number
  className?: string
}

export function AqiBadge({ aqi, className }: AqiBadgeProps) {
  const getAqiLevel = (aqi: number) => {
    if (aqi <= 50) return { level: "Good", color: "aqi-good", bgColor: "bg-aqi-good" }
    if (aqi <= 100) return { level: "Moderate", color: "aqi-moderate", bgColor: "bg-aqi-moderate" }
    if (aqi <= 150) return { level: "Unhealthy for Sensitive Groups", color: "aqi-unhealthy-sensitive", bgColor: "bg-aqi-unhealthy-sensitive" }
    if (aqi <= 200) return { level: "Unhealthy", color: "aqi-unhealthy", bgColor: "bg-aqi-unhealthy" }
    if (aqi <= 300) return { level: "Very Unhealthy", color: "aqi-very-unhealthy", bgColor: "bg-aqi-very-unhealthy" }
    return { level: "Hazardous", color: "aqi-hazardous", bgColor: "bg-aqi-hazardous" }
  }

  const { level, bgColor } = getAqiLevel(aqi)

  return (
    <div className={cn(
      "inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold text-white",
      bgColor,
      className
    )}>
      <span className="mr-2">{aqi}</span>
      <span>{level}</span>
    </div>
  )
}