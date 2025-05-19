import React from "react";
import SensorGraphBox from "./GraphCard";

/**
 * SensorGrid – Viser et grid-layout af sensorgrafer (én per sensor)
 * Bruger SensorGraphBox (GraphCard) til hver graf.
 */
export default function SensorGrid({ sensors = [] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {sensors.map((sensor, index) => (
        <SensorGraphBox
          key={index}
          title={sensor.title}         // Fx "Temperatur"
          subtitle={sensor.subtitle}   // Fx "Seneste 24 timer"
          sideText={sensor.sideText}   // Fx "Gns: 22°C"
          data={sensor.data}
          dataKey={sensor.dataKey}
          stroke={sensor.stroke}
          unit={sensor.unit}           // Fx "°C", "%", "cm"
          domain={sensor.domain}       // Fx [0, 100]
        />
      ))}
    </div>
  );
}
