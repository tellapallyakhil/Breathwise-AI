import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Lightbulb, Loader2 } from 'lucide-react'

interface PolicyGeneratorProps {
  aqi: number
  city: string
}

export function PolicyGenerator({ aqi, city }: PolicyGeneratorProps) {
  const [policies, setPolicies] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const generatePolicies = async () => {
    setLoading(true)
    
    // Simulate AI policy generation with realistic suggestions based on AQI level
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const getPolicyLevel = (aqi: number) => {
      if (aqi <= 50) return 'good'
      if (aqi <= 100) return 'moderate'
      if (aqi <= 150) return 'unhealthy-sensitive'
      if (aqi <= 200) return 'unhealthy'
      if (aqi <= 300) return 'very-unhealthy'
      return 'hazardous'
    }

    const policyTemplates = {
      good: [
        `Continue current environmental policies in ${city} to maintain excellent air quality standards.`,
        `Implement green infrastructure projects to further improve air quality and urban sustainability.`,
        `Promote public awareness campaigns about maintaining clean air through community engagement.`
      ],
      moderate: [
        `Encourage public transportation usage in ${city} to reduce vehicle emissions during peak hours.`,
        `Implement bike-sharing programs and pedestrian-friendly infrastructure development.`,
        `Monitor industrial emissions more closely and enforce existing environmental regulations.`
      ],
      'unhealthy-sensitive': [
        `Issue health advisories for sensitive groups including children, elderly, and people with respiratory conditions in ${city}.`,
        `Implement temporary restrictions on outdoor activities for schools and healthcare facilities.`,
        `Increase monitoring of construction and industrial activities that contribute to air pollution.`
      ],
      unhealthy: [
        `Activate emergency air quality protocols and restrict heavy vehicle traffic in ${city} city center.`,
        `Issue public health warnings and recommend indoor activities for all residents.`,
        `Deploy additional air purification systems in public buildings and transportation hubs.`
      ],
      'very-unhealthy': [
        `Implement immediate traffic restrictions and halt non-essential construction activities in ${city}.`,
        `Distribute masks to vulnerable populations and set up clean air shelters in public spaces.`,
        `Coordinate with neighboring regions to address cross-boundary pollution sources.`
      ],
      hazardous: [
        `Declare air quality emergency and implement complete vehicle restrictions in ${city} downtown area.`,
        `Evacuate vulnerable populations to clean air facilities and close schools temporarily.`,
        `Activate industrial shutdown protocols for major pollution sources and deploy emergency air filtration.`
      ]
    }

    const level = getPolicyLevel(aqi)
    setPolicies(policyTemplates[level])
    setLoading(false)
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          AI Policy Recommendations
        </CardTitle>
        <CardDescription>
          Intelligent policy suggestions based on predicted air quality levels
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={generatePolicies} 
          disabled={loading}
          className="w-full mb-4"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Policies...
            </>
          ) : (
            'Generate Policy Recommendations'
          )}
        </Button>
        
        {policies.length > 0 && (
          <div className="space-y-3">
            {policies.map((policy, index) => (
              <div 
                key={index} 
                className="p-4 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-relaxed">{policy}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}