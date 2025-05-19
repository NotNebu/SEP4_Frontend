import * as IotAPI from "@/Infrastructure/API/IotExperimentAPI";

export const getAllIotExperiments = async () => {
  return await IotAPI.getAllIotExperiments();
};

export const getIotExperimentById = async (id) => {
  return await IotAPI.getIotExperimentById(id);
};

export const getIotMeasurements = async (experimentId) => {
  return await IotAPI.getIotMeasurements(experimentId);
};

export const getIotLatestMeasurements = async (experimentId) => {
  return await IotAPI.getIotLatestMeasurements(experimentId);
};

export const createIotExperiment = async (payload) => {
  return await IotAPI.createIotExperiment(payload);
};

export const activateIotExperiment = async (experimentId) => {
  return await IotAPI.activateIotExperiment(experimentId);
};

export const getActiveIotExperiment = async () => {
  return await IotAPI.getActiveIotExperiment();
};

export const exportIotCsv = async (experimentId, startDate, endDate) => {
  return await IotAPI.exportIotCsv(experimentId, startDate, endDate);
};

export const exportIotJson = async (experimentId, startDate, endDate) => {
  return await IotAPI.exportIotJson(experimentId, startDate, endDate);
};
