import React, { useRef, useEffect, useState } from "react";
import DashboardBox from "../../../Layout/DashboardBox";
import BoxHeader from "@/Presentation/Layout/Headers/BoxHeader";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

/**
 * Graf-komponent med overskrift og responsiv linjegraf.
 * Viser én dataserie med valgfri enhed og aksegrænser.
 */
const GraphCard = ({
  title,       // Titel på grafen
  subtitle,    // Undertekst under titlen
  sideText,    // Eventuel tekst til højre
  data,        // Dataliste til grafen
  dataKey,     // Nøgle i dataobjekterne, der skal plottes
  unit,        // Enhed for Y-aksen (fx °C, %, cm)
  domain,      // Valgfri Y-akse-grænser (fx [0, 100])
  stroke = "#3b82f6", // Farve på linjen
}) => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Registrér containerens dimensioner ved mount
  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, []);

  return (
    <DashboardBox>
      {/* Titel og undertekst */}
      <BoxHeader title={title} subtitle={subtitle} sideText={sideText} />

      {/* Container til grafen */}
      <div
        ref={containerRef}
        className="w-full h-40 sm:h-52 lg:h-64 xl:h-72 2xl:h-80 3xl:h-96"
      >
        {dimensions.width > 0 && dimensions.height > 0 && (
          <LineChart
            width={dimensions.width}
            height={dimensions.height}
            data={data}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis unit={unit} domain={domain} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={stroke}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        )}
      </div>
    </DashboardBox>
  );
};

export default GraphCard;
