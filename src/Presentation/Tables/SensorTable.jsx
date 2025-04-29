import React from "react";

/**
 * SensorTable komponenten viser sensordata i en tabel.
 * Hver række repræsenterer data for en bestemt tid (f.eks. temperatur, luftfugtighed, jordfugtighed, lysniveau).
 *
 * @param {Array} data - Data for sensorerne (f.eks. temperatur, luftfugtighed, jordfugtighed, lys)
 * @returns {JSX.Element}
 */
const SensorTable = ({ data }) => {
  if (!data) {
    return <p className="text-white">Indlæser sensor-data...</p>;
  }

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Seneste Sensoropdateringer</h2>

      {/* Tabelvisning: sensor tabel for større skærme*/}
      <div className="hidden sm:block">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-300 border-b border-gray-700">
                <th className="py-2 px-3">Sensor</th>
                <th className="py-2 px-3">Værdi</th>
                <th className="py-2 px-3">Sidste Opdatering</th>
              </tr>
            </thead>
            <tbody>
              {data.map((entry, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-800 hover:bg-gray-800 transition"
                >
                  <td className="py-2 px-3">{entry.sensor}</td>
                  <td className="py-2 px-3">{entry.value}</td>
                  <td className="py-2 px-3">{entry.timestamp || entry.lastUpdate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stakket listevisning: sensor tabel for mobil*/}
      <div className="sm:hidden">
        <div className="space-y-4 mt-6">
          {data.map((entry, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md">
              <div className="font-semibold text-sm">Sensor: {entry.sensor}</div>
              <div className="text-sm">Værdi: {entry.value}</div>
              <div className="text-sm">Sidste Opdatering: {entry.timestamp || entry.lastUpdate}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SensorTable;