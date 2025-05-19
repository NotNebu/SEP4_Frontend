const BASE_URL = "https://localhost:5107/api/experiment";

export const getMyExperiments = async () => {
  const response = await fetch(`${BASE_URL}/my-experiments`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error(await response.text() || "Kunne ikke hente eksperimenter.");
  return await response.json();
};

export const deleteExperiment = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!response.ok) throw new Error(await response.text() || "Kunne ikke slette eksperimentet.");
};

export const createExperiment = async (payload) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(await response.text() || "Kunne ikke oprette eksperimentet.");
  return await response.json();
};

export const saveFetchedExperiment = async (title, dataArray) => {
  const payload = {
    title,
    dataJson: dataArray,
  };

  const response = await fetch(BASE_URL, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(await response.text() || "Kunne ikke gemme eksperimentet.");
  return await response.json();
};
