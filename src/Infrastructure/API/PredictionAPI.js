const BASE_URL = "https://localhost:5107/api";

// Funktion til at indsende en forudsigelse via API
// Tager et payload-objekt som input og sender en POST-request
export const submitPredictionAPI = async (payload) => {
  const response = await fetch(`${BASE_URL}/sensor/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Forudsigelse fejlede.");
  }

  return await response.text();
};

// Funktion til at slette en forudsigelse via API
// Tager et ID som input og sender en DELETE-request
export const deletePredictionAPI = async (id) => {
  const response = await fetch(`${BASE_URL}/prediction/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Kunne ikke slette forudsigelse.");
  }
};

// Funktion til at hente forudsigelseshistorik via API
// Sender en GET-request og returnerer svaret
export const fetchPredictionHistoryAPI = async () => {
  const response = await fetch(`${BASE_URL}/prediction`, {
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Kunne ikke hente forudsigelser.");
  }

  return await response.json();
};

// Funktion til at gemme en forudsigelse via API
// Tager model, filnavn, input og resultat som input og sender en POST-request
export const savePredictionAPI = async ({ model, fileName, input, result }) => {
  const response = await fetch(`${BASE_URL}/prediction`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ model, fileName, input, result }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Kunne ikke gemme forudsigelse.");
  }
};

// Funktion til at hente tilgængelige modeller via API
// Sender en GET-request og returnerer en liste af model-filer
export const fetchAvailableModelsAPI = async () => {
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
