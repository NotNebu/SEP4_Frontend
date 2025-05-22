// src/Application/Services/AccountService.js

import {
  changePasswordAPI,
  fetchUserProfileAPI,
  updateUserProfileAPI,
} from "@/Infrastructure/API/AccountAPI";

export const changePassword = async ({ oldPassword, newPassword }) => {
  const response = await changePasswordAPI({ oldPassword, newPassword });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Der opstod en fejl under ændring af kodeordet.");
  }

  return data.message || "Kodeordet blev ændret succesfuldt!";
};

export const fetchUserProfile = async () => {
  const res = await fetchUserProfileAPI();

  if (!res.ok) throw new Error("Kunne ikke hente brugerprofil.");
  return await res.json();
};

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


