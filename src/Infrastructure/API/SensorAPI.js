const BASE_URL = "https://localhost:5107/api/sensor";

/**
 * Henter rå sensordata fra backend.
 */
export const fetchSensorData = async () => {
  const response = await fetch(BASE_URL, {
    credentials: "include",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw {
      status: response.status,
      message: errorText || "Fejl ved hentning af sensordata.",
    };
  }

  return await response.json();
};
