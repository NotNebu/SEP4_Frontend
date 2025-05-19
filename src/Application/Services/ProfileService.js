import * as ProfileAPI from "@/Infrastructure/API/ProfileAPI";

/**
 * Henter brugerens profil.
 */
export const fetchUserProfile = async () => {
  return await ProfileAPI.fetchUserProfile();
};

/**
 * Opdaterer brugerens profil.
 */
export const updateUserProfile = async (profile) => {
  return await ProfileAPI.updateUserProfile(profile);
};
