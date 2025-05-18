import React from "react";
import { getDeviationColor } from "@/Presentation/Utils/getDeviationColor";

// Viser en enkelt række i forudsigelsestabellen med farvekodet afvigelse
const PredictionRow = ({ entry }) => {
  const deviation = Math.abs(entry.predicted - entry.actual);
  const deviationPct = ((deviation / entry.predicted) * 100).toFixed(2);
  const deviationColor = getDeviationColor(deviation); // Bestem farve baseret på afvigelsens størrelse

  return (
    <tr className="border-b border-gray-800 hover:bg-gray-800 transition">
      <td className="py-2 px-3">{entry.date}</td>
      <td className="py-2 px-3">{entry.predicted}</td>
      <td className="py-2 px-3">{entry.actual}</td>
      <td className={`py-2 px-3 font-medium ${deviationColor}`}>
        {deviationPct}% ({deviation})
      </td>
    </tr>
  );
};

export default PredictionRow;
