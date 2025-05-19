import React from "react";
import DashboardBox from "@/Presentation/Layout/DashboardBox";
import BoxHeader from "@/Presentation/Layout/Headers/BoxHeader";
import Graph from "@/Presentation/Components/Shared/Graphs/Graph";

/**
 * MetricGraph – En wrapper-komponent til visning af en linjegraf
 * med titel, undertitel og eventuel ekstra info i dashboard-layout.
 */
export default function MetricGraph({
  title,        // Titel på boksen (fx "Temperatur")
  subtitle,     // Undertekst (fx "Seneste 24 timer")
  sideText,     // Valgfri info 
  data,         // Dataliste til grafen
  lines,        // Array med dataserier (dataKey, label, stroke)
  ...graphProps // Ekstra props som unit, xKey, domain, showLegend osv.
}) {
  return (
    <DashboardBox>
      {/* Titel og ekstra info */}
      <BoxHeader title={title} subtitle={subtitle} sideText={sideText} />

      {/* Responsiv container til grafen */}
      <div className="w-full h-40 sm:h-52 lg:h-64 xl:h-72 2xl:h-80 3xl:h-96">
        <Graph data={data} lines={lines} {...graphProps} />
      </div>
    </DashboardBox>
  );
}
