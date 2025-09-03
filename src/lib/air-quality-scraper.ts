import axios from 'axios';
import * as cheerio from 'cheerio';

export interface LiveAirQualityData {
  location: string;
  aqi: number;
  status: string;
  pm25: number;
  pm10: number;
  o3: number;
  no2: number;
  co: number;
  so2: number;
  temperature: number;
  humidity: number;
  windSpeed: number;
  lastUpdated: string;
}

export interface ScrapedData {
  success: boolean;
  data?: LiveAirQualityData;
  error?: string;
}

// Function to get AQI status based on value
const getAQIStatus = (aqi: number): string => {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'Very Unhealthy';
  return 'Hazardous';
};

// Function to get AQI color based on value
export const getAQIColor = (aqi: number): string => {
  if (aqi <= 50) return 'text-green-600';
  if (aqi <= 100) return 'text-yellow-600';
  if (aqi <= 150) return 'text-orange-600';
  if (aqi <= 200) return 'text-red-600';
  if (aqi <= 300) return 'text-purple-600';
  return 'text-red-800';
};

// Function to get AQI background color
export const getAQIBgColor = (aqi: number): string => {
  if (aqi <= 50) return 'bg-green-100';
  if (aqi <= 100) return 'bg-yellow-100';
  if (aqi <= 150) return 'bg-orange-100';
  if (aqi <= 200) return 'bg-red-100';
  if (aqi <= 300) return 'bg-purple-100';
  return 'bg-red-200';
};

// Mock data for demonstration (since web scraping Google directly may have CORS issues)
export const getMockLiveAirQualityData = async (): Promise<ScrapedData> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate realistic mock data
    const baseAQI = Math.floor(Math.random() * 150) + 20; // 20-170 range
    const temperature = Math.floor(Math.random() * 20) + 15; // 15-35°C
    const humidity = Math.floor(Math.random() * 40) + 40; // 40-80%
    const windSpeed = Math.floor(Math.random() * 15) + 5; // 5-20 km/h
    
    const mockData: LiveAirQualityData = {
      location: 'New Delhi, India',
      aqi: baseAQI,
      status: getAQIStatus(baseAQI),
      pm25: Math.floor(Math.random() * 80) + 10,
      pm10: Math.floor(Math.random() * 120) + 20,
      o3: Math.floor(Math.random() * 60) + 10,
      no2: Math.floor(Math.random() * 40) + 5,
      co: Math.floor(Math.random() * 2) + 0.5,
      so2: Math.floor(Math.random() * 15) + 2,
      temperature,
      humidity,
      windSpeed,
      lastUpdated: new Date().toLocaleString()
    };
    
    return {
      success: true,
      data: mockData
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch live air quality data'
    };
  }
};

// Function to scrape real air quality data (for future implementation)
export const scrapeAirQualityData = async (city: string = 'New Delhi'): Promise<ScrapedData> => {
  try {
    // For now, we'll use mock data since direct web scraping may have CORS issues
    // In a real implementation, you would need a backend proxy to handle CORS
    return await getMockLiveAirQualityData();
    
    // Future implementation would look like this:
    /*
    const response = await axios.get(`https://www.google.com/search?q=air+quality+${city}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    const $ = cheerio.load(response.data);
    // Parse the HTML to extract air quality data
    // This would require analyzing Google's search results structure
    
    return {
      success: true,
      data: parsedData
    };
    */
  } catch (error) {
    console.error('Error scraping air quality data:', error);
    return {
      success: false,
      error: 'Failed to fetch live air quality data'
    };
  }
};

// Function to get historical data for comparison
export const getHistoricalComparison = (currentAQI: number) => {
  const yesterday = currentAQI + (Math.random() * 20 - 10); // ±10 variation
  const lastWeek = currentAQI + (Math.random() * 30 - 15); // ±15 variation
  const lastMonth = currentAQI + (Math.random() * 40 - 20); // ±20 variation
  
  return {
    yesterday: Math.max(0, Math.round(yesterday)),
    lastWeek: Math.max(0, Math.round(lastWeek)),
    lastMonth: Math.max(0, Math.round(lastMonth))
  };
};
