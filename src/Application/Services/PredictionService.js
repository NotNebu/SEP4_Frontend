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

// Gemmer forudsigelsen i UserService databasen
export const savePrediction = async ({ model, fileName, input, result }) => {
  const response = await fetch("https://localhost:5107/api/prediction", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      model,
      fileName,
      input,
      result,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Kunne ikke gemme forudsigelse.");
  }
};

// Henter tidligere forudsigelser
export const fetchPredictionHistory = async () => {
  const response = await fetch("https://localhost:5107/api/prediction", {
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Kunne ikke hente forudsigelser.");
  }

  return await response.json();
};

// Sletter én forudsigelse (hvis controlleren har endpoint til DELETE senere)
export const deletePrediction = async (id) => {
  const response = await fetch(`https://localhost:5107/api/prediction/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Kunne ikke slette forudsigelsen.");
  }
};