import * as ExperimentAPI from "@/Infrastructure/API/ExperimentAPI";

/**
 * Henter brugerens eksperimenter.
 */
export const getMyExperiments = async () => {
  return await ExperimentAPI.getMyExperiments();
};

/**
 * Sletter et eksperiment.
 */
export const deleteExperiment = async (id) => {
  return await ExperimentAPI.deleteExperiment(id);
};

/**
 * Opretter et nyt eksperiment.
 */
export const createExperiment = async (payload) => {
  return await ExperimentAPI.createExperiment(payload);
};

/**
 * Gemmer sensorbaseret eksperiment (fx fra dashboard).
 */
export const saveFetchedExperiment = async (title, dataArray) => {
  return await ExperimentAPI.saveFetchedExperiment(title, dataArray);
};
