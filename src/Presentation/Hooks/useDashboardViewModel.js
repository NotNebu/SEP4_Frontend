import { useState, useEffect } from "react";
import { format } from "date-fns";
import { fetchSensorData } from "@/Application/Services/DashboardService";

/**
 * DashboardViewModel – Henter og formatterer sensordata til visning i dashboardet.
 * Automatisk importerer målingen som eksperiment én gang pr. session.
 */
export const DashboardViewModel = (navigate) => {
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [soilData, setSoilData] = useState([]);
  const [distanceData, setDistanceData] = useState([]);
  const [status, setStatus] = useState("loading");       // 'loading' | 'success' | 'error'
  const [statusCode, setStatusCode] = useState(null);    // HTTP statuskode ved fejl

  // Formatterer rå sensor-data til dato og målinger
  const formatData = (data) => {
    return data.map((entry) => {
      const time = new Date(entry.timestamp);
      const formattedTime = isNaN(time.getTime())
        ? "Invalid Date"
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

  // Henter data og importerer eksperiment ved første load
  const fetchData = async () => {
    setStatus("loading");
    setStatusCode(null);

    try {
      const sensorData = await fetchSensorData();
      const formatted = formatData(sensorData);

      // Opdel data i separate serier til grafvisning
      setTemperatureData(formatted.map(({ time, temperature }) => ({ time, temperature })));
      setHumidityData(formatted.map(({ time, humidity }) => ({ time, humidity })));
      setSoilData(formatted.map(({ time, soil }) => ({ time, soil })));
      setDistanceData(formatted.map(({ time, distance }) => ({ time, distance })));

      // Gem kun data én gang per session
      if (!sessionStorage.getItem("dashboardDataSaved")) {
        await saveFetchedExperiment("Dashboard måling", sensorData);
        sessionStorage.setItem("dashboardDataSaved", "true");
      }

      setStatus("success");
    } catch (error) {
      setStatusCode(error.status || 500);
      setStatus("error");

      console.error("Fejl ved hentning af data:", error);

      // Naviger til fejlside med dansk fejlbesked
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
