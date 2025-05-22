// src/Application/Services/DashboardService.js

import { fetchSensorDataAPI } from "@/Infrastructure/API/SensorAPI";

/**
 * Henter sensordata og returnerer resultat eller kaster fejl
 */
export const fetchSensorData = async () => {
  return await fetchSensorDataAPI();
};
