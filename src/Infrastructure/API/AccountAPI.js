const BASE_URL = "https://localhost:5107/api/account";

/**
 * Sender en anmodning til API'et for at ændre brugerens kodeord.
 * Dette er et lav-niveau netværkskald og skal derfor ligge i Infrastructure.
 */
export const changePassword = async ({ oldPassword, newPassword }) => {
  const response = await fetch(`${BASE_URL}/change-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ oldPassword, newPassword }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Der opstod en fejl under ændring af kodeordet.");
  }

  return data.message || "Kodeordet blev ændret succesfuldt!";
};
