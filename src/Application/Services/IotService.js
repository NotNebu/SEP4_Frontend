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

// Hjælpefunktion til at håndtere API-respons og fejlbeskeder
const handleResponse = async (res, fallbackMessage) => {
  if (!res.ok) throw new Error((await res.text()) || fallbackMessage);
  return res.headers.get("Content-Type")?.includes("application/json")
    ? await res.json()
    : await res.text();
};

// Funktion til at hente alle IoT-eksperimenter
// Kaster en fejl hvis eksperimenterne ikke kan hentes, ellers returneres data
export const getAllIotExperiments = async () =>
  await handleResponse(
    await fetchAllExperimentsAPI(),
    "Kunne ikke hente IoT-eksperimenter."
  );

// Funktion til at hente et specifikt IoT-eksperiment ud fra ID
// Kaster en fejl hvis eksperimentet ikke kan hentes, ellers returneres data
export const getIotExperimentById = async (id) =>
  await handleResponse(
    await fetchExperimentByIdAPI(id),
    "Kunne ikke hente eksperiment."
  );

// Funktion til at hente målinger for et eksperiment
// Kaster en fejl hvis målingerne ikke kan hentes, ellers returneres data
export const getIotMeasurements = async (experimentId) =>
  await handleResponse(
    await fetchMeasurementsAPI(experimentId),
    "Kunne ikke hente målinger."
  );

// Funktion til at hente de nyeste målinger for et eksperiment
// Kaster en fejl hvis målingerne ikke kan hentes, ellers returneres data
export const getIotLatestMeasurements = async (experimentId) =>
  await handleResponse(
    await fetchLatestMeasurementsAPI(experimentId),
    "Kunne ikke hente nyeste målinger."
  );

// Funktion til at oprette et nyt IoT-eksperiment
// Tager et payload-objekt som input
// Kaster en fejl hvis oprettelsen mislykkes, ellers returneres det oprettede eksperiment
export const createIotExperiment = async (payload) =>
  await handleResponse(
    await createExperimentAPI(payload),
    "Kunne ikke oprette IoT-eksperiment."
  );

// Funktion til at aktivere et eksperiment ud fra ID
// Kaster en fejl hvis aktiveringen mislykkes, ellers returneres data
export const activateIotExperiment = async (experimentId) =>
  await handleResponse(
    await activateExperimentAPI(experimentId),
    "Kunne ikke aktivere eksperiment."
  );

// Funktion til at hente det aktive eksperiment
// Kaster en fejl hvis det ikke kan hentes, ellers returneres data
export const getActiveIotExperiment = async () =>
  await handleResponse(
    await fetchActiveExperimentAPI(),
    "Kunne ikke hente aktivt eksperiment."
  );

// Funktion til at eksportere målinger som CSV
// Kaster en fejl hvis eksporten mislykkes, ellers returneres CSV-data
export const exportIotCsv = async (experimentId, startDate, endDate) =>
  await handleResponse(
    await exportCsvAPI(experimentId, startDate, endDate),
    "Kunne ikke eksportere CSV."
  );

// Funktion til at eksportere målinger som JSON
// Kaster en fejl hvis eksporten mislykkes, ellers returneres JSON-data
export const exportIotJson = async (experimentId, startDate, endDate) =>
  await handleResponse(
    await exportJsonAPI(experimentId, startDate, endDate),
    "Kunne ikke eksportere JSON."
  );
