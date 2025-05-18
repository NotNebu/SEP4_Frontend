// --- REGISTRERING ---
// Sender brugerens oplysninger til API'et for at oprette en ny konto
export const registerUser = async ({ email, password, username }) => {
  const response = await fetch("https://localhost:5107/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, username }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(err || "Registrering fejlede.");
  }

  return await response.text();
};

// --- LOGIN ---
// Logger brugeren ind og modtager JWT via cookie
export const loginUser = async ({ email, password }) => {
  const response = await fetch("https://localhost:5107/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(err || "Login fejlede.");
  }

  return true;
};
