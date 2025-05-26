import React, { useState } from "react";
import PredictionGraph from "@/Presentation/Components/Shared/Graphs/Graph";
import PredictionTable from "@Presentation/Components/Predictions/PredictionTable";
import ExperimentSelector from "@/Presentation/Components/Experiments/ExperimentSelect";
import { predictionData } from "@Presentation/Components/predictionData";

/**
 * PredictionComparison – Giver mulighed for at vælge et eksperiment
 * og visualisere dets forudsigelser via graf og tabel.
 */
const PredictionComparison = () => {
  const [selected, setSelected] = useState(predictionData[0]);

  // Opdater valgt eksperiment baseret på dropdown-valg
  const handleSelect = (experimentName) => {
    const experiment = predictionData.find(
      (p) => p.experiment === experimentName
    );
    if (experiment) setSelected(experiment);
  };

  return (
    <div className="space-y-6">
      {/* Dropdown til valg af eksperiment */}
      <ExperimentSelector
        options={predictionData}
        selected={selected.experiment}
        onSelect={handleSelect}
      />

      {/* Grafisk visning af valgte værdier */}
      <PredictionGraph data={selected.values} />

      {/* Tabelvisning af valgte værdier */}
      <PredictionTable data={selected.values} />
    </div>
  );
};

export default PredictionComparison;
