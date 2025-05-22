import React from "react";
import PredictionCard from "@Presentation/Components/Predictions/PredictionCard";
import SectionHeader from "@/Presentation/Layout/Headers/SectionHeader";
import ResponsiveGrid from "@/Presentation/Layout/ResponsiveGrid";

// Viser en oversigt over tidligere eksperimenter med forudsigelser og målinger
const PredictionHistory = ({ data }) => {
  // Hvis der ikke er nogen data
  if (!data || data.length === 0) {
    return <p className="text-white">Ingen historik tilgængelig.</p>;
  }

  return (
    <div className="p-4">
      {/* Sektionstitel */}
      <SectionHeader title="Forudsigelser vs. Målinger" />

      {/* Grid med tidligere forudsigelser */}
      <ResponsiveGrid>
        {data.map((item) => (
          <PredictionCard key={item.id} item={item} />
        ))}
      </ResponsiveGrid>
    </div>
  );
};

export default PredictionHistory;
