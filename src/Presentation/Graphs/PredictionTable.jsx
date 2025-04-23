import React from "react";

const PredictionTable = ({ data }) => {
  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">📋 Detaljeret Tabel</h2>
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
          {data.map((entry, index) => {
            const deviation = Math.abs(entry.predicted - entry.actual);
            const deviationPct = ((deviation / entry.predicted) * 100).toFixed(2);

            return (
              <tr
                key={index}
                className="border-b border-gray-800 hover:bg-gray-800 transition"
              >
                <td className="py-2 px-3">{entry.date}</td>
                <td className="py-2 px-3">{entry.predicted}</td>
                <td className="py-2 px-3">{entry.actual}</td>
                <td className="py-2 px-3">
                  {deviationPct}% ({deviation})
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PredictionTable;
