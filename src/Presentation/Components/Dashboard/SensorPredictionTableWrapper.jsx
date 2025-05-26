import React, { useEffect, useState } from "react";
import LiveSensorFeed from "@/Presentation/Components/Dashboard/LiveSensorFeed";
import PredictedSensorFeed from "@/Presentation/Components/Dashboard/PredictDataFeed";
import SensorVsPredictionChart from "@/Presentation/Components/Dashboard/SensorVsPredictionChart";
import { generateMockSensorData } from "@/Presentation/Logic/generateMockSensorData";
import { generatePredictedData } from "@/Presentation/Logic/generatePredictedData";
import Select from "@/Presentation/Components/Shared/UI/Select";

// Wrapper-komponent til visning af både live sensordata og forudsagte data
// Indeholder sensorvalg, graf og tabeller for både målinger og forudsigelser
export default function SensorPredictionTableWrapper() {
  const [sensorFeed, setSensorFeed] = useState([]);
  const [predictedFeed, setPredictedFeed] = useState([]);
  const [selectedSensor, setSelectedSensor] = useState("temperatur");

  useEffect(() => {
    // Simulerer løbende opdatering af sensordata
    const sensorInterval = setInterval(() => {
      setSensorFeed((prev) => [generateMockSensorData(), ...prev.slice(0, 19)]);
    }, 3000);

    // Simulerer løbende opdatering af forudsagte data
    const predictionInterval = setInterval(() => {
      setPredictedFeed((prev) => [
        generatePredictedData(),
        ...prev.slice(0, 19),
      ]);
    }, 3000);

    return () => {
      clearInterval(sensorInterval);
      clearInterval(predictionInterval);
    };
  }, []);

  // Muligheder for valg af sensor til grafen
  const sensorOptions = [
    { value: "temperatur", label: "Temperatur" },
    { value: "luftfugtighed", label: "Luftfugtighed" },
    { value: "jordfugtighed", label: "Jordfugtighed" },
    { value: "lys", label: "Lys" },
    { value: "afstand", label: "Afstand" },
  ];

  return (
    <div className="space-y-6">
      {/* Dropdown til valg af sensor */}
      <Select
        label="Vælg sensor"
        name="sensor"
        value={selectedSensor}
        onChange={(e) => setSelectedSensor(e.target.value)}
        options={sensorOptions}
        variant="default"
      />

      {/* Graf over valgte sensorværdier og forudsigelser */}
      <SensorVsPredictionChart
        sensorFeed={sensorFeed}
        predictedFeed={predictedFeed}
        sensorKey={selectedSensor}
      />

      {/* Tabelvisning af både live og forudsagte data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LiveSensorFeed feed={sensorFeed} />
        <PredictedSensorFeed feed={predictedFeed} />
      </div>
    </div>
  );
}
