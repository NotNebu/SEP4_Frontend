import React, { useEffect, useState } from "react";
import LiveSensorFeed from "@/Presentation/Components/Dashboard/LiveSensorFeed";
import PredictedSensorFeed from "@/Presentation/Components/Dashboard/PredictDataFeed";
import SensorVsPredictionChart from "@/Presentation/Components/Dashboard/SensorVsPredictionChart";
import { generateMockSensorData } from "@/Presentation/Logic/generateMockSensorData";
import { generatePredictedData } from "@/Presentation/Logic/generatePredictedData";

export default function SensorPredictionTableWrapper() {
  const [sensorFeed, setSensorFeed] = useState([]);
  const [predictedFeed, setPredictedFeed] = useState([]);
  const [selectedSensor, setSelectedSensor] = useState("temperatur");

  useEffect(() => {
    const sensorInterval = setInterval(() => {
      setSensorFeed((prev) => [generateMockSensorData(), ...prev.slice(0, 19)]);
    }, 3000);

    const predictionInterval = setInterval(() => {
      setPredictedFeed((prev) => [generatePredictedData(), ...prev.slice(0, 19)]);
    }, 3000);

    return () => {
      clearInterval(sensorInterval);
      clearInterval(predictionInterval);
    };
  }, []);

  const sensorOptions = [
    { value: "temperatur", label: "Temperatur" },
    { value: "luftfugtighed", label: "Luftfugtighed" },
    { value: "jordfugtighed", label: "Jordfugtighed" },
    { value: "lys", label: "Lys" },
    { value: "afstand", label: "Afstand" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <label className="text-white font-medium">Vælg sensor:</label>
        <select
          value={selectedSensor}
          onChange={(e) => setSelectedSensor(e.target.value)}
          className="p-2 rounded-md bg-gray-700 text-white"
        >
          {sensorOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LiveSensorFeed feed={sensorFeed} />
        <PredictedSensorFeed feed={predictedFeed} />
      </div>

      <SensorVsPredictionChart
        sensorFeed={sensorFeed}
        predictedFeed={predictedFeed}
        sensorKey={selectedSensor}
      />
    </div>
  );
}
