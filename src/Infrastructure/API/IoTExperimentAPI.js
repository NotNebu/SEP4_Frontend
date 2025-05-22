// src/Infrastructure/API/IotExperimentAPI.js

const BASE_URL = "https://localhost:5107/api/experiments";

export const fetchAllExperimentsAPI = () =>
  fetch(BASE_URL, { credentials: "include" });

export const fetchExperimentByIdAPI = (id) =>
  fetch(`${BASE_URL}/${id}`, { credentials: "include" });

export const fetchMeasurementsAPI = (experimentId) =>
  fetch(`${BASE_URL}/${experimentId}/measurements`, { credentials: "include" });

export const fetchLatestMeasurementsAPI = (experimentId) =>
  fetch(`${BASE_URL}/${experimentId}/measurements/latest`, { credentials: "include" });

export const createExperimentAPI = (payload) =>
  fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

export const activateExperimentAPI = (id) =>
  fetch(`${BASE_URL}/${id}/activate`, {
    method: "PUT",
    credentials: "include",
  });

export const fetchActiveExperimentAPI = () =>
  fetch(`${BASE_URL}/active`, { credentials: "include" });

export const exportCsvAPI = (id, startDate, endDate) => {
  const params = new URLSearchParams();
  if (startDate) params.append("startDate", startDate);
  if (endDate) params.append("endDate", endDate);
  return fetch(`${BASE_URL}/${id}/export/csv?${params}`, { credentials: "include" });
};

export const exportJsonAPI = (id, startDate, endDate) => {
  const params = new URLSearchParams();
  if (startDate) params.append("startDate", startDate);
  if (endDate) params.append("endDate", endDate);
  return fetch(`${BASE_URL}/${id}/export/json?${params}`, { credentials: "include" });
};
