import React from "react";
import PredictionComparison from "@Presentation/Graphs/PredictionComparison";

const predictionComparisonData = [
  {
    experiment: "Planteforsøg A",
    values: [
      { date: "2025-04-01", predicted: 70, actual: 68 },
      { date: "2025-04-02", predicted: 72, actual: 71 },
      { date: "2025-04-03", predicted: 74, actual: 70 }
    ]
  },
  {
    experiment: "Gødningsforsøg B",
    values: [
      { date: "2025-04-01", predicted: 65, actual: 64 },
      { date: "2025-04-02", predicted: 67, actual: 66 },
      { date: "2025-04-03", predicted: 66, actual: 66 }
    ]
  }
];

const TestPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-8 space-y-10">
      <h1 className="text-3xl font-bold">Testside</h1>

      {/* Sprint-opgave: Prediction Comparison */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Tidligere forudsigelser</h2>
        <PredictionComparison data={predictionComparisonData} />
      </section>
    </div>
  );
};

export default TestPage;
