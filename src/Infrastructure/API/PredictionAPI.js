const BASE_URL = "https://localhost:5107/api/sensor";

/**
 * Sender sensorbaserede input til backend for at få en ML-forudsigelse.
 */
export const submitPrediction = async (payload) => {
  const response = await fetch(`${BASE_URL}/predict`, {
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
