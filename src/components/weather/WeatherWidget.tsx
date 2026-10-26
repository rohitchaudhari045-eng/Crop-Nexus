import React, { useState, useEffect } from 'react';
import { weatherApi } from '@/services/apiService';
import { WeatherForecastDay, WeatherAlertItem } from '@/types';
import { DISTRICTS_LIST } from '@/utils/constants';
import {
  CloudRain,
  CloudLightning,
  CloudDrizzle,
  CloudSun,
  Sun,
  Wind,
  Droplets,
  AlertTriangle,
  MapPin,
  Calendar
} from 'lucide-react';
import { formatDate } from '@/utils/formatters';

interface WeatherWidgetProps {
  district?: string;
  onDistrictChange?: (district: string) => void;
  showAlertsBanner?: boolean;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({
  district = 'Kolhapur',
  onDistrictChange,
  showAlertsBanner = true
}) => {
  const [selectedDistrict, setSelectedDistrict] = useState(district);
  const [forecast, setForecast] = useState<WeatherForecastDay[]>([]);
  const [alerts, setAlerts] = useState<WeatherAlertItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [forecastRes, alertsRes] = await Promise.all([
        weatherApi.getForecast(selectedDistrict),
        weatherApi.getAlerts(selectedDistrict)
      ]);
      setForecast(forecastRes.forecast);
      setAlerts(alertsRes);
      setLoading(false);
    };
    fetchData();
  }, [selectedDistrict]);

  const handleDistrictSelect = (d: string) => {
    setSelectedDistrict(d);
    if (onDistrictChange) onDistrictChange(d);
  };

  const getWeatherIcon = (iconName: string) => {
    switch (iconName) {
      case 'CloudRain':
        return <CloudRain className="w-6 h-6 text-blue-500" />;
      case 'CloudLightning':
        return <CloudLightning className="w-6 h-6 text-amber-500" />;
      case 'CloudDrizzle':
        return <CloudDrizzle className="w-6 h-6 text-cyan-500" />;
      case 'CloudSun':
        return <CloudSun className="w-6 h-6 text-amber-500" />;
      case 'Sun':
      default:
        return <Sun className="w-6 h-6 text-amber-500" />;
    }
  };

  const today = forecast[0];

  return (
    <div className="space-y-4">
      {/* Location Selector & Source Indicator */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-emerald-700 shrink-0" />
          <div>
            <span className="text-xs uppercase font-bold text-slate-500 block">Agromet District</span>
            <select
              value={selectedDistrict}
              onChange={(e) => handleDistrictSelect(e.target.value)}
              className="font-bold text-sm text-slate-900 bg-transparent focus:outline-none cursor-pointer"
            >
              {DISTRICTS_LIST.map((dist) => (
                <option key={dist} value={dist}>
                  {dist}, Maharashtra
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-medium">
            Demo Agromet Readings
          </span>
        </div>
      </div>

      {/* Severe Alerts Notice if present */}
      {showAlertsBanner && alerts.length > 0 && (
        <div className="space-y-2">
          <h2 className="sr-only">Active Agromet Alerts</h2>
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-2xl border flex items-start gap-3 ${
                alert.severity === 'severe'
                  ? 'bg-amber-50 border-amber-300 text-amber-950'
                  : 'bg-blue-50 border-blue-200 text-blue-950'
              }`}
            >
              <AlertTriangle
                className={`w-5 h-5 shrink-0 mt-0.5 ${
                  alert.severity === 'severe' ? 'text-amber-800' : 'text-blue-800'
                }`}
              />
              <div className="space-y-1 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-bold text-sm text-slate-950">{alert.title}</h3>
                  <span className="text-xs uppercase font-bold px-2 py-0.5 rounded bg-amber-200/60 text-amber-900">
                    Severity: {alert.severity}
                  </span>
                </div>
                <p className="text-slate-700 leading-relaxed">{alert.description}</p>
                <div className="mt-2 pt-2 border-t border-amber-200/60 text-xs">
                  <strong className="text-amber-950">Recommended Farmer Actions:</strong>
                  <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-700">
                    {alert.advisorySteps.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Current Conditions Card */}
      {today && (
        <div className="bg-gradient-to-br from-emerald-800 to-green-900 text-white rounded-2xl p-6 shadow-md shadow-emerald-950/20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-emerald-200 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Today's Agricultural Advisory • {formatDate(today.date)}
              </span>
              <div className="flex items-baseline gap-3 mt-2">
                <span className="text-4xl sm:text-5xl font-black tracking-tight">{today.tempMaxC}°C</span>
                <span className="text-sm text-emerald-200 font-medium">Min: {today.tempMinC}°C</span>
              </div>
              <p className="text-base font-semibold text-emerald-100 mt-1">{today.condition}</p>
            </div>

            <div className="grid grid-cols-3 gap-6 text-xs">
              <div className="text-center">
                <Droplets className="w-4 h-4 mx-auto text-emerald-300 mb-1" />
                <p className="text-xs text-emerald-200">Humidity</p>
                <p className="font-bold text-white text-sm">{today.humidityPct}%</p>
              </div>
              <div className="text-center">
                <CloudRain className="w-4 h-4 mx-auto text-emerald-300 mb-1" />
                <p className="text-xs text-emerald-200">Rain Prob.</p>
                <p className="font-bold text-white text-sm">{today.rainfallProbabilityPct}%</p>
              </div>
              <div className="text-center">
                <Wind className="w-4 h-4 mx-auto text-emerald-300 mb-1" />
                <p className="text-xs text-emerald-200">Wind</p>
                <p className="font-bold text-white text-sm">{today.windSpeedKmh} km/h</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5-Day Outlook */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
        <h2 className="font-bold text-xs uppercase tracking-wider text-slate-700">
          5-Day Agricultural Weather Outlook
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {forecast.map((day, idx) => (
            <div
              key={idx}
              className={`p-3 text-center text-xs ${
                idx === 0 ? 'bg-emerald-50/50 rounded-lg sm:rounded-none' : ''
              }`}
            >
              <p className="text-xs font-bold text-slate-700 mb-1">
                {idx === 0 ? 'Today' : formatDate(day.date).split(',')[0]}
              </p>
              <div className="my-2 flex justify-center">{getWeatherIcon(day.icon)}</div>
              <p className="font-extrabold text-sm text-slate-900">{day.tempMaxC}° / {day.tempMinC}°</p>
              <p className="text-xs text-slate-600 truncate mt-0.5">{day.condition}</p>
              <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-center gap-1 text-xs text-blue-800 font-semibold">
                <Droplets className="w-3 h-3" /> {day.rainfallProbabilityPct}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
