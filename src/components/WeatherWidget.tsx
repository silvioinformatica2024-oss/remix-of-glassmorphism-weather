import { Sun, CloudSun, MapPin } from "lucide-react";
import { useState, useMemo } from "react";
import SunPath from "./SunPath";
import AirQualityBar from "./AirQualityBar";
import AnimatedClouds from "./AnimatedClouds";
import RainEffect from "./RainEffect";

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

interface DayData {
  temp: number;
  desc: string;
  aqi: number;
  aqiLabel: string;
  cloud: number;
  cloudLabel: string;
  sunProgress: number;
  weather: "sunny" | "cloudy" | "rainy" | "stormy";
}

const WEEK_DATA: DayData[] = [
  { temp: 26, desc: "Parcialmente Nublado", aqi: 58, aqiLabel: "Bom", cloud: 35, cloudLabel: "Parcial", sunProgress: 0.3, weather: "cloudy" },
  { temp: 28, desc: "Ensolarado", aqi: 72, aqiLabel: "Moderado", cloud: 5, cloudLabel: "Limpo", sunProgress: 0.45, weather: "sunny" },
  { temp: 24, desc: "Nublado", aqi: 85, aqiLabel: "Moderado", cloud: 70, cloudLabel: "Nublado", sunProgress: 0.5, weather: "cloudy" },
  { temp: 30, desc: "Muito Sol", aqi: 42, aqiLabel: "Bom", cloud: 8, cloudLabel: "Limpo", sunProgress: 0.55, weather: "sunny" },
  { temp: 27, desc: "Sol com Nuvens", aqi: 65, aqiLabel: "Moderado", cloud: 25, cloudLabel: "Leve", sunProgress: 0.6, weather: "cloudy" },
  { temp: 22, desc: "Tempestade", aqi: 38, aqiLabel: "Bom", cloud: 95, cloudLabel: "Coberto", sunProgress: 0.4, weather: "stormy" },
  { temp: 23, desc: "Chuvoso", aqi: 45, aqiLabel: "Bom", cloud: 80, cloudLabel: "Nublado", sunProgress: 0.35, weather: "rainy" },
];

