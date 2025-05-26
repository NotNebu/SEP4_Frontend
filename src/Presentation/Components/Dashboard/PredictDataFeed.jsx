import React from "react";

// Komponent til visning af forudsagte sensormålinger i en tabel
// Modtager et feed-array som prop og viser hver forudsigelse
export default function PredictedSensorFeed({ feed = [] }) {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-orange-400">
        Seneste Forudsigelser
      </h2>
      <table className="w-full text-sm border-collapse">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="p-2 border">Tid</th>
            <th className="p-2 border">Temp (°C)</th>
            <th className="p-2 border">Luft %</th>
            <th className="p-2 border">Jord %</th>
            <th className="p-2 border">Lys</th>
            <th className="p-2 border">Afstand (cm)</th>
          </tr>
        </thead>
        <tbody>
          {feed.map((entry, index) => (
            <tr
              key={index}
              className="text-center border-t dark:border-gray-600"
            >
              {/* Viser tidspunktet for forudsigelsen */}
              <td className="p-1">
                {new Date(entry.timestamp).toLocaleTimeString()}
              </td>
              {/* Viser forudsagte værdier */}
              <td className="p-1">{entry.predictedTemperatur}</td>
              <td className="p-1">{entry.predictedLuftfugtighed}</td>
              <td className="p-1">{entry.predictedJordfugtighed}</td>
              <td className="p-1">{entry.predictedLys}</td>
              <td className="p-1">{entry.predictedAfstand}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
