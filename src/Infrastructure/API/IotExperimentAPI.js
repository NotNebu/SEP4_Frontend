const BASE_URL = "https://localhost:5107/api/experiments";

export const getAllIotExperiments = async () => {
  const response = await fetch(BASE_URL, { credentials: "include" });
  if (!response.ok) throw new Error(await response.text() || "Kunne ikke hente IoT-eksperimenter.");
  return await response.json();
};

export const getIotExperimentById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, { credentials: "include" });
  if (!response.ok) throw new Error(await response.text() || "Kunne ikke hente eksperiment.");
  return await response.json();
};

export const getIotMeasurements = async (experimentId) => {
  const response = await fetch(`${BASE_URL}/${experimentId}/measurements`, { credentials: "include" });
  if (!response.ok) throw new Error(await response.text() || "Kunne ikke hente målinger.");
  return await response.json();
};

export const getIotLatestMeasurements = async (experimentId) => {
  const response = await fetch(`${BASE_URL}/${experimentId}/measurements/latest`, { credentials: "include" });
  if (!response.ok) throw new Error(await response.text() || "Kunne ikke hente nyeste målinger.");
  return await response.json();
};

export const createIotExperiment = async (payload) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(await response.text() || "Kunne ikke oprette IoT-eksperiment.");
  return await response.json();
};

export const activateIotExperiment = async (experimentId) => {
  const response = await fetch(`${BASE_URL}/${experimentId}/activate`, {
    method: "PUT",
    credentials: "include",
  });
  if (!response.ok) throw new Error(await response.text() || "Kunne ikke aktivere eksperiment.");
  return await response.json();
};

export const getActiveIotExperiment = async () => {
  const response = await fetch(`${BASE_URL}/active`, { credentials: "include" });
  if (!response.ok) throw new Error(await response.text() || "Kunne ikke hente aktivt eksperiment.");
  return await response.json();
};

export const exportIotCsv = async (experimentId, startDate, endDate) => {
  const params = new URLSearchParams();
  if (startDate) params.append("startDate", startDate);
  if (endDate) params.append("endDate", endDate);

  const response = await fetch(`${BASE_URL}/${experimentId}/export/csv?${params.toString()}`, {
    credentials: "include",
  });

  if (!response.ok) throw new Error(await response.text() || "Kunne ikke eksportere CSV.");
  return await response.text(); // CSV returneres som tekst
};

export const exportIotJson = async (experimentId, startDate, endDate) => {
  const params = new URLSearchParams();
  if (startDate) params.append("startDate", startDate);
  if (endDate) params.append("endDate", endDate);

  const response = await fetch(`${BASE_URL}/${experimentId}/export/json?${params.toString()}`, {
    credentials: "include",
  });

  if (!response.ok) throw new Error(await response.text() || "Kunne ikke eksportere JSON.");
  return await response.json();
};
