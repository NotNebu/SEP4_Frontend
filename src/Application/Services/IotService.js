import * as IotAPI from "@/Infrastructure/API/IotExperimentAPI";

export const getAllExperiments = () => IotAPI.getAllIotExperiments();

export const getExperimentById = (id) => IotAPI.getIotExperimentById(id);

export const getMeasurements = (experimentId) =>
  IotAPI.getIotMeasurements(experimentId);

export const getLatestMeasurements = (experimentId) =>
  IotAPI.getIotLatestMeasurements(experimentId);

export const createExperiment = (payload) =>
  IotAPI.createIotExperiment(payload);

export const activateExperiment = (experimentId) =>
  IotAPI.activateIotExperiment(experimentId);

export const getActiveExperiment = () => IotAPI.getActiveIotExperiment();

export const exportCsv = (experimentId, startDate, endDate) =>
  IotAPI.exportIotCsv(experimentId, startDate, endDate);

export const exportJson = (experimentId, startDate, endDate) =>
  IotAPI.exportIotJson(experimentId, startDate, endDate);