const WeatherWidget = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const todayIndex = new Date().getDay();
  const [selectedDay, setSelectedDay] = useState(todayIndex);

  const data = WEEK_DATA[selectedDay];

  const isRainy = data.weather === "rainy" || data.weather === "stormy";

  const skyGradient = useMemo(() => {
    if (isDarkMode) {
      return "linear-gradient(180deg, hsl(240,40%,12%) 0%, hsl(260,35%,22%) 60%, hsl(240,30%,15%) 100%)";
    }
    if (data.weather === "stormy") {
      return "linear-gradient(180deg, hsl(220,30%,30%) 0%, hsl(215,25%,45%) 50%, hsl(210,20%,65%) 100%)";
    }
    if (data.weather === "rainy") {
      return "linear-gradient(180deg, hsl(215,35%,38%) 0%, hsl(210,30%,55%) 50%, hsl(200,25%,78%) 100%)";
    }
    const warmth = data.sunProgress;
    const topH = 211 - warmth * 15;
    const midS = 72 - data.cloud * 0.3;
    return `linear-gradient(180deg, hsl(${topH},68%,39%) 0%, hsl(193,${midS}%,65%) 50%, hsl(200,30%,92%) 100%)`;
  }, [isDarkMode, data.sunProgress, data.cloud, data.weather]);

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen flex items-center justify-center bg-background p-4 transition-colors duration-500">
        {/* Dark mode toggle */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="fixed top-6 right-6 z-50 px-4 py-2 rounded-pill text-sm font-medium
            bg-glass-strong backdrop-blur-[16px] border border-glass-border
            text-foreground shadow-glass-card transition-all hover:scale-105"
        >
          {isDarkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        {/* Widget */}
        <div className="relative w-[400px] rounded-widget overflow-hidden shadow-widget transition-all duration-500">
          {/* Sky background */}
          <div
            className="absolute inset-0 transition-all duration-700"
            style={{ background: skyGradient }}
          />

          {/* Clouds */}
          <AnimatedClouds />

          {/* Rain / Storm effects */}
          {isRainy && (
            <RainEffect
              intensity={data.weather === "stormy" ? "heavy" : "moderate"}
              withLightning={data.weather === "stormy"}
            />
          )}

          {/* Content */}
          <div className="relative z-10 p-6 pb-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex-1" />
              <div className="flex items-center gap-1.5 text-primary-foreground">
                <MapPin size={14} />
                <span className="text-sm font-medium">Calicut, Kerala</span>
              </div>
              <div className="flex-1 flex justify-end">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-glass-border shadow-glass-card">
                  <img
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Sun area */}
            <div className="relative mt-2">
              {/* Sun sphere - smaller, matching reference */}
              <div
                className="absolute top-0 left-0 w-12 h-12 rounded-full animate-sun-pulse z-10 transition-opacity duration-700"
                style={{
                  background: "radial-gradient(circle at 35% 35%, hsl(40,100%,78%), hsl(36,90%,58%))",
                  opacity: isRainy ? 0.15 : isDarkMode ? 0.3 : 1,
                }}
              />

              {/* Sun path */}
              <div className="ml-12 mr-4">
                <SunPath progress={data.sunProgress} />
              </div>

              {/* Temperature */}
              <div className="absolute bottom-8 left-0">
                <div className="text-primary-foreground transition-all duration-500">
                  <span className="text-7xl font-light leading-none">{data.temp}</span>
                  <span className="text-2xl font-light align-top">°</span>
                </div>
                <p className="text-primary-foreground/90 text-sm font-medium mt-1">
                  {data.desc}
                </p>
              </div>

              <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                <p className="text-primary-foreground/70 text-xs">11:21 AM</p>
              </div>
              <div className="absolute bottom-8 right-0">
                <p className="text-primary-foreground/70 text-xs">Fev 2, 2025</p>
              </div>
            </div>

            {/* Metric cards */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-glass-strong backdrop-blur-[16px] rounded-card p-4 border border-glass-border shadow-glass-card transition-all duration-500">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-secondary-foreground text-xs font-medium">Qualidade do Ar</span>
                  <Sun size={16} className="text-muted-foreground" />
                </div>
                <p className="text-2xl font-semibold text-secondary-foreground transition-all duration-500">{data.aqi}</p>
                <span className="text-xs text-muted-foreground">{data.aqiLabel}</span>
                <AirQualityBar />
              </div>

              <div className="bg-glass-strong backdrop-blur-[16px] rounded-card p-4 border border-glass-border shadow-glass-card transition-all duration-500">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-secondary-foreground text-xs font-medium">Cobertura de Nuvens</span>
                  <CloudSun size={16} className="text-muted-foreground" />
                </div>
                <p className="text-2xl font-semibold text-secondary-foreground transition-all duration-500">{data.cloud}%</p>
                <span className="text-xs text-muted-foreground">{data.cloudLabel}</span>
                <div className="mt-2 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-700"
                      style={{ width: `${data.cloud}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Weekday selector */}
            <div className="mt-5 flex items-center justify-around bg-nav backdrop-blur-[24px] rounded-pill py-2.5 px-3 border border-glass-border shadow-glass-card">
              {WEEKDAYS.map((day, i) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(i)}
                  className={`relative px-3 py-1.5 rounded-pill text-xs font-semibold transition-all duration-300
                    ${selectedDay === i
                      ? "bg-primary text-primary-foreground shadow-sm scale-105"
                      : "text-nav-icon hover:bg-glass hover:scale-105"
                    }
                    ${i === todayIndex && selectedDay !== i ? "ring-1 ring-primary/30" : ""}
                  `}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
