const BASE_URL = "https://localhost:5107/api";

export const submitPrediction = async (payload) => {
  const formattedPayload = {
    TypeofModel: payload.TypeofModel,
    NameOfModel: payload.ModelName,
    Data: payload.Data,
  };

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