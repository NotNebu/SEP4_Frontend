import React from "react";
import DashboardBox from "@/Presentation/Layout/DashboardBox";
import BoxHeader from "@/Presentation/Layout/Headers/BoxHeader";
import SensorTable from "@/Presentation/Components/Shared/UI/DataTable";
import { DashboardViewModel } from "@/Presentation/Hooks/useDashboardViewModel";
import { formatSensorData } from "@/Presentation/Utils/formatSensorData";

// Wrapper-komponent til visning af seneste målinger i en tabel
export default function SensorTableWrapper() {
  const { soilData, temperatureData, humidityData, distanceData } = DashboardViewModel();

  // Formaterer sensordata til visning
  const formattedTemp = formatSensorData(temperatureData);
  const formattedHumidity = formatSensorData(humidityData);
  const formattedSoil = formatSensorData(soilData);
  const formattedDistance = formatSensorData(distanceData);

  // Struktur til visning i tabellen
  const sensorData = [
    {
      id: 1,
      sensor: "Temperatur",
      value: `${formattedTemp?.at(-1)?.temperature ?? "N/A"} °C`,
      lastUpdate: formattedTemp?.at(-1)?.time ?? "N/A",
    },
    {
      id: 2,
      sensor: "Luftfugtighed",
      value: `${formattedHumidity?.at(-1)?.humidity ?? "N/A"} %`,
      lastUpdate: formattedHumidity?.at(-1)?.time ?? "N/A",
    },
    {
      id: 3,
      sensor: "Jordfugtighed",
      value: `${formattedSoil?.at(-1)?.soil ?? "N/A"} %`,
      lastUpdate: formattedSoil?.at(-1)?.time ?? "N/A",
    },
    {
      id: 4,
      sensor: "Afstand",
      value: `${formattedDistance?.at(-1)?.distance ?? "N/A"} cm`,
      lastUpdate: formattedDistance?.at(-1)?.time ?? "N/A",
    },
  ];

  return (
    <DashboardBox>
      {/* Sektionstitel og undertekst */}
      <BoxHeader title="Seneste Sensoropdateringer" subtitle="Real-time sensoropdateringer" />

      {/* Tabel med måledata */}
      <SensorTable
        data={sensorData}
        columns={[
          { label: "Sensor", key: "sensor" },
          { label: "Værdi", key: "value" },
          { label: "Sidste opdatering", key: "lastUpdate" },
        ]}
      />
    </DashboardBox>
  );
}
