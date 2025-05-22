// src/Infrastructure/API/ExperimentAPI.js

const BASE_URL = "https://localhost:5107/api/experiment";

export const fetchMyExperimentsAPI = async () =>
  fetch(`${BASE_URL}/my-experiments`, {
    credentials: "include",
  });

export const deleteExperimentAPI = async (id) =>
  fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

export const createExperimentAPI = async (payload) =>
  fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
