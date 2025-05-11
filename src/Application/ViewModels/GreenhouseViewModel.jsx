import { useState, useEffect } from "react";

/**
 * ViewModel til at hente og håndtere drivhusdata.
 *
 * @param {Function} navigate - React Router navigate-funktion til redirect ved fejl
 * @returns {{
 *   temperatureData: Array,
 *   humidityData: Array,
 *   soilData: Array,
 *   distanceData: Array,
 *   fetchData: Function,
 *   status: String,
 *   statusCode: Number
 * }}
 */
export const GreenhouseViewModel = (navigate) => {
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [soilData, setSoilData] = useState([]);
  const [distanceData, setDistanceData] = useState([]);
  const [status, setStatus] = useState("loading");
  const [statusCode, setStatusCode] = useState(null);

  const fetchData = async () => {
    setStatus("loading");
    setStatusCode(null);

    try {
      // Hent sensordata
      const sensorRes = await fetch("https://localhost:5107/api/mal/sensors", {
        credentials: "include",
      });
      setStatusCode(sensorRes.status);

      if (!sensorRes.ok) {
        navigate("/error", {
          state: {
            code: sensorRes.status,
            message:
              sensorRes.status === 404
                ? "Vi kunne ikke finde den ønskede anmodning."
                : "En teknisk fejl opstod ved hentning af sensordata.",
          },
        });
        return;
      }

      const sensorData = await sensorRes.json();

      setTemperatureData(
        sensorData.map((entry) => ({
          time: entry.timestamp,
          temperature: entry.air_temperature,
        }))
      );

      setHumidityData(
        sensorData.map((entry) => ({
          time: entry.timestamp,
          humidity: entry.air_humidity,
        }))
      );

      setSoilData(
        sensorData.map((entry) => ({
          time: entry.timestamp,
          soil: entry.soil_moisture,
        }))
      );

      setDistanceData(
        sensorData.map((entry) => ({
          time: entry.timestamp,
          distance: entry.distance_to_height,
        }))
      );

      // Hent træningsresultater og eksperimenter
      const trainRes = await fetch("https://localhost:5107/api/mal/train-model", {
        credentials: "include",
      });

      if (!trainRes.ok) {
        navigate("/error", {
          state: {
            code: trainRes.status,
            message: "Fejl under hentning af træningsresultater.",
          },
        });
        return;
      }

      const trainData = await trainRes.json();
      setTrainMessage(trainData.message);
      setExperiments(trainData.data);

      setStatus("success");
    } catch (error) {
      console.error("Fejl ved hentning af data:", error);
      navigate("/error", {
        state: {
          code: 500,
          message: "Uventet netværksfejl eller serverfejl.",
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
