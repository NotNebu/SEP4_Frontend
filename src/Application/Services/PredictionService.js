import {
  submitPredictionAPI,
  deletePredictionAPI,
  fetchPredictionHistoryAPI,
  savePredictionAPI,
  fetchAvailableModelsAPI,
} from "@/Infrastructure/API/PredictionAPI";

// Funktion til at indsende en forudsigelse
// Tager modeltype, modelnavn og data som input
// Returnerer API-responsen fra serveren
export const submitPrediction = async ({ TypeofModel, ModelName, Data }) => {
  const payload = {
    TypeofModel,
    NameOfModel: ModelName,
    Data,
  };

  return await submitPredictionAPI(payload);
};

// Funktion til at slette en forudsigelse ud fra ID
// Returnerer API-responsen fra serveren
export const deletePrediction = async (id) => {
  return await deletePredictionAPI(id);
};

// Funktion til at hente forudsigelseshistorik
// Returnerer API-responsen fra serveren
export const fetchPredictionHistory = async () => {
  return await fetchPredictionHistoryAPI();
};

// Funktion til at gemme en forudsigelse
// Tager model, filnavn, input og resultat som input
// Returnerer API-responsen fra serveren
export const savePrediction = async ({ model, fileName, input, result }) => {
  return await savePredictionAPI({ model, fileName, input, result });
};

// Funktion til at hente tilgængelige modeller
// Returnerer API-responsen fra serveren
export const fetchAvailableModels = async () => {
  return await fetchAvailableModelsAPI();
};
