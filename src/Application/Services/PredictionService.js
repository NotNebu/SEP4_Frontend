import * as PredictionAPI from "@/Infrastructure/API/PredictionAPI";

/**
 * Kald prediction-API med input og returner resultat.
 * Her kan man senere tilføje validering, mapping, fallback, caching osv.
 */
export const requestPrediction = async (sensorInput) => {
  return await PredictionAPI.submitPrediction(sensorInput);
};
