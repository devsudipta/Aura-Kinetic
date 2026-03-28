import { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, Droplets, Wind, Thermometer } from 'lucide-react';

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState<{
    temperature: number | null;
    weatherCode: number | null;
    humidity: number | null;
    windSpeed: number | null;
    feelsLike: number | null;
    location: string | null;
    error: string | null;
    loading: boolean;
  }>({
    temperature: null,
    weatherCode: null,
    humidity: null,
    windSpeed: null,
    feelsLike: null,
    location: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setWeatherData(prev => ({ ...prev, error: 'Location Error', loading: false }));
      return;
    }

    const fetchWeatherAndLocation = async (lat: number, lon: number) => {
      try {
        const [weatherRes, locationRes] = await Promise.all([
          fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code`),
          fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
        ]);
        
        if (!weatherRes.ok) throw new Error('Failed to fetch weather');
        
        const data = await weatherRes.json();
        const locationData = locationRes.ok ? await locationRes.json() : null;
        
        // Try city, then locality, then fallback
        let locName = 'Local';
        if (locationData) {
          locName = locationData.city || locationData.locality || locationData.principalSubdivision || 'Local';
        }

        setWeatherData({
          temperature: Math.round(data.current.temperature_2m),
          weatherCode: data.current.weather_code,
          humidity: data.current.relative_humidity_2m,
          windSpeed: data.current.wind_speed_10m,
          feelsLike: data.current.apparent_temperature,
          location: locName,
          error: null,
          loading: false,
        });
      } catch {
        setWeatherData(prev => ({ ...prev, error: 'Failed', loading: false }));
      }
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeatherAndLocation(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.error("Geolocation error:", error);
        setWeatherData(prev => ({ ...prev, error: 'Denied', loading: false }));
      }
    );
  }, []);

  const getWeatherDisplay = () => {
    const { weatherCode, temperature, error, loading } = weatherData;
    const iconSize = 32;
    const baseIconClasses = "group-hover:text-white transition-colors duration-500 text-white shadow-xl drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]";
    // Using white colored icons for main display to increase contrast
    
    if (loading) return { icon: <Cloud className="text-[#6c6c76] animate-pulse" size={iconSize} />, color: '#6c6c76', text: '...' };
    if (error) return { icon: <Cloud className="text-red-500/50" size={iconSize} />, color: '#ff4444', text: 'ERR' };
    
    let display = { icon: <Cloud className={`text-white ${baseIconClasses}`} size={iconSize} fill="currentColor" />, color: '#6c6c76', text: `${temperature}°` };

    if (weatherCode === 0) {
      display = { icon: <Sun className={`text-[#ffcc00] group-hover:text-white transition-colors duration-500 drop-shadow-[0_0_8px_rgba(255,204,0,0.4)]`} size={iconSize} fill="currentColor" />, color: '#ffcc00', text: `${temperature}°` };
    } else if (weatherCode! >= 1 && weatherCode! <= 3) {
      display = { icon: <Cloud className={`text-[#a0a0b0] group-hover:text-white transition-colors duration-500 drop-shadow-[0_0_8px_rgba(160,160,176,0.3)]`} size={iconSize} fill="currentColor" />, color: '#a0a0b0', text: `${temperature}°` };
    } else if ((weatherCode! >= 51 && weatherCode! <= 67) || (weatherCode! >= 80 && weatherCode! <= 82)) {
      display = { icon: <CloudRain className={`text-[#4da6ff] group-hover:text-white transition-colors duration-500 drop-shadow-[0_0_8px_rgba(77,166,255,0.4)]`} size={iconSize} fill="currentColor" />, color: '#4da6ff', text: `${temperature}°` };
    } else if ((weatherCode! >= 71 && weatherCode! <= 77) || weatherCode! === 85 || weatherCode! === 86) {
      display = { icon: <CloudSnow className={`text-[#ffffff] group-hover:text-gray-300 transition-colors duration-500 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]`} size={iconSize} fill="currentColor" />, color: '#ffffff', text: `${temperature}°` };
    } else if (weatherCode! >= 95 && weatherCode! <= 99) {
      display = { icon: <CloudLightning className={`text-[#cc33ff] group-hover:text-white transition-colors duration-500 drop-shadow-[0_0_8px_rgba(204,51,255,0.4)]`} size={iconSize} fill="currentColor" />, color: '#cc33ff', text: `${temperature}°` };
    }

    return display;
  };

  const { icon, color, text } = getWeatherDisplay();

  return (
    <div className="flex flex-col items-center gap-2 group cursor-default">
      {/* Circle Widget */}
      <div className="w-24 h-24 rounded-full bg-[#16161c] shadow-[inset_0_0_20px_rgba(0,0,0,0.8),0_10px_20px_rgba(0,0,0,0.5)] border border-white/5 flex items-center justify-center relative overflow-hidden pointer-events-auto">
        <div 
          className="absolute inset-0 opacity-10 transition-colors duration-1000"
          style={{ backgroundColor: color }}
        />
        <div className="relative flex flex-col items-center justify-center z-10 w-full h-full pt-1 transition-transform duration-500 group-hover:scale-105">
          {icon}
          <span className="font-bold text-lg mt-0.5 tracking-tight transition-colors duration-500" style={{ color: color }}>
            {text}
          </span>
        </div>
      </div>
      
      {/* Location Text */}
      <div className="h-4 flex items-center justify-center mt-1">
        {weatherData.location && !weatherData.loading && !weatherData.error ? (
          <span className="text-xs font-semibold tracking-widest text-[#6c6c76] uppercase group-hover:text-white transition-colors duration-500">
            {weatherData.location}
          </span>
        ) : weatherData.error ? (
          <span className="text-xs font-semibold tracking-widest text-red-500/70 uppercase">
            {weatherData.error}
          </span>
        ) : null}
      </div>

      {/* Additional Details */}
      <div className="flex items-center justify-center gap-3 mt-0.5 h-4 transition-opacity duration-500">
        {weatherData.feelsLike !== null && !weatherData.loading && !weatherData.error && (
          <>
            <div title="Feels like" className="flex items-center gap-1 text-[#6c6c76] hover:text-[#ffcc00] transition-colors duration-300 cursor-help">
              <Thermometer size={12} />
              <span className="text-[10px] tracking-wider font-medium">{Math.round(weatherData.feelsLike)}°</span>
            </div>
            <div className="w-[1px] h-2.5 bg-white/10" />
            <div title="Humidity" className="flex items-center gap-1 text-[#6c6c76] hover:text-[#4da6ff] transition-colors duration-300 cursor-help">
              <Droplets size={12} />
              <span className="text-[10px] tracking-wider font-medium">{weatherData.humidity}%</span>
            </div>
            <div className="w-[1px] h-2.5 bg-white/10" />
            <div title="Wind Speed" className="flex items-center gap-1 text-[#6c6c76] hover:text-white transition-colors duration-300 cursor-help">
              <Wind size={12} />
              <span className="text-[10px] tracking-wider font-medium">{Math.round(weatherData.windSpeed!)}<span className="text-[8px] ml-[1px]">km/h</span></span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherWidget;
