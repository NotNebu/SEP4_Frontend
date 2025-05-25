const BASE_URL = "https://localhost:5107/api";

// Sender en forudsigelse til API'et
export const submitPrediction = async (payload) => {
  const formattedPayload = {
    TypeofModel: payload.TypeofModel,
    NameOfModel: payload.ModelName,
    Data: payload.Data,
  };

  // Validere payloaden
  const response = await fetch(`${BASE_URL}/sensor/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(formattedPayload),
  });

  // Tjekke om svaret er OK
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Forudsigelse fejlede.");
  }

  return await response.text();
};

// Henter tilgængelige modeller fra API'et
export const fetchAvailableModels = async () => {
  const response = await fetch(`${BASE_URL}/sensor/model`, {
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Kunne ikke hente tilgængelige modeller.");
  }

  const result = await response.text();
  return JSON.parse(result).model_files || [];
};

// Gemmer en forudsigelse i databasen
export const savePrediction = async ({ model, fileName, input, result }) => {
  const response = await fetch(`${BASE_URL}/prediction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ model, fileName, input, result }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Kunne ikke gemme forudsigelse.");
  }
};

// Henter historik over forudsigelser fra databasen
export const fetchPredictionHistory = async () => {
  const response = await fetch(`${BASE_URL}/prediction`, {
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Kunne ikke hente forudsigelser.");
  }

  return await response.json();
};

// Sletter en forudsigelse baseret på ID
export const deletePrediction = async (id) => {
  const response = await fetch(`${BASE_URL}/prediction/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Kunne ikke slette forudsigelse.");
  }
};