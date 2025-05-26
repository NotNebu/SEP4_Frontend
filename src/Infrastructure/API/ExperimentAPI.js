const BASE_URL = "https://localhost:5107/api/experiment";

// Funktion til at hente brugerens eksperimenter via API
// Sender en GET-request og returnerer svaret
export const fetchMyExperimentsAPI = async () =>
  fetch(`${BASE_URL}/my-experiments`, {
    credentials: "include",
  });

// Funktion til at slette et eksperiment via API
// Tager et ID som input og sender en DELETE-request
export const deleteExperimentAPI = async (id) =>
  fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

// Funktion til at oprette et nyt eksperiment via API
// Tager et payload-objekt som input og sender en POST-request
export const createExperimentAPI = async (payload) =>
  fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
