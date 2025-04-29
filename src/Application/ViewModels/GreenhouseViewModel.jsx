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
    setStatusCode(null);
  
    try {
      // Hent sensordata
      const sensorRes = await fetch("http://localhost:5107/api/mal/sensors");
      setStatusCode(sensorRes.status);
  
      if (sensorRes.ok) {
        const sensorData = await sensorRes.json();
  
        setTemperatureData(sensorData.map(entry => ({
          time: entry.timestamp,
          temperature: entry.air_temperature,
        })));
  
        setHumidityData(sensorData.map(entry => ({
          time: entry.timestamp,
          humidity: entry.air_humidity,
        })));
  
        setSoilData(sensorData.map(entry => ({
          time: entry.timestamp,
          soil: entry.soil_moisture,
        })));
  
        setDistanceData(sensorData.map(entry => ({
          time: entry.timestamp,
          distance: entry.distance_to_height,
        })));
      } else {
        handleErrorStatus(sensorRes.status);
      }
  
      // Hent træningsresultat + eksperimenter
      const trainRes = await fetch("http://localhost:5107/api/mal/train-model");
  
      if (trainRes.ok) {
        const trainData = await trainRes.json();
        setTrainMessage(trainData.message);
        setExperiments(trainData.data);
      } else {
        console.warn("Fejl ved train-model:", trainRes.status);
      }
  
      setStatus("success");
  
    } catch (error) {
      console.error("Fejl ved hentning af data:", error);
      setStatus("error");
      setStatusCode(500);
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
