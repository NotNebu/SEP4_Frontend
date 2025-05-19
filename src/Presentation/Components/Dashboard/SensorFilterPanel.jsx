import React from "react";

// Panel til at vælge sensorer, tidsinterval og opdatere grafvisning
export default function SensorFilterPanel({ filters, setFilters, availableSensors }) {
  // Tilføjer eller fjerner en sensor fra det valgte filter
  const toggleSensor = (sensorId) => {
    const isSelected = filters.sensors.includes(sensorId);
    const updatedSensors = isSelected
      ? filters.sensors.filter((s) => s !== sensorId)
      : [...filters.sensors, sensorId];

    setFilters(prev => ({ ...prev, sensors: updatedSensors }));
  };

  // Håndterer ændring af tidsperiode
  const handleTimeRange = (e) => {
    setFilters(prev => ({ ...prev, range: e.target.value }));
  };

  // Vælger alle tilgængelige sensorer
  const handleSelectAll = () => {
    setFilters(prev => ({ ...prev, sensors: availableSensors }));
  };

  // Fravælger alle sensorer
  const handleClearAll = () => {
    setFilters(prev => ({ ...prev, sensors: [] }));
  };

  // Tvinger opdatering af graf
  const handleRefresh = () => {
    setFilters(prev => ({ ...prev, refresh: true }));
  };

  return (
    <div className="space-y-4 text-white">
      {/* Sensorvalg med checkboxes */}
      <div>
        <label className="block mb-2 font-medium">Vælg sensorer</label>
        <div className="space-y-2">
          {availableSensors.map((sensor) => (
            <label key={sensor} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="accent-blue-500"
                checked={filters.sensors.includes(sensor)}
                onChange={() => toggleSensor(sensor)}
              />
              <span>{sensor.charAt(0).toUpperCase() + sensor.slice(1)}</span>
            </label>
          ))}
        </div>

        {/* Knapper: Vælg/fravælg alle */}
        <div className="flex justify-between mt-2 text-sm">
          <button onClick={handleSelectAll} className="text-blue-400 hover:underline">
            Vælg alle
          </button>
          <button onClick={handleClearAll} className="text-red-400 hover:underline">
            Fravælg alle
          </button>
        </div>
      </div>

      {/* Tidsvalg */}
      <div>
        <label className="block mb-1 font-medium">Tidsperiode</label>
        <select
          className="w-full bg-gray-800 border border-gray-600 p-2 rounded"
          value={filters.range}
          onChange={handleTimeRange}
        >
          <option value="1h">Seneste 1 time</option>
          <option value="6h">Seneste 6 timer</option>
          <option value="24h">Seneste 24 timer</option>
        </select>
      </div>

      {/* Opdater-knap */}
      <button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        onClick={handleRefresh}
      >
        Opdater graf
      </button>
    </div>
  );
}
