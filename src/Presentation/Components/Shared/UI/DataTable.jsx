import React from "react";

/**
 * Genbrugelig datatabel til visning i både desktop og mobil.
 *
 * @param {Array} data - Rækker (array af objekter)
 * @param {Array} columns - Kolonner [{ label, key }]
 * @param {String} title - tabeloverskrift
 */
const DataTable = ({ data, columns = [], title }) => {

  // Fallback ved tomt data eller kolonner
  if (!data || data.length === 0 || columns.length === 0) {
    return <p className="text-white">Indlæser data...</p>;
  }

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-md">
      {/* Tabeltitel */}
      {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}

      {/* Desktop-visning */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-300 border-b border-gray-700">
              {columns.map((col) => (
                <th key={col.key} className="py-2 px-3">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-800 hover:bg-gray-800 transition"
              >
                {columns.map((col) => (
                  <td key={col.key} className="py-2 px-3">
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobil-visning som kort */}
      <div className="sm:hidden mt-6 space-y-4">
        {data.map((row, i) => (
          <div key={i} className="bg-gray-800 p-4 rounded-lg shadow-md">
            {columns.map((col) => (
              <p key={col.key} className="text-sm">
                <strong>{col.label}:</strong> {row[col.key]}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataTable;
