import React, { useState } from "react";
import SensorFilterPanel from "@/Presentation/Components/Dashboard/SensorFilterPanel";
import DashboardGraph from "@/Presentation/Components/Dashboard/DashboardGraph";
import SensorTableWrapper from "@/Presentation/Components/Dashboard/SensorTableWrapper";
import Footer from "@/Presentation/Layout/Footer/Footer";
import PageHeader from "@/Presentation/Layout/Headers/PageHeader";

/**
 * DashboardPage – Viser sensor-data med filtrering, grafer og seneste målinger.
 * Brugeren kan vælge sensorer, tidsperiode og diagramtype.
 */
export default function DashboardPage() {
  const [filters, setFilters] = useState({
    sensors: ["temperature", "humidity"],
    range: "6h",
    refresh: false,
  });

  const [chartType, setChartType] = useState("line");

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900 dark:text-white">
      <div className="px-4 py-8 max-w-screen-2xl mx-auto w-full space-y-10 flex-grow">
        <PageHeader title="Dashboard" />

        {/* Sektion: Filter og graf/table visning */}
        <div className="flex flex-col xl:flex-row gap-6">

          {/* Venstre kolonne: Filtreringspanel */}
          <div className="w-full xl:w-1/5">
            <SensorFilterPanel
              filters={filters}
              setFilters={setFilters}
              availableSensors={["temperature", "humidity", "soil", "distance"]}
            />
          </div>

          {/* Højre kolonne: Grafer og tabelvisning */}
          <div className="w-full xl:w-4/5 space-y-10">
            <DashboardGraph filters={filters} chartType={chartType} />
            <SensorTableWrapper />
          </div>
        </div>
      </div>

      {/* Footer nederst */}
      <Footer />
    </div>
  );
}
