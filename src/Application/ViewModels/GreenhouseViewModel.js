import { useState, useEffect } from 'react';

/**
 * ViewModel for at hente og håndtere drivhusdata.
 * Henter data og håndterer status (loading, error, success).
 *
 * @returns {{
 *   temperatureData: Array,  // Temperaturdata
 *   humidityData: Array,     // Luftfugtighedsdata
 *   soilData: Array,         // Jordfugtighedsdata
 *   fetchData: Function,     // Funktion til at hente data
 *   status: String           // API-status ("loading", "error", "success")
 *   distanceData : Array,    // Distancedata 
 * }} 
 */
export const GreenhouseViewModel = () => {
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [soilData, setSoilData] = useState([]);
  const [status, setStatus] = useState("loading"); // Sætter status til 'loading' ved opstart
  const [distanceData, setDistanceData] = useState([]);
  // Funktion til at hente data (mocket med setTimeout for at simulere API-kald)
  const fetchData = async () => {
    setStatus("loading"); // Indstil status til 'loading', når data hentes

    try {
      // Mock data for at simulere API-kald
      const mockData = [
        { time: "08:00", temperature: 20, humidity: 55, soil: 40, light: 3000 },
        { time: "10:00", temperature: 22, humidity: 52, soil: 38, light: 4500 },
        { time: "12:00", temperature: 26, humidity: 50, soil: 37, light: 6000 },
        { time: "08:00", temperature: 20, humidity: 55, soil: 40, distance: 12 },
+       { time: "10:00", temperature: 22, humidity: 52, soil: 38, distance: 13 },
+       { time: "12:00", temperature: 26, humidity: 50, soil: 37, distance: 14 },
      ];

      // Simulerer forsinkelse før data bliver sat
      setTimeout(() => {
        setTemperatureData(mockData.map(({ time, temperature }) => ({ time, temperature })));
        setHumidityData(mockData.map(({ time, humidity }) => ({ time, humidity })));
        setSoilData(mockData.map(({ time, soil }) => ({ time, soil })));
        setDistanceData(mockData.map(({ time, distance }) => ({ time, distance })));
        setStatus("success"); // Skift status til 'success', når data er hentet
      }, 2000); // 2 sekunders forsinkelse
    } catch (error) {
      setStatus("error"); // Hvis der er en fejl, sættes status til 'error'
      console.error("Fejl ved hentning af data:", error);
    }
  };

  // Hent data, når komponenten bliver indlæst
  useEffect(() => {
    fetchData();
  }, []);

  // Returner data og status for brug i UI-komponenter
  return {
    temperatureData,
    humidityData,
    soilData,
    distanceData,
    fetchData,
    status, // Returner status for at kunne vise brugeren API-status
  };
};
