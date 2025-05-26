import React, { useRef, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

/**
 * Dynamisk linjegraf baseret på containerens bredde og højde.
 * Understøtter flere linjer, tilpasning af akse-enhed og valg af legend.
 */
const Graph = ({
  data,
  lines = [], // Array af linjer, hver med dataKey, stroke og label
  unit = "", // Enhed for Y-aksen, fx "°C" eller "%"
  xKey = "time", // Nøgle for X-aksen
  domain, // Valgfri Y-akse-domain, fx [0, 100]
  showLegend = false,
  strokeDasharray = "3 3",
}) => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Hent containerens dimensioner efter mount
  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-40 sm:h-52 lg:h-64 xl:h-72 2xl:h-80 3xl:h-96"
    >
      {dimensions.width > 0 && dimensions.height > 0 && (
        <LineChart
          width={dimensions.width}
          height={dimensions.height}
          data={data}
        >
          <CartesianGrid strokeDasharray={strokeDasharray} />
          <XAxis dataKey={xKey} stroke="#ccc" />
          <YAxis unit={unit} stroke="#ccc" domain={domain} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              borderColor: "#374151",
            }}
            labelStyle={{ color: "#fff" }}
            itemStyle={{ color: "#ddd" }}
          />
          {showLegend && <Legend />}

          {/* Render hver linje med farve og navn */}
          {lines.map(({ dataKey, stroke, label }, idx) => (
            <Line
              key={idx}
              type="monotone"
              dataKey={dataKey}
              stroke={stroke}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              name={label}
            />
          ))}
        </LineChart>
      )}
    </div>
  );
};

export default Graph;
