import React from "react";

const getDeviationColor = (diff) => {
  if (diff <= 2) return "text-green-500";
  if (diff <= 5) return "text-yellow-500";
  return "text-red-500";
};

const PredictionHistory = ({ data }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">📊 Forudsigelser vs. Målinger</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {data.map((item) => {
          const deviation = Math.abs(item.predicted - item.actual);
          const deviationColor = getDeviationColor(deviation);

          return (
            <div
              key={item.id}
              className="border rounded-2xl shadow-lg p-6 bg-white dark:bg-gray-800 transition hover:scale-[1.02] duration-200"
            >
              <h3 className="font-semibold text-xl mb-1">{item.experiment}</h3>
              <p className="text-sm text-gray-500">{item.date}</p>

              <div className="mt-4 space-y-1 text-base">
                <p>🔮 Forudsigelse: <span className="font-semibold">{item.predicted}</span></p>
                <p>📏 Målt: <span className="font-semibold">{item.actual}</span></p>
                <p className={`${deviationColor} font-medium`}>
                  ⚠️ Afvigelse: {deviation}%
                </p>

                <div className="mt-3">
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min((item.actual / item.predicted) * 100, 100)}%`
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Måling i forhold til forudsigelse
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PredictionHistory;
