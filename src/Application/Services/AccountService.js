// Sender en anmodning til API'et for at ændre brugerens kodeord
export const changePassword = async ({ oldPassword, newPassword }) => {
  const response = await fetch("https://localhost:5107/api/account/change-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ oldPassword, newPassword }),
  });

  const data = await response.json();

  // Returnér fejlbesked, hvis anmodningen ikke lykkedes
  if (!response.ok) {
    throw new Error(data.message || "Der opstod en fejl under ændring af kodeordet.");
  }

  // Returnér succesbesked
  return data.message || "Kodeordet blev ændret succesfuldt!";
};
