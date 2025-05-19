import * as AccountAPI from "@/Infrastructure/API/AccountAPI";

/**
 * Kalder API'et for at ændre kodeord – uden at ændre navn eller logik.
 */
export const changePassword = async (data) => {
  return await AccountAPI.changePassword(data);
};
