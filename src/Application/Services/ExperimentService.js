import * as ExperimentAPI from "@/Infrastructure/API/ExperimentAPI";

export const getUserExperiments = async () => {
  return await ExperimentAPI.getMyExperiments();
};

export const removeExperiment = async (id) => {
  await ExperimentAPI.deleteExperiment(id);
};

export const submitExperiment = async (experiment) => {
  return await ExperimentAPI.createExperiment(experiment);
};

export const saveSensorExperiment = async (title, dataArray) => {
  return await ExperimentAPI.saveFetchedExperiment(title, dataArray);
};
