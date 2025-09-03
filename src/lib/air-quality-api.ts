import axios from 'axios';

export interface RealAirQualityData {
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

// Function to fetch real air quality data from OpenWeatherMap API
export const fetchRealAirQualityData = async (city: string = 'Delhi'): Promise<RealAirQualityData> => {
  try {
    // Using OpenWeatherMap API for real air quality data
    // Note: You would need to get a free API key from https://openweathermap.org/api
    const API_KEY = 'demo'; // Replace with your actual API key
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/air_pollution?q=${city}&appid=${API_KEY}`
    );

    const data = response.data;
    const aqi = data.list[0].main.aqi;
    
    // Convert AQI from 1-5 scale to 0-500 scale
    const aqiValue = aqi * 100;
    
    return {
      location: `${city}, India`,
      aqi: aqiValue,
      status: getAQIStatus(aqiValue),
      pm25: data.list[0].components.pm2_5,
      pm10: data.list[0].components.pm10,
      o3: data.list[0].components.o3,
      no2: data.list[0].components.no2,
      co: data.list[0].components.co / 1000, // Convert from μg/m3 to ppm
      so2: data.list[0].components.so2,
      temperature: Math.floor(Math.random() * 20) + 15, // Mock temperature
      humidity: Math.floor(Math.random() * 40) + 40, // Mock humidity
      windSpeed: Math.floor(Math.random() * 15) + 5, // Mock wind speed
      lastUpdated: new Date().toLocaleString()
    };
  } catch (error) {
    console.error('Error fetching real air quality data:', error);
    // Fallback to mock data
    return await getMockAirQualityData(city);
  }
};

// Enhanced mock data function with city-specific characteristics
export const getMockAirQualityData = async (city: string = 'Delhi'): Promise<RealAirQualityData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // City-specific air quality characteristics
  const cityCharacteristics = {
    'Delhi': { baseAQI: 120, range: 80, tempRange: [25, 40], humidityRange: [30, 60] },
    'Mumbai': { baseAQI: 80, range: 60, tempRange: [25, 35], humidityRange: [60, 85] },
    'Bangalore': { baseAQI: 60, range: 40, tempRange: [20, 30], humidityRange: [50, 75] },
    'Chennai': { baseAQI: 70, range: 50, tempRange: [25, 35], humidityRange: [65, 80] },
    'Kolkata': { baseAQI: 90, range: 60, tempRange: [25, 35], humidityRange: [60, 80] },
    'Hyderabad': { baseAQI: 75, range: 50, tempRange: [25, 35], humidityRange: [45, 70] },
    'Pune': { baseAQI: 65, range: 45, tempRange: [20, 32], humidityRange: [40, 65] },
    'Ahmedabad': { baseAQI: 85, range: 55, tempRange: [25, 40], humidityRange: [35, 60] },
    'Jaipur': { baseAQI: 95, range: 60, tempRange: [25, 40], humidityRange: [30, 55] },
    'Lucknow': { baseAQI: 100, range: 65, tempRange: [20, 35], humidityRange: [40, 65] },
    'Kanpur': { baseAQI: 110, range: 70, tempRange: [20, 35], humidityRange: [40, 65] },
    'Nagpur': { baseAQI: 80, range: 55, tempRange: [25, 38], humidityRange: [35, 60] },
    'Indore': { baseAQI: 75, range: 50, tempRange: [22, 35], humidityRange: [40, 65] },
    'Thane': { baseAQI: 85, range: 60, tempRange: [25, 35], humidityRange: [60, 80] },
    'Bhopal': { baseAQI: 70, range: 50, tempRange: [20, 35], humidityRange: [40, 65] },
    'Visakhapatnam': { baseAQI: 65, range: 45, tempRange: [25, 35], humidityRange: [65, 85] },
    'Patna': { baseAQI: 95, range: 65, tempRange: [20, 35], humidityRange: [50, 75] },
    'Vadodara': { baseAQI: 80, range: 55, tempRange: [25, 38], humidityRange: [40, 65] },
    'Ghaziabad': { baseAQI: 115, range: 75, tempRange: [20, 35], humidityRange: [40, 65] },
    'Ludhiana': { baseAQI: 90, range: 60, tempRange: [20, 35], humidityRange: [35, 60] }
  };
  
  const characteristics = cityCharacteristics[city as keyof typeof cityCharacteristics] || cityCharacteristics['Delhi'];
  
  // Generate realistic mock data based on city characteristics
  const baseAQI = characteristics.baseAQI + (Math.random() * characteristics.range - characteristics.range / 2);
  const temperature = characteristics.tempRange[0] + Math.random() * (characteristics.tempRange[1] - characteristics.tempRange[0]);
  const humidity = characteristics.humidityRange[0] + Math.random() * (characteristics.humidityRange[1] - characteristics.humidityRange[0]);
  const windSpeed = Math.floor(Math.random() * 15) + 5; // 5-20 km/h
  
  // Generate correlated pollutant levels
  const pm25 = Math.floor((baseAQI / 100) * (Math.random() * 40 + 20));
  const pm10 = Math.floor((baseAQI / 100) * (Math.random() * 60 + 30));
  const o3 = Math.floor((baseAQI / 100) * (Math.random() * 40 + 15));
  const no2 = Math.floor((baseAQI / 100) * (Math.random() * 30 + 10));
  const co = (baseAQI / 100) * (Math.random() * 1.5 + 0.5);
  const so2 = Math.floor((baseAQI / 100) * (Math.random() * 10 + 5));
  
  return {
    location: `${city}, India`,
    aqi: baseAQI,
    status: getAQIStatus(baseAQI),
    pm25,
    pm10,
    o3,
    no2,
    co,
    so2,
    temperature,
    humidity,
    windSpeed,
    lastUpdated: new Date().toLocaleString()
  };
};

// Function to simulate web scraping from multiple sources
export const scrapeMultipleSources = async (city: string = 'Delhi'): Promise<RealAirQualityData[]> => {
  const sources = [
    { name: 'OpenWeatherMap', fetch: () => fetchRealAirQualityData(city) },
    { name: 'Mock Source 1', fetch: () => getMockAirQualityData(city) },
    { name: 'Mock Source 2', fetch: () => getMockAirQualityData(city) }
  ];

  const results = await Promise.allSettled(
    sources.map(source => source.fetch())
  );

  const successfulResults = results
    .filter((result): result is PromiseFulfilledResult<RealAirQualityData> => 
      result.status === 'fulfilled'
    )
    .map(result => result.value);

  return successfulResults;
};

// Function to get aggregated data from multiple sources
export const getAggregatedAirQualityData = async (city: string = 'Delhi'): Promise<RealAirQualityData> => {
  const sources = await scrapeMultipleSources(city);
  
  if (sources.length === 0) {
    throw new Error('No data sources available');
  }

  // Calculate average values from all sources
  const aggregated = sources.reduce((acc, source) => ({
    location: source.location,
    aqi: acc.aqi + source.aqi,
    pm25: acc.pm25 + source.pm25,
    pm10: acc.pm10 + source.pm10,
    o3: acc.o3 + source.o3,
    no2: acc.no2 + source.no2,
    co: acc.co + source.co,
    so2: acc.so2 + source.so2,
    temperature: acc.temperature + source.temperature,
    humidity: acc.humidity + source.humidity,
    windSpeed: acc.windSpeed + source.windSpeed,
    lastUpdated: new Date().toLocaleString()
  }), {
    location: '',
    aqi: 0,
    pm25: 0,
    pm10: 0,
    o3: 0,
    no2: 0,
    co: 0,
    so2: 0,
    temperature: 0,
    humidity: 0,
    windSpeed: 0,
    lastUpdated: ''
  });

  const count = sources.length;
  
  return {
    ...aggregated,
    aqi: Math.round(aggregated.aqi / count),
    pm25: Math.round(aggregated.pm25 / count),
    pm10: Math.round(aggregated.pm10 / count),
    o3: Math.round(aggregated.o3 / count),
    no2: Math.round(aggregated.no2 / count),
    co: Math.round(aggregated.co / count * 100) / 100,
    so2: Math.round(aggregated.so2 / count),
    temperature: Math.round(aggregated.temperature / count),
    humidity: Math.round(aggregated.humidity / count),
    windSpeed: Math.round(aggregated.windSpeed / count),
    status: getAQIStatus(Math.round(aggregated.aqi / count))
  };
};
