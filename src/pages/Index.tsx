import { useState } from 'react'
import { AirQualityDashboard } from '@/components/air-quality-dashboard'
import { NavigationHeader } from '@/components/navigation-header'
import { AIChatbot } from '@/components/ai-chatbot'
import { LiveAnalysis } from '@/components/live-analysis'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import heroImage from '@/assets/hero-air-quality.jpg'

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <NavigationHeader 
        onChatToggle={() => setIsChatOpen(true)} 
      />
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-16 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                BreatheWise AI
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                Advanced GenAI system for urban air pollution forecasting and intelligent policy generation
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2 bg-card/80 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  LSTM-based Forecasting
                </div>
                <div className="flex items-center gap-2 bg-card/80 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  AI Policy Generation
                </div>
                <div className="flex items-center gap-2 bg-card/80 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Real-time Analytics
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="live">Live Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-6">
            <AirQualityDashboard />
          </TabsContent>
          
          <TabsContent value="live" className="space-y-6">
            <LiveAnalysis />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Footer */}
      <footer className="bg-card/50 border-t mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p className="mb-2">🌍 Built for Sustainable Urban Planning</p>
            <p>Hackathon-ready GenAI solution using React + AI/ML integration</p>
          </div>
        </div>
      </footer>

      {/* AI Chatbot */}
      <AIChatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default Index;
