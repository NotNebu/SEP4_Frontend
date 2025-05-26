import React from "react";
import Button from "@/Presentation/Components/Shared/UI/Button";
import Select from "@/Presentation/Components/Shared/UI/Select";
import Checkbox from "@/Presentation/Components/Shared/UI/Checkbox";

/**
 * Panel til at vælge sensorer, tidsinterval og opdatere grafvisning.
 */
export default function SensorFilterPanel({
  filters,
  setFilters,
  availableSensors,
}) {
  const toggleSensor = (sensorId) => {
    const isSelected = filters.sensors.includes(sensorId);
    const updatedSensors = isSelected
      ? filters.sensors.filter((s) => s !== sensorId)
      : [...filters.sensors, sensorId];

    setFilters((prev) => ({ ...prev, sensors: updatedSensors }));
  };

  const handleTimeRange = (e) => {
    setFilters((prev) => ({ ...prev, range: e.target.value }));
  };

  const handleSelectAll = () => {
    setFilters((prev) => ({ ...prev, sensors: availableSensors }));
  };

  const handleClearAll = () => {
    setFilters((prev) => ({ ...prev, sensors: [] }));
  };

  const handleRefresh = () => {
    setFilters((prev) => ({ ...prev, refresh: true }));
  };

  // Dansk oversættelse af sensor-id'er
  const sensorLabels = {
    temperature: "Temperatur",
    humidity: "Luftfugtighed",
    soil: "Jordfugtighed",
    distance: "Afstand",
    light: "Lys",
    water: "Vand",
  };

  return (
    <div className="space-y-4 text-white">
      {/* Sensorvalg med checkboxes */}
      <div>
        <label className="block mb-2 font-medium">Vælg sensorer</label>
        <div className="space-y-2">
          {availableSensors.map((sensor) => (
            <Checkbox
              key={sensor}
              name={sensor}
              label={sensorLabels[sensor] || sensor}
              checked={filters.sensors.includes(sensor)}
              onChange={() => toggleSensor(sensor)}
            />
          ))}
        </div>

        <div className="flex justify-between mt-2 text-sm gap-2">
          <Button
            label="Vælg alle"
            onClick={handleSelectAll}
            variant="secondary"
          />
          <Button
            label="Fravælg alle"
            onClick={handleClearAll}
            variant="danger"
          />
        </div>
      </div>

      {/* Tidsvalg med Select-komponent */}
      <Select
        label="Tidsperiode"
        name="range"
        value={filters.range}
        onChange={handleTimeRange}
        options={[
          { value: "1h", label: "Seneste 1 time" },
          { value: "6h", label: "Seneste 6 timer" },
          { value: "24h", label: "Seneste 24 timer" },
        ]}
        variant="default"
      />

      {/* Opdater-knap */}
      <Button
        label="Opdater graf"
        onClick={handleRefresh}
        variant="primary"
        fullWidth
      />
    </div>
  );
}
