// Basis-URL til YARP API Gatewayens auth-endpoints
const BASE_URL = "http://yarp-gateway:5107/api/auth";

/**
 * Logger en bruger ind med email og password.
 * Sender en POST-anmodning til /login endpoint.
 * 
 * @param {string} email - Brugerens email
 * @param {string} password - Brugerens adgangskode
 * @returns {Promise<object>} - JWT-token og evt. brugerinfo
 * @throws {Error} - Hvis login fejler
 */
export const login = async (email, password) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error); // Kast fejl fra serveren
  }

  return response.json(); // Returnér token-data som JSON
};

/**
 * Registrerer en ny bruger.
 * Sender en POST-anmodning til /register endpoint.
 * 
 * @param {string} email - Email for den nye bruger
 * @param {string} password - Adgangskode for den nye bruger
 * @param {string} username - Brugernavn for den nye bruger
 * @returns {Promise<object>} - JSON med registreringsresultat
 * @throws {Error} - Hvis registrering fejler
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

  return response.json(); // Returnér success: true/false
};

/**
 * Henter information om den aktuelle bruger baseret på JWT-token.
 * Sender en GET-anmodning til /me endpoint med Authorization-header.
 * 
 * @param {string} token - JWT-token fra login
 * @returns {Promise<object>} - Brugerens email og brugernavn
 * @throws {Error} - Hvis token er ugyldigt eller request fejler
 */
export const getMe = async (token) => {
  const response = await fetch(`${BASE_URL}/me`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`, // Vedhæft token til header
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return response.json(); // Returnér brugerens data
};
