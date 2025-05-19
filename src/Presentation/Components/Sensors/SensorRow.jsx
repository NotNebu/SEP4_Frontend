import React from "react";

/**
 * Viser én række med sensorinformation – enten som tabelrække (desktop)
 * eller som kort (mobilvisning).
 */
const SensorRow = ({ entry, isMobile }) => {
  if (isMobile) {
    // Mobilvisning som kort
    return (
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <div className="font-semibold text-sm">Sensor: {entry.sensor}</div>
        <div className="text-sm">Værdi: {entry.value}</div>
        <div className="text-sm">Sidste opdatering: {entry.lastUpdate}</div>
      </div>
    );
  }

  // Desktopvisning som tabelrække
  return (
    <tr className="border-b border-gray-800 hover:bg-gray-800 transition">
      <td className="py-2 px-3">{entry.sensor}</td>
      <td className="py-2 px-3">{entry.value}</td>
      <td className="py-2 px-3">{entry.lastUpdate}</td>
    </tr>
  );
};

export default SensorRow;
