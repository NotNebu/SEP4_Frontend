const BASE_URL = "https://localhost:5107/api/experiments";

// Funktion til at hente alle IoT-eksperimenter via API
// Sender en GET-request og returnerer svaret
export const fetchAllExperimentsAPI = () =>
  fetch(BASE_URL, { credentials: "include" });

// Funktion til at hente et specifikt IoT-eksperiment via API
// Tager et ID som input og sender en GET-request
export const fetchExperimentByIdAPI = (id) =>
  fetch(`${BASE_URL}/${id}`, { credentials: "include" });

// Funktion til at hente målinger for et eksperiment via API
// Tager et eksperiment-ID som input og sender en GET-request
export const fetchMeasurementsAPI = (experimentId) =>
  fetch(`${BASE_URL}/${experimentId}/measurements`, { credentials: "include" });

// Funktion til at hente de nyeste målinger for et eksperiment via API
// Tager et eksperiment-ID som input og sender en GET-request
export const fetchLatestMeasurementsAPI = (experimentId) =>
  fetch(`${BASE_URL}/${experimentId}/measurements/latest`, {
    credentials: "include",
  });

// Funktion til at oprette et nyt IoT-eksperiment via API
// Tager et payload-objekt som input og sender en POST-request
export const createExperimentAPI = (payload) =>
  fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

// Funktion til at aktivere et eksperiment via API
// Tager et ID som input og sender en PUT-request
export const activateExperimentAPI = (id) =>
  fetch(`${BASE_URL}/${id}/activate`, {
    method: "PUT",
    credentials: "include",
  });

// Funktion til at hente det aktive eksperiment via API
// Sender en GET-request og returnerer svaret
export const fetchActiveExperimentAPI = () =>
  fetch(`${BASE_URL}/active`, { credentials: "include" });

// Funktion til at eksportere målinger som CSV via API
// Tager eksperiment-ID, start- og slutdato som input og sender en GET-request
export const exportCsvAPI = (id, startDate, endDate) => {
  const params = new URLSearchParams();
  if (startDate) params.append("startDate", startDate);
  if (endDate) params.append("endDate", endDate);
  return fetch(`${BASE_URL}/${id}/export/csv?${params}`, {
    credentials: "include",
  });
};

// Funktion til at eksportere målinger som JSON via API
// Tager eksperiment-ID, start- og slutdato som input og sender en GET-request
export const exportJsonAPI = (id, startDate, endDate) => {
  const params = new URLSearchParams();
  if (startDate) params.append("startDate", startDate);
  if (endDate) params.append("endDate", endDate);
  return fetch(`${BASE_URL}/${id}/export/json?${params}`, {
    credentials: "include",
  });
};
