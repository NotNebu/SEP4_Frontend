import { useState, useEffect } from "react"; 
import { format } from "date-fns";

/**
 * ViewModel til at hente og håndtere drivhusdata.
 *
 * @param {Function} navigate - React Router navigate-funktion til redirect ved fejl
 * @returns {Object} - Mappet data og fetch funktion
 */
export const GreenhouseViewModel = (navigate) => {
  const [temperatureData, setTemperatureData] = useState([]); 
  const [humidityData, setHumidityData] = useState([]); 
  const [soilData, setSoilData] = useState([]); 
  const [distanceData, setDistanceData] = useState([]); 
  const [status, setStatus] = useState("loading"); // Status for dataindlæsning
  const [statusCode, setStatusCode] = useState(null); // Statuskode for API-anmodning

  /**
   * Funktion til at hente data fra API'et og opdatere tilstanden.
   * Håndterer også fejl og opdaterer status.
   */
  const fetchData = async () => {
    setStatus("loading"); // Sætter status til loading, når data hentes
    setStatusCode(null); // Nullstiller statuskoden

    try {
      // Henter data fra API'et
      const sensorRes = await fetch("https://localhost:5107/api/sensor", {
        credentials: "include", // Sender cookies med anmodningen
      });
      setStatusCode(sensorRes.status); // Sætter statuskoden fra API'et

      // Håndterer fejl ved fejlslagen anmodning
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

      // Konverterer API-responsen til JSON
      const sensorData = await sensorRes.json();

      // Funktion til at formatere data og håndtere fejlagtige datoer
      const formatData = (data) => {
        return data.map((entry) => {
          // Forsøger at parse timestamp korrekt
          const time = new Date(entry.timestamp);
          
          // Tjekker om datoen er gyldig
          const formattedTime = isNaN(time.getTime()) ? "Invalid Date" : format(time, "dd MMM yyyy, HH:mm:ss");

          return {
            time: formattedTime, // Formateret tid
            temperature: entry.airTemperature, // Temperatur
            humidity: entry.airHumidity, // Luftfugtighed
            soil: entry.soilMoisture, // Jordfugtighed
            distance: entry.distanceToHeight, // Afstand
          };
        });
      };

      // Opdaterer tilstandene med de formaterede data
      setTemperatureData(formatData(sensorData).map(entry => ({ time: entry.time, temperature: entry.temperature })));
      setHumidityData(formatData(sensorData).map(entry => ({ time: entry.time, humidity: entry.humidity })));
      setSoilData(formatData(sensorData).map(entry => ({ time: entry.time, soil: entry.soil })));
      setDistanceData(formatData(sensorData).map(entry => ({ time: entry.time, distance: entry.distance })));

      setStatus("success"); // Sætter status til success, når data er hentet korrekt
    } catch (error) {
      // Håndterer eventuelle fejl under datahentning
      console.error("Fejl ved hentning af data:", error);
      navigate("/error", {
        state: {
          code: 500,
          message: "Uventet netværksfejl eller serverfejl.",
        },
      });
    }
  };

  // Kører fetchData når komponenten først renderes
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
