import {
  fetchMyExperimentsAPI,
  deleteExperimentAPI,
  createExperimentAPI,
} from "@/Infrastructure/API/ExperimentAPI";

// Funktion til at hente brugerens eksperimenter
// Kaster en fejl hvis eksperimenterne ikke kan hentes, ellers returneres data
export const getMyExperiments = async () => {
  const res = await fetchMyExperimentsAPI();
  if (!res.ok)
    throw new Error((await res.text()) || "Kunne ikke hente eksperimenter.");
  return await res.json();
};

// Funktion til at slette et eksperiment ud fra ID
// Kaster en fejl hvis sletningen mislykkes
export const deleteExperiment = async (id) => {
  const res = await deleteExperimentAPI(id);
  if (!res.ok)
    throw new Error((await res.text()) || "Kunne ikke slette eksperimentet.");
};

// Funktion til at oprette et nyt eksperiment
// Tager et payload-objekt som input
// Kaster en fejl hvis oprettelsen mislykkes, ellers returneres det oprettede eksperiment
export const createExperiment = async (payload) => {
  const res = await createExperimentAPI(payload);
  if (!res.ok)
    throw new Error((await res.text()) || "Kunne ikke oprette eksperimentet.");
  return await res.json();
};

// Funktion til at gemme et hentet eksperiment
// Tager titel og data-array som input og opretter et eksperiment
export const saveFetchedExperiment = async (title, dataArray) => {
  return await createExperiment({
    title,
    dataJson: dataArray,
  });
};
