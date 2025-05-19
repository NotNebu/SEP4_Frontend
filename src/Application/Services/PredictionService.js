// Sender data til API'et for at få en forudsigelse baseret på sensordata
export const submitPrediction = async (payload) => {
  const response = await fetch("https://localhost:5107/api/sensor/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Forudsigelse fejlede.");
  }

  return await response.text();
};
