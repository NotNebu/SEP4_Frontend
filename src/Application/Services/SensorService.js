import * as SensorAPI from "@/Infrastructure/API/SensorAPI";

/**
 * Behandler eller formaterer sensordata, hvis nødvendigt.
 * Her kunne man også implementere filtering, caching osv.
 */
export const getSensorData = async () => {
  const rawData = await SensorAPI.fetchSensorData();

  // Eksempel på evt. transformation:
  // return rawData.map(entry => ({ ...entry, temperatur: entry.tempC * 1.8 + 32 }));

  return rawData;
};
