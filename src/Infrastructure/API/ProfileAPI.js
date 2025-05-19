const BASE_URL = "https://localhost:5107/api/account";

/**
 * Henter den aktuelle brugers profiloplysninger.
 */
export const fetchUserProfile = async () => {
  const res = await fetch(`${BASE_URL}/me`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Kunne ikke hente brugerprofil.");
  return await res.json();
};

/**
 * Opdaterer brugerens profil med nye oplysninger.
 */
export const updateUserProfile = async (profile) => {
  const res = await fetch(BASE_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(profile),
  });

  if (!res.ok) throw new Error("Kunne ikke opdatere brugerprofilen.");
};
