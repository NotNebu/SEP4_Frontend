import React from "react";

export default function LiveSensorFeed({ feed = [] }) {
  return (
    <div className="p-6 w-full bg-white dark:bg-gray-800 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Live Sensor Feed </h2>
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
            <tr key={index} className="text-center border-t dark:border-gray-600">
              <td className="p-1">{new Date(entry.timestamp).toLocaleTimeString()}</td>

              <td className={`p-1 ${
                entry.temperatur > 28 ? "text-red-500 font-semibold" :
                entry.temperatur < 22 ? "text-blue-400" : ""
              }`}>
                {entry.temperatur}
              </td>

              <td className={`p-1 ${
                entry.luftfugtighed < 50 ? "text-yellow-400 font-medium" : ""
              }`}>
                {entry.luftfugtighed}
              </td>

              <td className={`p-1 ${
                entry.jordfugtighed < 25 ? "text-yellow-400 font-medium" : ""
              }`}>
                {entry.jordfugtighed}
              </td>

              <td className="p-1">{entry.lys}</td>

              <td className={`p-1 ${
                entry.afstand < 12 ? "text-green-500 font-semibold" :
                entry.afstand > 18 ? "text-red-400 font-medium" : ""
              }`}>
                {entry.afstand}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
