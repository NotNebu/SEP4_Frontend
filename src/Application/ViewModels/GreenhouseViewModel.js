import { useState, useEffect } from 'react';

/**
 * ViewModel for Greenhouse data.
 * Håndterer datahentning og opdatering af sensorværdier.
 *
 * @returns {{
 *   temperatureData: Array,
 *   humidityData: Array,
 *   soilData: Array,
 *   fetchData: Function
 * }} Et objekt med data og funktioner til at hente data til din scene
 */
export const GreenhouseViewModel = () => {
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [soilData, setSoilData] = useState([]);

  // Henter real-time data fra mock-data senere API
  const fetchData = async () => {
    // Her du mockdata som senre skal hendes gennem API
    const mockData = [
      { time: "08:00", temperature: 20, humidity: 55, soil: 40, light: 3000 },
      { time: "10:00", temperature: 22, humidity: 52, soil: 38, light: 4500 },
      { time: "12:00", temperature: 26, humidity: 50, soil: 37, light: 6000 },
    
    ];

    setTemperatureData(mockData.map(({ time, temperature }) => ({ time, temperature })));
    setHumidityData(mockData.map(({ time, humidity }) => ({ time, humidity })));
    setSoilData(mockData.map(({ time, soil }) => ({ time, soil })));
  };

  // Effekt til at hente data når komponenten mountes
  useEffect(() => {
    fetchData();
  }, []);

  // Eksponerer relevant data og funktioner
  return {
    temperatureData,
    humidityData,
    soilData,
    fetchData,
  };
};
