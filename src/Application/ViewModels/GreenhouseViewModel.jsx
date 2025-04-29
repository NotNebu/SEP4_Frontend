import { useState, useEffect } from 'react';

/**
 * ViewModel for at hente og håndtere drivhusdata.
 * Henter data og håndterer status (loading, error, success) samt statuskode.
 *
 * @returns {{
 *   temperatureData: Array,
 *   humidityData: Array,
 *   soilData: Array,
 *   fetchData: Function,
 *   status: String,
 *   statusCode: Number,
 *   distanceData: Array,
 * }}
 */
export const GreenhouseViewModel = () => {
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [soilData, setSoilData] = useState([]);
  const [distanceData, setDistanceData] = useState([]);
  const [status, setStatus] = useState("loading");
  const [statusCode, setStatusCode] = useState(null);  // Tilføjet statuskode state

  const fetchData = async () => {
    setStatus("loading");
    setStatusCode(null);  // Nulstil statuskode ved hver anmodning

    try {
      const response = await fetch("http://localhost:5107/api/mal/sensors"); // <-- API Gateway URL og path fra malcontroller, ændre hvis nødvendigt når du kan teste 

      // Gem statuskoden
      setStatusCode(response.status);

      if (response.ok) {
        const apiData = await response.json();

        // Mappér de rigtige datafelter fra sensor-data
        setTemperatureData(apiData.map(entry => ({
          time: entry.timestamp,
          temperature: entry.air_temperature,
        })));

        setHumidityData(apiData.map(entry => ({
          time: entry.timestamp,
          humidity: entry.air_humidity,
        })));

        setSoilData(apiData.map(entry => ({
          time: entry.timestamp,
          soil: entry.soil_moisture,
        })));

        setDistanceData(apiData.map(entry => ({
          time: entry.timestamp,
          distance: entry.distance_to_height,
        })));

        setStatus("success");
      } else {
        handleErrorStatus(response.status);
      }
    } catch (error) {
      console.error("Fejl ved hentning af data:", error);
      setStatus("error");
      setStatusCode(500);  // Angiv en passende fejlkode
    }
  };

  // Håndter fejlstatuskoder
  const handleErrorStatus = (code) => {
    switch (code) {
      case 200:
        setStatus("success");
        break;
      case 201:
        setStatus("created"); 
        break;
      case 400:
        setStatus("badRequest");
        break;
      case 404:
        setStatus("notFound");
        break;
      case 500:
        setStatus("serverError");
        break;
      default:
        setStatus("error");
        break;
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
    statusCode,  // Returner dataen, statuscode osv
  };
};
