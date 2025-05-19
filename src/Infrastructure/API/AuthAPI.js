const BASE_URL = "https://localhost:5107/api/auth";

/**
 * Registrerer en ny bruger med email, password og username.
 */
export const registerUser = async ({ email, password, username }) => {
  const response = await fetch(`${BASE_URL}/register`, {
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

/**
 * Logger brugeren ind og modtager JWT via cookie.
 */
export const loginUser = async ({ email, password }) => {
  const response = await fetch(`${BASE_URL}/login`, {
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
