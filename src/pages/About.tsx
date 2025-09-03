import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Brain, Database, Globe, Shield, Zap, ArrowLeft } from "lucide-react";
import { NavigationHeader } from '@/components/navigation-header';

import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <NavigationHeader />

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <Link to="/">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Analysis Dashboard
              </Button>
            </Link>
          </div>
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              About BreatheWise AI
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Advanced GenAI system revolutionizing urban air quality monitoring and policy generation
            </p>
          </div>

          {/* How It Works */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                How It Works
              </CardTitle>
              <CardDescription>
                Understanding our AI-powered air quality processing pipeline
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 rounded-lg bg-primary/5">
                  <Database className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">Data Collection</h3>
                  <p className="text-sm text-muted-foreground">
                    Real-time air quality data from multiple sensors and APIs, including PM2.5, PM10, O3, NO2, and CO levels
                  </p>
                </div>
                <div className="text-center p-4 rounded-lg bg-accent/5">
                  <Brain className="w-8 h-8 mx-auto mb-3 text-accent" />
                  <h3 className="font-semibold mb-2">AI Processing</h3>
                  <p className="text-sm text-muted-foreground">
                    LSTM neural networks analyze historical patterns and generate accurate pollution forecasts
                  </p>
                </div>
                <div className="text-center p-4 rounded-lg bg-primary/5">
                  <Zap className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">Policy Generation</h3>
                  <p className="text-sm text-muted-foreground">
                    GenAI creates actionable policy recommendations based on forecasted air quality trends
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tech Stack */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Technology Stack
              </CardTitle>
              <CardDescription>
                Modern technologies powering our intelligent air quality platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                                 <div>
                   <h3 className="font-semibold mb-3">Frontend</h3>
                   <div className="flex flex-wrap gap-2">
                     <Badge variant="secondary">React 18</Badge>
                     <Badge variant="secondary">TypeScript</Badge>
                     <Badge variant="secondary">Vite</Badge>
                     <Badge variant="secondary">Tailwind CSS</Badge>
                     <Badge variant="secondary">shadcn/ui</Badge>
                     <Badge variant="secondary">Chart.js</Badge>
                     <Badge variant="secondary">React Router</Badge>
                     <Badge variant="secondary">Firebase Auth</Badge>
                   </div>
                 </div>
                <Separator />
                                 <div>
                   <h3 className="font-semibold mb-3">AI & Machine Learning</h3>
                   <div className="flex flex-wrap gap-2">
                     <Badge variant="secondary">Google Gemini AI</Badge>
                     <Badge variant="secondary">LSTM Networks</Badge>
                     <Badge variant="secondary">Machine Learning</Badge>
                     <Badge variant="secondary">Predictive Analytics</Badge>
                     <Badge variant="secondary">Time Series Analysis</Badge>
                   </div>
                 </div>
                <Separator />
                                 <div>
                   <h3 className="font-semibold mb-3">Data & APIs</h3>
                   <div className="flex flex-wrap gap-2">
                     <Badge variant="secondary">Air Quality APIs</Badge>
                     <Badge variant="secondary">Weather APIs</Badge>
                     <Badge variant="secondary">Real-time Sensors</Badge>
                     <Badge variant="secondary">JSON Data</Badge>
                     <Badge variant="secondary">Firebase Analytics</Badge>
                   </div>
                 </div>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Key Features
              </CardTitle>
              <CardDescription>
                Comprehensive air quality monitoring and analysis capabilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Real-time Air Quality Monitoring</h4>
                      <p className="text-sm text-muted-foreground">Live tracking of multiple air pollutants with instant updates</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">AI-Powered Forecasting</h4>
                      <p className="text-sm text-muted-foreground">Predictive models using LSTM networks for accurate pollution forecasts</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Intelligent Policy Generation</h4>
                      <p className="text-sm text-muted-foreground">AI-generated recommendations for urban planning and pollution control</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Interactive Dashboards</h4>
                      <p className="text-sm text-muted-foreground">Beautiful, responsive charts and visualizations for data analysis</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Multi-Pollutant Analysis</h4>
                      <p className="text-sm text-muted-foreground">Comprehensive analysis of PM2.5, PM10, O3, NO2, CO, and SO2</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Smart Chatbot Assistant</h4>
                      <p className="text-sm text-muted-foreground">AI-powered chatbot for instant air quality insights and recommendations</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mission */}
          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                BreatheWise AI is committed to creating sustainable, healthy urban environments through 
                advanced artificial intelligence. By combining real-time air quality monitoring with 
                predictive analytics and intelligent policy recommendations, we empower cities to make 
                data-driven decisions for cleaner air and better public health outcomes.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
