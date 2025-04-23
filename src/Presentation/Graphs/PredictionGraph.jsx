import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

const PredictionGraph = ({ data }) => {
  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">📈 Forudsigelse vs. Målt</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="date" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip
            contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151" }}
            labelStyle={{ color: "#fff" }}
            itemStyle={{ color: "#ddd" }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="predicted"
            stroke="#3b82f6"
            strokeWidth={2}
            name="Forudsigelse"
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="actual"
            stroke="#22c55e"
            strokeWidth={2}
            name="Målt"
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PredictionGraph;
