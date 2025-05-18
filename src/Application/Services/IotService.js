// Henter alle eksperimenter
export const getAllIotExperiments = async () => {
  const response = await fetch("https://localhost:5107/api/experiments", {
    credentials: "include",
  });

  if (!response.ok) throw new Error(await response.text() || "Kunne ikke hente IoT-eksperimenter.");
  return await response.json();
};

// Henter eksperiment med ID
export const getIotExperimentById = async (id) => {
  const response = await fetch(`https://localhost:5107/api/experiments/${id}`, {
    credentials: "include",
  });

  if (!response.ok) throw new Error(await response.text() || "Kunne ikke hente eksperiment.");
  return await response.json();
};

// Henter alle målinger for et eksperiment
export const getIotMeasurements = async (experimentId) => {
  const response = await fetch(`https://localhost:5107/api/experiments/${experimentId}/measurements`, {
    credentials: "include",
  });

  if (!response.ok) throw new Error(await response.text() || "Kunne ikke hente målinger.");
  return await response.json();
};

// Henter de seneste 10 målinger
export const getIotLatestMeasurements = async (experimentId) => {
  const response = await fetch(`https://localhost:5107/api/experiments/${experimentId}/measurements/latest`, {
    credentials: "include",
  });

  if (!response.ok) throw new Error(await response.text() || "Kunne ikke hente nyeste målinger.");
  return await response.json();
};

// Opretter et nyt IoT-eksperiment
export const createIotExperiment = async (payload) => {
  const response = await fetch("https://localhost:5107/api/experiments", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error(await response.text() || "Kunne ikke oprette IoT-eksperiment.");
  return await response.json();
};

// Aktiverer et eksperiment til live målinger
export const activateIotExperiment = async (experimentId) => {
  const response = await fetch(`https://localhost:5107/api/experiments/${experimentId}/activate`, {
    method: "PUT",
    credentials: "include",
  });

  if (!response.ok) throw new Error(await response.text() || "Kunne ikke aktivere eksperiment.");
  return await response.json();
};

// Henter det aktive eksperiment
export const getActiveIotExperiment = async () => {
  const response = await fetch("https://localhost:5107/api/experiments/active", {
    credentials: "include",
  });

  if (!response.ok) throw new Error(await response.text() || "Kunne ikke hente aktivt eksperiment.");
  return await response.json();
};

// Eksporterer målinger som CSV
export const exportIotCsv = async (experimentId, startDate, endDate) => {
  const params = new URLSearchParams();
  if (startDate) params.append("startDate", startDate);
  if (endDate) params.append("endDate", endDate);

  const response = await fetch(`https://localhost:5107/api/experiments/${experimentId}/export/csv?${params.toString()}`, {
    credentials: "include",
  });

  if (!response.ok) throw new Error(await response.text() || "Kunne ikke eksportere CSV.");
  return await response.text();
};

// Eksporterer målinger som JSON
export const exportIotJson = async (experimentId, startDate, endDate) => {
  const params = new URLSearchParams();
  if (startDate) params.append("startDate", startDate);
  if (endDate) params.append("endDate", endDate);

  const response = await fetch(`https://localhost:5107/api/experiments/${experimentId}/export/json?${params.toString()}`, {
    credentials: "include",
  });

  if (!response.ok) throw new Error(await response.text() || "Kunne ikke eksportere JSON.");
  return await response.json();
};
