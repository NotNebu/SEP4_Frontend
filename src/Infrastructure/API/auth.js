const BASE_URL = "https://localhost:5107/api/auth";

/**
 * Logger en bruger ind med email og password.
 * Sender en POST-anmodning til /login endpoint og modtager en JWT-cookie.
 */
export const login = async (email, password) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include", // Sender cookie med anmodningen
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return response.json();
};

/**
 * Registrerer en ny bruger.
 * Sender en POST-anmodning til /register endpoint.
 */
export const register = async (email, password, username) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, username }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return response.json(); // { success: true }
};

/**
 * Henter information om den aktuelle bruger.
 * JWT bliver automatisk sendt som cookie.
 */
export const getMe = async () => {
  const response = await fetch(`${BASE_URL}/me`, {
    method: "GET",
    credentials: "include", 
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return response.json(); // brugerdata
};

/**
 * Logger brugeren ud ved at rydde JWT-cookien på serveren.
 */
export const logout = async () => {
  const response = await fetch(`${BASE_URL}/logout`, {
    method: "POST",
    credentials: "include", 
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return response.json();
};
