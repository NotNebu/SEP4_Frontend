const BASE_URL = "https://localhost:5107/api";

//    Hent forudsigelse fra serveren
export const submitPrediction = async (payload) => {
  const formattedPayload = {
    TypeofModel: payload.TypeofModel,
    NameOfModel: payload.ModelName,
    Data: payload.Data,
  };

  // Send POST-anmodning til serveren med forudsigelsesdata
  const response = await fetch(`${BASE_URL}/sensor/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(formattedPayload),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Forudsigelse fejlede.");
  }

  return await response.text();
};

// Slet forudsigelse fra serveren
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

// Hent forudsigelseshistorik fra serveren
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

  // Gem forudsigelse på serveren
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

// Hent tilgængelige modeller fra serveren
// og returner dem som en liste
export const fetchAvailableModels = async () => {
  const response = await fetch(`${BASE_URL}/sensor/model`, {
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Kunne ikke hente tilgængelige modeller.");
  }

  const result = await response.text();
  const parsed = JSON.parse(result);
  return parsed.model_files || [];

  
};