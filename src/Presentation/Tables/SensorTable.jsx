import React from "react";

const SensorTable = ({ sensorData }) => {
  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Recent Sensor Updates</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-gray-300 border-b border-gray-700">
            <th className="py-2 px-3">Sensor</th>
            <th className="py-2 px-3">Value</th>
            <th className="py-2 px-3">Last Update</th>
          </tr>
        </thead>
        <tbody>
          {sensorData.map((entry, index) => (
            <tr
              key={index}
              className="border-b border-gray-800 hover:bg-gray-800 transition"
            >
              <td className="py-2 px-3">{entry.sensor}</td>
              <td className="py-2 px-3">{entry.value}</td>
              <td className="py-2 px-3">{entry.lastUpdate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SensorTable;
