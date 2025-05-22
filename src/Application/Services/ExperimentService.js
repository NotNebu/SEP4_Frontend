// src/Application/Services/ExperimentService.js

import {
  fetchMyExperimentsAPI,
  deleteExperimentAPI,
  createExperimentAPI,
} from "@/Infrastructure/API/ExperimentAPI";

export const getMyExperiments = async () => {
  const res = await fetchMyExperimentsAPI();
  if (!res.ok) throw new Error(await res.text() || "Kunne ikke hente eksperimenter.");
  return await res.json();
};

export const deleteExperiment = async (id) => {
  const res = await deleteExperimentAPI(id);
  if (!res.ok) throw new Error(await res.text() || "Kunne ikke slette eksperimentet.");
};

export const createExperiment = async (payload) => {
  const res = await createExperimentAPI(payload);
  if (!res.ok) throw new Error(await res.text() || "Kunne ikke oprette eksperimentet.");
  return await res.json();
};

export const saveFetchedExperiment = async (title, dataArray) => {
  return await createExperiment({
    title,
    dataJson: dataArray,
  });
};
