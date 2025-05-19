import * as SensorAPI from "@/Infrastructure/API/SensorAPI";

/**
 * Henter sensordata via SensorAPI – evt. klar til transformation eller caching.
 */
export const fetchSensorData = async () => {
  return await SensorAPI.fetchSensorData();
};
