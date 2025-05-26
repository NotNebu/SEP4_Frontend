import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function SensorVsPredictionChart({
  sensorFeed = [],
  predictedFeed = [],
  sensorKey,
}) {
  if (
    !sensorKey ||
    !Array.isArray(sensorFeed) ||
    !Array.isArray(predictedFeed)
  ) {
    return null;
  }

  const predictedKey = `predicted${sensorKey
    .charAt(0)
    .toUpperCase()}${sensorKey.slice(1)}`;

  const merged = sensorFeed.map((entry, index) => ({
    time: entry?.timestamp
      ? new Date(entry.timestamp).toLocaleTimeString()
      : `T${index}`,
    sensorValue: entry?.[sensorKey] ?? null,
    predictedValue: predictedFeed[index]?.[predictedKey] ?? null,
  }));

  const hasValidData = merged.some(
    (d) =>
      typeof d.sensorValue === "number" && typeof d.predictedValue === "number"
  );

  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow-md">
      <h3 className="text-white font-semibold mb-2">
        {sensorKey.charAt(0).toUpperCase() + sensorKey.slice(1)}: Sensor Værdi
        og Forudsagt Værdi
      </h3>

      {!hasValidData ? (
        <p className="text-red-500 mt-4">
          Grafen kan ikke vises – manglende data.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={merged}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="sensorValue"
              stroke="#00bcd4"
              name="Sensor"
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="predictedValue"
              stroke="#ff7300"
              name="Forudsagt"
              strokeDasharray="5 5"
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
