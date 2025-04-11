import React from "react";

const SensorTable = ({ sensorData }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 w-full max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
        Recent Sensor Updates
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-200">
          <thead className="bg-gray-100 dark:bg-gray-800 border-b dark:border-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">Sensor</th>
              <th scope="col" className="px-6 py-3 font-medium">Value</th>
              <th scope="col" className="px-6 py-3 font-medium">Last Update</th>
            </tr>
          </thead>
          <tbody>
            {sensorData.map((sensor) => (
              <tr
                key={sensor.id}
                className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <td className="px-6 py-4">{sensor.sensor}</td>
                <td className="px-6 py-4">{sensor.value}</td>
                <td className="px-6 py-4">{sensor.lastUpdate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SensorTable;
