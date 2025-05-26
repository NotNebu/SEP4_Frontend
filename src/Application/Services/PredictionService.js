import {
  submitPredictionAPI,
  deletePredictionAPI,
  fetchPredictionHistoryAPI,
  savePredictionAPI,
  fetchAvailableModelsAPI,
} from "@/Infrastructure/API/PredictionAPI";

export const submitPrediction = async ({ TypeofModel, ModelName, Data }) => {
  const payload = {
    TypeofModel,
    NameOfModel: ModelName,
    Data,
  };

  return await submitPredictionAPI(payload);
};

export const deletePrediction = async (id) => {
  return await deletePredictionAPI(id);
};

export const fetchPredictionHistory = async () => {
  return await fetchPredictionHistoryAPI();
};

export const savePrediction = async ({ model, fileName, input, result }) => {
  return await savePredictionAPI({ model, fileName, input, result });
};

export const fetchAvailableModels = async () => {
  return await fetchAvailableModelsAPI();
};
