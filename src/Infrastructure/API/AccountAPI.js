// Funktion til at ændre brugerens kodeord via API
// Tager det gamle og det nye kodeord som input og sender en POST-request
export const changePasswordAPI = async ({ oldPassword, newPassword }) => {
  return await fetch("https://localhost:5107/api/account/change-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ oldPassword, newPassword }),
  });
};

// Funktion til at hente brugerens profil via API
// Sender en GET-request og returnerer svaret
export const fetchUserProfileAPI = async () => {
  return await fetch("https://localhost:5107/api/account/me", {
    credentials: "include",
  });
};

// Funktion til at opdatere brugerens profil via API
// Tager et profil-objekt som input og sender en PUT-request
export const updateUserProfileAPI = async (profile) => {
  return await fetch("https://localhost:5107/api/account", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(profile),
  });
};
