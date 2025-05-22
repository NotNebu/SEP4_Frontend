// src/Application/Services/IotExperimentService.js

import {
  fetchAllExperimentsAPI,
  fetchExperimentByIdAPI,
  fetchMeasurementsAPI,
  fetchLatestMeasurementsAPI,
  createExperimentAPI,
  activateExperimentAPI,
  fetchActiveExperimentAPI,
  exportCsvAPI,
  exportJsonAPI,
} from "@/Infrastructure/API/IotExperimentAPI";

const handleResponse = async (res, fallbackMessage) => {
  if (!res.ok) throw new Error(await res.text() || fallbackMessage);
  return res.headers.get("Content-Type")?.includes("application/json")
    ? await res.json()
    : await res.text();
};

export const getAllIotExperiments = async () =>
  await handleResponse(await fetchAllExperimentsAPI(), "Kunne ikke hente IoT-eksperimenter.");

export const getIotExperimentById = async (id) =>
  await handleResponse(await fetchExperimentByIdAPI(id), "Kunne ikke hente eksperiment.");

export const getIotMeasurements = async (experimentId) =>
  await handleResponse(await fetchMeasurementsAPI(experimentId), "Kunne ikke hente målinger.");

export const getIotLatestMeasurements = async (experimentId) =>
  await handleResponse(await fetchLatestMeasurementsAPI(experimentId), "Kunne ikke hente nyeste målinger.");

export const createIotExperiment = async (payload) =>
  await handleResponse(await createExperimentAPI(payload), "Kunne ikke oprette IoT-eksperiment.");

export const activateIotExperiment = async (experimentId) =>
  await handleResponse(await activateExperimentAPI(experimentId), "Kunne ikke aktivere eksperiment.");

export const getActiveIotExperiment = async () =>
  await handleResponse(await fetchActiveExperimentAPI(), "Kunne ikke hente aktivt eksperiment.");

export const exportIotCsv = async (experimentId, startDate, endDate) =>
  await handleResponse(await exportCsvAPI(experimentId, startDate, endDate), "Kunne ikke eksportere CSV.");

export const exportIotJson = async (experimentId, startDate, endDate) =>
  await handleResponse(await exportJsonAPI(experimentId, startDate, endDate), "Kunne ikke eksportere JSON.");
