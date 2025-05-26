// Funktion til at hente sensordata via API
// Sender en GET-request og returnerer svaret som JSON
// Kaster en fejl med status og besked hvis hentningen mislykkes
export const fetchSensorDataAPI = async () => {
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
