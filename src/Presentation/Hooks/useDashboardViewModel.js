import { useEffect, useState } from "react";
import { format } from "date-fns";
import { fetchSensorData } from "@/Application/Services/DashboardService";
import { saveFetchedExperiment } from "@/Application/Services/ExperimentService";

/**
 * DashboardViewModel – Henter og formatterer sensordata til grafvisning.
 * Navigerer til fejlside ved fejl.
 */
export const DashboardViewModel = (navigate) => {
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [soilData, setSoilData] = useState([]);
  const [distanceData, setDistanceData] = useState([]);
  const [status, setStatus] = useState("loading");
  const [statusCode, setStatusCode] = useState(null);

  const formatData = (data) => {
    return data.map((entry) => {
      const time = new Date(entry.timestamp);
      const formattedTime = isNaN(time.getTime())
        ? "Forkert Dato"
        : format(time, "dd MMM yyyy, HH:mm:ss");

      return {
        time: formattedTime,
        temperature: entry.airTemperature,
        humidity: entry.airHumidity,
        soil: entry.soilMoisture,
        distance: entry.distanceToHeight,
      };
    });
  };

  const fetchData = async () => {
    setStatus("loading");
    setStatusCode(null);

    try {
      const sensorData = await fetchSensorData();
      const formatted = formatData(sensorData);

      setTemperatureData(
        formatted.map(({ time, temperature }) => ({ time, temperature }))
      );
      setHumidityData(
        formatted.map(({ time, humidity }) => ({ time, humidity }))
      );
      setSoilData(formatted.map(({ time, soil }) => ({ time, soil })));
      setDistanceData(
        formatted.map(({ time, distance }) => ({ time, distance }))
      );

      if (!sessionStorage.getItem("dashboardDataSaved")) {
        await saveFetchedExperiment("Eksperiment 1", sensorData);
        sessionStorage.setItem("dashboardDataSaved", "true");
      }

      setStatus("success");
    } catch (error) {
      setStatus("error");
      setStatusCode(error.status || 500);

      console.error("Fejl ved hentning af data:", error);

      navigate("/error", {
        state: {
          code: error.status || 500,
          message: error.message || "Uventet fejl ved hentning af data.",
        },
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    temperatureData,
    humidityData,
    soilData,
    distanceData,
    fetchData,
    status,
    statusCode,
  };
};

export default DashboardViewModel;
