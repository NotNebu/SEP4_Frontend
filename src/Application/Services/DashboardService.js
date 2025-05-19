// Henter sensordata fra API'et
export const fetchSensorData = async () => {
  const response = await fetch("https://localhost:5107/api/sensor", {
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
