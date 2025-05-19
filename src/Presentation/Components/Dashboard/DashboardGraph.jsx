import React from "react";
import { DashboardViewModel } from "@/Presentation/Hooks/useDashboardViewModel";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// Viser dynamiske grafer baseret på valgte sensorer og valgt graf-type
export default function DashboardPage({ filters, chartType }) {
  const { temperatureData, humidityData, distanceData, soilData } = DashboardViewModel();

  // Mapping af sensortyper til labels, farver og datasæt
  const sensorMap = {
    temperature: {
      label: "Temperatur",
      stroke: "#ff7300",
      data: temperatureData,
      key: "temperature",
      unit: "°C",
    },
    humidity: {
      label: "Luftfugtighed",
      stroke: "#00bcd4",
      data: humidityData,
      key: "humidity",
      unit: "%",
    },
    distance: {
      label: "Afstand",
      stroke: "#8e24aa",
      data: distanceData,
      key: "distance",
      unit: "cm",
    },
    soil: {
      label: "Jordfugtighed",
      stroke: "#4caf50",
      data: soilData,
      key: "soil",
      unit: "%",
    },
  };

  // Filtrér valgte sensorer baseret på brugerens filtervalg
  const selected = filters.sensors.map((sensor) => sensorMap[sensor]);

  // Vælg komponenttype baseret på valgt graf-type
  const ChartComponent =
    chartType === "line" ? LineChart :
    chartType === "area" ? AreaChart :
    BarChart;

  const GraphElement =
    chartType === "line" ? Line :
    chartType === "area" ? Area :
    Bar;

  // Formatter X-aksen afhængigt af tidsinterval
  const formatXAxisTick = (value) => {
    const date = new Date(value);
    return (filters.range === "1h" || filters.range === "6h")
      ? date.toLocaleTimeString("da-DK", { hour: "2-digit", minute: "2-digit" })
      : date.toLocaleDateString("da-DK", { day: "2-digit", month: "2-digit" });
  };

  // Hvis ingen sensorer er valgt
  if (selected.length === 0) {
    return <p className="text-center text-gray-400 mt-8">Vælg mindst én sensor for at se data</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-6">
      {selected.map((sensor) => (
        <div
          key={sensor.key}
          className="w-full h-[19rem] sm:h-[21rem] lg:h-[23rem] xl:h-[26rem] bg-gray-800 rounded-xl p-4 shadow-md"
        >
          {/* Titel */}
          <h3 className="text-sm font-semibold text-white mb-2">{sensor.label}</h3>

          {/* Responsiv grafcontainer */}
          <ResponsiveContainer width="100%" height="100%">
            <ChartComponent margin={{ top: 10, right: 10, bottom: 30, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="time"
                stroke="#ccc"
                tickFormatter={formatXAxisTick}
              />
              <YAxis unit={sensor.unit} stroke={sensor.stroke} />
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
              <GraphElement
                type="monotone"
                dataKey={sensor.key}
                data={sensor.data}
                name={sensor.label}
                stroke={sensor.stroke}
                fill={sensor.stroke}
                dot={chartType === "line" ? { r: 3 } : false}
              />
            </ChartComponent>
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  );
}
