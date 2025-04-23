import React, { useState } from "react";
import PredictionGraph from "./PredictionGraph";
import PredictionTable from "./PredictionTable";

const predictionData = [
  {
    experiment: "Planteforsøg A",
    values: [
      { date: "2025-04-01", predicted: 80, actual: 68 },
      { date: "2025-04-02", predicted: 82, actual: 71 },
      { date: "2025-04-03", predicted: 84, actual: 70 }
    ]
  },
  {
    experiment: "Planteforsøg B",
    values: [
      { date: "2025-04-01", predicted: 85, actual: 64 },
      { date: "2025-04-02", predicted: 87, actual: 66 },
      { date: "2025-04-03", predicted: 86, actual: 66 }
    ]
  }
];

const PredictionComparison = () => {
  const [selected, setSelected] = useState(predictionData[0]);

  return (
    <div className="space-y-6">
      <div>
        <label className="block mb-2 font-semibold text-lg">Vælg eksperiment:</label>
        <select
          value={selected.experiment}
          onChange={(e) => {
            const experiment = predictionData.find(p => p.experiment === e.target.value);
            setSelected(experiment);
          }}
          className="p-2 rounded border dark:bg-gray-800 dark:text-white"
        >
          {predictionData.map((item, i) => (
            <option key={i} value={item.experiment}>{item.experiment}</option>
          ))}
        </select>
      </div>

      <PredictionGraph data={selected.values} />
      <PredictionTable data={selected.values} />
    </div>
  );
};

export default PredictionComparison;
