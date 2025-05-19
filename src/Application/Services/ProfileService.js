import * as ProfileAPI from "@/Infrastructure/API/ProfileAPI";

/**
 * Henter brugerens profil (uden fetch-logik).
 */
export const getProfile = async () => {
  return await ProfileAPI.fetchUserProfile();
};

/**
 * Gemmer brugerens opdaterede profil.
 */
export const saveProfile = async (profileData) => {
  return await ProfileAPI.updateUserProfile(profileData);
};
