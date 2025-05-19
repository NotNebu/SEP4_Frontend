import * as PredictionAPI from "@/Infrastructure/API/PredictionAPI";

/**
 * Kalder PredictionAPI for at få en forudsigelse.
 */
export const submitPrediction = async (payload) => {
  return await PredictionAPI.submitPrediction(payload);
};
