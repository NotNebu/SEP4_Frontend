import React from "react";
import Card from "@/Presentation/Components/Shared/UI/Card";
import SectionHeader from "@/Presentation/Layout/Headers/SectionHeader";
import PredictionRow from "./PredictionRow";
import EmptyStateMessage from "@/Presentation/Components/Shared/UI/EmptyStateMessage";

// Viser en tabel med detaljerede forudsigelser og målinger
const PredictionTable = ({ data }) => {
  // Hvis ingen data er tilgængelig, vis en tom tilstandsbesked
  if (!data || data.length === 0) {
    return (
      <Card className="text-white">
        <EmptyStateMessage message="Ingen forudsigelser tilgængelige." />
      </Card>
    );
  }

  return (
    <Card className="text-white">
      {/* Titel for sektionen */}
      <SectionHeader title="📋 Detaljeret Tabel" />

      {/* Tabelstruktur med overskrifter og rækker */}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-gray-300 border-b border-gray-700">
            <th className="py-2 px-3">Dato</th>
            <th className="py-2 px-3">Forudsigelse</th>
            <th className="py-2 px-3">Målt</th>
            <th className="py-2 px-3">Afvigelse</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <PredictionRow key={index} entry={entry} />
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default PredictionTable;
