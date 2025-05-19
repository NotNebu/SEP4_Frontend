import * as AccountAPI from "@/Infrastructure/API/AccountAPI";

/**
 * Kalder infrastrukturen for at ændre brugerens kodeord.
 * Eventuel validering, business logic, logging osv. kan lægges her.
 */
export const changeUserPassword = async (formData) => {
  return await AccountAPI.changePassword(formData);
};
