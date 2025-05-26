import {
  changePasswordAPI,
  fetchUserProfileAPI,
  updateUserProfileAPI,
} from "@/Infrastructure/API/AccountAPI";

// Funktion til at ændre brugerens kodeord
// Tager det gamle og det nye kodeord som input
// Kaster en fejl hvis ændringen mislykkes, ellers returneres en succesbesked
export const changePassword = async ({ oldPassword, newPassword }) => {
  const response = await changePasswordAPI({ oldPassword, newPassword });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Der opstod en fejl under ændring af kodeordet."
    );
  }

  return data.message || "Kodeordet blev ændret succesfuldt!";
};

// Funktion til at hente brugerens profil
// Kaster en fejl hvis profilen ikke kan hentes, ellers returneres profil-data
export const fetchUserProfile = async () => {
  const res = await fetchUserProfileAPI();

  if (!res.ok) throw new Error("Kunne ikke hente brugerprofil.");
  return await res.json();
};

// Funktion til at opdatere brugerens profil
// Tager et profil-objekt som input
// Kaster en fejl hvis opdateringen mislykkes, ellers returneres den opdaterede profil
export const updateUserProfile = async (profile) => {
  const res = await updateUserProfileAPI(profile);

  if (!res.ok) {
    const raw = await res.text();

    try {
      const json = JSON.parse(raw);
      throw new Error(json.message || "Kunne ikke opdatere brugerprofilen.");
    } catch {
      throw new Error(raw || "Kunne ikke opdatere brugerprofilen.");
    }
  }

  return await res.json();
};
